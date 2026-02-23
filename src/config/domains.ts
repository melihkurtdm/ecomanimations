// src/config/domains.ts

// Admin panel SADECE bu hostlarda açılsın.
// - localhost / 127.0.0.1: local admin geliştirme
// - admin.autodrop.co: prod admin domain
//
// NOT: vercel.app / autodrop.co / www.autodrop.co BURAYA GİRMEZ.
// Onlar storefront (tema) görmeli.

export const ADMIN_HOSTS = new Set<string>([
  "localhost",
  "127.0.0.1",
  "admin.autodrop.co",
]);