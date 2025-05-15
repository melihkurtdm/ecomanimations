
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
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get Vercel API credentials
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

    // Get pending domains
    const { data: domains, error } = await supabase
      .from('domains')
      .select()
      .in('status', ['pending', 'error']);

    if (error) {
      throw error;
    }

    console.log(`Found ${domains.length} domains to check`);

    // Check status for each domain
    let checkedCount = 0;
    let verifiedCount = 0;
    
    for (const domain of domains) {
      try {
        // Call Vercel API to check domain status - removing hardcoded team ID
        const vercelResponse = await fetch(
          `https://api.vercel.com/v9/projects/${vercelProjectId}/domains/${domain.domain}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${vercelApiToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!vercelResponse.ok) {
          const errorData = await vercelResponse.json();
          console.error(`Error checking domain ${domain.domain}:`, errorData);
          
          await supabase
            .from('domains')
            .update({
              status: 'error',
              error_message: `Verification failed: ${errorData.error?.message || 'Unknown error'}`,
              last_checked: new Date().toISOString()
            })
            .eq('id', domain.id);
            
          continue;
        }
        
        const vercelData = await vercelResponse.json();
        
        if (vercelData.verified) {
          await supabase
            .from('domains')
            .update({
              status: 'verified',
              verified_at: new Date().toISOString(),
              last_checked: new Date().toISOString(),
              vercel_status: 'verified'
            })
            .eq('id', domain.id);
          
          verifiedCount++;
        } else {
          await supabase
            .from('domains')
            .update({
              last_checked: new Date().toISOString(),
              vercel_status: vercelData.verified ? 'verified' : 'pending'
            })
            .eq('id', domain.id);
        }
        
        checkedCount++;
      } catch (domainError) {
        console.error(`Error checking domain ${domain.domain}:`, domainError);
        
        // Update domain with error status
        await supabase
          .from('domains')
          .update({
            status: 'error',
            error_message: `Verification failed: ${domainError.message || 'Unknown error'}`,
            last_checked: new Date().toISOString()
          })
          .eq('id', domain.id);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        checkedCount,
        verifiedCount,
        message: `Checked ${checkedCount} domains, verified ${verifiedCount}`
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
    console.error('Error in check-domain-status function:', error);
    
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
