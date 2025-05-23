import { ThemeItem } from '@/components/theme/ThemeCard';
import { CategoryItem } from '@/components/theme/ThemeCategories';
import { LayoutGrid, Star, LayoutList, Zap, ShoppingBag, Palette, Camera, Coffee } from 'lucide-react';
import React from 'react';

export const themeData: ThemeItem[] = [
  {
    id: "modern",
    name: "Modern Mağaza",
    description: "Minimalist ve çağdaş bir tasarımla ürünlerinizi ön plana çıkarın.",
    imageSrc: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Satış odaklı", "Hızlı yükleme", "Mobil uyumlu", "AI Ürün Önerileri"],
    color: "#8B5CF6",
    badge: "Popüler",
    category: "all",
    previewUrl: "https://modern-store-template.com",
    designStyle: "minimal",
    layout: "grid",
    customStyles: {
      cardBorderRadius: "0.5rem",
      buttonStyle: "font-medium",
      headerStyle: "bg-gradient-to-r from-purple-50 to-white"
    }
  },
  {
    id: "luxury",
    name: "Lüks Butik",
    description: "Premium ürünler için zarif ve sofistike bir tasarım.",
    imageSrc: "https://images.unsplash.com/photo-1541661538396-53ba2d051eed?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Özel animasyonlar", "Galeri vitrini", "VIP özellikleri", "3D Ürün Görüntüleme"],
    color: "#3B82F6",
    badge: "Premium",
    category: "fashion",
    previewUrl: "https://luxury-boutique-template.com",
    designStyle: "elegant",
    layout: "masonry",
    customStyles: {
      cardBorderRadius: "0.75rem",
      buttonStyle: "font-serif italic",
      headerStyle: "bg-gradient-to-r from-blue-50 to-white"
    }
  },
  {
    id: "popup",
    name: "Pop-up Mağaza",
    description: "Hızlı kampanyalar ve sınırlı süreli teklifler için ideal.",
    imageSrc: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Geri sayım zamanlayıcısı", "Özel teklif blokları", "Sosyal medya entegrasyonu", "Hızlı Satın Al"],
    color: "#A78BFA",
    category: "promo",
    previewUrl: "https://popup-store-template.com",
    designStyle: "dynamic",
    layout: "list",
    customStyles: {
      cardBorderRadius: "1rem",
      buttonStyle: "uppercase tracking-wider text-xs",
      headerStyle: "bg-gradient-to-r from-violet-50 to-white"
    }
  },
  {
    id: "catalog",
    name: "Büyük Katalog",
    description: "Binlerce ürün için optimize edilmiş geniş katalog tasarımı.",
    imageSrc: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Gelişmiş filtreleme", "Hızlı arama", "Kategori organizasyonu", "AI Destekli Arama"],
    color: "#60A5FA",
    badge: "Önerilen",
    category: "catalog",
    previewUrl: "https://large-catalog-template.com",
    designStyle: "organized",
    layout: "grid",
    customStyles: {
      cardBorderRadius: "0.25rem",
      buttonStyle: "font-medium",
      headerStyle: "bg-gradient-to-r from-sky-50 to-white"
    }
  },
  {
    id: "fashion",
    name: "Moda Butiği",
    description: "Moda ürünleri için trend ve çekici tasarım.",
    imageSrc: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Lookbook özelliği", "Beden kılavuzu", "Stil önerileri", "Sanal Deneme"],
    color: "#8B5CF6",
    category: "fashion",
    previewUrl: "https://fashion-boutique-template.com",
    designStyle: "trendy",
    layout: "lookbook",
    customStyles: {
      cardBorderRadius: "1.5rem",
      buttonStyle: "font-light tracking-wide",
      headerStyle: "bg-gradient-to-r from-purple-50 to-pink-50"
    }
  },
  {
    id: "minimal",
    name: "Minimalist",
    description: "Sade ve şık tasarımıyla ürünlerinizi ön plana çıkarın.",
    imageSrc: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Hızlı yükleme", "Basit navigasyon", "Sade tasarım", "Akıllı Ürün Kümeleme"],
    color: "#F472B6",
    category: "all",
    previewUrl: "https://minimal-store-template.com",
    designStyle: "clean",
    layout: "grid",
    customStyles: {
      cardBorderRadius: "0rem",
      buttonStyle: "uppercase text-xs tracking-widest",
      headerStyle: "border-b border-pink-100"
    }
  },
  {
    id: "vintage",
    name: "Vintage Butik",
    description: "Nostaljik ve karakteristik bir tasarım.",
    imageSrc: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Retro efektler", "Özel fontlar", "Vintage görsel stilleri", "Koleksiyon Hikayeleri"],
    color: "#F59E0B",
    category: "fashion",
    previewUrl: "https://vintage-boutique-template.com",
    designStyle: "classic",
    layout: "magazine",
    customStyles: {
      cardBorderRadius: "0.5rem 2rem 0.5rem 2rem",
      buttonStyle: "font-serif",
      headerStyle: "bg-amber-50"
    }
  },
  {
    id: "darkmode",
    name: "Dark Mode Mağaza",
    description: "Şık karanlık tema ile göz yormayan modern tasarım.",
    imageSrc: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Koyu tema", "OLED optimizasyonu", "Dinamik animasyonlar", "Neon aksan renkleri"],
    color: "#1F2937",
    category: "all",
    previewUrl: "https://dark-mode-template.com",
    designStyle: "modern",
    layout: "grid",
    customStyles: {
      cardBorderRadius: "0.75rem",
      buttonStyle: "bg-gray-900 text-white hover:bg-gray-800",
      headerStyle: "bg-gray-900 text-white"
    }
  },
  {
    id: "handmade",
    name: "El Yapımı Ürünler",
    description: "El yapımı ve özel ürünler için organik ve sıcak tasarım.",
    imageSrc: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Atölye hikayeleri", "Ürün süreci takibi", "Sipariş özelleştirme", "Ustalara özel sayfalar"],
    color: "#D97706",
    category: "catalog",
    previewUrl: "https://handmade-store-template.com",
    designStyle: "organic",
    layout: "masonry",
    customStyles: {
      cardBorderRadius: "0.25rem",
      buttonStyle: "border-2 border-amber-600",
      headerStyle: "border-b-2 border-amber-200"
    }
  },
  {
    id: "tech",
    name: "Teknoloji Mağazası",
    description: "Elektronik ve teknoloji ürünleri için modern ve teknik tasarım.",
    imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    features: ["Ürün karşılaştırma", "Teknik özellik tabloları", "Akıllı filtreler", "AR ile görüntüleme"],
    color: "#0EA5E9",
    category: "catalog",
    previewUrl: "https://tech-store-template.com",
    designStyle: "technical",
    layout: "grid",
    customStyles: {
      cardBorderRadius: "0.5rem",
      buttonStyle: "bg-gradient-to-r from-sky-500 to-blue-500 text-white",
      headerStyle: "bg-gradient-to-r from-sky-50 to-white"
    }
  },
  {
    id: "luxe-aura",
    name: "Luxe Aura",
    description: "Lüks ve premium bir mağaza deneyimi sunar.",
    imageSrc: "/images/themes/luxe-aura.png",
    features: ["Lüks tasarım", "Premium ürün sunumu", "Zengin animasyonlar", "Serif yazı tipi"],
    color: "#BFA16A",
    category: "fashion",
    previewUrl: "",
    designStyle: "luxury",
    layout: "grid",
    customStyles: {
      cardBorderRadius: "1rem",
      buttonStyle: "font-serif text-lg",
      headerStyle: "bg-gradient-to-r from-yellow-50 to-white"
    }
  },
  {
    id: "diamond-luxe",
    name: "Diamond Luxe",
    description: "Elit ve animasyonlu bir e-ticaret deneyimi sunar.",
    imageSrc: "/images/themes/diamond-luxe.png",
    features: ["Animasyonlu kartlar", "Zengin geçişler", "Premium görünüm", "Lüks tipografi"],
    color: "#D4AF37",
    badge: "Yeni",
    category: "fashion",
    previewUrl: "",
    designStyle: "elegant",
    layout: "grid",
    customStyles: {
      cardBorderRadius: "1rem",
      buttonStyle: "font-bold text-lg",
      headerStyle: "bg-gradient-to-r from-yellow-100 to-white"
    }
  },
  {
    id: "temu-clone",
    name: "Temu Clone",
    description: "Popüler Temu stilinde modern alışveriş deneyimi.",
    imageSrc: "/images/themes/temu-clone.png",
    features: ["Kampanya bannerları", "Grid ürün yerleşimi", "Hızlı satış butonları"],
    color: "#F97316",
    badge: "Yeni",
    category: "catalog",
    previewUrl: "",
    designStyle: "dynamic",
    layout: "grid",
    customStyles: {
      cardBorderRadius: "0.5rem",
      buttonStyle: "font-semibold tracking-wide",
      headerStyle: "bg-gradient-to-r from-orange-50 to-white"
    }
  }
];

export const categoryData: CategoryItem[] = [
  { id: "all", name: "Tüm Temalar", icon: <LayoutGrid className="h-4 w-4" /> },
  { id: "fashion", name: "Moda", icon: <ShoppingBag className="h-4 w-4" /> },
  { id: "catalog", name: "Katalog", icon: <LayoutList className="h-4 w-4" /> },
  { id: "promo", name: "Promosyon", icon: <Zap className="h-4 w-4" /> }
];

export const fashionProducts = [
  {
    id: "f1",
    name: "Premium Deri Ceket",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
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
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
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
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
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
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
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
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
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
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
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
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
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
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
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
