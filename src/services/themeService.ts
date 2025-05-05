
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
            activeTheme: updatedTheme.name
          };
        }
        return d;
      });
      
      localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
    }
    
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
      d.domain === domainName && d.status === 'verified'
    );
    
    if (!domainToPublish) {
      toast({
        title: "Uygun Domain Bulunamadı",
        description: "Bu domain bulunamadı veya henüz doğrulanmamış.",
        variant: "destructive"
      });
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
      
      localStorage.setItem(`themes_${userId}`, JSON.stringify([defaultTheme]));
      
      // Publish this theme to the domain
      return await publishThemeToDomain(userId, defaultTheme.id, domainName);
    }
    
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
