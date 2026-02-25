import React, { Suspense, lazy, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStoreByDomain } from "./useStoreByDomain";
import { useTheme } from "../contexts/ThemeContext";

// Tema map
const THEMES: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  "luxe-aura": lazy(() => import("../themes/luxe-aura/ThemeLayout")),
  elegant: lazy(() => import("../themes/elegant/ThemeLayout")),
  modern: lazy(() => import("../themes/modern/ThemeLayout")),
  minimalist: lazy(() => import("../themes/minimalist/ThemeLayout")),
  "temu-clone": lazy(() => import("../themes/temu-clone/ThemeLayout")),
};

// Alias map (eski id'ler için)
const THEME_KEY_ALIASES: Record<string, string> = {
  luxury: "luxe-aura",
};

export default function StorefrontHome() {
  const { store, loading, notFound } = useStoreByDomain();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!store?.selected_theme) return;
    setTheme(store.selected_theme);
  }, [store?.selected_theme, setTheme]);

  if (loading) return null;
  if (notFound) return <Navigate to="/store-not-found" replace />;

  // ❌ fallback kaldırıldı
  const rawKey = store?.selected_theme?.trim().toLowerCase();

  if (!rawKey) return null; // production güvenliği

  const key = THEME_KEY_ALIASES[rawKey] ?? rawKey;
  const ThemeLayout = THEMES[key];

  if (!ThemeLayout) return null; // geçersiz tema koruması

  return (
    <Suspense fallback={null}>
      <ThemeLayout />
    </Suspense>
  );
}
