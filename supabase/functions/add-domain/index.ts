
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

    console.log("Received request body:", JSON.stringify({
      domain,
      theme,
      userId,
      storeId: storeId || "null"
    }));

    if (!domain) {
      throw new Error('Domain is required');
    }

    if (!userId) {
      throw new Error('User ID is required');
    }

    // Create a Supabase client with the Auth context of the logged in user
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration is missing');
    }
    
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

    // Get Vercel API credentials from environment variables
    const vercelApiToken = Deno.env.get("VERCEL_API_TOKEN");
    const vercelProjectId = Deno.env.get("VERCEL_PROJECT_ID");

    if (!vercelApiToken || !vercelProjectId) {
      console.error("Missing Vercel credentials:", {
        hasToken: vercelApiToken ? "Yes" : "No",
        hasProjectId: vercelProjectId ? "Yes" : "No"
      });
      throw new Error('Vercel API credentials not configured');
    }

    console.log("Vercel configuration check:");
    console.log("Project ID:", vercelProjectId);
    console.log("Token length:", vercelApiToken.length, "characters");
    console.log("Token first 4 chars:", vercelApiToken.substring(0, 4));
    
    // Call Vercel API to add domain
    const vercelUrl = `https://api.vercel.com/v9/projects/${vercelProjectId}/domains`;
    console.log("Calling Vercel API URL:", vercelUrl);
    
    const vercelDomainResponse = await fetch(
      vercelUrl,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vercelApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: domain }),
      }
    );

    // Log full response details for debugging
    const responseText = await vercelDomainResponse.text();
    console.log("Vercel API response status:", vercelDomainResponse.status);
    console.log("Vercel API response full body:", responseText);

    // Parse the response as JSON if possible
    let vercelData;
    try {
      vercelData = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse Vercel API response as JSON:", e);
      throw new Error(`Vercel API returned invalid JSON: ${responseText.substring(0, 100)}...`);
    }
    
    if (!vercelDomainResponse.ok) {
      // Create more detailed error message
      const errorDetails = vercelData?.error ? 
        `code: ${vercelData.error.code}, message: ${vercelData.error.message}` : 
        JSON.stringify(vercelData);
        
      throw new Error(`Vercel API error (${vercelDomainResponse.status}): ${errorDetails}`);
    }

    // Get DNS configuration from Vercel response
    const dnsConfig = {
      name: vercelData.name,
      apexName: vercelData.apexName,
      dnsRecords: vercelData.verification || [],
      verified: vercelData.verified,
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
          vercel_status: vercelData.verified ? 'verified' : 'pending',
          dns_records: dnsConfig
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
        dnsRecords: dnsConfig.dnsRecords
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
