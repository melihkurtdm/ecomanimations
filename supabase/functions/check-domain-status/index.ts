
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

    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }
    
    // Get pending domains
    const { data: domains, error } = await supabase
      .from('domains')
      .select()
      .eq('status', 'pending');

    if (error) {
      throw error;
    }

    console.log(`Found ${domains.length} pending domains to check`);

    // For now, this is a mock implementation - in a real implementation,
    // you would check each domain's DNS records against the expected values
    let checkedCount = 0;
    
    for (const domain of domains) {
      try {
        // Mock verification - simulate checking DNS records
        // In a real implementation, you would:
        // 1. Call Vercel API to check domain verification status
        // 2. Update the domain status based on the API response
        
        const randomStatus = Math.random() > 0.3 ? 'verified' : 'pending';
        
        if (randomStatus === 'verified') {
          await supabase
            .from('domains')
            .update({
              status: 'verified',
              verified_at: new Date().toISOString(),
              last_checked: new Date().toISOString()
            })
            .eq('id', domain.id);
        } else {
          await supabase
            .from('domains')
            .update({
              last_checked: new Date().toISOString()
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
        message: `Checked ${checkedCount} domains`
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
