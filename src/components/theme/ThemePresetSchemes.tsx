
import React from 'react';
import { motion } from 'framer-motion';
import { BookTemplate, Check } from 'lucide-react';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface ColorSchemeOption {
  name: string;
  scheme: ColorScheme;
}

interface ThemePresetSchemesProps {
  colorSchemes: ColorSchemeOption[];
  onSchemeSelect: (scheme: ColorScheme) => void;
}

const ThemePresetSchemes: React.FC<ThemePresetSchemesProps> = ({ colorSchemes, onSchemeSelect }) => {
  const [activeScheme, setActiveScheme] = React.useState<string | null>(null);
  
  const handleSchemeSelect = (scheme: ColorScheme, name: string) => {
    onSchemeSelect(scheme);
    setActiveScheme(name);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BookTemplate className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium">Hazır Tema Şemaları</h3>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        Hazır tema şemaları ile mağazanızın görünümünü hızlıca değiştirebilirsiniz. Bir şema seçin ve özelleştirmeye başlayın.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colorSchemes.map((scheme, index) => (
          <motion.button
            key={index}
            onClick={() => handleSchemeSelect(scheme.scheme, scheme.name)}
            className={`p-4 border rounded-lg hover:shadow-md transition-all relative overflow-hidden ${
              activeScheme === scheme.name 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-gray-200'
            }`}
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-base">{scheme.name}</h4>
              {activeScheme === scheme.name && (
                <span className="bg-blue-500 text-white p-1 rounded-full">
                  <Check className="h-3 w-3" />
                </span>
              )}
            </div>
            
            <div 
              className="h-24 w-full mb-3 rounded-lg overflow-hidden" 
              style={{ 
                background: `linear-gradient(135deg, ${scheme.scheme.primary}, ${scheme.scheme.secondary})`
              }}
            >
              <div className="h-full w-full p-3 flex flex-col justify-between">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
                  <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
                  <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
                </div>
                <div>
                  <div 
                    className="h-5 w-16 rounded-full mt-1"
                    style={{ backgroundColor: scheme.scheme.accent }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {Object.entries(scheme.scheme).map(([key, color]) => (
                <div key={key} className="flex flex-col items-center">
                  <motion.div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="text-[10px] mt-1 text-gray-500">{key.slice(0, 3)}</span>
                </div>
              ))}
            </div>
            
            {/* Preview examples */}
            <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
              <div 
                className="h-6 w-16 rounded flex items-center justify-center text-[9px] text-white"
                style={{ 
                  backgroundColor: scheme.scheme.primary,
                }}
              >
                Buton
              </div>
              <div
                className="h-6 px-2 rounded flex items-center justify-center text-[9px]"
                style={{ 
                  backgroundColor: `${scheme.scheme.secondary}30`,
                  color: scheme.scheme.text
                }}
              >
                Etiket
              </div>
              <div 
                className="h-6 w-6 rounded-full flex items-center justify-center text-[9px]"
                style={{ 
                  backgroundColor: scheme.scheme.accent,
                  color: "#fff"
                }}
              >
                <span>+</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <h4 className="text-sm font-medium mb-2">Pro İpucu</h4>
        <p className="text-xs text-gray-600">
          Hazır bir şema seçtikten sonra renkler ve diğer özellikler üzerinde daha fazla düzenleme yapabilirsiniz. 
          Şemalar, hızlı bir başlangıç ​​noktası sağlayarak mağazanızı profesyonel görünüme kavuşturur.
        </p>
      </motion.div>
    </div>
  );
};

export default ThemePresetSchemes;
