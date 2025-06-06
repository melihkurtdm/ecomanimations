
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Layout, MinusCircle, PlusCircle, Move, LayoutGrid } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface SpacingSettings {
  section: string;
  element: string;
}

interface ThemeLayoutSettingsProps {
  spacing: SpacingSettings;
  borderRadius: string;
  colors: {
    primary: string;
    secondary: string;
  };
  onBorderRadiusChange: (value: string) => void;
  onSpacingChange: (key: keyof SpacingSettings, value: string) => void;
}

const ThemeLayoutSettings: React.FC<ThemeLayoutSettingsProps> = ({
  spacing,
  borderRadius,
  colors,
  onBorderRadiusChange,
  onSpacingChange
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Layout className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium">Boşluklar ve Kenarlar</h3>
      </div>
      
      <Tabs defaultValue="borders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="borders" className="text-sm">Kenarlar</TabsTrigger>
          <TabsTrigger value="spacing" className="text-sm">Boşluklar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="borders" className="space-y-4">
          <motion.div 
            className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-2">
              <label className="text-sm font-medium">Köşe Yuvarlaklığı</label>
              <p className="text-xs text-gray-500 mt-0.5">Butonlar, kartlar ve diğer öğeler için yuvarlaklık derecesi</p>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <MinusCircle className="text-gray-400 h-4 w-4 cursor-pointer hover:text-gray-600" 
                onClick={() => onBorderRadiusChange(Math.max(0, parseFloat(borderRadius) - 0.1).toFixed(1))}
              />
              <Slider
                value={[parseFloat(borderRadius)]}
                min={0}
                max={2}
                step={0.1}
                onValueChange={(value) => onBorderRadiusChange(value[0].toString())}
                className="flex-1"
              />
              <PlusCircle className="text-gray-400 h-4 w-4 cursor-pointer hover:text-gray-600"
                onClick={() => onBorderRadiusChange(Math.min(2, parseFloat(borderRadius) + 0.1).toFixed(1))}
              />
              <span className="w-12 text-center text-sm font-medium">{borderRadius}rem</span>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <motion.div 
                className="w-16 h-16 flex items-center justify-center bg-white border border-gray-200 shadow-sm" 
                style={{ 
                  backgroundColor: colors.primary,
                  borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
                }}
                animate={{ scale: [1, 1.03, 1], borderRadius: `${parseFloat(borderRadius) * 0.25}rem` }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="text-xs text-white">0.25x</span>
              </motion.div>
              <motion.div 
                className="w-16 h-16 flex items-center justify-center bg-white border border-gray-200 shadow-sm" 
                style={{ 
                  backgroundColor: colors.primary,
                  borderRadius: `${parseFloat(borderRadius) * 0.5}rem` 
                }}
                animate={{ scale: [1, 1.03, 1], borderRadius: `${parseFloat(borderRadius) * 0.5}rem` }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
              >
                <span className="text-xs text-white">0.5x</span>
              </motion.div>
              <motion.div 
                className="w-16 h-16 flex items-center justify-center bg-white border border-gray-200 shadow-sm" 
                style={{ 
                  backgroundColor: colors.primary,
                  borderRadius: `${parseFloat(borderRadius)}rem` 
                }}
                animate={{ scale: [1, 1.03, 1], borderRadius: `${parseFloat(borderRadius)}rem` }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
              >
                <span className="text-xs text-white">1x</span>
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-6">
              <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5].map(value => (
                  <Button 
                    key={value}
                    variant={parseFloat(borderRadius) === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onBorderRadiusChange(value.toString())}
                    className="text-xs"
                  >
                    {value}rem
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="p-3 bg-gray-50 rounded-lg mt-3 border border-gray-100">
            <div className="flex flex-col space-y-3">
              <h4 className="text-sm font-medium mb-2 text-gray-700">Önizleme</h4>
              <div className="flex items-center justify-center">
                <div 
                  className="w-20 h-20 mr-3 flex items-center justify-center shadow-sm"
                  style={{ 
                    backgroundColor: colors.primary,
                    borderRadius: `${parseFloat(borderRadius)}rem` 
                  }}
                >
                  <LayoutGrid className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2 flex-1">
                  <div 
                    className="h-3 w-full rounded"
                    style={{ 
                      backgroundColor: colors.secondary + "50",
                      borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
                    }}
                  ></div>
                  <div 
                    className="h-3 w-3/4 rounded"
                    style={{ 
                      backgroundColor: colors.secondary + "50",
                      borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
                    }}
                  ></div>
                  <div 
                    className="h-3 w-1/2 rounded"
                    style={{ 
                      backgroundColor: colors.secondary + "50",
                      borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="spacing" className="space-y-4">
          {Object.entries(spacing).map(([key, value], index) => (
            <motion.div 
              key={key}
              className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <div className="mb-2">
                <label className="text-sm font-medium">
                  {key === "section" ? "Bölüm Aralığı" : "Öğe Aralığı"}
                </label>
                <p className="text-xs text-gray-500 mt-0.5">
                  {key === "section" 
                    ? "Ana bölümler arasındaki boşluk" 
                    : "Liste öğeleri ve kartlar gibi öğeler arasındaki boşluk"}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <MinusCircle 
                  className="text-gray-400 h-4 w-4 cursor-pointer hover:text-gray-600" 
                  onClick={() => onSpacingChange(
                    key as keyof SpacingSettings, 
                    Math.max(0.5, parseFloat(value) - 0.1).toFixed(1)
                  )}
                />
                <Slider
                  value={[parseFloat(value)]}
                  min={0.5}
                  max={4}
                  step={0.1}
                  onValueChange={(val) => onSpacingChange(key as keyof SpacingSettings, val[0].toString())}
                  className="flex-1"
                />
                <PlusCircle 
                  className="text-gray-400 h-4 w-4 cursor-pointer hover:text-gray-600"
                  onClick={() => onSpacingChange(
                    key as keyof SpacingSettings, 
                    Math.min(4, parseFloat(value) + 0.1).toFixed(1)
                  )}
                />
                <span className="w-12 text-center text-sm font-medium">{value}rem</span>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg mt-3">
                <div className="flex flex-col items-center">
                  {key === "section" ? (
                    <>
                      <div className="w-full h-10 bg-gray-200 rounded mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Bölüm 1</span>
                      </div>
                      <div 
                        className="w-full bg-blue-50 rounded flex items-center justify-center"
                        style={{ 
                          height: `${parseFloat(value) * 16}px`,
                          backgroundColor: `${colors.primary}20`
                        }}
                      >
                        <span className="text-xs">{value}rem</span>
                      </div>
                      <div className="w-full h-10 bg-gray-200 rounded mt-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Bölüm 2</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full">
                      <div className="flex items-center">
                        <div className="w-1/4 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">Öğe</span>
                        </div>
                        <div 
                          className="bg-blue-50 rounded flex items-center justify-center"
                          style={{ 
                            width: `${parseFloat(value) * 16}px`,
                            height: "24px",
                            backgroundColor: `${colors.primary}20`
                          }}
                        >
                          <span className="text-xs transform">{value}rem</span>
                        </div>
                        <div className="w-1/4 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">Öğe</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
                  {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map(size => (
                    <Button 
                      key={size}
                      variant={parseFloat(value) === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => onSpacingChange(key as keyof SpacingSettings, size.toString())}
                      className="text-xs"
                    >
                      {size}rem
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 p-4 border border-gray-100 rounded-lg bg-gray-50">
        <h4 className="text-sm font-medium mb-3">Ayarların Genel Etkisi</h4>
        <div className="grid grid-cols-2 gap-3">
          <div 
            className="bg-white p-3 rounded-lg border border-gray-200"
            style={{ 
              borderRadius: `${parseFloat(borderRadius) * 0.5}rem` 
            }}
          >
            <div 
              className="h-3 w-1/2 mb-3 rounded"
              style={{ 
                backgroundColor: colors.primary,
                borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
              }}
            ></div>
            <div 
              className="h-2 w-3/4 mb-3 rounded"
              style={{ 
                backgroundColor: `${colors.secondary}50`,
                borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
              }}
            ></div>
            <div 
              className="h-8 flex items-center justify-center rounded text-white text-xs mt-4"
              style={{ 
                backgroundColor: colors.primary,
                borderRadius: `${parseFloat(borderRadius) * 0.5}rem` 
              }}
            >
              Buton
            </div>
          </div>
          <div 
            className="bg-white p-3 rounded-lg border border-gray-200"
            style={{ 
              borderRadius: `${parseFloat(borderRadius) * 0.5}rem` 
            }}
          >
            <div className="flex flex-col space-y-2" style={{ gap: `${parseFloat(spacing.element)}rem` }}>
              <div 
                className="h-2 w-full rounded"
                style={{ 
                  backgroundColor: `${colors.secondary}50`,
                  borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
                }}
              ></div>
              <div 
                className="h-2 w-2/3 rounded"
                style={{ 
                  backgroundColor: `${colors.secondary}50`,
                  borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
                }}
              ></div>
              <div 
                className="h-2 w-1/3 rounded"
                style={{ 
                  backgroundColor: `${colors.secondary}50`,
                  borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg mt-4 text-sm text-blue-700">
        <div className="flex items-start">
          <Move className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <p>
            <strong>İpucu:</strong> Sürükle ve bırak özelliği ile sayfa yapınızı istediğiniz gibi düzenleyebilirsiniz. 
            Temalarınızı daha da özelleştirmek için diğer sekmeleri kullanın.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeLayoutSettings;
