import React, { Suspense, lazy, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStoreByDomain } from "./useStoreByDomain";
import { useTheme } from "../contexts/ThemeContext";

/* ================================
   🚨 BUILD DEBUG SIGNATURE
   Bunu her push'ta değiştir!
================================ */
const BUILD_ID = "2026-02-26T23:59-DEBUG-1";

/* ================================
   Theme map
================================ */
const THEMES: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "luxe-aura": lazy(() => import("../themes/luxe-aura/ThemeLayout")),
  elegant: lazy(() => import("../themes/elegant/ThemeLayout")),
  modern: lazy(() => import("../themes/modern/ThemeLayout")),
  minimalist: lazy(() => import("../themes/minimalist/ThemeLayout")),
  "temu-clone": lazy(() => import("../themes/temu-clone/ThemeLayout")),
};

const THEME_KEY_ALIASES: Record<string, string> = {
  luxury: "luxe-aura",
  econanimations: "modern",
};

export default function StorefrontHome() {
  const { store, loading, notFound } = useStoreByDomain();
  const { setTheme } = useTheme();

  useEffect(() => {
    console.log("🚀 BUILD_ID:", BUILD_ID);
    console.log("🌍 HOST:", window.location.hostname);
    console.log("🏪 STORE:", store);
  }, [store]);

  useEffect(() => {
    if (!store?.selected_theme) return;

    const raw = String(store.selected_theme).trim().toLowerCase();
    const normalized = THEME_KEY_ALIASES[raw] ?? raw;
    setTheme(normalized);
  }, [store?.selected_theme, setTheme]);

  if (loading) {
    return (
      <div className="p-6">
        Loading store...
        <DebugOverlay store={store} />
      </div>
    );
  }

  if (notFound) {
    return (
      <>
        <DebugOverlay store={store} />
        <Navigate to="/store-not-found" replace />
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
        <DebugOverlay store={store} />
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
        <DebugOverlay store={store} />
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<div className="p-6">Loading theme...</div>}>
        <ThemeLayout />
      </Suspense>

      <DebugOverlay store={store} />
    </>
  );
}

/* ================================
   🔎 DEBUG OVERLAY COMPONENT
================================ */
function DebugOverlay({ store }: { store: any }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        background: "black",
        color: "lime",
        padding: "10px 14px",
        fontSize: 12,
        zIndex: 99999,
        borderRadius: 6,
        opacity: 0.9,
        fontFamily: "monospace",
        maxWidth: 320,
      }}
    >
      <div><b>BUILD_ID:</b> {BUILD_ID}</div>
      <div><b>Host:</b> {window.location.hostname}</div>
      <div><b>Selected Theme:</b> {store?.selected_theme ?? "null"}</div>
    </div>
  );
}
