
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './integrations/supabase/client';
import type { DomainData } from './types/domain';

// Check current domain and set theme from Supabase
const currentDomain = window.location.hostname;

// Create root and render app first so the ThemeProvider is available
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// First try to get theme from stores table (new approach)
supabase
  .from("stores")
  .select("selected_theme")
  .eq("domain", currentDomain)
  .maybeSingle()
  .then(({ data, error }) => {
    if (error) {
      console.error("Error fetching store data:", error);
      
      // Fallback to domains table (previous approach)
      checkDomainsTable();
      return;
    }
    
    if (data?.selected_theme) {
      const themeId = data.selected_theme;
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
