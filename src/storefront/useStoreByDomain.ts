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
  h = h.replace(/\.$/, "");          // sondaki nokta
  if (h.startsWith("www.")) h = h.slice(4);
  return h;
}

function isPlatformHost(host: string) {
  // buraya senin platform domainlerin
  return (
    host === "localhost" ||
    host.endsWith(".vercel.app") ||
    host.endsWith(".netlify.app")
  );
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
        const host = normalizeHost(rawHost);

        // 1) Normalde domain = host
        let domain = host;

        // 2) Ama platform host ise domain'i query/localStorage'dan al
        if (isPlatformHost(host)) {
          const params = new URLSearchParams(window.location.search);
          const qDomain = params.get("domain");
          const lsDomain = localStorage.getItem("active_store_domain");

          domain = normalizeHost(qDomain || lsDomain || "");

          // Eğer query ile geldiyse localStorage'a yaz (preview'da rahat)
          if (qDomain) localStorage.setItem("active_store_domain", domain);
        }

        if (DEBUG) console.log("[STORE_RESOLVE] host/domain", { rawHost, host, domain });

        if (!domain) {
          if (DEBUG) console.warn("[STORE_RESOLVE] domain is empty (platform host, missing ?domain=...)");
          setStore(null);
          setNotFound(true);
          return;
        }

        // tek sorgu
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