
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Check } from 'lucide-react';
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
  onSchemeSelect: (scheme: typeof themeSettings.colors) => void;
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
    <Card className="border-2 border-opacity-50" style={{ borderColor: themeSettings.colors.primary }}>
      <CardHeader>
        <CardTitle>Tema Ayarları</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="colors" 
          value={activeTab}
          onValueChange={onTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="colors" className="flex items-center justify-center">
              <span className="hidden sm:inline">Renkler</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center justify-center">
              <span className="hidden sm:inline">Yazı</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center justify-center">
              <span className="hidden sm:inline">Düzen</span>
            </TabsTrigger>
            <TabsTrigger value="presets" className="flex items-center justify-center">
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
          <Button variant="outline" onClick={onResetDefaults}>
            Varsayılana Döndür
          </Button>
          <Button 
            onClick={onSaveChanges} 
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
  );
};

export default ThemeCustomizationForm;
