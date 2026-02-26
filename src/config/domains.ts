export const STOREFRONT_DOMAINS: Record<string, { store: string }> = {
  // Local development
  "localhost": { store: "luxe-aura" },
  "127.0.0.1": { store: "luxe-aura" },

  // ===== AUTODROP CUSTOM DOMAIN =====
  "autodrop.co": { store: "luxe-aura" },
  "www.autodrop.co": { store: "luxe-aura" },

  // ===== ECONANIMATIONS VERCEL =====
  "econanimations.vercel.app": { store: "diamond-luxe" },
  "www.econanimations.vercel.app": { store: "diamond-luxe" },
};

export const STOREFRONT_DEFAULT = {
  store: "diamond-luxe",
} as const;