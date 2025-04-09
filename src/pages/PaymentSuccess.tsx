
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronRight } from 'lucide-react';

const PaymentSuccess = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get('package') || 'başlangıç';
  
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handleContinue = () => {
    navigate('/dashboard/theme-selection');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Ödeme Başarılı!</CardTitle>
          <CardDescription>
            {packageType.charAt(0).toUpperCase() + packageType.slice(1)} paketiniz başarıyla aktifleştirildi.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Artık mağazanızı oluşturmaya başlayabilirsiniz. İlk adım olarak mağazanız için bir tema seçmelisiniz.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button onClick={handleContinue} className="w-full">
            Tema Seçimine Devam Et
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full">
            Dashboard'a Dön
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
