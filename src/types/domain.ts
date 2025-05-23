export type DomainStatus = "verified" | "pending" | "error";

export interface Domain {
  id: number;
  domain: string;
  status: DomainStatus;
  primary: boolean;
  createdAt: string;
  lastChecked: string;
  // Added fields for more detailed tracking
  verifiedAt?: string;
  errorMessage?: string;
  isCustomDomain?: boolean; // Track if this is a custom domain vs a subdomain
  hasPublishedTheme?: boolean;
  themePublishedAt?: string;
  activeTheme?: string;
  namecheapConnected?: boolean;
  store_id?: string | number; // Link to the store this domain belongs to
  dnsSettings?: {
    type: string;
    host: string;
    value: string;
    ttl?: number;
  };
  // Tema ile ilgili detaylı bilgiler
  publishedThemeId?: string | number;
  publishedThemeName?: string;
  publishStatus?: "active" | "pending" | "failed";
  lastPublishAttempt?: string;
}

// Add interface for domain data from Supabase
export interface DomainData {
  id: string | number;
  domain: string;
  status: DomainStatus;
  theme?: "dark" | "light";
  primary: boolean;
  createdAt: string;
  lastChecked: string;
  verifiedAt?: string;
  errorMessage?: string;
  isCustomDomain?: boolean;
  hasPublishedTheme?: boolean;
  themePublishedAt?: string;
  activeTheme?: string;
  namecheapConnected?: boolean;
  store_id?: string | number; // Link to the store this domain belongs to
}

// Add interface for Vercel DNS records
export interface VercelDnsConfig {
  name?: string;
  aliases?: string[];
  cname?: string;
  aRecord?: string;
  aliasRecord?: boolean;
  configuredBy?: string;
  verified?: boolean;
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
  error?: {
    code: string;
    message: string;
  };
}
