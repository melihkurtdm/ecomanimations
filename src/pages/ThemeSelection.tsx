import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { 
  Monitor, 
  ExternalLink, 
  Globe, 
  GripHorizontal, 
  Paintbrush, 
  Layers,
  EyeIcon,
  CheckCircle,
  ArrowRight,
  Palette
} from 'lucide-react';
import ThemeCard from '@/components/theme/ThemeCard';
import ThemeCategories from '@/components/theme/ThemeCategories';
import ThemePreviewModal from '@/components/theme/ThemePreviewModal';
import ThemeActionBar from '@/components/theme/ThemeActionBar';
import ThemeHeader from '@/components/theme/ThemeHeader';
import { themeData, categoryData, designStyles } from '@/data/themeData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';

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
  const [previewMode, setPreviewMode] = useState(false);
  const [domainDialogOpen, setDomainDialogOpen] = useState(false);
  const [domain, setDomain] = useState('');
  const [confirmPublishDialog, setConfirmPublishDialog] = useState(false);
  const [publishingProgress, setPublishingProgress] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  
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

  // Yeni temayı seçtiğimizde tooltip göster
  useEffect(() => {
    if (selectedTheme) {
      setShowToolTip(true);
      const timer = setTimeout(() => {
        setShowToolTip(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedTheme]);

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    
    // Find the design style for this theme
    const theme = themeData.find(t => t.id === themeId);
    const style = theme?.designStyle ? designStyles.find(s => s.id === theme.designStyle) : null;
    
    if (style) {
      // Apply theme styles animation
      const message = `${theme?.name} teması seçildi. ${style.name} tasarım stili uygulandı.`;
      toast({
        title: "Tema seçildi",
        description: message,
      });
    } else {
      toast({
        title: "Tema seçildi",
        description: `${themeData.find(t => t.id === themeId)?.name} teması seçildi.`,
      });
    }
  };

  const handleContinue = () => {
    if (selectedTheme) {
      setDomainDialogOpen(true);
    } else {
      toast({
        title: "Tema seçilmedi",
        description: "Devam etmek için bir tema seçmelisiniz.",
        variant: "destructive",
      });
    }
  };

  const handlePublishWithDomain = () => {
    if (!domain) {
      toast({
        title: "Alan adı girilmedi",
        description: "Lütfen bir alan adı girin veya domainsiz devam edin.",
        variant: "destructive",
      });
      return;
    }
    
    if (!domain.includes('.')) {
      toast({
        title: "Geçersiz alan adı",
        description: "Lütfen geçerli bir alan adı girin. (örn: siteadi.com)",
        variant: "destructive",
      });
      return;
    }
    
    setDomainDialogOpen(false);
    setConfirmPublishDialog(true);
  };

  const handleConfirmPublish = async () => {
    setIsPublishing(true);
  
    const currentDomain = domain || window.location.hostname;
  
    // 🎯 Seçilen temanın tüm bilgilerini bul
    const selectedThemeData = themeData.find(t => t.id === selectedTheme);
  
    // ✅ BURAYA EKLE
    console.log("📦 Seçilen tema ID:", selectedTheme);
    console.log("🎨 Seçilen tema objesi:", selectedThemeData);
  
    if (!selectedThemeData) {
      toast({
        title: "Tema bulunamadı",
        description: "Seçilen tema geçersiz.",
        variant: "destructive",
      });
      setIsPublishing(false);
      return;
    }
  
    try {
      // First, insert/update the store record
      const { data: storeData, error: storeError } = await supabase
        .from("stores")
        .upsert(
          {
            domain: currentDomain,
            selected_theme: selectedThemeData.id,
            store_name: "Oto Mağaza",
            theme_settings: {
              id: selectedThemeData.id,
              colors: selectedThemeData.colors || {
                primary: "#F97316",
                secondary: "#FDBA74",
                accent: "#EF4444",
                background: "#FFFFFF",
                text: "#1F2937",
              },
              fonts: selectedThemeData.fonts || {
                heading: "Inter",
                body: "Inter",
                button: "Inter",
              },
              spacing: selectedThemeData.spacing || {
                section: "2rem",
                element: "1rem",
              },
              borderRadius: selectedThemeData.borderRadius || "0.5rem"
            }
          },
          { onConflict: "domain" }
        )
        .select()
        .single();

      if (storeError) {
        throw storeError;
      }

      // Then, insert the domain record
      const { error: domainError } = await supabase
        .from("domains")
        .upsert({
          domain: "ecomanimations.vercel.app",
          store_id: storeData.id, // Link to the store record
          store_name: "Oto Mağaza",
          verified_at: new Date().toISOString(),
          status: "active",
          vercel_status: "verified"
        }, {
          onConflict: "domain"
        });

      if (domainError) {
        throw domainError;
      }

      // devam eden animasyon ve yönlendirme...
    } catch (error) {
      console.error("Theme publishing error:", error);
      toast({
        title: "Yayınlama Hatası",
        description: "Veritabanına kayıt yapılırken bir sorun oluştu.",
        variant: "destructive"
      });
      setIsPublishing(false);
    }
  };
  
  const handleCustomize = () => {
    if (selectedTheme) {
      navigate('/dashboard/theme-customization');
      
      // Doğrudan düzenleyici moduna geçişi teşvik eden bir toast göster
      toast({
        title: "Tema Düzenleyici Açılıyor",
        description: "Sürükle & Bırak özelliğini kullanmak için 'Sayfa Düzenleyici' sekmesine tıklayın.",
      });
    } else {
      toast({
        title: "Tema seçilmedi",
        description: "Özelleştirmek için önce bir tema seçmelisiniz.",
        variant: "destructive",
      });
    }
  };

  const getSelectedThemeData = () => {
    return themeData.find(t => t.id === showPreview) || null;
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
      <ThemeHeader 
        title="Tema Seçimi"
        description="Mağazanız için uygun temayı seçin"
        onBack={() => navigate('/dashboard')}
        previewMode={previewMode}
        onTogglePreview={() => setPreviewMode(!previewMode)}
      />
      
      <motion.div variants={itemVariants} className="mb-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between border-b mb-6">
            <ThemeCategories 
              categories={categoryData}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            <div className="hidden sm:flex items-center space-x-2">
              <Button 
                size="sm"
                variant="secondary"
                onClick={() => setShowPreview(selectedTheme)}
                disabled={!selectedTheme}
                className="flex items-center gap-2"
              >
                <Monitor className="h-4 w-4" />
                Önizleme
              </Button>
              
              <TooltipProvider>
                <Tooltip open={showToolTip}>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={handleCustomize}
                      disabled={!selectedTheme}
                      className="flex items-center gap-2 relative"
                    >
                      <Paintbrush className="h-4 w-4" />
                      <span className="hidden md:inline">Düzenle</span>
                      {selectedTheme && (
                        <motion.div 
                          className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="p-2 max-w-xs bg-black text-white">
                    <p className="text-sm">Sürükle & Bırak özelliğini kullanmak için tema düzenleyiciye gidin!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {selectedTheme && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={handleCustomize}
                        className="flex items-center gap-2 border-dashed border-indigo-300"
                      >
                        <Layers className="h-4 w-4" />
                        <span className="hidden md:inline">Sürükle & Bırak</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sürükle & Bırak düzenleyiciyi açın</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
          
          {categoryData.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="wait">
                  {filteredThemes.map((theme) => (
                    <ThemeCard 
                      key={theme.id}
                      theme={theme}
                      isSelected={selectedTheme === theme.id}
                      onSelect={handleSelectTheme}
                      onPreview={() => setShowPreview(theme.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
      
      <ThemeActionBar 
        selectedTheme={selectedTheme}
        onCustomize={handleCustomize}
        onContinue={handleContinue}
      />
      
      {/* Preview Modal */}
      <ThemePreviewModal 
        theme={getSelectedThemeData()}
        onClose={() => setShowPreview(null)}
      />
      
      {/* Domain Dialog */}
      <Dialog open={domainDialogOpen} onOpenChange={setDomainDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Alan Adı Ayarları</DialogTitle>
            <DialogDescription>
              Mağazanız için özel bir alan adı ekleyin veya Lovable alt alan adı ile devam edin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Alan Adı Ayarı</span>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="domain" className="text-sm font-medium">
                Alan Adınız <span className="text-gray-500">(İsteğe Bağlı)</span>
              </label>
              <Input
                id="domain"
                placeholder="ornek.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Alan adınız yoksa, otomatik olarak {selectedTheme ? themeData.find(t => t.id === selectedTheme)?.id : 'tema'}.lovable.app adresi atanacaktır.
              </p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 flex items-start space-x-2">
              <ExternalLink className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Özel Alan Adı Nasıl Çalışır?</p>
                <p className="mt-1">
                  Mağazanız yapılandırıldıktan sonra, DNS ayarlarınızı güncelleyerek kendi alan adınızı bağlayabilirsiniz. Detaylı bilgiler kurulum tamamlandığında paylaşılacaktır.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDomainDialogOpen(false);
                navigate('/dashboard/store-setup');
              }}
            >
              Domain Olmadan Devam Et
            </Button>
            <Button type="button" onClick={handlePublishWithDomain}>
              <Globe className="h-4 w-4 mr-2" />
              Yayınla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Publish Confirmation Dialog */}
      <Dialog open={confirmPublishDialog} onOpenChange={setConfirmPublishDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Siteniz Yayınlanıyor</DialogTitle>
            <DialogDescription>
              Temanız ve mağaza ayarlarınız hazırlanıyor.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {isPublishing ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-4">
                  <Progress value={publishingProgress} className="w-full mb-2" />
                  <p className="text-sm text-gray-500">{publishingProgress}% Tamamlandı</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className={`h-4 w-4 ${publishingProgress >= 20 ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={publishingProgress >= 20 ? '' : 'text-gray-400'}>Tema ayarları yapılandırılıyor</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className={`h-4 w-4 ${publishingProgress >= 40 ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={publishingProgress >= 40 ? '' : 'text-gray-400'}>Sayfa bileşenleri hazırlanıyor</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className={`h-4 w-4 ${publishingProgress >= 60 ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={publishingProgress >= 60 ? '' : 'text-gray-400'}>Sürükle & Bırak düzenleyici kuruluyor</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className={`h-4 w-4 ${publishingProgress >= 80 ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={publishingProgress >= 80 ? '' : 'text-gray-400'}>{domain ? 'Alan adı yapılandırılıyor' : 'Deneme alanı oluşturuluyor'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className={`h-4 w-4 ${publishingProgress >= 100 ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={publishingProgress >= 100 ? '' : 'text-gray-400'}>Yayına hazırlanıyor</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center py-6">
                  <div className="relative">
                    <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Layers className="h-3 w-3 mr-1" />
                      Tema
                    </Badge>
                    <span className="text-sm">
                      {selectedTheme && themeData.find(t => t.id === selectedTheme)?.name}
                    </span>
                  </div>
                  
                  {domain && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Globe className="h-3 w-3 mr-1" />
                        Domain
                      </Badge>
                      <span className="text-sm">{domain}</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-amber-50 p-3 rounded-md text-sm text-amber-700 flex items-start space-x-2">
                  <EyeIcon className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Siteniz Hazırlandıktan Sonra</p>
                    <p className="mt-1">
                      Kurulum tamamlandığında size "Sürükle & Bırak" düzenleyici açılacak ve mağazanızı özelleştirebileceksiniz.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              onClick={handleConfirmPublish}
              disabled={isPublishing}
              className="gap-2"
            >
              {isPublishing ? (
                <>Yayınlanıyor...</>
              ) : (
                <>
                  Devam Et
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Temalar arasındaki farkları vurgulayan bir bilgi kutusu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100"
      >
        <h3 className="font-medium text-blue-800 flex items-center">
          <GripHorizontal className="h-5 w-5 mr-2 text-blue-600" />
          Tema Özelleştirme İpuçları
        </h3>
        <p className="text-sm text-blue-700 mt-2">
          Her temanın kendine özgü tasarım özellikleri vardır. Tema seçtikten sonra, "Düzenle" butonuna tıklayarak tema özelleştirme sayfasına gidin. 
          Orada "Sayfa Düzenleyici" sekmesine tıklayarak sürükle-bırak özelliğini kullanabilirsiniz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="bg-white p-2 rounded text-xs text-blue-800 flex items-center">
            <Palette className="h-4 w-4 mr-1 text-blue-600" />
            Renk şemalarını değiştirin
          </div>
          <div className="bg-white p-2 rounded text-xs text-blue-800 flex items-center">
            <Layers className="h-4 w-4 mr-1 text-blue-600" />
            Sürükle & bırak ile öğeleri düzenleyin
          </div>
          <div className="bg-white p-2 rounded text-xs text-blue-800 flex items-center">
            <GripHorizontal className="h-4 w-4 mr-1 text-blue-600" />
            Bileşenleri ekleyin ve kaldırın
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeSelection;
