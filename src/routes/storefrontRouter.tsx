// src/routes/storefrontRouter.tsx
import { createBrowserRouter } from "react-router-dom";
import StorefrontHome from "../storefront/StorefrontHome";
import StoreNotFound from "../storefront/StoreNotFound";
import StorefrontThemesPreview from "../storefront/StorefrontThemesPreview";

export const storefrontRouter = createBrowserRouter([
  { path: "/", element: <StorefrontHome /> },
  { path: "/themes-preview", element: <StorefrontThemesPreview /> },
  { path: "/store-not-found", element: <StoreNotFound /> },
]);