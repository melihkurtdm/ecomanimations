# Ecomanimations (Working Title) — SaaS E-commerce Platform (TR)

## Vision
Türkiye’de ikas.com / ideasoft.com.tr seviyesinde, KOBİ ve bireysel satıcıların hızlıca mağaza açıp büyütebildiği, çok mağazalı (multi-tenant) SaaS e-ticaret altyapısı.

## Target Customers
- KOBİ’ler (tekil mağaza sahipleri, butik markalar)
- Bireysel e-ticaret satıcıları
- Ajanslar (çoklu müşteri mağazası yönetimi)

## Core Principles
- Multi-tenant by design (her istek bir "store" bağlamında çalışır)
- Güvenlik: tenant izolasyonu (RLS), audit log, rate limit
- Performans: edge cache, SSR/CSR dengesi, hızlı admin panel
- Modüler entegrasyon: ödeme, kargo, muhasebe, pazaryerleri
- Tema/Storefront ayrımı: admin + storefront templating

## Multi-tenant Model
### Entities
- stores: mağaza (tenant)
- store_domains: domain -> store mapping (custom domain + platform subdomain)
- users: kullanıcı
- store_members: kullanıcıların mağazadaki rolü (owner/admin/staff)
- products, categories, orders, customers, etc. (hepsi store_id taşır)

### Domain Mapping
- `store_domains.domain` unique
- `store_domains.store_id` -> stores.id
- `stores.default_domain` (platform subdomain)
- `stores.status` (active/suspended)

### Store Resolver
- Incoming request Host header veya window.location.host ile domain alınır.
- `store_domains` tablosundan store_id bulunur.
- Bulunamazsa: “not found / onboarding / domain bağla” akışı.

## Roadmap
### Sprint-1 — Multi-tenant foundation
- DB: stores + store_domains + store_members + RLS
- CurrentStore resolver (domain -> store) + caching
- Auth: user -> store membership doğrulaması
- Admin panelde “Store Settings / Domain Settings” ekranı temel

### Sprint-2 — Catalog foundation
- Products, Categories, Inventory (store_id)
- Media upload (S3/R2) + CDN
- Storefront “theme” bağlama: theme_id -> store

### Sprint-3 — Checkout foundation
- Cart + Checkout + Order lifecycle
- Ödeme: iyzico / PayTR adapter interface (stub)
- Kargo: Yurtiçi/Aras/MNG adapter interface (stub)
- Tax, invoice placeholders

### Sprint-4 — Growth & ecosystem
- Kampanya/kupon
- Pazaryeri entegrasyonları (Trendyol/Hepsiburada) (adapter)
- Email/SMS notifications
- Analytics + conversion tracking
- App marketplace / plugins