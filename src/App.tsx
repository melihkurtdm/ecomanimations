
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
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
import DomainManagement from "./pages/DomainManagement";
import ThemePublish from "./pages/ThemePublish";
import AdvertisingManager from "./pages/AdvertisingManager";
import StoreAnalytics from "./pages/StoreAnalytics";
import AIContentGenerator from "./pages/AIContentGenerator";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/customers" element={<Customers />} />
                <Route path="/dashboard/store" element={<Store />} />
                <Route path="/dashboard/stats" element={<Stats />} />
                <Route path="/dashboard/analytics" element={<StoreAnalytics />} />
                <Route path="/dashboard/settings" element={<Settings />} />
                <Route path="/dashboard/domain-management" element={<DomainManagement />} />
                <Route path="/dashboard/store-setup" element={<StoreSetup />} />
                <Route path="/dashboard/theme-selection" element={<ThemeSelection />} />
                <Route path="/dashboard/theme-customization" element={<ThemeCustomization />} />
                <Route path="/dashboard/theme-publish" element={<ThemePublish />} />
                <Route path="/dashboard/advertising" element={<AdvertisingManager />} />
                <Route path="/dashboard/ai-content" element={<AIContentGenerator />} />
                <Route path="/purchase" element={<PurchasePage />} />
                <Route path="/dashboard/payment-success" element={<PaymentSuccess />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
