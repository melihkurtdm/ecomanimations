// src/admin/RequireAuth.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;

      const ok = !!data.session;
      setAuthed(ok);
      setLoading(false);

      if (!ok) {
        nav("/auth", { replace: true, state: { from: loc.pathname } });
      }
    });

    return () => {
      mounted = false;
    };
  }, [nav, loc.pathname]);

  if (loading) return null;
  if (!authed) return null;
  return <>{children}</>;
}