import { createBrowserRouter } from "react-router-dom";

import StorefrontHome from "../storefront/StorefrontHome";
import StorefrontThemesPreview from "../storefront/StorefrontThemesPreview";
import StoreNotFound from "../storefront/StoreNotFound";

// hostname (port içermez) – SSR safe
const host = typeof window !== "undefined" ? window.location.hostname : "";

/**
 * econanimations domaininde ana sayfa themes preview olsun
 * ayrıca tüm vercel preview deploy'larda da aktif olsun
 */
const isEconAnimations =
  host === "econanimations.vercel.app" ||
  host === "www.econanimations.vercel.app" ||
  // custom domain açınca kullanırsın:
  // host === "econanimations.app" ||
  // host === "www.econanimations.app" ||
  // tüm vercel preview deploy'lar:
  host.endsWith(".vercel.app");

export const storefrontRouter = createBrowserRouter([
  {
    path: "/",
    element: isEconAnimations ? <StorefrontThemesPreview /> : <StorefrontHome />,
  },

  // ✅ Alias: /preview artık çalışır
  {
    path: "/preview",
    element: <StorefrontThemesPreview />,
  },

  // mevcut path'in kalsın
  {
    path: "/themes-preview",
    element: <StorefrontThemesPreview />,
  },

  {
    path: "/store-not-found",
    element: <StoreNotFound />,
  },

  // ✅ bilinmeyen her şeyi 404'e at (React Router "Unexpected 404" yerine düzgün davranır)
  {
    path: "*",
    element: <StoreNotFound />,
  },
]);