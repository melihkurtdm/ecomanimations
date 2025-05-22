import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import ThemeHeader from '@/components/theme/ThemeHeader';
import ThemeCustomizationForm from '@/components/theme/ThemeCustomizationForm';
import ThemePreview from '@/components/theme/ThemePreview';
import PublishThemeDialog from '@/components/theme/PublishThemeDialog';
import ThemeDragDropBuilder from '@/components/theme/ThemeDragDropBuilder';
import { Button } from '@/components/ui/button';
import { Globe, Palette, Layers } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { themeData } from '@/data/themeData';
import { useTheme } from '@/contexts/ThemeContext';

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
}

type ColorScheme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

type ThemeSettings = {
  id?: string;  // Make id optional in the type definition
  colors: ColorScheme;
  fonts: {
    heading: string;
    body: string;
    button: string;
  };
  spacing: {
    section: string;
    element: string;
  };
  borderRadius: string;
};
const themeMap: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  minimalist: lazy(() => import("../themes/minimalist/ThemeLayout")),
  elegant: lazy(() => import("../themes/elegant/ThemeLayout")), 
  "luxe-aura": lazy(() => import("../themes/luxe-aura/ThemeLayout")),
  "diamond-luxe": lazy(() => import("../themes/diamond-luxe/ThemeLayout")),
};

const ThemeCustomization = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(currentTheme);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");
  const [isSaved, setIsSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [previewAnimation, setPreviewAnimation] = useState(false);
  const [editorMode, setEditorMode] = useState<"customize" | "builder">("customize");
  const [currentDomain, setCurrentDomain] = useState(window.location.hostname);
  
  const form = useForm({
    defaultValues: {
      colors: themeSettings.colors,
      fonts: themeSettings.fonts,
      spacing: themeSettings.spacing,
      borderRadius: themeSettings.borderRadius,
    }
  });

  const ThemeLayout = themeMap[theme] || themeMap["minimalist"];
  console.log("Aktif tema:", theme); // 👈 ekle buraya

  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Oturum açmanız gerekiyor",
        description: "Tema özelleştirmesi için lütfen giriş yapın.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (previewAnimation) {
      const timer = setTimeout(() => {
        setPreviewAnimation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [previewAnimation]);

  useEffect(() => {
    setIsDirty(true);
    setIsSaved(false);
  }, [themeSettings]);

  // Fetch theme settings from Supabase on mount or when currentDomain changes
  useEffect(() => {
    const fetchThemeSettings = async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('theme_settings')
        .eq('domain', currentDomain)
        .single();

      if (error) {
        console.error('Tema ayarları çekilirken hata:', error);
        return;
      }

      // Type guard: ensure theme_settings is an object with at least an id property
      if (data && typeof data.theme_settings === 'object' && data.theme_settings !== null) {
        setThemeSettings(data.theme_settings as ThemeSettings);
        setTheme((data.theme_settings as ThemeSettings).id || 'modern');
      }
    };

    fetchThemeSettings();
  }, [currentDomain, setTheme]);

  const handleSaveChanges = async () => {
    setIsSaved(true);
    setIsDirty(false);
    
    // Apply the theme locally via context
    const themeId = themeSettings.id || "modern";
    setTheme(themeId);
    
    toast({
      title: "Değişiklikler kaydedildi",
      description: "Tema özelleştirmeleri başarıyla uygulandı.",
    });
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      // Save theme settings to Supabase
      const { error } = await supabase
        .from("stores")
        .update({
          theme_settings: themeSettings
        })
        .eq("domain", currentDomain);
      
      if (error) {
        throw error;
      }
      
      // Apply the theme via context
      const themeId = themeSettings.id || "modern";
      setTheme(themeId);
      
      setIsPublished(true);
      setPublishDialogOpen(false);
      
      toast({
        title: "Tema yayınlandı!",
        description: "Temanız başarıyla mağazanızda yayınlandı.",
      });
    } catch (error) {
      console.error("Theme publishing error:", error);
      toast({
        title: "Yayınlama başarısız",
        description: "Tema yayınlanırken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const resetToDefaults = () => {
    setThemeSettings(currentTheme);
    form.reset({
      colors: currentTheme.colors,
      fonts: currentTheme.fonts,
      spacing: currentTheme.spacing,
      borderRadius: currentTheme.borderRadius,
    });
    setIsDirty(false);
    setIsSaved(false);
    toast({
      title: "Varsayılan ayarlara dönüldü",
      description: "Tema ayarları orijinal haline geri döndürüldü.",
    });
  };

  const colorSchemes = [
    {
      name: "Mor & Mavi",
      scheme: {
        primary: "#8B5CF6",
        secondary: "#A78BFA",
        accent: "#3B82F6",
        background: "#FFFFFF",
        text: "#1F2937",
      },
    },
    {
      name: "Yeşil & Turkuaz",
      scheme: {
        primary: "#10B981",
        secondary: "#6EE7B7",
        accent: "#06B6D4",
        background: "#F9FAFB",
        text: "#111827",
      },
    },
    {
      name: "Turuncu & Kırmızı",
      scheme: {
        primary: "#F97316",
        secondary: "#FDBA74",
        accent: "#EF4444",
        background: "#FFFFFF",
        text: "#1F2937",
      },
    },
    {
      name: "Koyu Tema",
      scheme: {
        primary: "#8B5CF6",
        secondary: "#A78BFA",
        accent: "#3B82F6",
        background: "#1F2937",
        text: "#F9FAFB",
      },
    },
  ];

  const fontOptions = [
    "Inter", "Roboto", "Open Sans", "Montserrat", "Poppins", "Raleway", "Playfair Display"
  ];

  const updateColorScheme = (scheme: ColorScheme) => {
    setThemeSettings((prev) => ({
      ...prev,
      colors: scheme,
    }));
    form.setValue("colors", scheme);
    setPreviewAnimation(true);
  };

  const updateFontSetting = (key: keyof ThemeSettings["fonts"], value: string) => {
    setThemeSettings((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [key]: value,
      },
    }));
    form.setValue(`fonts.${key}`, value);
  };

  const handleColorChange = (key: keyof ColorScheme, value: string) => {
    setThemeSettings((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    }));
    form.setValue(`colors.${key}`, value);
  };

  const handleBorderRadiusChange = (value: string) => {
    setThemeSettings((prev) => ({
      ...prev,
      borderRadius: value,
    }));
    form.setValue("borderRadius", value);
  };

  const handleSpacingChange = (key: keyof ThemeSettings["spacing"], value: string) => {
    setThemeSettings((prev) => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        [key]: value,
      },
    }));
    form.setValue(`spacing.${key}`, value);
  };

  const handleGoToPublish = () => {
    if (!isSaved) {
      toast({
        title: "Önce değişikliklerinizi kaydedin",
        description: "Yayınlama sayfasına gitmeden önce değişikliklerinizi kaydetmelisiniz.",
        variant: "destructive",
      });
      return;
    }
    navigate('/dashboard/theme-publish');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const selectedThemeData = themeData.find(t => t.id === currentTheme.id) || themeData[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Theme Layout Preview */}
      <div className="mb-8 border rounded shadow overflow-hidden">
        <Suspense fallback={<div className="flex items-center justify-center p-8">Tema yükleniyor...</div>}>
          <ThemeLayout page="homepage" />
        </Suspense>
      </div>
      <ThemeHeader 
        title="Tema Özelleştirme"
        description="Mağazanızın görünümünü özelleştirin. Renk şemasını, yazı tiplerini ve diğer tasarım öğelerini zevkinize göre düzenleyin."
        onBack={() => navigate('/dashboard')}
        previewMode={previewMode}
        onTogglePreview={() => setPreviewMode(!previewMode)}
      />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex">
          <Tabs defaultValue="customize" value={editorMode} onValueChange={(value) => setEditorMode(value as "customize" | "builder")}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger 
                value="customize"
                className="flex items-center"
              >
                <Palette className="h-4 w-4 mr-2" />
                Görünüm Ayarları
              </TabsTrigger>
              <TabsTrigger 
                value="builder"
                className="flex items-center"
              >
                <Layers className="h-4 w-4 mr-2" />
                Sayfa Düzenleyici
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleGoToPublish}
          disabled={!isSaved}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          Yayınlama Sayfasına Git
        </Button>
        
        <PublishThemeDialog 
          open={publishDialogOpen}
          onOpenChange={setPublishDialogOpen}
          isPublishing={isPublishing}
          isPublished={isPublished}
          isSaved={isSaved}
          onPublish={handlePublish}
        />
      </div>
      
      {editorMode === "customize" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className={`lg:col-span-1 ${previewMode ? 'hidden lg:block' : ''}`}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ThemeCustomizationForm 
              themeSettings={themeSettings}
              previewAnimation={previewAnimation}
              activeTab={activeTab}
              isSaved={isSaved}
              isDirty={isDirty}
              fontOptions={fontOptions}
              colorSchemes={colorSchemes}
              onTabChange={setActiveTab}
              onColorChange={handleColorChange}
              onFontChange={updateFontSetting}
              onBorderRadiusChange={handleBorderRadiusChange}
              onSpacingChange={handleSpacingChange}
              onSchemeSelect={updateColorScheme}
              onSaveChanges={handleSaveChanges}
              onResetDefaults={resetToDefaults}
            />
          </motion.div>
          
          <motion.div 
            className={`${previewMode ? 'lg:col-span-3' : 'lg:col-span-2'}`}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ delay: 0.2 }}
          >
            <ThemePreview 
              themeSettings={themeSettings}
              previewAnimation={previewAnimation}
              isSaved={isSaved}
              isPublished={isPublished}
              onRefreshPreview={() => setPreviewAnimation(true)}
            />
          </motion.div>
        </div>
      ) : (
        <ThemeDragDropBuilder 
          themeId={currentTheme.id} 
          themeColor={themeSettings.colors.primary} 
        />
      )}
    </div>
  );
};

export default ThemeCustomization;
