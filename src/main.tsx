import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

import { getHostNow } from "./utils/host";
import { ADMIN_HOSTS } from "./config/domains";

import { adminRouter } from "./routes/adminRouter";
import { storefrontRouter } from "./routes/storefrontRouter";

const DEBUG = import.meta.env.DEV || import.meta.env.VITE_DEBUG_STORE === "1";

const host = getHostNow();
const isAdminHost = ADMIN_HOSTS.has(host);

if (DEBUG) {
  console.log("[ROUTER_RESOLVE]", { host, isAdminHost });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={isAdminHost ? adminRouter : storefrontRouter} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);