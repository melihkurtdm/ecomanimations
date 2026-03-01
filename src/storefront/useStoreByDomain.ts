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

function getDomainOverrideFromQuery(): string | null {
  try {
    const q = new URLSearchParams(window.location.search);
    const d = q.get("domain");
    return d ? normalizeHost(d) : null;
  } catch {
    return null;
  }
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

        const rawHost = window.location.hostname;
        const override = getDomainOverrideFromQuery(); // ✅ ?domain=...
        const domain = override ?? normalizeHost(rawHost);

        if (DEBUG) {
          console.log("[STORE_RESOLVE] rawHost:", rawHost);
          console.log("[STORE_RESOLVE] override:", override);
          console.log("[STORE_RESOLVE] domain used:", domain);
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