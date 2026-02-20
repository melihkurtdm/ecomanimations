
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, _setTheme] = useState("minimalist");

  // Debug wrapper: kim setTheme çağırıyor görebileceğiz
  const setTheme = (nextTheme: string) => {
    console.log("THEME_PROVIDER_VERSION", "v1-test-2026-02-20");
    console.log("setTheme called with:", nextTheme);
    console.trace("setTheme call stack");
    _setTheme(nextTheme);
  };

  useEffect(() => {
    console.log("Theme applied to body:", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};

