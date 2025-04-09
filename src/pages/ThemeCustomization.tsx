
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Palette, Save, Layout, Type, Image, Check, EyeIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

// Mock data for the current theme
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
  
  const form = useForm({
    defaultValues: {
      colors: themeSettings.colors,
      fonts: themeSettings.fonts,
      spacing: themeSettings.spacing,
      borderRadius: themeSettings.borderRadius,
    }
  });

  React.useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Oturum açmanız gerekiyor",
        description: "Tema özelleştirmesi için lütfen giriş yapın.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handleSaveChanges = () => {
    // In a real app, we would save these changes to a database
    toast({
      title: "Değişiklikler kaydedildi",
      description: "Tema özelleştirmeleri başarıyla uygulandı.",
    });
  };

  const resetToDefaults = () => {
    setThemeSettings(currentTheme);
    form.reset({
      colors: currentTheme.colors,
      fonts: currentTheme.fonts,
      spacing: currentTheme.spacing,
      borderRadius: currentTheme.borderRadius,
    });
    toast({
      title: "Varsayılan ayarlara dönüldü",
      description: "Tema ayarları orijinal haline geri döndürüldü.",
    });
  };

  // Predefined color schemes for quick selection
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

  // Font options
  const fontOptions = [
    "Inter", "Roboto", "Open Sans", "Montserrat", "Poppins", "Raleway", "Playfair Display"
  ];

  const updateColorScheme = (scheme: ColorScheme) => {
    setThemeSettings((prev) => ({
      ...prev,
      colors: scheme,
    }));
    form.setValue("colors", scheme);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tema Özelleştirme</h1>
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Dashboard'a Dön
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setPreviewMode(!previewMode)}
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            {previewMode ? "Düzenleme Modu" : "Ön İzleme"}
          </Button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-8">
        Mağazanızın görünümünü özelleştirin. Renk şemasını, yazı tiplerini ve diğer tasarım öğelerini zevkinize göre düzenleyin.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Editor Section */}
        <div className={`lg:col-span-1 ${previewMode ? 'hidden lg:block' : ''}`}>
          <Card>
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
                  <TabsTrigger value="colors">
                    <Palette className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Renkler</span>
                  </TabsTrigger>
                  <TabsTrigger value="typography">
                    <Type className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Yazı</span>
                  </TabsTrigger>
                  <TabsTrigger value="layout">
                    <Layout className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Düzen</span>
                  </TabsTrigger>
                  <TabsTrigger value="presets">
                    <Image className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Hazır</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="colors" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Ana Renkler</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(themeSettings.colors).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <label className="text-sm font-medium capitalize">
                            {key === "primary" ? "Ana Renk" : 
                             key === "secondary" ? "İkincil Renk" : 
                             key === "accent" ? "Vurgu Renk" : 
                             key === "background" ? "Arka Plan" : "Metin"}
                          </label>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-8 h-8 rounded-full border border-gray-300" 
                              style={{ backgroundColor: value }}
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
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="typography" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Yazı Tipleri</h3>
                    {Object.entries(themeSettings.fonts).map(([key, value]) => (
                      <div key={key} className="space-y-2">
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
                          {key === "button" && <button className="px-4 py-2 bg-brand-purple text-white rounded">Buton Örneği</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="layout" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Boşluklar ve Kenarlar</h3>
                    <div className="space-y-4">
                      <div>
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
                          <div 
                            className="w-16 h-16 bg-brand-purple" 
                            style={{ borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.25}rem` }}
                          />
                          <div 
                            className="w-16 h-16 bg-brand-purple" 
                            style={{ borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.5}rem` }}
                          />
                          <div 
                            className="w-16 h-16 bg-brand-purple" 
                            style={{ borderRadius: `${parseFloat(themeSettings.borderRadius)}rem` }}
                          />
                        </div>
                      </div>
                      
                      {Object.entries(themeSettings.spacing).map(([key, value]) => (
                        <div key={key}>
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
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="presets" className="space-y-4">
                  <h3 className="font-medium">Hazır Tema Şemaları</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {colorSchemes.map((scheme, index) => (
                      <button
                        key={index}
                        onClick={() => updateColorScheme(scheme.scheme)}
                        className="p-4 border border-gray-200 rounded-md hover:border-brand-purple transition-colors"
                      >
                        <h4 className="font-medium mb-2">{scheme.name}</h4>
                        <div className="flex space-x-2">
                          {Object.values(scheme.scheme).map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={resetToDefaults}>
                  Varsayılana Döndür
                </Button>
                <Button onClick={handleSaveChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Theme Preview Section */}
        <div className={`${previewMode ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          <Card>
            <CardHeader>
              <CardTitle>Tema Ön İzleme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-lg overflow-hidden"
                style={{ fontFamily: themeSettings.fonts.body }}
              >
                {/* Header Preview */}
                <div 
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
                    <button 
                      className="px-2 py-1 text-sm"
                      style={{ 
                        backgroundColor: themeSettings.colors.primary, 
                        color: "#FFFFFF",
                        borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.5}rem`,
                        fontFamily: themeSettings.fonts.button
                      }}
                    >
                      Giriş
                    </button>
                  </div>
                </div>
                
                {/* Body Preview */}
                <div 
                  className="p-6"
                  style={{ 
                    backgroundColor: themeSettings.colors.background,
                    color: themeSettings.colors.text,
                    padding: themeSettings.spacing.section
                  }}
                >
                  {/* Hero Section */}
                  <div 
                    className="text-center mb-8"
                    style={{ marginBottom: themeSettings.spacing.section }}
                  >
                    <h1 
                      className="text-3xl font-bold mb-2"
                      style={{ 
                        fontFamily: themeSettings.fonts.heading,
                        color: themeSettings.colors.primary
                      }}
                    >
                      Mağazamıza Hoş Geldiniz
                    </h1>
                    <p className="mb-4">En kaliteli ürünler ve en iyi fiyatlar için doğru yerdesiniz.</p>
                    <button 
                      className="px-6 py-2 font-medium"
                      style={{ 
                        backgroundColor: themeSettings.colors.accent, 
                        color: "#FFFFFF",
                        borderRadius: `${parseFloat(themeSettings.borderRadius)}rem`,
                        fontFamily: themeSettings.fonts.button
                      }}
                    >
                      Alışverişe Başla
                    </button>
                  </div>
                  
                  {/* Products Preview */}
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
                      <div 
                        key={item}
                        className="border p-4"
                        style={{ 
                          borderColor: themeSettings.colors.secondary,
                          borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.5}rem`,
                          padding: themeSettings.spacing.element
                        }}
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
                          <button 
                            className="px-2 py-1 text-xs"
                            style={{ 
                              backgroundColor: themeSettings.colors.secondary, 
                              color: "#FFFFFF",
                              borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.25}rem`,
                              fontFamily: themeSettings.fonts.button
                            }}
                          >
                            Sepete Ekle
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Footer Preview */}
                <div 
                  className="p-4 text-center text-sm"
                  style={{ 
                    backgroundColor: themeSettings.colors.primary,
                    color: "#FFFFFF",
                    padding: themeSettings.spacing.element
                  }}
                >
                  © 2025 Mağaza Adı. Tüm hakları saklıdır.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomization;
