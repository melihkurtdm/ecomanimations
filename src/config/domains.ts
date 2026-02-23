// src/config/domains.ts

// Admin panel SADECE bu hostlarda açılsın.
export const ADMIN_HOSTS = new Set<string>([
  "localhost",
  "127.0.0.1",
  "admin.autodrop.co",
]);

// Storefront domain -> theme/store map
export const STOREFRONT_DOMAINS: Record<string, { store: string }> = {
  "www.autodrop.co": { store: "luxe-aura" },
  "autodrop.co": { store: "luxe-aura" },

  // (opsiyonel) vercel preview/prod fallback (istersen kalsın)
  "ecomanimations.vercel.app": { store: "luxe-aura" },
};