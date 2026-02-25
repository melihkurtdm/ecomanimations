import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

import { getHostNow } from "./utils/host";

import { storefrontRouter } from "./routes/storefrontRouter";

const DEBUG = import.meta.env.DEV || import.meta.env.VITE_DEBUG_STORE === "1";
const host = getHostNow();

if (DEBUG) {
  console.log("[ROUTER_RESOLVE]", { host });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={storefrontRouter} />  
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);