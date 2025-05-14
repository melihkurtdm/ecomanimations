
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './integrations/supabase/client';

// Create root and render app first so the ThemeProvider is available
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Check current domain and retrieve store configuration from Supabase
const currentDomain = window.location.hostname;

// Load theme settings from Supabase stores table
const fetchStoreData = async () => {
  try {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("domain", currentDomain)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching store data:", error);
      setDefaultTheme();
      return;
    }
    
    if (data) {
      // Set the theme ID from selected_theme
      const themeId = data.selected_theme || "default";
      document.body.setAttribute("data-theme", themeId);
      
      // Also set the light/dark mode from localStorage or default to light
      const darkMode = localStorage.getItem('theme') || 'light';
      document.documentElement.classList.add(darkMode);
    } else {
      // No store data found for this domain, fall back to default
      setDefaultTheme();
    }
  } catch (err) {
    console.error("Error in Supabase query:", err);
    setDefaultTheme();
  }
};

// Start the fetch process
fetchStoreData();

// Helper function to set default theme based on pathname
function setDefaultTheme() {
  const isLandingPage = window.location.pathname === '/';
  const theme = isLandingPage ? 'dark' : 'light';
  
  document.documentElement.classList.add(theme);
  localStorage.setItem('theme', theme);
  
  // Set default theme ID
  document.body.setAttribute("data-theme", "minimalist");
}
