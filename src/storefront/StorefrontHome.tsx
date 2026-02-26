import React, { Suspense, lazy, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStoreByDomain } from "./useStoreByDomain";
import { useTheme } from "../contexts/ThemeContext";

// Tema map (SENDE VAR OLAN ThemeLayout dosyalarına göre)
const THEMES: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "luxe-aura": lazy(() => import("../themes/luxe-aura/ThemeLayout")),
  elegant: lazy(() => import("../themes/elegant/ThemeLayout")),
  modern: lazy(() => import("../themes/modern/ThemeLayout")),
  minimalist: lazy(() => import("../themes/minimalist/ThemeLayout")),
  "temu-clone": lazy(() => import("../themes/temu-clone/ThemeLayout")),
};

// DB’den gelen theme key farklıysa burada normalize ediyoruz
const THEME_KEY_ALIASES: Record<string, string> = {
  luxury: "luxe-aura",

  // ✅ senin isteğin: store key "econanimations" gelsin ama render edilecek gerçek tema "modern" olsun
  econanimations: "modern",
};

export default function StorefrontHome() {
  const { store, loading, notFound } = useStoreByDomain();
  const { setTheme } = useTheme();

  // ThemeContext’e set et
  useEffect(() => {
    if (!store?.selected_theme) return;

    const raw = String(store.selected_theme).trim().toLowerCase();
    const normalized = THEME_KEY_ALIASES[raw] ?? raw;
    setTheme(normalized);
  }, [store?.selected_theme, setTheme]);

  if (loading) {
    return <div className="p-6">Loading store...</div>;
  }

  if (notFound) {
    return <Navigate to="/store-not-found" replace />;
  }

  const rawKey = String(store?.selected_theme ?? "").trim().toLowerCase();
  if (!rawKey) {
    return (
      <div className="p-6 text-red-500">
        Store selected_theme boş. (DB kaydı / domain mapping / API)
      </div>
    );
  }

  const key = THEME_KEY_ALIASES[rawKey] ?? rawKey;
  const ThemeLayout = THEMES[key];

  if (!ThemeLayout) {
    return (
      <div className="p-6 text-red-500">
        Theme bulunamadı: <b>{rawKey}</b> (alias sonrası: <b>{key}</b>)
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="p-6">Loading theme...</div>}>
      <ThemeLayout />
    </Suspense>
  );
}
