
import { DomainStatus } from "@/types/domain";

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
    // Simulate the verification process with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success (in a real implementation, would check actual DNS records)
    return updateDomain(userId, domainId, {
      status: 'verified',
      verifiedAt: new Date().toISOString(),
      lastChecked: new Date().toISOString()
    });
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
    
    // In a browser environment, we can't really ping arbitrary URLs due to CORS
    // This would typically be done from a server-side API
    
    // Simulate a successful test
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For now, just return success
    return true;
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
