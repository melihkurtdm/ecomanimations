import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Monitor } from 'lucide-react';
import ThemeCard from '@/components/theme/ThemeCard';
import ThemeCategories from '@/components/theme/ThemeCategories';
import ThemePreviewModal from '@/components/theme/ThemePreviewModal';
import ThemeActionBar from '@/components/theme/ThemeActionBar';
import ThemeHeader from '@/components/theme/ThemeHeader';
import { themeData, categoryData } from '@/data/themeData';

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
              >
                <Monitor className="h-4 w-4 mr-2" />
                Önizleme
              </Button>
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
                {filteredThemes.map((theme) => (
                  <ThemeCard 
                    key={theme.id}
                    theme={theme}
                    isSelected={selectedTheme === theme.id}
                    onSelect={handleSelectTheme}
                  />
                ))}
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
      
      <ThemePreviewModal 
        theme={getSelectedThemeData()}
        onClose={() => setShowPreview(null)}
      />
    </motion.div>
  );
};

export default ThemeSelection;
