const host = window.location.hostname.toLowerCase().trim();
console.log("[STORE_RESOLVE ENTRY]", host);
import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { getHostNow, getHostNowRaw } from "../utils/host";
import { DOMAIN_DEFAULT as STOREFRONT_DEFAULT, DOMAIN_TO_STORE as STOREFRONT_DOMAINS } from "../config/domains";

type StoreRow = {
  id: string;
  user_id: string;
  domain: string;
  selected_theme: string | null;
  theme_settings: any;
};

export function useStoreByDomain() {
  const DEBUG = import.meta.env.DEV || import.meta.env.VITE_DEBUG_STORE === "1";

  const [store, setStore] = useState<StoreRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const host = window.location.hostname.trim().toLowerCase();
      const domain = host; // şimdilik normalize: host

      if (DEBUG) console.log("[STORE_RESOLVE] entry", { host, domain });

      try {
        setLoading(true);
        setNotFound(false);

        // ... burada vercel fallback / supabase query vs

      } catch (e) {
        if (cancelled) return;
        console.error("[STORE_RESOLVE] fatal", e);
        setNotFound(true);
        setStore(null);
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