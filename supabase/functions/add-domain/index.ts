
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface AddDomainRequest {
  domain: string;
  selectedTheme: string;
  userId: string;
  storeId?: string;
}

serve(async (req) => {
  try {
    // CORS headers
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

    // Parse request body
    const { domain, selectedTheme, userId, storeId } = await req.json() as AddDomainRequest;
    
    if (!domain || !selectedTheme || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Clean the domain (remove http/https and www)
    const cleanDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').trim();

    // Check if domain already exists
    const { data: existingDomain, error: queryError } = await supabaseClient
      .from('domains')
      .select('*')
      .eq('domain', cleanDomain)
      .single();

    if (existingDomain) {
      return new Response(
        JSON.stringify({ error: 'Domain already exists', domain: existingDomain }), 
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add domain to Vercel project
    let vercelResponse;
    try {
      vercelResponse = await fetch(`https://api.vercel.com/v9/projects/${vercelProjectId}/domains`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vercelApiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: cleanDomain })
      });
      
      const vercelData = await vercelResponse.json();
      
      if (!vercelResponse.ok) {
        console.error('Vercel API error:', vercelData);
        return new Response(
          JSON.stringify({ error: 'Failed to add domain to Vercel', vercelError: vercelData }), 
          { status: vercelResponse.status, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Get DNS configuration from Vercel
      const configResponse = await fetch(`https://api.vercel.com/v9/projects/${vercelProjectId}/domains/${cleanDomain}/config`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${vercelApiToken}`,
        }
      });
      
      const dnsConfig = await configResponse.json();
      
      // Insert domain into Supabase
      const { data, error } = await supabaseClient
        .from('domains')
        .insert({
          domain: cleanDomain,
          status: 'pending',
          vercel_status: 'pending',
          dns_records: dnsConfig,
          user_id: userId,
          store_id: storeId,
          "primary": existingDomain ? false : true,
        })
        .select()
        .single();
        
      if (error) {
        console.error('Supabase insert error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to insert domain', supabaseError: error }), 
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Update store record with the new domain
      const { error: storeUpdateError } = await supabaseClient
        .from('stores')
        .update({ 
          domain: cleanDomain,
          selected_theme: selectedTheme,
          vercel_status: 'pending'
        })
        .eq('user_id', userId);
        
      if (storeUpdateError) {
        console.error('Store update error:', storeUpdateError);
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          domain: data, 
          dnsConfig: dnsConfig,
          vercelResponse: vercelData
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
      console.error('Error adding domain:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error', details: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Global error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
