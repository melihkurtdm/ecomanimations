
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import EmailCampaignManager from "@/components/marketing/EmailCampaignManager";
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
import VideoCreator from "./pages/VideoCreator";

// Create query client for React Query
const queryClient = new QueryClient();

// Hide Lovable badge
if (typeof document !== "undefined") {
  // Remove existing badge on load
  window.addEventListener("load", () => {
    setTimeout(() => {
      const lovableBadge = document.querySelector('.lovable-badge');
      if (lovableBadge) {
        lovableBadge.remove();
      }
      
      // Also look for badges with different class names
      const possibleBadges = document.querySelectorAll('[class*="lovable"]');
      possibleBadges.forEach(badge => {
        if (badge.tagName === 'A' || badge.tagName === 'DIV') {
          badge.remove();
        }
      });
    }, 1000);
  });
  
  // Create observer to continuously remove badge if it reappears
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            if (
              element.classList.contains('lovable-badge') || 
              (element.className && typeof element.className === 'string' && element.className.includes('lovable'))
            ) {
              element.remove();
            }
          }
        });
      }
    }
  });
  
  // Start observing the body for changes
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
}

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
                <Route path="/dashboard/video-creator" element={<VideoCreator />} />
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
