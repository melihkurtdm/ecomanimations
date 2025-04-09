
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Paintbrush, Copy, Check } from 'lucide-react';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface ThemeColorPaletteProps {
  colors: ColorScheme;
  isAnimating: boolean;
  onColorChange: (key: keyof ColorScheme, value: string) => void;
}

const colorFadeVariants = {
  initial: { opacity: 0.8 },
  pulse: { 
    opacity: 1,
    scale: [1, 1.05, 1],
    transition: { duration: 0.5, yoyo: 3 }
  }
};

const ThemeColorPalette: React.FC<ThemeColorPaletteProps> = ({ colors, isAnimating, onColorChange }) => {
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colorItems = [
    { key: "primary", label: "Ana Renk", description: "Butonlar, vurgular ve marka kimliği için" },
    { key: "secondary", label: "İkincil Renk", description: "Destekleyici öğeler ve arka planlar için" },
    { key: "accent", label: "Vurgu Rengi", description: "Dikkat çekmek istediğiniz alanlar için" },
    { key: "background", label: "Arka Plan", description: "Sitenizin genel arka plan rengi" },
    { key: "text", label: "Metin Rengi", description: "Okunabilirlik için ana metin rengi" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Paintbrush className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium">Ana Renkler</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colorItems.map(({ key, label, description }) => (
          <motion.div 
            key={key} 
            className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <label className="text-sm font-medium">{label}</label>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
              </div>
              <motion.button
                onClick={() => copyToClipboard(colors[key as keyof ColorScheme])}
                className="p-1 rounded-md hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {copiedColor === colors[key as keyof ColorScheme] ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-3 mt-3">
              <motion.div 
                className="w-12 h-12 rounded-lg border border-gray-200" 
                style={{ backgroundColor: colors[key as keyof ColorScheme] }}
                animate={key === "primary" && isAnimating ? "pulse" : "initial"}
                variants={colorFadeVariants}
              />
              
              <div className="flex-1 flex items-center space-x-2">
                <div className="h-9 overflow-hidden rounded-l-md w-10 border border-r-0 border-gray-200 flex items-center justify-center">
                  <Input
                    type="color"
                    value={colors[key as keyof ColorScheme]}
                    onChange={(e) => onColorChange(key as keyof ColorScheme, e.target.value)}
                    className="w-7 h-7 p-0 border-0"
                  />
                </div>
                <Input
                  type="text"
                  value={colors[key as keyof ColorScheme]}
                  onChange={(e) => onColorChange(key as keyof ColorScheme, e.target.value)}
                  className="flex-1 rounded-l-none h-9"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium mb-3">Renk Önizlemesi</h4>
        <div className="flex flex-wrap gap-3">
          {Object.entries(colors).map(([key, value]) => (
            <motion.div 
              key={key}
              className="relative flex flex-col items-center"
              whileHover={{ y: -2, scale: 1.05 }}
            >
              <div 
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: value }}
              />
              <span className="text-xs mt-1 font-medium">{key}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeColorPalette;
