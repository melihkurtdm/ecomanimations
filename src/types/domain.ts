
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
  hasPublishedTheme?: boolean; // Added this field to fix the type error
  themePublishedAt?: string;
  activeTheme?: string;
  namecheapConnected?: boolean;
  dnsSettings?: {
    type: string;
    host: string;
    value: string;
    ttl?: number;
  };
}
