import { toast } from "@/components/ui/use-toast";

interface ThemeData {
  id: string | number;
  name: string;
  description?: string;
  isPublished: boolean;
  publishedAt?: string;
  publishedDomains?: string[];
  createdAt: string;
  updatedAt: string;
}

// Get theme data for a user
export const getUserThemes = (userId: string): ThemeData[] => {
  try {
    const storedThemes = localStorage.getItem(`themes_${userId}`);
    if (!storedThemes) return [];
    
    return JSON.parse(storedThemes);
  } catch (error) {
    console.error("Error getting user themes:", error);
    return [];
  }
};

// Get the active theme for a user
export const getActiveTheme = (userId: string): ThemeData | null => {
  const themes = getUserThemes(userId);
  return themes.find(theme => theme.isPublished) || null;
};

// Publish a theme to a domain
export const publishThemeToDomain = async (
  userId: string, 
  themeId: string | number, 
  domain: string
): Promise<boolean> => {
  try {
    console.log(`Publishing theme ${themeId} to domain ${domain} for user ${userId}`);
    
    // Get the themes and find the one we want to publish
    const themes = getUserThemes(userId);
    const themeIndex = themes.findIndex(t => t.id === themeId);
    
    if (themeIndex === -1) {
      console.error("Theme not found:", themeId);
      return false;
    }
    
    // Update the theme to be published
    const updatedTheme = { 
      ...themes[themeIndex],
      isPublished: true,
      publishedAt: new Date().toISOString(),
      publishedDomains: [...(themes[themeIndex].publishedDomains || []), domain]
    };
    
    // Update the theme in the array
    themes[themeIndex] = updatedTheme;
    
    // Save the updated themes
    localStorage.setItem(`themes_${userId}`, JSON.stringify(themes));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Load domains data to mark the domain as having a published theme
    const storedDomains = localStorage.getItem(`domains_${userId}`);
    if (storedDomains) {
      const domains = JSON.parse(storedDomains);
      
      const updatedDomains = domains.map((d: any) => {
        if (d.domain === domain) {
          return { 
            ...d, 
            hasPublishedTheme: true,
            themePublishedAt: new Date().toISOString(),
            activeTheme: updatedTheme.name,
            publishedThemeId: updatedTheme.id,
            publishedThemeName: updatedTheme.name,
            publishStatus: "active",
            lastPublishAttempt: new Date().toISOString()
          };
        }
        return d;
      });
      
      localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
      console.log(`Domain ${domain} updated with published theme status`);
    }
    
    // Also check if we need to update the Namecheap API status
    updateNamecheapApiStatus(userId, domain, true);
    
    return true;
  } catch (error) {
    console.error("Error publishing theme to domain:", error);
    return false;
  }
};

// Check if a theme is published to a domain
export const isThemePublishedToDomain = (userId: string, domain: string): boolean => {
  try {
    const storedDomains = localStorage.getItem(`domains_${userId}`);
    if (!storedDomains) return false;
    
    const domains = JSON.parse(storedDomains);
    const domainData = domains.find((d: any) => d.domain === domain);
    
    return domainData?.hasPublishedTheme || false;
  } catch (error) {
    console.error("Error checking if theme is published to domain:", error);
    return false;
  }
};

// Simulate theme publication process
export const simulateThemePublicationProcess = async (userId: string, domainName: string): Promise<boolean> => {
  try {
    console.log(`Starting theme publication process for domain ${domainName}`);
    
    // First check if we have a verified domain
    const storedDomains = localStorage.getItem(`domains_${userId}`);
    if (!storedDomains) {
      toast({
        title: "Domain Bulunamadı",
        description: "Bu kullanıcıya ait doğrulanmış domain bulunamadı.",
        variant: "destructive"
      });
      return false;
    }
    
    const domains = JSON.parse(storedDomains);
    const domainToPublish = domains.find((d: any) => 
      d.domain === domainName && d.status === 'verified' && d.verified_at && d.store_id
    );
    
    if (!domainToPublish) {
      if (!domains.find((d: any) => d.domain === domainName)) {
        toast({
          title: "Domain Bulunamadı",
          description: "Bu domain bulunamadı.",
          variant: "destructive"
        });
      } else if (!domains.find((d: any) => d.domain === domainName)?.verifiedAt) {
        toast({
          title: "Domain Doğrulanmamış",
          description: "Bu domain henüz doğrulanmamış. Lütfen önce domain doğrulama işlemini tamamlayın.",
          variant: "destructive"
        });
      } else if (!domains.find((d: any) => d.domain === domainName)?.store_id) {
        toast({
          title: "Domain Mağazaya Bağlı Değil",
          description: "Bu domain henüz bir mağazaya bağlanmamış. Lütfen önce domain'i mağazanıza bağlayın.",
          variant: "destructive"
        });
      }
      return false;
    }
    
    // Check if we have an active theme
    const activeTheme = getActiveTheme(userId);
    if (!activeTheme) {
      // Create a default theme since we don't have one
      const defaultTheme = {
        id: Date.now(),
        name: "Varsayılan Tema",
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const themes = getUserThemes(userId);
      const updatedThemes = [...themes, defaultTheme];
      localStorage.setItem(`themes_${userId}`, JSON.stringify(updatedThemes));
      console.log("Created default theme:", defaultTheme);
      
      // Publish this theme to the domain
      return await publishThemeToDomain(userId, defaultTheme.id, domainName);
    }
    
    // Check if we have a store
    const storedStore = localStorage.getItem(`store_${userId}`);
    if (!storedStore) {
      toast({
        title: "Mağaza Bulunamadı",
        description: "Tema yayınlamak için önce bir mağaza oluşturmanız gerekiyor.",
        variant: "destructive"
      });
      return false;
    }
    
    // Parse and update store data with the domain
    const storeData = JSON.parse(storedStore);
    if (domainToPublish.isCustomDomain) {
      storeData.customDomain = domainToPublish.domain;
    } else {
      storeData.domain = domainToPublish.domain;
    }
    
    // Save updated store data
    localStorage.setItem(`store_${userId}`, JSON.stringify(storeData));
    console.log("Updated store data with domain:", storeData);
    
    // Publish the active theme to the domain
    return await publishThemeToDomain(userId, activeTheme.id, domainName);
  } catch (error) {
    console.error("Error simulating theme publication process:", error);
    toast({
      title: "Tema Yayınlama Hatası",
      description: "Tema yayınlanırken bir hata oluştu.",
      variant: "destructive"
    });
    return false;
  }
};

// Get theme status for a domain
export const getThemeStatusForDomain = (userId: string, domainName: string): {
  hasPublishedTheme: boolean;
  publishedAt?: string;
  themeName?: string;
  themeId?: string | number;
  publishStatus?: string;
} => {
  try {
    const storedDomains = localStorage.getItem(`domains_${userId}`);
    if (!storedDomains) return { hasPublishedTheme: false };
    
    const domains = JSON.parse(storedDomains);
    const domain = domains.find((d: any) => d.domain === domainName);
    
    if (!domain) return { hasPublishedTheme: false };
    
    return {
      hasPublishedTheme: domain.hasPublishedTheme || false,
      publishedAt: domain.themePublishedAt,
      themeName: domain.activeTheme,
      themeId: domain.publishedThemeId,
      publishStatus: domain.publishStatus
    };
  } catch (error) {
    console.error("Error getting theme status for domain:", error);
    return { hasPublishedTheme: false };
  }
};

// Check DNS propagation with an advanced method
export const checkDnsPropagation = async (domain: string): Promise<boolean> => {
  console.log(`Checking DNS propagation for ${domain}`);
  
  try {
    // In a real implementation, this would make an API call to check DNS
    // For now, we'll simulate success with a higher probability (80%)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const isSuccessful = Math.random() > 0.2; // 80% success rate
    console.log(`DNS propagation check result for ${domain}: ${isSuccessful ? 'Success' : 'Failed'}`);
    
    // Update the Namecheap API status in localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      updateNamecheapApiStatus(user.id, domain, isSuccessful);
    }
    
    return isSuccessful;
  } catch (error) {
    console.error("Error checking DNS propagation:", error);
    return false;
  }
};

// Debug function to check all publications
export const debugThemePublications = (userId: string): void => {
  try {
    const domains = localStorage.getItem(`domains_${userId}`);
    const themes = localStorage.getItem(`themes_${userId}`);
    const store = localStorage.getItem(`store_${userId}`);
    
    console.log("=== DEBUG THEME PUBLICATIONS ===");
    console.log("DOMAINS:", domains ? JSON.parse(domains) : "No domains");
    console.log("THEMES:", themes ? JSON.parse(themes) : "No themes");
    console.log("STORE:", store ? JSON.parse(store) : "No store");
  } catch (error) {
    console.error("Error in debug function:", error);
  }
};

// Force publish a theme to a domain
export const forcePublishTheme = async (userId: string, domainName: string): Promise<boolean> => {
  try {
    console.log(`Force publishing theme to domain ${domainName}`);
    
    // Check if we have a verified domain
    const storedDomains = localStorage.getItem(`domains_${userId}`);
    if (!storedDomains) {
      toast({
        title: "Domain Bulunamadı",
        description: "Bu kullanıcıya ait domain bulunamadı.",
        variant: "destructive"
      });
      return false;
    }
    
    const domains = JSON.parse(storedDomains);
    const domainToPublish = domains.find((d: any) => d.domain === domainName);
    
    if (!domainToPublish) {
      toast({
        title: "Domain Bulunamadı",
        description: "Bu domain bulunamadı.",
        variant: "destructive"
      });
      return false;
    }
    
    // Force the domain to verified status
    domainToPublish.status = 'verified';
    domainToPublish.verifiedAt = new Date().toISOString();
    domainToPublish.lastChecked = new Date().toISOString();
    
    // Update the domain in the array
    const updatedDomains = domains.map((d: any) => 
      d.id === domainToPublish.id ? domainToPublish : d
    );
    
    // Save the updated domains
    localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
    
    // Now publish the theme
    return await simulateThemePublicationProcess(userId, domainName);
  } catch (error) {
    console.error("Error force publishing theme:", error);
    toast({
      title: "Tema Yayınlama Hatası",
      description: "Tema zorla yayınlanırken bir hata oluştu.",
      variant: "destructive"
    });
    return false;
  }
};

// Update Namecheap API status
const updateNamecheapApiStatus = (userId: string, domain: string, isConnected: boolean): void => {
  try {
    // Store the Namecheap API connection status
    const namecheapStatus = localStorage.getItem(`namecheap_api_${userId}`) || '{}';
    const status = JSON.parse(namecheapStatus);
    
    status[domain] = {
      isConnected,
      lastChecked: new Date().toISOString(),
      apiStatus: isConnected ? 'connected' : 'disconnected'
    };
    
    localStorage.setItem(`namecheap_api_${userId}`, JSON.stringify(status));
    console.log(`Updated Namecheap API status for ${domain}: ${isConnected ? 'connected' : 'disconnected'}`);
  } catch (error) {
    console.error("Error updating Namecheap API status:", error);
  }
};

// Get Namecheap API status for a domain
export const getNamecheapApiStatus = (userId: string, domain: string): {
  isConnected: boolean;
  lastChecked?: string;
  apiStatus: 'connected' | 'disconnected' | 'pending';
} => {
  try {
    const namecheapStatus = localStorage.getItem(`namecheap_api_${userId}`) || '{}';
    const status = JSON.parse(namecheapStatus);
    
    if (!status[domain]) {
      return {
        isConnected: false,
        apiStatus: 'pending'
      };
    }
    
    return status[domain];
  } catch (error) {
    console.error("Error getting Namecheap API status:", error);
    return {
      isConnected: false,
      apiStatus: 'disconnected'
    };
  }
};

// Added function to navigate programmatically
export const navigate = (path: string) => {
  window.location.href = path;
};
