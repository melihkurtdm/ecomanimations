
import { ThemeItem } from '@/components/theme/ThemeCard';
import { CategoryItem } from '@/components/theme/ThemeCategories';
import { LayoutGrid, Star, LayoutList, Zap } from 'lucide-react';
import React from 'react';

export const themeData: ThemeItem[] = [
  {
    id: "modern",
    name: "Modern Mağaza",
    description: "Minimalist ve çağdaş bir tasarımla ürünlerinizi ön plana çıkarın.",
    imageSrc: "https://placehold.co/600x400/9B87F5/FFFFFF?text=Modern+Mağaza+Teması",
    features: ["Satış odaklı", "Hızlı yükleme", "Mobil uyumlu"],
    color: "#9B87F5",
    badge: "Popüler",
    category: "all"
  },
  {
    id: "luxury",
    name: "Lüks Butik",
    description: "Premium ürünler için zarif ve sofistike bir tasarım.",
    imageSrc: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Lüks+Butik+Teması",
    features: ["Özel animasyonlar", "Galeri vitrini", "VIP özellikleri"],
    color: "#3B82F6",
    badge: "Premium",
    category: "fashion"
  },
  {
    id: "popup",
    name: "Pop-up Mağaza",
    description: "Hızlı kampanyalar ve sınırlı süreli teklifler için ideal.",
    imageSrc: "https://placehold.co/600x400/A78BFA/FFFFFF?text=Pop-up+Mağaza+Teması",
    features: ["Geri sayım zamanlayıcısı", "Özel teklif blokları", "Sosyal medya entegrasyonu"],
    color: "#A78BFA",
    category: "promo"
  },
  {
    id: "catalog",
    name: "Büyük Katalog",
    description: "Binlerce ürün için optimize edilmiş geniş katalog tasarımı.",
    imageSrc: "https://placehold.co/600x400/60A5FA/FFFFFF?text=Büyük+Katalog+Teması",
    features: ["Gelişmiş filtreleme", "Hızlı arama", "Kategori organizasyonu"],
    color: "#60A5FA",
    badge: "Önerilen",
    category: "catalog"
  },
  {
    id: "fashion",
    name: "Moda Butiği",
    description: "Moda ürünleri için trend ve çekici tasarım.",
    imageSrc: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Moda+Butiği+Teması",
    features: ["Lookbook özelliği", "Beden kılavuzu", "Stil önerileri"],
    color: "#8B5CF6",
    category: "fashion"
  },
  {
    id: "minimal",
    name: "Minimalist",
    description: "Sade ve şık tasarımıyla ürünlerinizi ön plana çıkarın.",
    imageSrc: "https://placehold.co/600x400/F472B6/FFFFFF?text=Minimalist+Tema",
    features: ["Hızlı yükleme", "Basit navigasyon", "Sade tasarım"],
    color: "#F472B6",
    category: "all"
  },
  {
    id: "vintage",
    name: "Vintage Butik",
    description: "Nostaljik ve karakteristik bir tasarım.",
    imageSrc: "https://placehold.co/600x400/F59E0B/FFFFFF?text=Vintage+Butik+Teması",
    features: ["Retro efektler", "Özel fontlar", "Vintage görsel stilleri"],
    color: "#F59E0B",
    category: "fashion"
  }
];

export const categoryData: CategoryItem[] = [
  { id: "all", name: "Tüm Temalar", icon: <LayoutGrid className="h-4 w-4" /> },
  { id: "fashion", name: "Moda", icon: <Star className="h-4 w-4" /> },
  { id: "catalog", name: "Katalog", icon: <LayoutList className="h-4 w-4" /> },
  { id: "promo", name: "Promosyon", icon: <Zap className="h-4 w-4" /> }
];
