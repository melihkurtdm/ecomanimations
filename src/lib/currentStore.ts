import { supabase } from "@/integrations/supabase/client";

export type Store = {
  id: string;
  name: string;
  domain: string;
  created_at: string;
};

function normalizeHost(host: string) {
  return host.trim().toLowerCase().replace(/^www\./, "");
}

function buildDomainCandidates(hostname: string) {
  const h = normalizeHost(hostname);
  const set = new Set<string>([h]);

  // Local dev fallback
  if (h === "localhost") set.add("127.0.0.1");
  if (h === "127.0.0.1") set.add("localhost");

  return Array.from(set);
}

export async function resolveCurrentStore(): Promise<Store | null> {
  // SSR / safety guard
  if (typeof window === "undefined") return null;

  const hostname = window.location.hostname;
  const candidates = buildDomainCandidates(hostname);

  console.log("HOSTNAME:", hostname);
  console.log("CANDIDATES:", candidates);

  // ⚠️ types.ts ile DB şeması uyuşmadığı için "supabase as any" ile type-check bypass ediyoruz
  const { data, error } = await (supabase as any)
    .from("stores")
    .select("*")
    .in("domain", candidates)
    .limit(1)
    .maybeSingle();

  console.log("SUPABASE RESULT:", { data, error });

  if (error) {
    console.error("STORE RESOLVE ERROR:", error);
    return null;
  }

  if (!data) {
    console.warn("No store found for:", hostname, "candidates:", candidates);
    return null;
  }

  // store_name varsa onu kullan, yoksa name'i kullan
  const resolvedName = (data.store_name ?? data.name) as string | undefined;

  return {
    id: String(data.id),
    name: resolvedName ?? "Unnamed Store",
    domain: String(data.domain),
    created_at: String(data.created_at),
  };
}