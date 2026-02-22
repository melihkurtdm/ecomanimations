// src/routes/storefrontRouter.tsx
import { createBrowserRouter } from "react-router-dom";
import StorefrontHome from "../storefront/StorefrontHome";
import StoreNotFound from "../storefront/StoreNotFound";

export const storefrontRouter = createBrowserRouter([
  { path: "/", element: <StorefrontHome /> },
  { path: "/store-not-found", element: <StoreNotFound /> },
]);