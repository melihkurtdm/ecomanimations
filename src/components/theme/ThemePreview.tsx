
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Bookmark, CheckCircle2 } from 'lucide-react';

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

interface ThemePreviewProps {
  themeSettings: ThemeSettings;
  previewAnimation: boolean;
  isSaved: boolean;
  isPublished: boolean;
  onRefreshPreview: () => void;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({
  themeSettings,
  previewAnimation,
  isSaved,
  isPublished,
  onRefreshPreview
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tema Ön İzleme</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRefreshPreview}
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
  );
};

export default ThemePreview;
