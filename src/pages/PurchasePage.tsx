
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, ShoppingCart, CreditCard, Package } from 'lucide-react';

// Sabit paket verilerini tanımlayalım
const packageData = {
  "başlangıç": {
    name: "Başlangıç",
    price: "₺399",
    numericPrice: 399,
    period: "ay",
    description: "Küçük işletmeler ve yeni başlayanlar için ideal",
    features: [
      "Aylık 100 sipariş",
      "3 tema seçeneği",
      "Temel ürün yönetimi",
      "Mobil uyumlu mağaza",
      "7/24 e-posta desteği"
    ]
  },
  "profesyonel": {
    name: "Profesyonel",
    price: "₺999",
    numericPrice: 999,
    period: "ay",
    description: "Büyüyen işletmeler için tam kapsamlı çözüm",
    features: [
      "Sınırsız sipariş",
      "Tüm temalar",
      "Gelişmiş ürün yönetimi",
      "SEO optimizasyonu",
      "Çoklu dil desteği",
      "Özel domain",
      "7/24 öncelikli destek"
    ]
  },
  "kurumsal": {
    name: "Kurumsal",
    price: "₺2499",
    numericPrice: 2499,
    period: "ay",
    description: "Büyük ölçekli işletmeler ve markalar için",
    features: [
      "Sınırsız sipariş",
      "Tüm temalar + özel tema",
      "Gelişmiş API erişimi",
      "Özel entegrasyonlar",
      "Çoklu mağaza yönetimi",
      "Özel müşteri yöneticisi",
      "Öncelikli 7/24 telefon desteği"
    ]
  }
};

const PurchasePage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get('package') || 'başlangıç';
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit-card' | 'bank-transfer'>('credit-card');
  
  // Eğer paket verisi yoksa, varsayılan olarak başlangıç paketini kullan
  const selectedPackage = packageData[packageType as keyof typeof packageData] || packageData.başlangıç;
  
  React.useEffect(() => {
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
              <CardTitle>Seçilen Paket: {selectedPackage.name}</CardTitle>
              <CardDescription>{selectedPackage.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Fiyat:</span>
                  <span className="text-xl font-bold">{selectedPackage.price}/{selectedPackage.period}</span>
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
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedPaymentMethod === 'credit-card' ? 'border-brand-purple bg-brand-purple/5' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedPaymentMethod('credit-card')}
                  >
                    <CreditCard className={`h-6 w-6 mb-2 ${selectedPaymentMethod === 'credit-card' ? 'text-brand-purple' : 'text-gray-500'}`} />
                    <span className={selectedPaymentMethod === 'credit-card' ? 'font-medium text-brand-purple' : ''}>Kredi Kartı</span>
                  </div>
                  <div 
                    className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedPaymentMethod === 'bank-transfer' ? 'border-brand-purple bg-brand-purple/5' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedPaymentMethod('bank-transfer')}
                  >
                    <ShoppingCart className={`h-6 w-6 mb-2 ${selectedPaymentMethod === 'bank-transfer' ? 'text-brand-purple' : 'text-gray-500'}`} />
                    <span className={selectedPaymentMethod === 'bank-transfer' ? 'font-medium text-brand-purple' : ''}>Havale/EFT</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Paket ücreti:</span>
                    <span>{selectedPackage.price}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Toplam:</span>
                    <span>{selectedPackage.price}</span>
                  </div>
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
