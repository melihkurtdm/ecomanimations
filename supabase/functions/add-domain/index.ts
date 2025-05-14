
// Follow Deno deploy for Edge Functions
// https://deno.com/deploy/docs

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const body = await req.json();
    const { domain, theme, userId, storeId } = body;

    if (!domain) {
      throw new Error('Domain is required');
    }

    // Create a Supabase client with the Auth context of the logged in user
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if domain already exists
    const { data: existingDomain, error: checkError } = await supabase
      .from('domains')
      .select()
      .eq('domain', domain)
      .limit(1);

    if (checkError) {
      throw checkError;
    }

    if (existingDomain && existingDomain.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Domain already exists',
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 400,
        }
      );
    }

    // In a real implementation, we would call Vercel API
    // to add the domain to the project
    // const vercelApiKey = Deno.env.get("VERCEL_API_KEY");
    // const vercelProjectId = Deno.env.get("VERCEL_PROJECT_ID");
    
    // Mock DNS records that would be returned from Vercel API
    const mockDnsRecords = {
      name: domain,
      apexName: domain,
      dnsRecords: [
        {
          name: domain,
          type: "CNAME",
          value: "routes.shopset.net",
          ttl: 3600
        },
        {
          name: "www",
          type: "CNAME", 
          value: "routes.shopset.net",
          ttl: 3600
        }
      ],
      verified: false,
    };

    // Insert the new domain into the database
    const { data: newDomain, error } = await supabase
      .from('domains')
      .insert([
        {
          domain,
          user_id: userId,
          store_id: storeId,
          status: 'pending',
          vercel_status: 'pending',
          dns_records: mockDnsRecords
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        domain: newDomain,
        dnsRecords: mockDnsRecords.dnsRecords
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in add-domain function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      }
    );
  }
});
