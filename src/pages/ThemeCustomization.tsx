import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  Palette, 
  Save, 
  Layout, 
  Type, 
  Image, 
  Check, 
  EyeIcon, 
  Globe, 
  RefreshCw,
  CheckCircle2,
  Bookmark,
  RotateCw
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

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

  const colorSchemes: { name: string; scheme: ColorScheme }[] = [
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

  const tabContentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } }
  };

  const colorFadeVariants = {
    initial: { backgroundColor: "rgba(139, 92, 246, 0.5)" },
    pulse: { 
      backgroundColor: "rgba(139, 92, 246, 1)",
      transition: { duration: 0.3, yoyo: 3 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold">Tema Özelleştirme</h1>
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Dashboard'a Dön
          </Button>
          
          <AnimatePresence mode="wait">
            {previewMode ? (
              <motion.div
                key="editMode"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  variant="outline" 
                  onClick={() => setPreviewMode(false)}
                  className="flex items-center"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Düzenleme Modu
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="previewMode"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  variant="outline" 
                  onClick={() => setPreviewMode(true)}
                  className="flex items-center"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Ön İzleme
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                className="gap-2"
                disabled={!isSaved || isPublished}
              >
                <Globe className="h-4 w-4" />
                {isPublished ? "Yayında" : "Yayına Al"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Temayı Yayınla</DialogTitle>
                <DialogDescription>
                  Bu tema mağazanızda yayınlandığında müşterileriniz tarafından görülebilir olacaktır.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <p className="text-sm text-gray-500 mb-4">
                  Temanızı yayınlamadan önce tüm değişiklikleri kaydettiğinizden emin olun.
                </p>
                
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Tüm değişiklikler kaydedildi</span>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setPublishDialogOpen(false)}>
                  İptal
                </Button>
                <Button 
                  onClick={handlePublish} 
                  disabled={isPublishing}
                  className="gap-2"
                >
                  {isPublishing ? (
                    <>
                      <RotateCw className="h-4 w-4 animate-spin" />
                      Yayınlanıyor...
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4" />
                      Yayınla
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
      
      <motion.p 
        className="text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Mağazanızın görünümünü özelleştirin. Renk şemasını, yazı tiplerini ve diğer tasarım öğelerini zevkinize göre düzenleyin.
      </motion.p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className={`lg:col-span-1 ${previewMode ? 'hidden lg:block' : ''}`}
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className="border-2 border-opacity-50" style={{ borderColor: themeSettings.colors.primary }}>
            <CardHeader>
              <CardTitle>Tema Ayarları</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="colors" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="colors" className="flex items-center justify-center">
                    <Palette className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Renkler</span>
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="flex items-center justify-center">
                    <Type className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Yazı</span>
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="flex items-center justify-center">
                    <Layout className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Düzen</span>
                  </TabsTrigger>
                  <TabsTrigger value="presets" className="flex items-center justify-center">
                    <Image className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Hazır</span>
                  </TabsTrigger>
                </TabsList>
                
                <AnimatePresence mode="wait">
                  {activeTab === "colors" && (
                    <motion.div
                      key="colors"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div className="space-y-4">
                        <h3 className="font-medium">Ana Renkler</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(themeSettings.colors).map(([key, value]) => (
                            <motion.div 
                              key={key} 
                              className="space-y-2"
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <label className="text-sm font-medium capitalize">
                                {key === "primary" ? "Ana Renk" : 
                                 key === "secondary" ? "İkincil Renk" : 
                                 key === "accent" ? "Vurgu Renk" : 
                                 key === "background" ? "Arka Plan" : "Metin"}
                              </label>
                              <div className="flex items-center space-x-2">
                                <motion.div 
                                  className="w-8 h-8 rounded-full border border-gray-300" 
                                  style={{ backgroundColor: value }}
                                  animate={key === "primary" && previewAnimation ? "pulse" : "initial"}
                                  variants={colorFadeVariants}
                                />
                                <Input
                                  type="color"
                                  value={value}
                                  onChange={(e) => handleColorChange(key as keyof ColorScheme, e.target.value)}
                                  className="w-20 h-10"
                                />
                                <Input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleColorChange(key as keyof ColorScheme, e.target.value)}
                                  className="w-28"
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === "typography" && (
                    <motion.div
                      key="typography"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h3 className="font-medium">Yazı Tipleri</h3>
                        {Object.entries(themeSettings.fonts).map(([key, value]) => (
                          <motion.div 
                            key={key} 
                            className="space-y-2"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                          >
                            <label className="text-sm font-medium capitalize">
                              {key === "heading" ? "Başlık Yazı Tipi" : 
                               key === "body" ? "Metin Yazı Tipi" : "Buton Yazı Tipi"}
                            </label>
                            <select
                              value={value}
                              onChange={(e) => updateFontSetting(key as keyof ThemeSettings["fonts"], e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              {fontOptions.map((font) => (
                                <option key={font} value={font}>{font}</option>
                              ))}
                            </select>
                            <div 
                              className="p-2 border border-gray-200 rounded"
                              style={{ fontFamily: value }}
                            >
                              {key === "heading" && <h3 className="text-xl font-bold">Başlık Örneği</h3>}
                              {key === "body" && <p>Paragraf metni örneği. Bu yazı tipi mağazanızdaki ana metinler için kullanılacaktır.</p>}
                              {key === "button" && (
                                <button 
                                  className="px-4 py-2 text-white rounded"
                                  style={{ backgroundColor: themeSettings.colors.primary }}
                                >
                                  Buton Örneği
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === "layout" && (
                    <motion.div
                      key="layout"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h3 className="font-medium">Boşluklar ve Kenarlar</h3>
                        <div className="space-y-4">
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <label className="text-sm font-medium">Köşe Yuvarlaklığı</label>
                            <div className="flex items-center space-x-2 mt-2">
                              <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={parseFloat(themeSettings.borderRadius)}
                                onChange={(e) => handleBorderRadiusChange(e.target.value)}
                                className="w-full"
                              />
                              <span>{themeSettings.borderRadius}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <motion.div 
                                className="w-16 h-16" 
                                style={{ 
                                  backgroundColor: themeSettings.colors.primary,
                                  borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.25}rem` 
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              />
                              <motion.div 
                                className="w-16 h-16" 
                                style={{ 
                                  backgroundColor: themeSettings.colors.primary,
                                  borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.5}rem` 
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              />
                              <motion.div 
                                className="w-16 h-16" 
                                style={{ 
                                  backgroundColor: themeSettings.colors.primary,
                                  borderRadius: `${parseFloat(themeSettings.borderRadius)}rem` 
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </motion.div>
                          
                          {Object.entries(themeSettings.spacing).map(([key, value]) => (
                            <motion.div key={key} whileHover={{ scale: 1.01 }}>
                              <label className="text-sm font-medium capitalize">
                                {key === "section" ? "Bölüm Aralığı" : "Öğe Aralığı"}
                              </label>
                              <div className="flex items-center space-x-2 mt-2">
                                <input
                                  type="range"
                                  min="0.5"
                                  max="4"
                                  step="0.1"
                                  value={parseFloat(value)}
                                  onChange={(e) => handleSpacingChange(key as keyof ThemeSettings["spacing"], e.target.value)}
                                  className="w-full"
                                />
                                <span>{value}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === "presets" && (
                    <motion.div
                      key="presets"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <h3 className="font-medium">Hazır Tema Şemaları</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {colorSchemes.map((scheme, index) => (
                          <motion.button
                            key={index}
                            onClick={() => updateColorScheme(scheme.scheme)}
                            className="p-4 border border-gray-200 rounded-md hover:border-brand-purple transition-colors"
                            whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="font-medium mb-2">{scheme.name}</h4>
                            <div className="flex space-x-2">
                              {Object.values(scheme.scheme).map((color, i) => (
                                <motion.div
                                  key={i}
                                  className="w-6 h-6 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color }}
                                  whileHover={{ scale: 1.2 }}
                                  transition={{ duration: 0.2 }}
                                />
                              ))}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs>
              
              <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={resetToDefaults}>
                  Varsayılana Döndür
                </Button>
                <Button 
                  onClick={handleSaveChanges} 
                  disabled={!isDirty}
                  className="relative overflow-hidden group"
                >
                  <AnimatePresence mode="wait">
                    {isSaved ? (
                      <motion.div
                        key="saved"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Kaydedildi
                      </motion.div>
                    ) : (
                      <motion.div
                        key="save"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Değişiklikleri Kaydet
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.div 
                    className="absolute inset-0 bg-brand-purple opacity-0 group-hover:opacity-20 transition-opacity"
                    initial={false}
                    animate={isSaved ? { opacity: 0.2 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className={`${previewMode ? 'lg:col-span-3' : 'lg:col-span-2'}`}
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tema Ön İzleme</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPreviewAnimation(true)}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Canlandır</span>
              </Button>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="border border-gray-200 rounded-lg overflow-hidden shadow-lg"
                style={{ fontFamily: themeSettings.fonts.body }}
                animate={previewAnimation ? { y: [0, -5, 0], transition: { duration: 0.5 } } : {}}
              >
                <motion.div 
                  className="p-4 flex justify-between items-center"
                  style={{ 
                    backgroundColor: themeSettings.colors.background,
                    color: themeSettings.colors.text,
                    borderBottom: `1px solid ${themeSettings.colors.secondary}`,
                  }}
                >
                  <div className="text-xl font-bold" style={{ fontFamily: themeSettings.fonts.heading }}>
                    <span style={{ color: themeSettings.colors.primary }}>Mağaza</span> Adı
                  </div>
                  <div className="flex space-x-2">
                    <motion.button 
                      className="px-2 py-1 text-sm"
                      style={{ 
                        backgroundColor: themeSettings.colors.primary, 
                        color: "#FFFFFF",
                        borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.5}rem`,
                        fontFamily: themeSettings.fonts.button
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Giriş
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-6"
                  style={{ 
                    backgroundColor: themeSettings.colors.background,
                    color: themeSettings.colors.text,
                    padding: themeSettings.spacing.section
                  }}
                >
                  <motion.div 
                    className="text-center mb-8"
                    style={{ marginBottom: themeSettings.spacing.section }}
                    animate={previewAnimation ? { 
                      scale: [1, 1.01, 1],
                      transition: { duration: 0.7, delay: 0.2 } 
                    } : {}}
                  >
                    <motion.h1 
                      className="text-3xl font-bold mb-2"
                      style={{ 
                        fontFamily: themeSettings.fonts.heading,
                        color: themeSettings.colors.primary
                      }}
                    >
                      Mağazamıza Hoş Geldiniz
                    </motion.h1>
                    <p className="mb-4">En kaliteli ürünler ve en iyi fiyatlar için doğru yerdesiniz.</p>
                    <motion.button 
                      className="px-6 py-2 font-medium"
                      style={{ 
                        backgroundColor: themeSettings.colors.accent, 
                        color: "#FFFFFF",
                        borderRadius: `${parseFloat(themeSettings.borderRadius)}rem`,
                        fontFamily: themeSettings.fonts.button
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Alışverişe Başla
                    </motion.button>
                  </motion.div>
                  
                  <h2 
                    className="text-xl font-bold mb-4"
                    style={{ 
                      fontFamily: themeSettings.fonts.heading,
                      marginBottom: themeSettings.spacing.element
                    }}
                  >
                    Öne Çıkan Ürünler
                  </h2>
                  <div 
                    className="grid grid-cols-3 gap-4"
                    style={{ gap: themeSettings.spacing.element }}
                  >
                    {[1, 2, 3].map((item) => (
                      <motion.div 
                        key={item}
                        className="border p-4"
                        style={{ 
                          borderColor: themeSettings.colors.secondary,
                          borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.5}rem`,
                          padding: themeSettings.spacing.element
                        }}
                        whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        transition={{ duration: 0.2 }}
                        animate={previewAnimation ? { 
                          y: [0, -5, 0],
                          transition: { duration: 0.5, delay: 0.3 + (item * 0.1) } 
                        } : {}}
                      >
                        <div 
                          className="bg-gray-200 mb-2"
                          style={{ 
                            height: "100px", 
                            borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.25}rem` 
                          }}
                        />
                        <h3 
                          className="font-medium"
                          style={{ fontFamily: themeSettings.fonts.heading }}
                        >
                          Ürün {item}
                        </h3>
                        <p 
                          className="text-sm mb-2"
                          style={{ marginBottom: themeSettings.spacing.element }}
                        >
                          Ürün açıklaması burada yer alacak.
                        </p>
                        <div className="flex justify-between items-center">
                          <span 
                            className="font-bold"
                            style={{ color: themeSettings.colors.primary }}
                          >
                            ₺149.99
                          </span>
                          <motion.button 
                            className="px-2 py-1 text-xs"
                            style={{ 
                              backgroundColor: themeSettings.colors.secondary, 
                              color: "#FFFFFF",
                              borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.25}rem`,
                              fontFamily: themeSettings.fonts.button
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Sepete Ekle
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-4 text-center text-sm"
                  style={{ 
                    backgroundColor: themeSettings.colors.primary,
                    color: "#FFFFFF",
                    padding: themeSettings.spacing.element
                  }}
                >
                  © 2025 Mağaza Adı. Tüm hakları saklıdır.
                </motion.div>
              </motion.div>

              {isSaved && !isPublished && (
                <motion.div 
                  className="flex justify-end mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-center">
                    <Bookmark className="h-5 w-5 text-yellow-500 mr-2" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">Değişiklikleriniz kaydedildi</p>
                      <p className="text-yellow-600">Mağazanızı ziyaret eden müşteriler bu temayı görebilir.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {isPublished && (
                <motion.div 
                  className="flex justify-end mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <div className="text-sm">
                      <p className="font-medium text-green-800">Temanız yayında!</p>
                      <p className="text-green-600">Mağazanızı ziyaret eden müşteriler bu temayı görebilir.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeCustomization;
