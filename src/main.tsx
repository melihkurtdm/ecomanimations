
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './integrations/supabase/client';
import type { DomainData } from './types/domain';

// Check current domain and set theme from Supabase
const currentDomain = window.location.hostname;

supabase
  .from("domains")
  .select("*")
  .eq("domain", currentDomain)
  .maybeSingle()
  .then(({ data, error }) => {
    if (data && data.theme) {
      // Set theme based on domain data
      document.documentElement.classList.add(data.theme === "dark" ? "dark" : "light");
      localStorage.setItem('theme', data.theme === "dark" ? "dark" : "light");
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
