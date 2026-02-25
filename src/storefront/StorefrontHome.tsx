import React, { Suspense, lazy, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStoreByDomain } from "./useStoreByDomain";
import { useTheme } from "../contexts/ThemeContext";

// Tema map
const THEMES: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "luxe-aura": lazy(() => import("../themes/luxe-aura/ThemeLayout")),
  elegant: lazy(() => import("../themes/elegant/ThemeLayout")),
  modern: lazy(() => import("../themes/modern/ThemeLayout")),
  minimalist: lazy(() => import("../themes/minimalist/ThemeLayout")),
  "temu-clone": lazy(() => import("../themes/temu-clone/ThemeLayout")),
};

// Alias map (eski id’ler için)
const THEME_KEY_ALIASES: Record<string, string> = {
  luxury: "luxe-aura",
};

export default function StorefrontHome() {
  const { store, loading, notFound } = useStoreByDomain();
  const { setTheme } = useTheme();

  // Debug (prod’da bile en azından console’da görünsün)
  useEffect(() => {
    console.log("[StorefrontHome] host:", typeof window !== "undefined" ? window.location.hostname : "ssr");
    console.log("[StorefrontHome] loading:", loading, "notFound:", notFound, "selected_theme:", store?.selected_theme);
  }, [loading, notFound, store?.selected_theme]);

  // Tema set (ThemeContext)
  useEffect(() => {
    if (!store?.selected_theme) return;
    setTheme(store.selected_theme);
  }, [store?.selected_theme, setTheme]);

  // ✅ Hızlı iyileştirme: "null" dönme, ekranda teşhis göster
  if (loading) {
    return <div className="p-6">Loading store…</div>;
  }

  if (notFound) {
    return <Navigate to="/store-not-found" replace />;
  }

  const rawKey = store?.selected_theme?.trim()?.toLowerCase();

  if (!rawKey) {
    return (
      <div className="p-6 text-red-500">
        Store selected_theme boş. (Domain mapping / store kaydı / API yanıtını kontrol et)
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
    <Suspense fallback={<div className="p-6">Loading theme…</div>}>
      <ThemeLayout />
    </Suspense>
  );
}
