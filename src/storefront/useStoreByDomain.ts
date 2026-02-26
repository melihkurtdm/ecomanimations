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
      const domain = getHostNow();

      if (DEBUG) {
        console.log("[STORE_RESOLVE] host:", host, "normalizedHost:", domain);
      }

      // Vercel preview: ecomanimations.vercel.app + ecomanimations-*.vercel.app + *-melihkurtdms-projects.vercel.app
      const isEcomanimationsVercel =
        host === "ecomanimations.vercel.app" ||
        (host.startsWith("ecomanimations-") && host.endsWith(".vercel.app")) ||
        host.endsWith("-melihkurtdms-projects.vercel.app");

      if (isEcomanimationsVercel) {
        const mappedStore: StoreRow = {
          id: `mapped-${host}`,
          user_id: "mapped",
          domain: host,
          selected_theme: "yix",
          theme_settings: null,
        };
        if (DEBUG) console.log("[STORE_RESOLVE] ecomanimations Vercel preview", { host, mappedStore });
        setStore(mappedStore);
        setLoading(false);
        setNotFound(false);
        return;
      }

      // 1) Önce explicit mapping
      const mapped = STOREFRONT_DOMAINS[host] ?? STOREFRONT_DOMAINS[domain];

      if (mapped) {
        const mappedStore: StoreRow = {
          id: `mapped-${domain}`,
          user_id: "mapped",
          domain,
          selected_theme: mapped.store,
          theme_settings: null,
        };

        if (DEBUG) {
          console.log("[STORE_RESOLVE] Using STOREFRONT_DOMAINS mapping:", {
            host,
            domain,
            mapped,
            store: mappedStore,
          });
        }

        setStore(mappedStore);
        setLoading(false);
        setNotFound(false);
        return;
      }

      // 2) Vercel fallback: her türlü *.vercel.app default store
      if (host.endsWith(".vercel.app")) {
        const mappedStore: StoreRow = {
          id: `mapped-${domain}`,
          user_id: "mapped",
          domain,
          selected_theme: STOREFRONT_DEFAULT.store,
          theme_settings: null,
        };

        if (DEBUG) console.log("[STORE_RESOLVE] vercel fallback triggered", { host, mappedStore });

        setStore(mappedStore);
        setLoading(false);
        setNotFound(false);
        return;
      }

      setLoading(true);
      setNotFound(false);

      try {
        if (DEBUG) {
          console.log("[STORE_RESOLVE] Querying Supabase for domain:", domain);
        }

        const { data, error } = await supabase
          .from("stores")
          .select("*")
          .eq("domain", domain)
          .maybeSingle();

        if (cancelled) return;

        if (error || !data) {
          if (DEBUG) {
            console.error("[STORE_RESOLVE] Not found or error:", { error, data, domain });
          }
          setNotFound(true);
          setStore(null);
          return;
        }

        if (DEBUG) {
          console.log("[STORE_RESOLVE] Resolved store from Supabase:", data);
        }

        setStore(data as StoreRow);
      } catch (e) {
        if (cancelled) return;
        console.error("STORE RESOLVE FATAL", e);
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