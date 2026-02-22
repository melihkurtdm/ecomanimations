import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStoreByDomain } from "./useStoreByDomain";
import { useTheme } from "../contexts/ThemeContext";

export default function StorefrontHome() {
  const { store, loading, notFound } = useStoreByDomain();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!store?.selected_theme) return;
    setTheme(store.selected_theme);
  }, [store?.selected_theme, setTheme]);

  if (loading) return null; // istersen spinner koy
  if (notFound) return <Navigate to="/store-not-found" replace />;

  // burada gerçek storefront UI gelecek
  return (
    <div style={{ padding: 24 }}>
      <h1>Storefront</h1>
      <p>Domain: {store?.domain}</p>
      <p>Theme: {store?.selected_theme}</p>
    </div>
  );
}