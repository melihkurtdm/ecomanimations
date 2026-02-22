import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { getHostNow } from "../utils/host";

type StoreRow = {
  id: string;
  user_id: string;
  domain: string;
  selected_theme: string | null;
  theme_settings: any;
};

export function useStoreByDomain() {
  const [store, setStore] = useState<StoreRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const domain = getHostNow();

      setLoading(true);
      setNotFound(false);

      try {
        const { data, error } = await supabase
          .from("stores")
          .select("*")
          .eq("domain", domain)
          .maybeSingle();

        if (cancelled) return;

        if (error || !data) {
          console.error("STORE RESOLVE ERROR", error);
          setNotFound(true);
          setStore(null);
          return;
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