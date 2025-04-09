
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle, Palette } from 'lucide-react';

const themeData = [
  {
    id: "modern",
    name: "Modern Mağaza",
    description: "Minimalist ve çağdaş bir tasarımla ürünlerinizi ön plana çıkarın.",
    imageSrc: "https://placehold.co/600x400/9B87F5/FFFFFF?text=Modern+Mağaza+Teması",
    features: ["Satış odaklı", "Hızlı yükleme", "Mobil uyumlu"]
  },
  {
    id: "luxury",
    name: "Lüks Butik",
    description: "Premium ürünler için zarif ve sofistike bir tasarım.",
    imageSrc: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Lüks+Butik+Teması",
    features: ["Özel animasyonlar", "Galeri vitrini", "VIP özellikleri"]
  },
  {
    id: "popup",
    name: "Pop-up Mağaza",
    description: "Hızlı kampanyalar ve sınırlı süreli teklifler için ideal.",
    imageSrc: "https://placehold.co/600x400/A78BFA/FFFFFF?text=Pop-up+Mağaza+Teması",
    features: ["Geri sayım zamanlayıcısı", "Özel teklif blokları", "Sosyal medya entegrasyonu"]
  },
  {
    id: "catalog",
    name: "Büyük Katalog",
    description: "Binlerce ürün için optimize edilmiş geniş katalog tasarımı.",
    imageSrc: "https://placehold.co/600x400/60A5FA/FFFFFF?text=Büyük+Katalog+Teması",
    features: ["Gelişmiş filtreleme", "Hızlı arama", "Kategori organizasyonu"]
  },
  {
    id: "fashion",
    name: "Moda Butiği",
    description: "Moda ürünleri için trend ve çekici tasarım.",
    imageSrc: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Moda+Butiği+Teması",
    features: ["Lookbook özelliği", "Beden kılavuzu", "Stil önerileri"]
  }
];

const ThemeSelection = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  
  React.useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Oturum açmanız gerekiyor",
        description: "Tema seçimi için lütfen giriş yapın.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const handleContinue = () => {
    if (selectedTheme) {
      toast({
        title: "Tema seçildi",
        description: `${themeData.find(t => t.id === selectedTheme)?.name} teması seçildi. Mağazanız oluşturuluyor...`,
      });
      navigate('/dashboard/store-setup');
    } else {
      toast({
        title: "Tema seçilmedi",
        description: "Devam etmek için bir tema seçmelisiniz.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mağazanız İçin Tema Seçin</h1>
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Dashboard'a Dön
        </Button>
      </div>
      
      <p className="text-gray-600 mb-8">
        Mağazanızın görünümünü belirleyen bir tema seçin. Daha sonra tüm temalar arasından değişiklik yapabilir ve temayı özelleştirebilirsiniz.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {themeData.map((theme) => (
          <Card 
            key={theme.id}
            className={`overflow-hidden transition-all cursor-pointer ${
              selectedTheme === theme.id ? 'ring-2 ring-brand-purple' : 'hover:shadow-md'
            }`}
            onClick={() => handleSelectTheme(theme.id)}
          >
            <div className="relative">
              <img src={theme.imageSrc} alt={theme.name} className="w-full h-48 object-cover" />
              {selectedTheme === theme.id && (
                <div className="absolute top-2 right-2 bg-brand-purple text-white rounded-full p-1">
                  <CheckCircle className="h-5 w-5" />
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{theme.name}</CardTitle>
              <CardDescription>{theme.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {theme.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-brand-purple/20 flex items-center justify-center mr-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-purple"></div>
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          size="lg" 
          onClick={handleContinue}
          disabled={!selectedTheme}
        >
          <Palette className="mr-2 h-5 w-5" />
          Bu Temayı Seç ve Devam Et
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ThemeSelection;
