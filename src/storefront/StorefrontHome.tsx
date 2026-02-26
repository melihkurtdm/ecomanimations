import React, { Suspense, lazy, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStoreByDomain } from "./useStoreByDomain";
import { useTheme } from "../contexts/ThemeContext";
import BuildBadge from "../components/BuildBadge";

// Tema map
const THEMES: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "luxe-aura": lazy(() => import("../themes/luxe-aura/ThemeLayout")),
  elegant: lazy(() => import("../themes/elegant/ThemeLayout")),
  modern: lazy(() => import("../themes/modern/ThemeLayout")),
  minimalist: lazy(() => import("../themes/minimalist/ThemeLayout")),
  "temu-clone": lazy(() => import("../themes/temu-clone/ThemeLayout")),
};

// DB’den gelen theme key farklıysa normalize
const THEME_KEY_ALIASES: Record<string, string> = {
  luxury: "luxe-aura",
  econanimations: "modern",
};

export default function StorefrontHome() {
  const { store, loading, notFound } = useStoreByDomain();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!store?.selected_theme) return;
    const raw = String(store.selected_theme).trim().toLowerCase();
    const normalized = THEME_KEY_ALIASES[raw] ?? raw;
    setTheme(normalized);
  }, [store?.selected_theme, setTheme]);

  const hostNow = typeof window !== "undefined" ? window.location.hostname : "-";
  const selectedThemeRaw = store?.selected_theme ?? null;

  if (loading) {
    return (
      <>
        <div className="p-6">Loading store...</div>
        <BuildBadge host={hostNow} selectedTheme={selectedThemeRaw} />
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <Navigate to="/store-not-found" replace />
        <BuildBadge host={hostNow} selectedTheme={selectedThemeRaw} />
      </>
    );
  }

  const rawKey = String(store?.selected_theme ?? "").trim().toLowerCase();
  if (!rawKey) {
    return (
      <>
        <div className="p-6 text-red-500">
          Store selected_theme boş. (DB kaydı / domain mapping / API)
        </div>
        <BuildBadge host={hostNow} selectedTheme={selectedThemeRaw} />
      </>
    );
  }

  const key = THEME_KEY_ALIASES[rawKey] ?? rawKey;
  const ThemeLayout = THEMES[key];

  if (!ThemeLayout) {
    return (
      <>
        <div className="p-6 text-red-500">
          Theme bulunamadı: <b>{rawKey}</b> (alias sonrası: <b>{key}</b>)
        </div>
        <BuildBadge host={hostNow} selectedTheme={selectedThemeRaw} />
      </>
    );
  }

  return (
    <>
      <BuildBadge host={hostNow} selectedTheme={selectedThemeRaw} />
      <Suspense fallback={<div className="p-6">Loading theme...</div>}>
        <ThemeLayout />
      </Suspense>
    </>
  );
}
