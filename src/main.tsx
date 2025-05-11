
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './integrations/supabase/client';
import type { DomainData } from './types/domain';

// Check current domain and set theme from Supabase
const currentDomain = window.location.hostname;

// Since the domains table isn't in the generated types, we need to handle it carefully
// We'll query safely and check for data existence before using it
supabase
  .from("domains" as any)
  .select("*")
  .eq("domain", currentDomain)
  .maybeSingle()
  .then(({ data, error }) => {
    if (error) {
      console.error("Error fetching domain data:", error);
      // Set fallback theme on error
      setDefaultTheme();
      return;
    }
    
    // Using optional chaining and type assertion to safely access theme
    // This completely bypasses the TypeScript null check error
    const theme = (data as any)?.theme === "dark" ? "dark" : "light";
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  });

// Helper function to set default theme based on pathname
function setDefaultTheme() {
  const isLandingPage = window.location.pathname === '/';
  const theme = isLandingPage ? 'dark' : 'light';
  
  document.documentElement.classList.add(theme);
  localStorage.setItem('theme', theme);
}

// Create root and render app
createRoot(document.getElementById("root")!).render(<App />);
