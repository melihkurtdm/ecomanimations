import { supabase } from "@/integrations/supabase/client";

export async function resolveCurrentStore() {
  const domain = window.location.hostname;

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("domain", domain)
    .single();

  if (error) throw error;

  return data;
}