
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './integrations/supabase/client';
import type { DomainData } from './types/domain';

// Check current domain and set theme from Supabase
const currentDomain = window.location.hostname;

// Use any type to bypass TypeScript restriction since the domains table is not in the generated types
// We'll properly handle the response data with our own type
supabase
  .from("domains" as any)
  .select("*")
  .eq("domain", currentDomain)
  .maybeSingle()
  .then(({ data, error }) => {
    if (data && (data as DomainData).theme) {
      // Set theme based on domain data
      document.documentElement.classList.add((data as DomainData).theme === "dark" ? "dark" : "light");
      localStorage.setItem('theme', (data as DomainData).theme === "dark" ? "dark" : "light");
    } else {
      // Default theme setup for landing page or fallback
      const isLandingPage = window.location.pathname === '/';
      if (isLandingPage) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  });

// Create root and render app
createRoot(document.getElementById("root")!).render(<App />);
