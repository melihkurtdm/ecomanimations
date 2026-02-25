export const STOREFRONT_DOMAINS: Record<string, { store: string }> = {
  // local
  "localhost": { store: "luxe-aura" },
  "127.0.0.1": { store: "luxe-aura" },

  // custom domain: autodrop -> luxe-aura
  "autodrop.co": { store: "luxe-aura" },
  "www.autodrop.co": { store: "luxe-aura" },

  // vercel prod domain -> yix
  "ecomanimations.vercel.app": { store: "diamond-luxe" },
};

// wildcard / fallback
export const STOREFRONT_DEFAULT = { store: "diamond-luxe" } as const;