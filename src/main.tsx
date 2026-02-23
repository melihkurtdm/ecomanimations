import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

import { getHostNow } from "./utils/host";
import { ADMIN_HOSTS } from "./config/domains";

import { adminRouter } from "./routes/adminRouter";
import { storefrontRouter } from "./routes/storefrontRouter";

const host = getHostNow();
const isAdminHost = ADMIN_HOSTS.has(host);

// İstersen debug için kalsın, istemezsen silebilirsin:
console.log("hostname", window.location.hostname, "host", host, "isAdminHost", isAdminHost);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={isAdminHost ? adminRouter : storefrontRouter} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);