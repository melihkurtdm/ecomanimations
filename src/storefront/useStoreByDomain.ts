import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

type StoreRow = {
  id: string;
  user_id: string;
  domain: string;
  selected_theme: string | null;
  theme_settings: any;
};

function normalizeHost(rawHost: string) {
  // hostname zaten port içermez ama güvenli olsun:
  let h = (rawHost || "").trim().toLowerCase();

  // www. farkı en sık sorun
  if (h.startsWith("www.")) h = h.slice(4);

  return h;
}

function isVercelPreviewHost(host: string) {
  // kendi preview kuralın: ecomanimations*.vercel.app veya senin vercel preview pattern’in
  return (
    host === "ecomanimations.vercel.app" ||
    (host.startsWith("ecomanimations-") && host.endsWith(".vercel.app")) ||
    host.endsWith("-melihkurtdms-projects.vercel.app")
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
      const rawHost = window.location.hostname; // örn: www.autodrop.co
      const host = normalizeHost(rawHost);
      const isPreview = isVercelPreviewHost(host);

      if (DEBUG) console.log("[STORE_RESOLVE] host", { rawHost, host, isPreview });

      try {
        setLoading(true);
        setNotFound(false);

        // 1) Önce host ile dene
        let { data, error } = await supabase
          .from("stores")
          .select("*")
          .eq("domain", host)
          .maybeSingle();

        if (DEBUG) console.log("[STORE_RESOLVE] query#1 eq(domain, host)", { host, data, error });

        // 2) Bulamadıysa ve rawHost www. gibi farklıysa rawHost normalize edilmemiş haliyle de deneyebilirsin
        // (bazı DB kayıtlarında yanlışlıkla www ile kayıt olmuş olabilir)
        if (!data && !error && rawHost && rawHost.toLowerCase() !== host) {
          const rawLower = rawHost.trim().toLowerCase();
          const q2 = await supabase
            .from("stores")
            .select("*")
            .eq("domain", rawLower)
            .maybeSingle();

          data = q2.data ?? data;
          error = q2.error ?? error;

          if (DEBUG) console.log("[STORE_RESOLVE] query#2 eq(domain, rawLower)", { rawLower, data, error });
        }

        // 3) Preview ise: (istersen) default store’a düşür (senin istediğin davranış buysa)
        // Not: preview’da gerçek custom domain store kaydı olmayabilir.
        if (!data && !error && isPreview) {
          // Burayı kendi default mantığına göre ayarla:
          // Örn: preview’da her zaman belirli bir store id’sini çekmek
          const DEFAULT_STORE_ID = "YOUR_DEFAULT_STORE_ID"; // TODO: doldur
          const q3 = await supabase
            .from("stores")
            .select("*")
            .eq("id", DEFAULT_STORE_ID)
            .maybeSingle();

          data = q3.data ?? data;
          error = q3.error ?? error;

          if (DEBUG) console.log("[STORE_RESOLVE] query#3 preview default", { DEFAULT_STORE_ID, data, error });
        }

        if (cancelled) return;

        if (error || !data) {
          setStore(null);
          setNotFound(true);

          if (DEBUG) console.log("[STORE_RESOLVE] FINAL -> NOT_FOUND", {
            host,
            isPreview,
            hasData: !!data,
            error,
          });

          return;
        }

        setStore(data as StoreRow);
        setNotFound(false);

        if (DEBUG) console.log("[STORE_RESOLVE] FINAL -> OK", {
          host,
          storeId: data.id,
          domain: data.domain,
          selected_theme: data.selected_theme,
        });
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
