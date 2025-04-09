
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import ThemeHeader from '@/components/theme/ThemeHeader';
import ThemePreview from '@/components/theme/ThemePreview';
import ThemePublishForm from '@/components/theme/ThemePublishForm';
import ThemeStatistics from '@/components/theme/ThemeStatistics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const currentTheme = {
  id: "modern",
  name: "Modern Mağaza",
  colors: {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    accent: "#F97316",
    background: "#FFFFFF",
    text: "#1F2937",
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
    button: "Inter",
  },
  spacing: {
    section: "2rem",
    element: "1rem",
  },
  borderRadius: "0.5rem",
};

const ThemePublish = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const [themeSettings, setThemeSettings] = useState(currentTheme);
  const [previewAnimation, setPreviewAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Oturum açmanız gerekiyor",
        description: "Tema yayınlama için lütfen giriş yapın.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handlePublish = () => {
    setIsPublished(true);
    toast({
      title: "Tema yayınlandı!",
      description: "Mağazanız başarıyla yayına alındı.",
    });
  };

  const handleUnpublish = () => {
    setIsPublished(false);
    toast({
      title: "Tema yayından kaldırıldı",
      description: "Mağazanız yayından kaldırıldı.",
    });
  };

  const refreshPreview = () => {
    setPreviewAnimation(true);
    setTimeout(() => {
      setPreviewAnimation(false);
    }, 2000);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ThemeHeader 
        title="Tema Yayınlama"
        description="Mağazanızı yayınlayarak müşterilerinize erişilebilir hale getirin"
        onBack={() => navigate('/dashboard/theme-customization')}
        previewMode={false}
        onTogglePreview={() => {}}
      />
      
      <div className="mt-6">
        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="preview">Önizleme</TabsTrigger>
            <TabsTrigger value="publish">Yayınlama</TabsTrigger>
            <TabsTrigger value="stats">İstatistikler</TabsTrigger>
          </TabsList>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="preview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                  <ThemePreview 
                    themeSettings={themeSettings}
                    previewAnimation={previewAnimation}
                    isSaved={true}
                    isPublished={isPublished}
                    onRefreshPreview={refreshPreview}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="publish" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <ThemePublishForm 
                    isPublished={isPublished}
                    onPublish={handlePublish}
                    onUnpublish={handleUnpublish}
                  />
                </div>
                <div className="md:col-span-1">
                  <ThemePreview 
                    themeSettings={themeSettings}
                    previewAnimation={previewAnimation}
                    isSaved={true}
                    isPublished={isPublished}
                    onRefreshPreview={refreshPreview}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <div className="space-y-6">
                <ThemeStatistics />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    {/* Buraya detaylı analitik grafikler eklenebilir */}
                    <div className="h-72 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Detaylı istatistikler için grafikler burada gösterilecek</p>
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <ThemePreview 
                      themeSettings={themeSettings}
                      previewAnimation={previewAnimation}
                      isSaved={true}
                      isPublished={isPublished}
                      onRefreshPreview={refreshPreview}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default ThemePublish;
