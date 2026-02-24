// src/storefront/StorefrontHome.tsx
import React, { Suspense, lazy, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useStoreByDomain } from "./useStoreByDomain";
import { useTheme } from "../contexts/ThemeContext";

// Theme map (ThemeLayout.tsx dosyası olan temalar)
const THEMES: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "luxe-aura": lazy(() => import("../themes/luxe-aura/ThemeLayout")),
  elegant: lazy(() => import("../themes/elegant/ThemeLayout")),
  modern: lazy(() => import("../themes/modern/ThemeLayout")),
  minimalist: lazy(() => import("../themes/minimalist/ThemeLayout")),
  "temu-clone": lazy(() => import("../themes/temu-clone/ThemeLayout")),
};

// Eski/uyumsuz id'leri gerçek tema key'lerine map et
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

  const rawKey = (store?.selected_theme ?? "luxe-aura").trim().toLowerCase();
  const key = THEME_KEY_ALIASES[rawKey] ?? rawKey;
  const ThemeLayout = THEMES[key] || THEMES["luxe-aura"];

  return (
    <Suspense fallback={null}>
      <ThemeLayout />
    </Suspense>
  );
}
