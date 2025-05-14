
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // CORS headers
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        }
      });
    }
    
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the Vercel API token and project ID from env vars
    const vercelApiToken = Deno.env.get('VERCEL_API_TOKEN');
    const vercelProjectId = Deno.env.get('VERCEL_PROJECT_ID');
    
    if (!vercelApiToken || !vercelProjectId) {
      return new Response(
        JSON.stringify({ error: 'Missing Vercel API token or project ID' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get all pending domains
    const { data: pendingDomains, error: queryError } = await supabaseClient
      .from('domains')
      .select('*')
      .or('vercel_status.eq.pending,status.eq.pending');
      
    if (queryError) {
      return new Response(
        JSON.stringify({ error: 'Failed to query domains', details: queryError }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!pendingDomains || pendingDomains.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No pending domains found' }), 
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const updates = [];
    
    // Check each domain status
    for (const domain of pendingDomains) {
      try {
        const checkResponse = await fetch(
          `https://api.vercel.com/v9/projects/${vercelProjectId}/domains/${domain.domain}/config`, 
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${vercelApiToken}`,
            }
          }
        );
        
        const checkData = await checkResponse.json();
        
        // Update DNS records in database
        domain.dns_records = checkData;
        domain.last_checked = new Date().toISOString();
        
        // Check if domain is verified
        if (checkData.configuredBy || checkData.verified) {
          domain.status = 'verified';
          domain.vercel_status = 'verified';
          domain.verified_at = new Date().toISOString();
          
          // Update the store record as well
          await supabaseClient
            .from('stores')
            .update({ 
              vercel_status: 'verified'
            })
            .eq('domain', domain.domain);
          
          updates.push({ 
            domain: domain.domain, 
            status: 'verified', 
            message: 'Domain verified successfully'
          });
        } else if (checkData.error) {
          domain.status = 'error';
          domain.error_message = checkData.error.message || 'Unknown error';
          updates.push({ 
            domain: domain.domain, 
            status: 'error', 
            error: domain.error_message
          });
        }
        
        // Update domain in Supabase
        const { error: updateError } = await supabaseClient
          .from('domains')
          .update({
            status: domain.status,
            vercel_status: domain.vercel_status,
            dns_records: domain.dns_records,
            last_checked: domain.last_checked,
            verified_at: domain.verified_at,
            error_message: domain.error_message
          })
          .eq('id', domain.id);
          
        if (updateError) {
          console.error(`Failed to update domain ${domain.domain}:`, updateError);
          updates.push({ 
            domain: domain.domain, 
            status: 'update_error', 
            error: updateError
          });
        }
      } catch (error) {
        console.error(`Error checking domain ${domain.domain}:`, error);
        updates.push({ 
          domain: domain.domain, 
          status: 'check_error', 
          error: error.message
        });
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        updates: updates,
        checkedCount: pendingDomains.length
      }), 
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        } 
      }
    );
    
  } catch (error) {
    console.error('Global error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
