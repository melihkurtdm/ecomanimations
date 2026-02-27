import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

type StoreRow = {
  id: string;
  user_id: string;
  domain: string;
  selected_theme: string | null;
  theme_settings: any;
};

function normalizeHost(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\.$/, "") // sonda nokta varsa (nadiren) sil
    .replace(/^www\./, ""); // www. kırp
}

export function useStoreByDomain() {
  const debugFromQuery =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("debugStore");

  // Prod'da da log görmek için: ?debugStore=1
  const DEBUG =
    (import.meta as any).env?.DEV ||
    (import.meta as any).env?.VITE_DEBUG_STORE === "1" ||
    debugFromQuery;

  const [store, setStore] = useState<StoreRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const rawHost = window.location.hostname; // ör: www.autodrop.co
      const domain = normalizeHost(rawHost); // ör: autodrop.co

      if (DEBUG) console.log("[STORE_RESOLVE] entry", { rawHost, domain });

      try {
        setLoading(true);
        setNotFound(false);

        // 1) normalize edilmiş domain ile dene
        let { data, error } = await supabase
          .from("stores")
          .select("*")
          .eq("domain", domain)
          .maybeSingle();

        if (DEBUG) console.log("[STORE_RESOLVE] supabase(1)", { data, error });

        // 2) fallback: eğer bulunmadıysa, tersini dene (bazı projelerde DB'ye www ile kaydedilmiş olabiliyor)
        if (!error && !data) {
          const alt = rawHost.trim().toLowerCase();
          if (alt !== domain) {
            const res2 = await supabase
              .from("stores")
              .select("*")
              .eq("domain", alt)
              .maybeSingle();

            data = res2.data;
            error = res2.error;

            if (DEBUG) console.log("[STORE_RESOLVE] supabase(2)", {
              alt,
              data,
              error,
            });
          }
        }

        if (cancelled) return;

        if (error || !data) {
          if (DEBUG)
            console.log("[STORE_RESOLVE] final -> NOT_FOUND", {
              error,
              rawHost,
              domain,
            });
          setStore(null);
          setNotFound(true);
          return;
        }

        if (DEBUG)
          console.log("[STORE_RESOLVE] final -> OK", {
            storeId: data.id,
            dbDomain: data.domain,
            selected_theme: data.selected_theme,
          });

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
