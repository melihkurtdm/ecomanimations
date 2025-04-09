
import React from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Type, ChevronDown } from 'lucide-react';

interface FontSettings {
  heading: string;
  body: string;
  button: string;
}

interface ThemeFontSelectorProps {
  fonts: FontSettings;
  fontOptions: string[];
  colors: { primary: string };
  onFontChange: (key: keyof FontSettings, value: string) => void;
}

const ThemeFontSelector: React.FC<ThemeFontSelectorProps> = ({ 
  fonts, 
  fontOptions,
  colors,
  onFontChange 
}) => {
  const fontItems = [
    { 
      key: "heading", 
      label: "Başlık Yazı Tipi", 
      description: "H1, H2, H3 gibi tüm başlıklar için kullanılır",
      example: "Başlık Örneği"
    },
    { 
      key: "body", 
      label: "Metin Yazı Tipi", 
      description: "Paragraflar ve genel metin içeriği için kullanılır",
      example: "Bu bir metin örneğidir. Mağazanızdaki tüm paragraflar ve genel metinler bu yazı tipi ile görüntülenecektir. İyi bir okunabilirlik sağlamak önemlidir."
    },
    { 
      key: "button", 
      label: "Buton Yazı Tipi", 
      description: "Butonlar ve çağrı öğeleri için kullanılır",
      example: "SEPETE EKLE"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Type className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium">Yazı Tipleri</h3>
      </div>
      
      <div className="space-y-6">
        {fontItems.map((item) => (
          <motion.div 
            key={item.key} 
            className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-3">
              <label className="text-sm font-medium">{item.label}</label>
              <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
            </div>
            
            <Select
              value={fonts[item.key as keyof FontSettings]}
              onValueChange={(value) => onFontChange(item.key as keyof FontSettings, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Yazı tipi seçin" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div 
              className="mt-4 p-4 bg-gray-50 rounded-lg overflow-hidden"
              style={{ 
                fontFamily: fonts[item.key as keyof FontSettings],
              }}
            >
              {item.key === "heading" && (
                <h3 
                  className="text-xl font-bold"
                  style={{ 
                    color: colors.primary 
                  }}
                >
                  {item.example}
                </h3>
              )}
              
              {item.key === "body" && (
                <p className="text-sm">
                  {item.example}
                </p>
              )}
              
              {item.key === "button" && (
                <button 
                  className="px-4 py-2 text-white text-sm rounded-md"
                  style={{ 
                    backgroundColor: colors.primary,
                    fontFamily: fonts.button,
                  }}
                >
                  {item.example}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 p-4 border border-gray-100 rounded-lg bg-gray-50">
        <h4 className="text-sm font-medium mb-3">Yazı Tipi Kombinasyonu Önizlemesi</h4>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h2 
            className="text-lg font-bold mb-2"
            style={{ 
              fontFamily: fonts.heading,
              color: colors.primary 
            }}
          >
            Mağaza Başlığı
          </h2>
          <p 
            className="text-sm mb-3"
            style={{ fontFamily: fonts.body }}
          >
            Bu metin gövde yazı tipi kullanır. İyi seçilmiş bir yazı tipi kombinasyonu, markanızın profesyonelliğini yansıtır ve kullanıcı deneyimini iyileştirir.
          </p>
          <button 
            className="px-3 py-1.5 text-white text-xs rounded-md"
            style={{ 
              backgroundColor: colors.primary,
              fontFamily: fonts.button
            }}
          >
            DETAYLAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeFontSelector;
