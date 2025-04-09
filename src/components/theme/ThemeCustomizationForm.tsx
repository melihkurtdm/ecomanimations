
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Check, Palette, Type, Layout, BookTemplate } from 'lucide-react';
import ThemeColorPalette from './ThemeColorPalette';
import ThemeFontSelector from './ThemeFontSelector';
import ThemeLayoutSettings from './ThemeLayoutSettings';
import ThemePresetSchemes from './ThemePresetSchemes';

interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
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
}

interface ColorScheme {
  name: string;
  scheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

interface ThemeCustomizationFormProps {
  themeSettings: ThemeSettings;
  previewAnimation: boolean;
  activeTab: string;
  isSaved: boolean;
  isDirty: boolean;
  fontOptions: string[];
  colorSchemes: ColorScheme[];
  onTabChange: (tab: string) => void;
  onColorChange: (key: keyof ThemeSettings['colors'], value: string) => void;
  onFontChange: (key: keyof ThemeSettings['fonts'], value: string) => void;
  onBorderRadiusChange: (value: string) => void;
  onSpacingChange: (key: keyof ThemeSettings['spacing'], value: string) => void;
  onSchemeSelect: (scheme: ThemeSettings['colors']) => void;
  onSaveChanges: () => void;
  onResetDefaults: () => void;
}

const tabContentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 10, transition: { duration: 0.2 } }
};

const ThemeCustomizationForm: React.FC<ThemeCustomizationFormProps> = ({
  themeSettings,
  previewAnimation,
  activeTab,
  isSaved,
  isDirty,
  fontOptions,
  colorSchemes,
  onTabChange,
  onColorChange,
  onFontChange,
  onBorderRadiusChange,
  onSpacingChange,
  onSchemeSelect,
  onSaveChanges,
  onResetDefaults
}) => {
  return (
    <Card 
      className="border-2 border-opacity-50 overflow-hidden shadow-md" 
      style={{ borderColor: themeSettings.colors.primary }}
    >
      <CardHeader className="bg-gradient-to-r" style={{ 
        backgroundImage: `linear-gradient(to right, ${themeSettings.colors.primary}10, ${themeSettings.colors.secondary}20)` 
      }}>
        <CardTitle className="flex items-center">
          <Palette className="mr-2 h-5 w-5" style={{ color: themeSettings.colors.primary }} />
          Tema Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <Tabs 
          defaultValue="colors" 
          value={activeTab}
          onValueChange={onTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6 bg-transparent p-0 border rounded-lg overflow-hidden">
            <TabsTrigger 
              value="colors" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:text-white data-[state=active]:shadow py-3 border-r"
              style={{ 
                backgroundImage: activeTab === "colors" ? `linear-gradient(to right, ${themeSettings.colors.primary}, ${themeSettings.colors.secondary})` : undefined
              }}
            >
              <Palette className="h-4 w-4 mr-2 hidden md:inline" />
              <span>Renkler</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="typography" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:text-white data-[state=active]:shadow py-3 border-r"
              style={{ 
                backgroundImage: activeTab === "typography" ? `linear-gradient(to right, ${themeSettings.colors.primary}, ${themeSettings.colors.secondary})` : undefined
              }}
            >
              <Type className="h-4 w-4 mr-2 hidden md:inline" />
              <span>Yazı</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="layout" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:text-white data-[state=active]:shadow py-3 border-r"
              style={{ 
                backgroundImage: activeTab === "layout" ? `linear-gradient(to right, ${themeSettings.colors.primary}, ${themeSettings.colors.secondary})` : undefined
              }}
            >
              <Layout className="h-4 w-4 mr-2 hidden md:inline" />
              <span>Düzen</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="presets" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:text-white data-[state=active]:shadow py-3"
              style={{ 
                backgroundImage: activeTab === "presets" ? `linear-gradient(to right, ${themeSettings.colors.primary}, ${themeSettings.colors.secondary})` : undefined
              }}
            >
              <BookTemplate className="h-4 w-4 mr-2 hidden md:inline" />
              <span>Hazır</span>
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
                <ThemeColorPalette 
                  colors={themeSettings.colors}
                  isAnimating={previewAnimation}
                  onColorChange={onColorChange}
                />
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
                <ThemeFontSelector 
                  fonts={themeSettings.fonts}
                  fontOptions={fontOptions}
                  colors={themeSettings.colors}
                  onFontChange={onFontChange}
                />
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
                <ThemeLayoutSettings 
                  spacing={themeSettings.spacing}
                  borderRadius={themeSettings.borderRadius}
                  colors={themeSettings.colors}
                  onBorderRadiusChange={onBorderRadiusChange}
                  onSpacingChange={onSpacingChange}
                />
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
                <ThemePresetSchemes 
                  colorSchemes={colorSchemes}
                  onSchemeSelect={onSchemeSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
        
        <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={onResetDefaults}
            className="hover:bg-gray-100 transition-colors"
          >
            Varsayılana Döndür
          </Button>
          <Button 
            onClick={onSaveChanges} 
            disabled={!isDirty}
            size="lg"
            className={`relative overflow-hidden group transition-all duration-300 ${
              isDirty ? 'animate-pulse' : ''
            }`}
            style={{
              backgroundColor: isSaved ? themeSettings.colors.primary : themeSettings.colors.primary,
              boxShadow: isDirty ? `0 0 10px ${themeSettings.colors.primary}80` : 'none',
            }}
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
                  className="flex items-center font-medium"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Değişiklikleri Kaydet
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: "#FFFFFF" }}
              initial={false}
              animate={isSaved ? { opacity: 0.2 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCustomizationForm;
