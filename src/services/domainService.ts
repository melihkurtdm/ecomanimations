
import { DomainStatus } from "@/types/domain";
import { toast } from "@/components/ui/use-toast";

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
    
    // Simulate the verification process with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get current domain data
    const domains = getUserDomains(userId);
    const domain = domains.find(d => d.id === domainId);
    
    if (!domain) {
      console.error(`Domain ID ${domainId} not found for verification`);
      return null;
    }
    
    console.log(`Verifying domain: ${domain.domain}`);
    
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
  } catch (error) {
    console.error("Error verifying domain:", error);
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
    
    // Simulate a test with better success rate (90%)
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
    const { simulateThemePublicationProcess } = await import('../services/themeService');
    
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
