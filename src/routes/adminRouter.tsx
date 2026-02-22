// src/routes/adminRouter.tsx
import { createBrowserRouter } from "react-router-dom";

import AuthPage from "../pages/Auth";
import DashboardPage from "../pages/Dashboard";
import DomainManagement from "../pages/DomainManagement";
import ThemeCustomization from "../pages/ThemeCustomization";
import RequireAuth from "../admin/RequireAuth";

export const adminRouter = createBrowserRouter([
  { path: "/auth", element: <AuthPage /> },

  // dashboard sadece admin'de var + auth zorunlu
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <DashboardPage />
      </RequireAuth>
    ),
  },

  {
    path: "/dashboard/domain-management",
    element: (
      <RequireAuth>
        <DomainManagement />
      </RequireAuth>
    ),
  },

  {
    path: "/dashboard/theme-customization",
    element: (
      <RequireAuth>
        <ThemeCustomization />
      </RequireAuth>
    ),
  },

  // admin domainde root açılınca auth'a gitsin (istersen dashboard'a da yollayabilirsin)
  { path: "/", element: <AuthPage /> },
]);