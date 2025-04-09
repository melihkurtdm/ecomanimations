
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import ThemeHeader from '@/components/theme/ThemeHeader';
import ThemeCustomizationForm from '@/components/theme/ThemeCustomizationForm';
import ThemePreview from '@/components/theme/ThemePreview';
import PublishThemeDialog from '@/components/theme/PublishThemeDialog';

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

const ThemeCustomization = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(currentTheme);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");
  const [isSaved, setIsSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [previewAnimation, setPreviewAnimation] = useState(false);
  
  const form = useForm({
    defaultValues: {
      colors: themeSettings.colors,
      fonts: themeSettings.fonts,
      spacing: themeSettings.spacing,
      borderRadius: themeSettings.borderRadius,
    }
  });

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

  const handleSaveChanges = () => {
    setIsSaved(true);
    setIsDirty(false);
    toast({
      title: "Değişiklikler kaydedildi",
      description: "Tema özelleştirmeleri başarıyla uygulandı.",
    });
  };

  const handlePublish = () => {
    setIsPublishing(true);
    
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      setPublishDialogOpen(false);
      
      toast({
        title: "Tema yayınlandı!",
        description: "Temanız başarıyla mağazanızda yayınlandı.",
      });
    }, 2000);
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

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ThemeHeader 
        title="Tema Özelleştirme"
        description="Mağazanızın görünümünü özelleştirin. Renk şemasını, yazı tiplerini ve diğer tasarım öğelerini zevkinize göre düzenleyin."
        onBack={() => navigate('/dashboard')}
        previewMode={previewMode}
        onTogglePreview={() => setPreviewMode(!previewMode)}
      />
      
      <div className="flex items-center justify-end mb-4">
        <PublishThemeDialog 
          open={publishDialogOpen}
          onOpenChange={setPublishDialogOpen}
          isPublishing={isPublishing}
          isPublished={isPublished}
          isSaved={isSaved}
          onPublish={handlePublish}
        />
      </div>
      
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
    </div>
  );
};

export default ThemeCustomization;
