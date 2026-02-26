// src/config/domains.ts

export const DOMAIN_TO_STORE: Record<string, string> = {
  // local
  localhost: "luxe-aura",
  "127.0.0.1": "luxe-aura",

  // custom domain -> store key
  "autodrop.co": "luxe-aura",
  "www.autodrop.co": "luxe-aura",

  // vercel prod + www
  "econanimations.vercel.app": "econanimations",
  "www.econanimations.vercel.app": "econanimations",

  // gerekirse custom apex
  // "econanimations.app": "econanimations",
  // "www.econanimations.app": "econanimations",
};

// fallback
export const DOMAIN_DEFAULT = "econanimations";