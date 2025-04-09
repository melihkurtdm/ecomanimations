
import { ThemeItem } from '@/components/theme/ThemeCard';
import { CategoryItem } from '@/components/theme/ThemeCategories';
import { LayoutGrid, Star, LayoutList, Zap, ShoppingBag, Palette, Camera, Coffee } from 'lucide-react';
import React from 'react';

export const themeData: ThemeItem[] = [
  {
    id: "modern",
    name: "Modern Mağaza",
    description: "Minimalist ve çağdaş bir tasarımla ürünlerinizi ön plana çıkarın.",
    imageSrc: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Modern+Mağaza",
    features: ["Satış odaklı", "Hızlı yükleme", "Mobil uyumlu", "AI Ürün Önerileri"],
    color: "#8B5CF6",
    badge: "Popüler",
    category: "all",
    previewUrl: "https://modern-store-template.com",
    designStyle: "minimal"
  },
  {
    id: "luxury",
    name: "Lüks Butik",
    description: "Premium ürünler için zarif ve sofistike bir tasarım.",
    imageSrc: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Lüks+Butik",
    features: ["Özel animasyonlar", "Galeri vitrini", "VIP özellikleri", "3D Ürün Görüntüleme"],
    color: "#3B82F6",
    badge: "Premium",
    category: "fashion",
    previewUrl: "https://luxury-boutique-template.com",
    designStyle: "elegant"
  },
  {
    id: "popup",
    name: "Pop-up Mağaza",
    description: "Hızlı kampanyalar ve sınırlı süreli teklifler için ideal.",
    imageSrc: "https://placehold.co/600x400/A78BFA/FFFFFF?text=Pop-up+Mağaza",
    features: ["Geri sayım zamanlayıcısı", "Özel teklif blokları", "Sosyal medya entegrasyonu", "Hızlı Satın Al"],
    color: "#A78BFA",
    category: "promo",
    previewUrl: "https://popup-store-template.com",
    designStyle: "dynamic"
  },
  {
    id: "catalog",
    name: "Büyük Katalog",
    description: "Binlerce ürün için optimize edilmiş geniş katalog tasarımı.",
    imageSrc: "https://placehold.co/600x400/60A5FA/FFFFFF?text=Büyük+Katalog",
    features: ["Gelişmiş filtreleme", "Hızlı arama", "Kategori organizasyonu", "AI Destekli Arama"],
    color: "#60A5FA",
    badge: "Önerilen",
    category: "catalog",
    previewUrl: "https://large-catalog-template.com",
    designStyle: "organized"
  },
  {
    id: "fashion",
    name: "Moda Butiği",
    description: "Moda ürünleri için trend ve çekici tasarım.",
    imageSrc: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Moda+Butiği",
    features: ["Lookbook özelliği", "Beden kılavuzu", "Stil önerileri", "Sanal Deneme"],
    color: "#8B5CF6",
    category: "fashion",
    previewUrl: "https://fashion-boutique-template.com",
    designStyle: "trendy"
  },
  {
    id: "minimal",
    name: "Minimalist",
    description: "Sade ve şık tasarımıyla ürünlerinizi ön plana çıkarın.",
    imageSrc: "https://placehold.co/600x400/F472B6/FFFFFF?text=Minimalist",
    features: ["Hızlı yükleme", "Basit navigasyon", "Sade tasarım", "Akıllı Ürün Kümeleme"],
    color: "#F472B6",
    category: "all",
    previewUrl: "https://minimal-store-template.com",
    designStyle: "clean"
  },
  {
    id: "vintage",
    name: "Vintage Butik",
    description: "Nostaljik ve karakteristik bir tasarım.",
    imageSrc: "https://placehold.co/600x400/F59E0B/FFFFFF?text=Vintage+Butik",
    features: ["Retro efektler", "Özel fontlar", "Vintage görsel stilleri", "Koleksiyon Hikayeleri"],
    color: "#F59E0B",
    category: "fashion",
    previewUrl: "https://vintage-boutique-template.com",
    designStyle: "classic"
  },
  {
    id: "darkmode",
    name: "Dark Mode Mağaza",
    description: "Şık karanlık tema ile göz yormayan modern tasarım.",
    imageSrc: "https://placehold.co/600x400/1F2937/FFFFFF?text=Dark+Mode",
    features: ["Koyu tema", "OLED optimizasyonu", "Dinamik animasyonlar", "Neon aksan renkleri"],
    color: "#1F2937",
    category: "all",
    previewUrl: "https://dark-mode-template.com",
    designStyle: "modern"
  },
  {
    id: "handmade",
    name: "El Yapımı Ürünler",
    description: "El yapımı ve özel ürünler için organik ve sıcak tasarım.",
    imageSrc: "https://placehold.co/600x400/D97706/FFFFFF?text=El+Yapımı",
    features: ["Atölye hikayeleri", "Ürün süreci takibi", "Sipariş özelleştirme", "Ustalara özel sayfalar"],
    color: "#D97706",
    category: "catalog",
    previewUrl: "https://handmade-store-template.com",
    designStyle: "organic"
  },
  {
    id: "tech",
    name: "Teknoloji Mağazası",
    description: "Elektronik ve teknoloji ürünleri için modern ve teknik tasarım.",
    imageSrc: "https://placehold.co/600x400/0EA5E9/FFFFFF?text=Tech+Store",
    features: ["Ürün karşılaştırma", "Teknik özellik tabloları", "Akıllı filtreler", "AR ile görüntüleme"],
    color: "#0EA5E9",
    category: "catalog",
    previewUrl: "https://tech-store-template.com",
    designStyle: "technical"
  }
];

export const categoryData: CategoryItem[] = [
  { id: "all", name: "Tüm Temalar", icon: <LayoutGrid className="h-4 w-4" /> },
  { id: "fashion", name: "Moda", icon: <ShoppingBag className="h-4 w-4" /> },
  { id: "catalog", name: "Katalog", icon: <LayoutList className="h-4 w-4" /> },
  { id: "promo", name: "Promosyon", icon: <Zap className="h-4 w-4" /> }
];

// Sample fashion products for theme previews and demos
export const fashionProducts = [
  {
    id: "f1",
    name: "Premium Deri Ceket",
    price: 1299.99,
    image: "https://placehold.co/600x800/8B5CF6/FFFFFF?text=Deri+Ceket",
    category: "Dış Giyim",
    badge: "Yeni Sezon",
    rating: 4.8,
    reviews: 124,
    description: "Yüksek kaliteli gerçek deri ceket. Modern kesimi ve lüks dokusuyla her kombine uyum sağlar.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#654321", "#8B0000"],
    tags: ["premium", "deri", "ceket", "sonbahar"],
    stock: 15
  },
  {
    id: "f2",
    name: "İpek Gömlek",
    price: 599.99,
    image: "https://placehold.co/600x800/F472B6/FFFFFF?text=İpek+Gömlek",
    category: "Üst Giyim",
    rating: 4.5,
    reviews: 87,
    description: "100% gerçek ipekten üretilmiş, vücut hatlarınızı ön plana çıkaran zarif gömlek.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#FFFFFF", "#87CEEB", "#FFB6C1", "#000000"],
    tags: ["ipek", "gömlek", "zarif", "ofis"],
    stock: 28
  },
  {
    id: "f3",
    name: "Dar Kesim Kot Pantolon",
    price: 349.99,
    image: "https://placehold.co/600x800/0EA5E9/FFFFFF?text=Kot+Pantolon",
    category: "Alt Giyim",
    badge: "Çok Satan",
    rating: 4.7,
    reviews: 203,
    description: "Rahat ve esnek kumaşıyla gün boyu konfor sağlayan, modern dar kesim kot pantolon.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["#0000FF", "#000080", "#000000"],
    tags: ["kot", "jean", "pantolon", "günlük"],
    stock: 45
  },
  {
    id: "f4",
    name: "Ekose Blazer Ceket",
    price: 899.99,
    image: "https://placehold.co/600x800/8B5CF6/FFFFFF?text=Blazer+Ceket",
    category: "Dış Giyim",
    rating: 4.4,
    reviews: 56,
    description: "Klasik ekose deseni ile hem resmi hem günlük kullanıma uygun şık blazer ceket.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#808080", "#000000", "#8B4513"],
    tags: ["blazer", "ceket", "ekose", "ofis"],
    stock: 22
  },
  {
    id: "f5",
    name: "Bohem Tarz Elbise",
    price: 499.99,
    image: "https://placehold.co/600x800/F59E0B/FFFFFF?text=Bohem+Elbise",
    category: "Elbiseler",
    badge: "İndirimli",
    rating: 4.9,
    reviews: 112,
    description: "Özgür ruhlu tasarımı ve desenleriyle dikkat çeken, yaz ayları için ideal bohem tarz elbise.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#FFFFFF", "#FFD700", "#8B4513"],
    tags: ["elbise", "bohem", "yaz", "desenli"],
    stock: 17
  },
  {
    id: "f6",
    name: "Vintage Deri Çanta",
    price: 1499.99,
    image: "https://placehold.co/600x800/1F2937/FFFFFF?text=Deri+Çanta",
    category: "Aksesuar",
    rating: 4.6,
    reviews: 78,
    description: "El yapımı, dayanıklı gerçek deri ve vintage görünümlü aksesuarlarıyla öne çıkan çanta.",
    sizes: ["Standart"],
    colors: ["#8B4513", "#000000", "#654321"],
    tags: ["çanta", "deri", "vintage", "aksesuar"],
    stock: 12
  },
  {
    id: "f7",
    name: "Spor Sweatshirt",
    price: 299.99,
    image: "https://placehold.co/600x800/60A5FA/FFFFFF?text=Sweatshirt",
    category: "Spor Giyim",
    badge: "Organik",
    rating: 4.3,
    reviews: 94,
    description: "Organik pamuktan üretilmiş, günlük kullanım için rahat ve şık sweatshirt.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#808080", "#000000", "#FFFFFF", "#FF0000"],
    tags: ["sweatshirt", "spor", "rahat", "günlük"],
    stock: 36
  },
  {
    id: "f8",
    name: "Tasarım Bot",
    price: 1199.99,
    image: "https://placehold.co/600x800/D97706/FFFFFF?text=Tasarım+Bot",
    category: "Ayakkabı",
    rating: 4.7,
    reviews: 65,
    description: "Su geçirmez özelliği ve şık tasarımıyla her mevsim kullanılabilen dayanıklı bot.",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    colors: ["#000000", "#8B4513"],
    tags: ["bot", "ayakkabı", "su geçirmez", "dayanıklı"],
    stock: 19
  }
];

export const designStyles = [
  {
    id: "minimal",
    name: "Minimalist",
    description: "Sade ve işlevsel tasarım",
    color: "#F472B6",
    borderRadius: "0.25",
    fontFamily: "Inter",
    spacing: { section: "1.5", element: "0.8" }
  },
  {
    id: "elegant",
    name: "Zarif",
    description: "Premium ve sofistike görünüm",
    color: "#3B82F6",
    borderRadius: "0.5",
    fontFamily: "Playfair Display",
    spacing: { section: "2", element: "1" }
  },
  {
    id: "dynamic",
    name: "Dinamik",
    description: "Canlı ve enerjik tasarım",
    color: "#A78BFA", 
    borderRadius: "1",
    fontFamily: "Poppins",
    spacing: { section: "1.8", element: "1.2" }
  },
  {
    id: "trendy",
    name: "Modern",
    description: "Güncel ve trend tasarım",
    color: "#8B5CF6",
    borderRadius: "0.75",
    fontFamily: "Montserrat",
    spacing: { section: "2.2", element: "1.5" }
  },
  {
    id: "classic",
    name: "Klasik",
    description: "Zamansız ve nostaljik tasarım",
    color: "#F59E0B",
    borderRadius: "0.3",
    fontFamily: "Raleway",
    spacing: { section: "1.7", element: "0.9" }
  }
];
