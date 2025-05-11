
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './integrations/supabase/client';
import type { DomainData } from './types/domain';

// Check current domain and set theme from Supabase
const currentDomain = window.location.hostname;

// First try to get theme from stores table (new approach)
supabase
  .from("stores")
  .select("*")
  .eq("domain", currentDomain)
  .maybeSingle()
  .then(({ data, error }) => {
    if (error) {
      console.error("Error fetching store data:", error);
      
      // Fallback to domains table (previous approach)
      checkDomainsTable();
      return;
    }
    
    if (data) {
      const themeId = (data as any)?.selected_theme || "default";
      document.body.setAttribute("data-theme", themeId);
      
      // Also set the light/dark mode from localStorage or default to light
      const darkMode = localStorage.getItem('theme') || 'light';
      document.documentElement.classList.add(darkMode);
    } else {
      // No store data found for this domain, fallback to domains table
      checkDomainsTable();
    }
  });

// Helper function to check domains table (previous approach)
function checkDomainsTable() {
  supabase
    .from("domains" as any)
    .select("*")
    .eq("domain", currentDomain)
    .maybeSingle()
    .then(({ data, error }) => {
      if (error) {
        console.error("Error fetching domain data:", error);
        setDefaultTheme();
        return;
      }
      
      // Using optional chaining and type assertion to safely access theme
      // This completely bypasses the TypeScript null check error
      const theme = (data as any)?.theme === "dark" ? "dark" : "light";
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    });
}

// Helper function to set default theme based on pathname
function setDefaultTheme() {
  const isLandingPage = window.location.pathname === '/';
  const theme = isLandingPage ? 'dark' : 'light';
  
  document.documentElement.classList.add(theme);
  localStorage.setItem('theme', theme);
}

// Create root and render app
createRoot(document.getElementById("root")!).render(<App />);
