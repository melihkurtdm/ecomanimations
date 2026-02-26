import React, { Suspense, lazy, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStoreByDomain } from "./useStoreByDomain";
import { useTheme } from "../contexts/ThemeContext";

// ================= THEMES =================
const THEMES: Record<string, React.LazyExoticComponent<any>> = {
  "luxe-aura": lazy(() => import("../themes/luxe-aura/ThemeLayout")),
  "diamond-luxe": lazy(() => import("../themes/diamond-luxe/ThemeLayout")),
  elegant: lazy(() => import("../themes/elegant/ThemeLayout")),
  modern: lazy(() => import("../themes/modern/ThemeLayout")),
  minimalist: lazy(() => import("../themes/minimalist/ThemeLayout")),
  "temu-clone": lazy(() => import("../themes/temu-clone/ThemeLayout")),
};

// ================= ALIAS =================
const THEME_KEY_ALIASES: Record<string, string> = {
  luxury: "luxe-aura",
  diamond: "diamond-luxe",
};

// =================================================

export default function StorefrontHome() {
  const { store, loading, notFound } = useStoreByDomain();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (store?.selected_theme) {
      setTheme(store.selected_theme);
    }
  }, [store?.selected_theme, setTheme]);

  // ========= LOADING =========
  if (loading) {
    return <div className="p-6">Loading store...</div>;
  }

  // ========= NOT FOUND =========
  if (notFound) {
    return <Navigate to="/store-not-found" replace />;
  }

  const rawKey = store?.selected_theme?.trim()?.toLowerCase();

  if (!rawKey) {
    return (
      <div className="p-6 text-red-500">
        Store selected_theme boş. (Domain mapping / DB kontrol et)
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
