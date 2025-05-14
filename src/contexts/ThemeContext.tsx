
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

type ThemeContextType = {
  theme: string;
  themeSettings: any;
  setTheme: (theme: string) => void;
  setThemeSettings: (settings: any) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("minimalist");
  const [themeSettings, setThemeSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme settings from Supabase when the component mounts
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        const currentDomain = window.location.hostname;
        
        const { data, error } = await supabase
          .from("stores")
          .select("*")
          .eq("domain", currentDomain)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching theme settings:", error);
          return;
        }
        
        if (data) {
          // Set the theme from selected_theme
          setTheme(data.selected_theme || "minimalist");
          
          // Set theme settings if available
          if (data.theme_settings) {
            setThemeSettings(data.theme_settings);
          }
        }
      } catch (error) {
        console.error("Failed to load theme settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadThemeSettings();
  }, []);

  // Update theme in Supabase when it changes
  const updateThemeInSupabase = async (newTheme: string) => {
    try {
      const currentDomain = window.location.hostname;
      
      const { error } = await supabase
        .from("stores")
        .update({ selected_theme: newTheme })
        .eq("domain", currentDomain);
      
      if (error) {
        console.error("Theme could not be updated:", error);
      } else {
        console.log("Theme successfully updated to:", newTheme);
      }
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  // Apply theme whenever it changes and update in Supabase
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    
    // Update theme in Supabase when it changes
    if (!isLoading) {
      updateThemeInSupabase(theme);
    }
  }, [theme, isLoading]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      themeSettings, 
      setTheme, 
      setThemeSettings 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
