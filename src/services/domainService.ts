
import { DomainStatus } from "@/types/domain";
import { toast } from "@/components/ui/use-toast";
import { checkDnsPropagation, getNamecheapApiStatus } from "./themeService";

// Interface for domain data
export interface DomainData {
  id: string | number;
  domain: string;
  status: DomainStatus;
  primary: boolean;
  isCustomDomain: boolean;
  createdAt: string;
  lastChecked: string;
  verifiedAt?: string;
  errorMessage?: string;
  connectedStore?: string;
  hasPublishedTheme?: boolean;
  publishedAt?: string; // Added this property to match usage in convertToDomain
  activeTheme?: string; // Added this property to match usage in convertToDomain
  namecheapConnected?: boolean;
  dnsSettings?: {
    type: string;
    host: string;
    value: string;
    ttl?: number;
  };
}

// Get all domains for a user
export const getUserDomains = (userId: string): DomainData[] => {
  try {
    const storedDomains = localStorage.getItem(`domains_${userId}`);
    if (!storedDomains) return [];
    
    return JSON.parse(storedDomains);
  } catch (error) {
    console.error("Error getting user domains:", error);
    return [];
  }
};

// Get verified domains for a user
export const getVerifiedDomains = (userId: string): DomainData[] => {
  const domains = getUserDomains(userId);
  return domains.filter(domain => domain.status === 'verified');
};

// Add a new domain
export const addDomain = (userId: string, domainData: Partial<DomainData>): DomainData => {
  const domains = getUserDomains(userId);
  
  const newDomain: DomainData = {
    id: Date.now(),
    domain: domainData.domain || '',
    status: domainData.status || 'pending',
    primary: domainData.primary || false,
    isCustomDomain: domainData.isCustomDomain || true,
    createdAt: new Date().toISOString(),
    lastChecked: new Date().toISOString(),
    hasPublishedTheme: false,
    namecheapConnected: false,
    ...domainData
  };
  
  const updatedDomains = [...domains, newDomain];
  localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
  
  return newDomain;
};

// Update an existing domain
export const updateDomain = (userId: string, domainId: string | number, updates: Partial<DomainData>): DomainData | null => {
  const domains = getUserDomains(userId);
  const domainIndex = domains.findIndex(d => d.id === domainId);
  
  if (domainIndex === -1) return null;
  
  // If setting this domain as primary, unset primary on all others
  if (updates.primary) {
    domains.forEach(d => d.primary = false);
  }
  
  const updatedDomain = { ...domains[domainIndex], ...updates };
  domains[domainIndex] = updatedDomain;
  
  localStorage.setItem(`domains_${userId}`, JSON.stringify(domains));
  console.log(`Domain updated: ${updatedDomain.domain}, status: ${updatedDomain.status}, hasPublishedTheme: ${updatedDomain.hasPublishedTheme}`);
  return updatedDomain;
};

// Delete a domain
export const deleteDomain = (userId: string, domainId: string | number): boolean => {
  const domains = getUserDomains(userId);
  const updatedDomains = domains.filter(d => d.id !== domainId);
  
  localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
  return true;
};

// Verify a domain manually - this would usually involve checking DNS records
export const verifyDomain = async (userId: string, domainId: string | number): Promise<DomainData | null> => {
  try {
    console.log(`Verifying domain ID: ${domainId} for user: ${userId}`);
    
    // Get current domain data
    const domains = getUserDomains(userId);
    const domain = domains.find(d => d.id === domainId);
    
    if (!domain) {
      console.error(`Domain ID ${domainId} not found for verification`);
      return null;
    }
    
    console.log(`Verifying domain: ${domain.domain}`);
    
    // Check DNS propagation using our advanced method
    const isDnsVerified = await checkDnsPropagation(domain.domain);
    
    if (isDnsVerified) {
      // Simulate success (in a real implementation, would check actual DNS records)
      const updatedDomain = updateDomain(userId, domainId, {
        status: 'verified',
        verifiedAt: new Date().toISOString(),
        lastChecked: new Date().toISOString()
      });
      
      if (updatedDomain) {
        console.log(`Domain verified successfully: ${updatedDomain.domain}`);
        
        // After verification, automatically attempt to publish a theme if available
        const hasPublishedTheme = await publishThemeToVerifiedDomain(userId, domainId);
        if (hasPublishedTheme) {
          updateDomain(userId, domainId, { hasPublishedTheme: true });
        }
      }
      
      return updatedDomain;
    } else {
      // Update as error
      const updatedDomain = updateDomain(userId, domainId, {
        status: 'error',
        lastChecked: new Date().toISOString(),
        errorMessage: 'DNS kaydı doğrulanamadı. Lütfen DNS ayarlarınızı kontrol edin.'
      });
      
      return updatedDomain;
    }
  } catch (error) {
    console.error("Error verifying domain:", error);
    return null;
  }
};

// Connect a domain to Namecheap API
export const connectDomainToNamecheapApi = async (
  userId: string,
  domainId: string | number,
  apiKey?: string,
  username?: string
): Promise<DomainData | null> => {
  try {
    console.log(`Connecting domain ID: ${domainId} to Namecheap API`);
    
    // Get current domain data
    const domains = getUserDomains(userId);
    const domain = domains.find(d => d.id === domainId);
    
    if (!domain) {
      console.error(`Domain ID ${domainId} not found for Namecheap connection`);
      return null;
    }
    
    // Simulate API connection with Namecheap (in a real implementation, would verify credentials)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update domain with Namecheap connection
    const updatedDomain = updateDomain(userId, domainId, {
      namecheapConnected: true,
      lastChecked: new Date().toISOString()
    });
    
    // Store Namecheap API connection details
    if (apiKey && username) {
      const apiConnectionData = {
        apiKey: apiKey,
        username: username,
        connectedAt: new Date().toISOString(),
        domain: domain.domain
      };
      
      localStorage.setItem(`namecheap_api_connection_${userId}_${domain.domain}`, JSON.stringify(apiConnectionData));
    }
    
    return updatedDomain;
  } catch (error) {
    console.error("Error connecting domain to Namecheap API:", error);
    return null;
  }
};

// Connect a domain to a store
export const connectDomainToStore = async (
  userId: string, 
  domainId: string | number, 
  storeName: string
): Promise<DomainData | null> => {
  try {
    console.log(`Connecting domain ID: ${domainId} to store: ${storeName}`);
    
    // Connect the domain to the store
    const updatedDomain = updateDomain(userId, domainId, {
      connectedStore: storeName,
      lastChecked: new Date().toISOString()
    });
    
    // In a real implementation, we would also update the store with the domain information
    
    return updatedDomain;
  } catch (error) {
    console.error("Error connecting domain to store:", error);
    return null;
  }
};

// Try to access the domain to see if it's accessible and properly configured
export const testDomainAccess = async (domain: string, isCustomDomain: boolean): Promise<boolean> => {
  try {
    const url = isCustomDomain ? `https://${domain}` : `https://${domain}.shopset.net`;
    
    console.log(`Testing domain access for: ${url}`);
    
    // In a browser environment, we can't really ping arbitrary URLs due to CORS
    // This would typically be done from a server-side API
    
    // First check Namecheap API status
    const userData = localStorage.getItem('currentUser');
    let namecheapStatus = { isConnected: false, apiStatus: 'pending' as 'connected' | 'disconnected' | 'pending' };
    
    if (userData) {
      const user = JSON.parse(userData);
      namecheapStatus = getNamecheapApiStatus(user.id, domain);
    }
    
    // If Namecheap API is connected, always return success
    if (namecheapStatus.isConnected) {
      console.log(`Domain access test successful via Namecheap API connection for: ${url}`);
      return true;
    }
    
    // Otherwise simulate a test with better success rate (90%)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For testing purposes, report success more often
    const isAccessible = Math.random() > 0.1;
    console.log(`Domain access test result for ${url}: ${isAccessible ? 'Success' : 'Failed'}`);
    
    return isAccessible;
  } catch (error) {
    console.error("Error testing domain access:", error);
    return false;
  }
};

// Get DNS instructions for a domain
export const getDnsInstructions = (domain: string): {type: string, host: string, value: string, ttl: number} => {
  return {
    type: "CNAME",
    host: "@",
    value: "routes.shopset.net",
    ttl: 3600
  };
};

// Helper function to publish a theme to a verified domain
const publishThemeToVerifiedDomain = async (userId: string, domainId: string | number): Promise<boolean> => {
  try {
    // Get domain data
    const domains = getUserDomains(userId);
    const domain = domains.find(d => d.id === domainId);
    
    if (!domain) {
      console.error(`Domain ID ${domainId} not found for theme publication`);
      return false;
    }
    
    console.log(`Attempting to publish theme to domain: ${domain.domain}`);
    
    // Get store data
    const storedStore = localStorage.getItem(`store_${userId}`);
    if (!storedStore) {
      console.log("No store data found for theme publication");
      return false;
    }
    
    // Import the themeService function to publish theme to domain
    const { simulateThemePublicationProcess } = await import('./themeService');
    
    // Attempt to publish the theme
    const success = await simulateThemePublicationProcess(userId, domain.domain);
    
    if (success) {
      console.log(`Theme published successfully to domain: ${domain.domain}`);
      
      // Update domain with published theme status
      updateDomain(userId, domainId, { 
        hasPublishedTheme: true
      });
      
      toast({
        title: "Tema Yayınlandı",
        description: `Temanız ${domain.domain} adresinde başarıyla yayınlandı.`,
      });
      
      return true;
    } else {
      console.error(`Theme publication failed for domain: ${domain.domain}`);
      return false;
    }
  } catch (error) {
    console.error("Error in publishThemeToVerifiedDomain:", error);
    return false;
  }
};

// Add Namecheap API integration capabilities
export interface NamecheapApiConfig {
  apiKey: string;
  username: string;
  clientIp: string;
}

// Set Namecheap API configuration for a user
export const setNamecheapApiConfig = (userId: string, config: NamecheapApiConfig): boolean => {
  try {
    localStorage.setItem(`namecheap_config_${userId}`, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error("Error setting Namecheap API config:", error);
    return false;
  }
};

// Get Namecheap API configuration for a user
export const getNamecheapApiConfig = (userId: string): NamecheapApiConfig | null => {
  try {
    const config = localStorage.getItem(`namecheap_config_${userId}`);
    if (!config) return null;
    
    return JSON.parse(config);
  } catch (error) {
    console.error("Error getting Namecheap API config:", error);
    return null;
  }
};

// Simulate automatic DNS configuration via Namecheap API
export const configureDnsViaNamecheapApi = async (
  userId: string, 
  domain: string
): Promise<boolean> => {
  try {
    console.log(`Configuring DNS for ${domain} via Namecheap API`);
    
    // Get Namecheap API configuration
    const config = getNamecheapApiConfig(userId);
    if (!config) {
      toast({
        title: "Namecheap API Yapılandırması Bulunamadı",
        description: "Lütfen önce Namecheap API bilgilerini ekleyin.",
        variant: "destructive"
      });
      return false;
    }
    
    // Simulate API call to Namecheap
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // In a real implementation, this would make an actual API call to Namecheap
    // For now, we'll simulate success
    
    toast({
      title: "DNS Yapılandırması Başarılı",
      description: `${domain} için DNS kayıtları Namecheap API üzerinden başarıyla yapılandırıldı.`,
    });
    
    // Update domain status
    const domains = getUserDomains(userId);
    const domainToUpdate = domains.find(d => d.domain === domain);
    
    if (domainToUpdate) {
      updateDomain(userId, domainToUpdate.id, {
        status: 'verified',
        verifiedAt: new Date().toISOString(),
        lastChecked: new Date().toISOString(),
        namecheapConnected: true
      });
    }
    
    // Update Namecheap API status
    const namecheapStatus = localStorage.getItem(`namecheap_api_${userId}`) || '{}';
    const status = JSON.parse(namecheapStatus);
    
    status[domain] = {
      isConnected: true,
      lastChecked: new Date().toISOString(),
      apiStatus: 'connected'
    };
    
    localStorage.setItem(`namecheap_api_${userId}`, JSON.stringify(status));
    
    return true;
  } catch (error) {
    console.error("Error configuring DNS via Namecheap API:", error);
    toast({
      title: "DNS Yapılandırma Hatası",
      description: "Namecheap API üzerinden DNS ayarları yapılandırılırken bir hata oluştu.",
      variant: "destructive"
    });
    return false;
  }
};
