
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import PurchasePage from "./pages/PurchasePage";
import PaymentSuccess from "./pages/PaymentSuccess";
import ThemeSelection from "./pages/ThemeSelection";
import ThemeCustomization from "./pages/ThemeCustomization";
import StoreSetup from "./pages/StoreSetup";
import Store from "./pages/Store";
import Stats from "./pages/Stats";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/store" element={<Store />} />
            <Route path="/dashboard/theme-customization" element={<ThemeCustomization />} />
            <Route path="/dashboard/stats" element={<Stats />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/dashboard/payment-success" element={<PaymentSuccess />} />
            <Route path="/dashboard/theme-selection" element={<ThemeSelection />} />
            <Route path="/dashboard/store-setup" element={<StoreSetup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
