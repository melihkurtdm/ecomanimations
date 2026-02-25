
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
import ThemeToggle from '@/components/common/ThemeToggle';
import { fadeInUp, staggerContainer } from "../lib/motionVariants";

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

  // Ensure dark mode is applied when component mounts
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-lg">Yükleniyor...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <ThemeHeader 
        title="Tema Yayınlama"
        description="Mağazanızı yayınlayarak müşterilerinize erişilebilir hale getirin"
        onBack={() => navigate('/dashboard/theme-customization')}
        previewMode={false}
        onTogglePreview={() => {}}
      />
      
      <motion.div 
        className="mt-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
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
              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <div className="lg:col-span-3">
                  <ThemePreview 
                    themeSettings={themeSettings}
                    previewAnimation={previewAnimation}
                    isSaved={true}
                    isPublished={isPublished}
                    onRefreshPreview={refreshPreview}
                  />
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="publish" className="mt-0">
              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
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
              </motion.div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <motion.div 
                variants={fadeInUp}
                className="space-y-6"
              >
                <ThemeStatistics />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    className="md:col-span-2"
                    variants={fadeInUp}
                  >
                    {/* Buraya detaylı analitik grafikler eklenebilir */}
                    <div className="h-72 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden relative">
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                        style={{
                          backgroundImage: 'linear-gradient(to right, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))',
                          backgroundSize: '400% 400%',
                        }}
                      />
                      <p className="text-gray-500 dark:text-gray-400 relative z-10">Detaylı istatistikler için grafikler burada gösterilecek</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="md:col-span-1"
                    variants={fadeInUp}
                  >
                    <ThemePreview 
                      themeSettings={themeSettings}
                      previewAnimation={previewAnimation}
                      isSaved={true}
                      isPublished={isPublished}
                      onRefreshPreview={refreshPreview}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ThemePublish;
