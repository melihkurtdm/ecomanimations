
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Store, Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleNavigateStore = () => {
    navigate('/dashboard/store');
    toast({
      title: "Mağaza Sayfası",
      description: "Mağazanızı yönetebilirsiniz.",
    });
  };

  const handleNavigateTheme = () => {
    navigate('/dashboard/theme-customization');
    toast({
      title: "Tema Özelleştirme",
      description: "Mağazanızın temasını özelleştirebilirsiniz.",
    });
  };

  const handleCreateStore = () => {
    navigate('/dashboard/store-setup');
    toast({
      title: "Mağaza Oluşturma",
      description: "Yeni bir mağaza oluşturabilirsiniz.",
    });
  };

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Hoş Geldiniz</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profiliniz</CardTitle>
            <CardDescription>Hesap bilgileriniz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">E-posta:</span> {user.email}
              </div>
              <div>
                <span className="font-medium">Üyelik:</span> {new Date(user.created_at).toLocaleDateString('tr-TR')} tarihinden beri
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => signOut()}
              >
                Çıkış Yap
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mağazanız</CardTitle>
            <CardDescription>E-ticaret mağazanızı yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Button 
                  className="w-full mt-4"
                  onClick={handleNavigateStore}
                >
                  <Store className="h-4 w-4 mr-2" />
                  Mağazaya Git
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={handleCreateStore}
                >
                  Yeni Mağaza Oluştur
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tema Galeriniz</CardTitle>
            <CardDescription>Mağazanız için tema seçin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>20'den fazla profesyonel tema arasından seçim yapın.</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/dashboard/theme-selection')}
                >
                  Tema Seç
                </Button>
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={handleNavigateTheme}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Özelleştir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
