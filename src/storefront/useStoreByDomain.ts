import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

type StoreRow = {
  id: string;
  user_id: string;
  domain: string;
  selected_theme: string | null;
  theme_settings: any;
};

function normalizeHost(hostname: string) {
  let h = (hostname || "").trim().toLowerCase();
  h = h.replace(/\.$/, "");
  if (h.startsWith("www.")) h = h.slice(4);
  return h;
}

function getDomainFromUrl(): { domain: string; source: "query" | "host" } {
  const rawHost = window.location.hostname;
  const host = normalizeHost(rawHost);

  const params = new URLSearchParams(window.location.search);
  const q = params.get("domain") || params.get("store") || "";
  const queryDomain = normalizeHost(q);

  // Query param varsa onu kullan (özellikle vercel preview / demo ortamı için)
  if (queryDomain) return { domain: queryDomain, source: "query" };

  return { domain: host, source: "host" };
}

export function useStoreByDomain() {
  const DEBUG = import.meta.env.DEV || import.meta.env.VITE_DEBUG_STORE === "1";

  const [store, setStore] = useState<StoreRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const { domain, source } = getDomainFromUrl();

        if (DEBUG) {
          console.log("[STORE_RESOLVE] input", {
            hostname: window.location.hostname,
            search: window.location.search,
            domain,
            source,
          });
        }

        const { data, error } = await supabase
          .from("stores")
          .select("*")
          .eq("domain", domain)
          .maybeSingle();

        if (DEBUG) console.log("[STORE_RESOLVE] supabase result", { data, error });

        if (cancelled) return;

        if (error) {
          console.error("[STORE_RESOLVE] query error", error);
          setStore(null);
          setNotFound(true);
          return;
        }

        if (!data) {
          setStore(null);
          setNotFound(true);
          return;
        }

        setStore(data as StoreRow);
        setNotFound(false);
      } catch (e) {
        if (cancelled) return;
        console.error("[STORE_RESOLVE] fatal", e);
        setStore(null);
        setNotFound(true);
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return { store, loading, notFound };
}