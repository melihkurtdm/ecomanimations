import { supabase } from "@/integrations/supabase/client";

export type Store = {
  id: string;
  name: string;
  domain: string;
  created_at: string;
};

function normalizeHost(host: string) {
  let h = (host || "").trim().toLowerCase();
  h = h.replace(/\.$/, "");
  if (h.startsWith("www.")) h = h.slice(4);
  return h;
}

function getDomainOverrideFromQuery(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const q = new URLSearchParams(window.location.search);
    const d = q.get("domain");
    return d ? normalizeHost(d) : null;
  } catch {
    return null;
  }
}

function buildDomainCandidates(hostname: string) {
  const h = normalizeHost(hostname);
  const set = new Set<string>([h]);

  // Local dev
  if (h === "localhost") set.add("127.0.0.1");
  if (h === "127.0.0.1") set.add("localhost");

  return Array.from(set);
}

export async function resolveCurrentStore(): Promise<Store | null> {
  if (typeof window === "undefined") return null;

  const hostname = window.location.hostname;
  const override = getDomainOverrideFromQuery(); // ✅ ?domain=...
  const base = override ?? hostname;

  const candidates = buildDomainCandidates(base);

  // ✅ Debug
  console.log("[RESOLVE] called");
  console.log("[RESOLVE] hostname:", hostname);
  console.log("[RESOLVE] override:", override);
  console.log("[RESOLVE] candidates:", candidates);

  const { data, error } = await (supabase as any)
    .from("stores")
    .select("*")
    .in("domain", candidates)
    .limit(1)
    .maybeSingle();

  console.log("[RESOLVE] supabase result:", { data, error });

  if (error) {
    console.error("[RESOLVE] error:", error);
    return null;
  }

  if (!data) {
    console.warn("[RESOLVE] no store found for:", candidates);
    return null;
  }

  const resolvedName = (data.store_name ?? data.name) as string | undefined;

  return {
    id: String(data.id),
    name: resolvedName ?? "Unnamed Store",
    domain: String(data.domain),
    created_at: String(data.created_at),
  };
}