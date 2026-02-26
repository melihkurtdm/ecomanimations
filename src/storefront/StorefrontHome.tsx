// src/storefront/StorefrontHome.tsx

import React, { Suspense, lazy, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStoreByDomain } from "./useStoreByDomain";
import { useTheme } from "../contexts/ThemeContext";

// THEME registry (DİKKAT: path'ler StorefrontHome.tsx konumuna göre ../themes olmalı)
const THEMES: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  // ✅ diamond-luxe ThemeLayout'in GERÇEK yeri buysa:
  "diamond-luxe": lazy(() => import("../themes/diamond-luxe/src/ThemeLayout")),
  // Eğer senin projende ThemeLayout burada değilse, sadece bu satırdaki path'i düzelt.

  "luxe-aura": lazy(() => import("../themes/luxe-aura/ThemeLayout")),

  // sende varsa:
  elegant: lazy(() => import("../themes/elegant/ThemeLayout")),
  modern: lazy(() => import("../themes/modern/ThemeLayout")),
  minimalist: lazy(() => import("../themes/minimalist/ThemeLayout")),
  "temu-clone": lazy(() => import("../themes/temu-clone/ThemeLayout")),
};

// store_key -> theme_key alias (DB / domain mapping farklı isim kullanıyorsa buraya ekle)
const THEME_KEY_ALIASES: Record<string, string> = {
  // örnek: store_key econanimations ise ama gerçek tema klasörü diamond-luxe ise:
  econanimations: "diamond-luxe",

  // eski id’ler vs:
  luxury: "luxe-aura",
};

export default function StorefrontHome() {
  const { store, loading, notFound } = useStoreByDomain();
  const { setTheme } = useTheme();

  // debug log (istersen kaldır)
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("[StorefrontHome]", {
      host: typeof window !== "undefined" ? window.location.hostname : "ssr",
      loading,
      notFound,
      selected_theme: store?.selected_theme,
      domain: store?.domain,
    });
  }, [loading, notFound, store?.selected_theme, store?.domain]);

  // tema set
  useEffect(() => {
    if (!store?.selected_theme) return;
    setTheme(store.selected_theme);
  }, [store?.selected_theme, setTheme]);

  if (loading) {
    return <div className="p-6">Loading store…</div>;
  }

  if (notFound) {
    return <Navigate to="/store-not-found" replace />;
  }

  const rawKey = (store?.selected_theme ?? "").trim().toLowerCase();
  if (!rawKey) {
    return (
      <div className="p-6 text-red-500">
        Store selected_theme boş. (domain mapping / DB kaydı / API)
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
