
import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <div className="space-y-6">
      <h3 className="font-medium">Yazı Tipleri</h3>
      {Object.entries(fonts).map(([key, value]) => (
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
            onChange={(e) => onFontChange(key as keyof FontSettings, e.target.value)}
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
                style={{ backgroundColor: colors.primary }}
              >
                Buton Örneği
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ThemeFontSelector;
