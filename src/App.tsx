import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext"; // Added import
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
import DomainManagement from './pages/DomainManagement';
import ThemePublish from "./pages/ThemePublish";
import AdvertisingManager from "./pages/AdvertisingManager";
import StoreAnalytics from "./pages/StoreAnalytics";
import AIContentGenerator from "./pages/AIContentGenerator";
import VideoCreator from "./pages/VideoCreator";

// Create query client for React Query
const queryClient = new QueryClient();

// Hide Lovable badge and edit button
if (typeof document !== "undefined") {
  // Function to remove any Lovable-related elements
  const removeLovableBadges = () => {
    // Remove badges with 'lovable' in class name
    const possibleBadges = document.querySelectorAll('[class*="lovable"]');
    possibleBadges.forEach(badge => badge.remove());
    
    // Remove any element containing "Edit with Lovable" text
    document.querySelectorAll('*').forEach(el => {
      if (el.textContent && el.textContent.includes('Edit with Lovable')) {
        el.remove();
      }
    });

    // Remove any anchors that might be related
    document.querySelectorAll('a').forEach(link => {
      if (link.href && link.href.includes('lovable.app')) {
        link.remove();
      }
    });
  };

  // Run immediately
  setTimeout(removeLovableBadges, 100);
  setTimeout(removeLovableBadges, 500);
  setTimeout(removeLovableBadges, 1000);
  setTimeout(removeLovableBadges, 2000);
  setTimeout(removeLovableBadges, 5000);
  
  // Also run on page load
  window.addEventListener("load", () => {
    removeLovableBadges();
    setTimeout(removeLovableBadges, 100);
    setTimeout(removeLovableBadges, 500);
    setTimeout(removeLovableBadges, 1000);
  });
  
  // Create observer to continuously remove badge if it reappears
  const observer = new MutationObserver((mutations) => {
    let needsCleanup = false;
    
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        needsCleanup = true;
        break;
      }
    }
    
    if (needsCleanup) {
      removeLovableBadges();
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
          <ThemeProvider> {/* Added ThemeProvider */}
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Router>
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
              </Router>
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
