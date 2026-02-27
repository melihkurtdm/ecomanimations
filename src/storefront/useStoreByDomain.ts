import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

type StoreRow = {
  id: string;
  user_id: string;
  domain: string;
  selected_theme: string | null;
  theme_settings: any;
};

function normalizeHost(host: string) {
  const h = (host || "").trim().toLowerCase();
  // window.location.hostname port içermez ama yine de güvenli olsun:
  const noPort = h.split(":")[0];
  const noWww = noPort.startsWith("www.") ? noPort.slice(4) : noPort;
  return noWww;
}

export function useStoreByDomain() {
  const DEBUG = import.meta.env.DEV || import.meta.env.VITE_DEBUG_STORE === "1";

  const [store, setStore] = useState<StoreRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const rawHost = window.location.hostname; // ör: autodrop.co / ecomanimations.vercel.app
      const host = normalizeHost(rawHost);

      // domain normalde host ile aynı olmalı.
      // İstersen burada kendi domain mapping kuralını uygulayabilirsin.
      const domain = host;

      if (DEBUG) console.log("[STORE_RESOLVE] host/domain", { rawHost, host, domain });

      // (Opsiyonel) Vercel preview fallback: preview ortamında default store göster
      // Şimdilik kapalı bıraktım. Açmak istersen aşağıyı true yapıp mappedStore döndürürüz.
      const isVercelPreview =
        host.endsWith(".vercel.app") ||
        host.endsWith(".vercel.app."); // ekstrem edge-case

      if (DEBUG) console.log("[STORE_RESOLVE] vercelPreview?", { isVercelPreview });

      let finalData: StoreRow | null = null;
      let finalError: any = null;

      try {
        setLoading(true);
        setNotFound(false);

        const { data, error } = await supabase
          .from("stores")
          .select("*")
          .eq("domain", domain)
          .maybeSingle();

        finalData = (data as StoreRow) ?? null;
        finalError = error;

        if (DEBUG) console.log("[STORE_RESOLVE] supabase result", { domain, data, error });

        if (cancelled) return;

        if (error || !data) {
          // Buraya düşüyorsan 2 ihtimal:
          // 1) stores.domain içinde bu domain yok
          // 2) RLS/policy yüzünden SELECT dönmüyor
          setNotFound(true);
          setStore(null);
          return;
        }

        setStore(data as StoreRow);
      } catch (e) {
        if (cancelled) return;
        console.error("[STORE_RESOLVE] fatal", e);
        setNotFound(true);
        setStore(null);
      } finally {
        if (cancelled) return;

        if (DEBUG) {
          console.log("[STORE_RESOLVE] final", {
            domain,
            store: !!finalData,
            notFound: !finalData,
            error: finalError,
          });
        }

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

