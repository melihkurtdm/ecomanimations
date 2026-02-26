// src/config/domains.ts

export type StoreMapping = {
  store: string;
};

export const DOMAIN_TO_STORE: Record<string, StoreMapping> = {
  // local
  localhost: { store: "luxe-aura" },
  "127.0.0.1": { store: "luxe-aura" },

  // custom domain
  "autodrop.co": { store: "luxe-aura" },
  "www.autodrop.co": { store: "luxe-aura" },

  // vercel prod + www
  "ecomanimations.vercel.app": { store: "ecomanimations" },
  "www.ecomanimations.vercel.app": { store: "ecomanimations" },

  // gerekiyorsa custom apex
  // "ecomanimations.app": { store: "ecomanimations" },
  // "www.ecomanimations.app": { store: "ecomanimations" },
};

// fallback (domain eşleşmezse)
export const DOMAIN_DEFAULT: StoreMapping = { store: "ecomanimations" };