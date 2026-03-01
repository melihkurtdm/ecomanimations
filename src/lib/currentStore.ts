import { supabase } from "@/integrations/supabase/client";

export type Store = {
  id: string;
  name: string;
  domain: string;
  created_at: string;
};

console.log("🔥 currentStore.ts LOADED");

function normalizeHost(host: string) {
  const normalized = host.trim().toLowerCase().replace(/^www\./, "");
  console.log("🔍 normalizeHost:", { input: host, output: normalized });
  return normalized;
}

function buildDomainCandidates(hostname: string) {
  const h = normalizeHost(hostname);
  const set = new Set<string>([h]);

  if (h === "localhost") set.add("127.0.0.1");
  if (h === "127.0.0.1") set.add("localhost");

  const arr = Array.from(set);
  console.log("🧩 buildDomainCandidates:", arr);
  return arr;
}

export async function resolveCurrentStore(): Promise<Store | null> {
  console.log("🚀 resolveCurrentStore CALLED");

  if (typeof window === "undefined") {
    console.log("❌ window undefined (SSR guard hit)");
    return null;
  }

  console.log("🌍 LOCATION:", {
    href: window.location.href,
    host: window.location.hostname,
    search: window.location.search,
  });

  console.log("🔑 ENV CHECK:", {
    url: import.meta.env.VITE_SUPABASE_URL,
    anon: import.meta.env.VITE_SUPABASE_ANON_KEY ? "SET" : "MISSING",
  });

  const hostname = window.location.hostname;
  const candidates = buildDomainCandidates(hostname);

  try {
    console.log("📡 Querying Supabase with candidates:", candidates);

    const { data, error } = await (supabase as any)
      .from("stores")
      .select("*")
      .in("domain", candidates)
      .limit(1)
      .maybeSingle();

    console.log("📦 SUPABASE RESPONSE:", { data, error });

    if (error) {
      console.error("❌ STORE RESOLVE ERROR:", error);
      return null;
    }

    if (!data) {
      console.warn("⚠️ No store found for:", hostname);
      return null;
    }

    const resolvedName = (data.store_name ?? data.name) as
      | string
      | undefined;

    const result: Store = {
      id: String(data.id),
      name: resolvedName ?? "Unnamed Store",
      domain: String(data.domain),
      created_at: String(data.created_at),
    };

    console.log("✅ RESOLVED STORE:", result);

    return result;
  } catch (err) {
    console.error("💥 FATAL ERROR inside resolveCurrentStore:", err);
    return null;
  }
}