
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

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
  initial: { backgroundColor: "rgba(139, 92, 246, 0.5)" },
  pulse: { 
    backgroundColor: "rgba(139, 92, 246, 1)",
    transition: { duration: 0.3, yoyo: 3 }
  }
};

const ThemeColorPalette: React.FC<ThemeColorPaletteProps> = ({ colors, isAnimating, onColorChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Ana Renkler</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(colors).map(([key, value]) => (
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
                animate={key === "primary" && isAnimating ? "pulse" : "initial"}
                variants={colorFadeVariants}
              />
              <Input
                type="color"
                value={value}
                onChange={(e) => onColorChange(key as keyof ColorScheme, e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={value}
                onChange={(e) => onColorChange(key as keyof ColorScheme, e.target.value)}
                className="w-28"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ThemeColorPalette;
