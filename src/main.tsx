
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
    
    // Check if data is null before trying to use it
    if (data === null) {
      setDefaultTheme();
      return;
    }
    
    // Check if data exists and has the expected structure
    if (typeof data === 'object' && 'theme' in data) {
      // Now we can safely access the theme property since we've verified its existence
      const theme = data.theme === "dark" ? "dark" : "light";
      
      // Set theme based on domain data
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    } else {
      // No valid domain data found, use default theme
      setDefaultTheme();
    }
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
