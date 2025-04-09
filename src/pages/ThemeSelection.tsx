
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, ChevronRight, CheckCircle, Palette, Settings, 
  LayoutGrid, Star, Sparkles, Zap, Monitor, LayoutList
} from 'lucide-react';

const themeData = [
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

const categories = [
  { id: "all", name: "Tüm Temalar", icon: <LayoutGrid className="h-4 w-4" /> },
  { id: "fashion", name: "Moda", icon: <Star className="h-4 w-4" /> },
  { id: "catalog", name: "Katalog", icon: <LayoutList className="h-4 w-4" /> },
  { id: "promo", name: "Promosyon", icon: <Zap className="h-4 w-4" /> }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const ThemeSelection = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showPreview, setShowPreview] = useState<string | null>(null);
  
  const filteredThemes = activeCategory === "all" 
    ? themeData 
    : themeData.filter(theme => theme.category === activeCategory);
  
  useEffect(() => {
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
    toast({
      title: "Tema seçildi",
      description: `${themeData.find(t => t.id === themeId)?.name} teması seçildi.`,
    });
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

  const handleCustomize = () => {
    if (selectedTheme) {
      navigate('/dashboard/theme-customization');
    } else {
      toast({
        title: "Tema seçilmedi",
        description: "Özelleştirmek için önce bir tema seçmelisiniz.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 mb-3" />
          <div className="h-4 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
          >
            Mağazanız İçin Tema Seçin
          </motion.h1>
          <motion.p 
            variants={itemVariants} 
            className="text-gray-600 mt-2"
          >
            Mağazanızın görünümünü belirleyen profesyonel bir tema seçin
          </motion.p>
        </div>
        <motion.div variants={itemVariants}>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="group"
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Dashboard'a Dön
          </Button>
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants} className="mb-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between border-b mb-6">
            <TabsList className="bg-transparent">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <div className="flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="hidden sm:flex items-center space-x-2">
              <Button 
                size="sm"
                variant="secondary"
                onClick={() => setShowPreview(selectedTheme)}
                disabled={!selectedTheme}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Önizleme
              </Button>
            </div>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredThemes.map((theme) => (
                  <motion.div 
                    key={theme.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card 
                      className={`overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedTheme === theme.id 
                          ? 'ring-2 ring-offset-2 shadow-lg' 
                          : 'hover:shadow-md'
                      }`}
                      style={{ 
                        borderColor: selectedTheme === theme.id ? theme.color : undefined,
                        // Fix: Remove ringColor property and use inline CSS custom property
                        // for the ring color that will be applied via the ring-2 class
                        // The ring color will be controlled by the borderColor which affects 
                        // the ring through the tailwind configuration
                      }}
                      onClick={() => handleSelectTheme(theme.id)}
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={theme.imageSrc} 
                          alt={theme.name} 
                          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" 
                        />
                        {theme.badge && (
                          <Badge 
                            className="absolute top-3 right-3"
                            style={{ 
                              backgroundColor: theme.color,
                              borderColor: theme.color
                            }}
                          >
                            {theme.badge}
                          </Badge>
                        )}
                        {selectedTheme === theme.id && (
                          <motion.div 
                            className="absolute top-3 left-3 bg-white bg-opacity-90 text-brand-purple rounded-full p-1.5 shadow-lg"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          >
                            <CheckCircle className="h-5 w-5" style={{ color: theme.color }} />
                          </motion.div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between">
                          <span>{theme.name}</span>
                          <span className="h-4 w-4 rounded-full" style={{ backgroundColor: theme.color }}></span>
                        </CardTitle>
                        <CardDescription>{theme.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {theme.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="h-4 w-4 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${theme.color}20` }}>
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.color }}></div>
                              </div>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        {selectedTheme === theme.id && (
                          <Button 
                            variant="secondary" 
                            className="w-full transition-all duration-300"
                            style={{ backgroundColor: `${theme.color}20`, color: theme.color, borderColor: `${theme.color}30` }}
                          >
                            <Sparkles className="mr-2 h-4 w-4" />
                            Seçildi
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 sticky bottom-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md z-10"
      >
        <Button 
          variant="outline"
          size="lg" 
          onClick={handleCustomize}
          disabled={!selectedTheme}
          className="flex-1 group"
        >
          <Settings className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
          Bu Temayı Özelleştir
        </Button>
        
        <Button 
          size="lg" 
          onClick={handleContinue}
          disabled={!selectedTheme}
          className="flex-1 group"
        >
          <Palette className="mr-2 h-5 w-5" />
          Bu Temayı Seç ve Devam Et
          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
      
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white w-full max-w-5xl rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">
                {themeData.find(t => t.id === showPreview)?.name} Teması Önizleme
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowPreview(null)}
              >
                Kapat
              </Button>
            </div>
            <div className="p-4 h-[70vh] overflow-auto">
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={themeData.find(t => t.id === showPreview)?.imageSrc} 
                  alt="Tema Önizleme" 
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ThemeSelection;
