
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, ShoppingCart, CreditCard, Package, Building, Wallet, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define the types for package data
interface BasePackage {
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

// Sabit paket verilerini tanımlayalım
const packageData: Record<string, BasePackage> = {
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

const PurchasePage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get('package') || 'başlangıç';
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit-card' | 'bank-transfer' | 'crypto'>('credit-card');
  const [isYearly, setIsYearly] = useState(false);
  
  // Eğer paket verisi yoksa, varsayılan olarak başlangıç paketini kullan
  const selectedPackage = packageData[packageType as keyof typeof packageData] || packageData.başlangıç;
  
  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Oturum açmanız gerekiyor",
        description: "Paket satın almak için lütfen giriş yapın.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handlePayment = () => {
    // Şimdilik sadece simüle edilen bir ödeme
    toast({
      title: "Ödeme işlemi başlatılıyor",
      description: "Ödeme sayfasına yönlendiriliyorsunuz...",
    });
    
    // Gerçek uygulamada burada ödeme sağlayıcısına yönlendirme yapılacak
    // Şimdilik simüle için timeout
    setTimeout(() => {
      navigate('/dashboard/payment-success?package=' + packageType);
    }, 1500);
  };

  const getDisplayPrice = () => {
    if (selectedPackage.numericPrice === 0) return selectedPackage.price;
    
    if (isYearly && selectedPackage.yearlyPrice) {
      return selectedPackage.yearlyPrice;
    }
    
    return selectedPackage.price;
  };

  const getOriginalPrice = () => {
    if (isYearly && selectedPackage.originalYearlyPrice) {
      return selectedPackage.originalYearlyPrice;
    }
    return null;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Paketi Satın Al</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Seçilen Paket: {selectedPackage.name}</CardTitle>
                  <CardDescription>{selectedPackage.description}</CardDescription>
                </div>
                {selectedPackage.tag && (
                  <Badge className="bg-brand-purple text-white">{selectedPackage.tag}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedPackage.numericPrice > 0 && (
                  <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 p-1 rounded-full inline-flex items-center">
                      <button
                        onClick={() => setIsYearly(false)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                          !isYearly ? 'bg-white shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        Aylık
                      </button>
                      <button
                        onClick={() => setIsYearly(true)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                          isYearly ? 'bg-white shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        Yıllık
                        {isYearly && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">%25 İndirim</Badge>
                        )}
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Fiyat:</span>
                  <div className="text-right">
                    <span className="text-xl font-bold">{getDisplayPrice()}</span>
                    {selectedPackage.numericPrice > 0 && (
                      <span className="text-gray-600 text-sm ml-1">/{isYearly ? 'yıl' : selectedPackage.period}</span>
                    )}
                    {getOriginalPrice() && (
                      <div className="text-gray-500 text-sm line-through">{getOriginalPrice()}</div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Paket İçeriği:</h3>
                  <ul className="space-y-2">
                    {selectedPackage.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ödeme Bilgileri</CardTitle>
              <CardDescription>Güvenli ödeme işlemi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedPaymentMethod === 'credit-card' ? 'border-brand-purple bg-brand-purple/5' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedPaymentMethod('credit-card')}
                  >
                    <CreditCard className={`h-6 w-6 mb-2 ${selectedPaymentMethod === 'credit-card' ? 'text-brand-purple' : 'text-gray-500'}`} />
                    <span className={`text-sm ${selectedPaymentMethod === 'credit-card' ? 'font-medium text-brand-purple' : ''}`}>Kredi Kartı</span>
                  </div>
                  <div 
                    className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedPaymentMethod === 'bank-transfer' ? 'border-brand-purple bg-brand-purple/5' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedPaymentMethod('bank-transfer')}
                  >
                    <Building className={`h-6 w-6 mb-2 ${selectedPaymentMethod === 'bank-transfer' ? 'text-brand-purple' : 'text-gray-500'}`} />
                    <span className={`text-sm ${selectedPaymentMethod === 'bank-transfer' ? 'font-medium text-brand-purple' : ''}`}>Havale/EFT</span>
                  </div>
                  <div 
                    className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedPaymentMethod === 'crypto' ? 'border-brand-purple bg-brand-purple/5' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedPaymentMethod('crypto')}
                  >
                    <Wallet className={`h-6 w-6 mb-2 ${selectedPaymentMethod === 'crypto' ? 'text-brand-purple' : 'text-gray-500'}`} />
                    <span className={`text-sm ${selectedPaymentMethod === 'crypto' ? 'font-medium text-brand-purple' : ''}`}>Kripto</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Paket ücreti:</span>
                    <span>{getDisplayPrice()}</span>
                  </div>
                  {selectedPaymentMethod === 'credit-card' && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <span>Taksit İmkanı:</span>
                      <span>12 taksit</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Toplam:</span>
                    <span>{getDisplayPrice()}</span>
                  </div>
                </div>
                
                <div className="flex items-center mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Tüm ödeme işlemleri 256-bit SSL ile şifrelenerek korunmaktadır.</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePayment}
              >
                <Package className="mr-2 h-5 w-5" />
                Paketi Satın Al
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
