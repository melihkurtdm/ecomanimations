import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { PackageCard } from '@/components/purchase/PackageCard';
import { PaymentCard } from '@/components/purchase/PaymentCard';
import { packageData } from '@/data/packageData';
import { Badge } from '@/components/ui/badge';

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

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Paketi Satın Al</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PackageCard 
            packageData={selectedPackage} 
            isYearly={isYearly} 
          />
          <div className="mt-4 flex justify-center">
            {selectedPackage.numericPrice > 0 && (
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
            )}
          </div>
        </div>
        
        <div>
          <PaymentCard 
            displayPrice={getDisplayPrice()} 
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={setSelectedPaymentMethod}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
