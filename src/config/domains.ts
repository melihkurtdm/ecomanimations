// Admin panel SADECE bu hostlarda açılsın.
export const ADMIN_HOSTS = new Set<string>([
  "localhost",
  "127.0.0.1",
  "admin.autodrop.co",
]);

export const STOREFRONT_DOMAINS: Record<string, { store: string }> = {
  "localhost": { store: "luxe-aura" },
  "127.0.0.1": { store: "luxe-aura" },

  "www.autodrop.co": { store: "luxe-aura" },
  "autodrop.co": { store: "luxe-aura" },
  "ecomanimations.vercel.app": { store: "luxe-aura" },
};

export const STOREFRONT_DEFAULT = { store: "luxe-aura" } as const;