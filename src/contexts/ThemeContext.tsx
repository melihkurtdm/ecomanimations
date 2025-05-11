
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
          .select("selected_theme, theme_settings")
          .eq("domain", currentDomain)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching theme settings:", error);
          return;
        }
        
        // If we have theme settings, use them
        if (data?.theme_settings) {
          setThemeSettings(data.theme_settings);
          // If the theme settings include a theme property, use it as the theme
          if (data.theme_settings && typeof data.theme_settings === 'object' && data.theme_settings.hasOwnProperty('id')) {
            setTheme(data.theme_settings.id);
          } else if (data.selected_theme) {
            setTheme(data.selected_theme);
          }
        } else if (data?.selected_theme) {
          setTheme(data.selected_theme);
        }
      } catch (error) {
        console.error("Failed to load theme settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadThemeSettings();
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeSettings, setTheme, setThemeSettings }}>
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
