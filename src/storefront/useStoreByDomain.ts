import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

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
      const domain = host;

      if (DEBUG) console.log("[STORE_RESOLVE] host/domain", { host, domain });

      // Eğer preview ortamı için bir logic'in varsa burada hesapla:
      const isEcomanimationsVercel = false; // şimdilik false (senin preview kuralın varsa koy)
      if (DEBUG) console.log("[STORE_RESOLVE] vercelPreview?", { isPreview: isEcomanimationsVercel });

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

        if (DEBUG) console.log("[STORE_RESOLVE] supabase result", { data, error });

        if (cancelled) return;

        if (error || !data) {
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

        if (DEBUG)
          console.log("[STORE_RESOLVE] final", {
            store: !!finalData,
            notFound: !finalData,
            error: finalError,
          });

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
