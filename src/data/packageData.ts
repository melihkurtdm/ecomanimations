
export interface Package {
  name: string;
  price: string;
  numericPrice: number;
  period: string;
  description: string;
  features: string[];
  badge?: string;
  tag?: string;
  yearlyPrice?: string;
  originalYearlyPrice?: string;
}

export const packageData: Record<string, Package> = {
  "başlangıç": {
    name: "Start",
    price: "₺0",
    numericPrice: 0,
    period: "Ömür boyu",
    description: "E-Ticarete yeni başlayanlar için ideal",
    badge: "Ücretsiz",
    features: [
      "69.90 TL'den Başlayan Anlaşmalı Kargo Fiyatları",
      "%2.99 Sanal POS Oranı",
      "ikas Hızında E-Ticaret Sitesi",
      "Sınırsız Trafik ve Web Alanı",
      "Panelden Sipariş Oluşturma",
      "7/24 AI Chatbot Desteği",
      "Aylık 1000 E-Posta Gönderimi",
      "Social Login"
    ]
  },
  "profesyonel": {
    name: "Grow",
    price: "₺2.749",
    numericPrice: 2749,
    period: "ay",
    yearlyPrice: "₺32.988",
    originalYearlyPrice: "₺44.988",
    description: "E-Ticarette hızla büyüyün",
    tag: "En Popüler",
    features: [
      "69.90 TL'den Başlayan Anlaşmalı Kargo Fiyatları",
      "%0'dan Başlayan Sanal POS Oranı",
      "E-Ticaret ve Temel SEO Eğitimi",
      "Sınırsız Ürün Yükleme",
      "7/24 Canlı Telefon Desteği",
      "Kampanyalar",
      "Otomatik Sepet Hatırlatma Bildirimi",
      "Sınırsız Tekrar Stokta Bildirimi",
      "Ürün Yorum Hatırlatma Bildirimi",
      "Reklam ve Sosyal Medya Hesap Entegrasyon Desteği",
      "Dijital Ürün Satışı",
      "Blog"
    ]
  },
  "kurumsal": {
    name: "Scale",
    price: "₺4.099",
    numericPrice: 4099,
    period: "ay",
    yearlyPrice: "₺49.188",
    originalYearlyPrice: "₺69.948",
    description: "Tüm dünyaya satış yapın",
    features: [
      "Grow Paketindeki Tüm Özellikler",
      "Trendyol ve Hepsiburada Entegrasyonu",
      "Sınırsız E-İhracat",
      "Gelişmiş Sepet Hatırlatma Bildirimleri",
      "Cross-sell / Çapraz Satış",
      "Bundle / Paket Ürün",
      "Asorti Satış",
      "Bölge Bazlı Teslimat",
      "Saat Bazlı Kargo",
      "Ürün Yorumlarına Cevap Verme",
      "Ürün Yorumlarında Görsel"
    ]
  },
  "enterprise": {
    name: "Scale Plus",
    price: "₺7.024",
    numericPrice: 7024,
    period: "ay",
    yearlyPrice: "₺84.288",
    originalYearlyPrice: "₺149.976",
    tag: "Vade Farksız 12 Taksit",
    description: "E-Ticarette ihtiyacınız olan her şey",
    features: [
      "Scale Paketindeki Tüm Özellikler",
      "59.90 TL'den Başlayan Anlaşmalı Kargo Fiyatları",
      "Birebir Panel Eğitimi",
      "7/24 Öncelikli Destek Hattı",
      "Amazon Türkiye ve Etsy Entegrasyonu",
      "19 Yurt içi, 7 Yurt dışı Pazaryeri Entegrasyonu",
      "Whatsapp ile Sepet Hatırlatma",
      "ERP Entegrasyonları",
      "Konfigratör / Ürün Takımı",
      "Özelleştirilmiş Arama Sonuçları",
      "Eş Anlamlı Kelimeler",
      "Masterpass",
      "B2B / Toptan Satış",
      "Ücretsiz Mobil Uygulama"
    ]
  }
};
