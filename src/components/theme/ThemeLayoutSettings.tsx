
import React from 'react';
import { motion } from 'framer-motion';

interface SpacingSettings {
  section: string;
  element: string;
}

interface ThemeLayoutSettingsProps {
  spacing: SpacingSettings;
  borderRadius: string;
  colors: { primary: string };
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
      <h3 className="font-medium">Boşluklar ve Kenarlar</h3>
      <div className="space-y-4">
        <motion.div whileHover={{ scale: 1.01 }}>
          <label className="text-sm font-medium">Köşe Yuvarlaklığı</label>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={parseFloat(borderRadius)}
              onChange={(e) => onBorderRadiusChange(e.target.value)}
              className="w-full"
            />
            <span>{borderRadius}</span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <motion.div 
              className="w-16 h-16" 
              style={{ 
                backgroundColor: colors.primary,
                borderRadius: `${parseFloat(borderRadius) * 0.25}rem` 
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className="w-16 h-16" 
              style={{ 
                backgroundColor: colors.primary,
                borderRadius: `${parseFloat(borderRadius) * 0.5}rem` 
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className="w-16 h-16" 
              style={{ 
                backgroundColor: colors.primary,
                borderRadius: `${parseFloat(borderRadius)}rem` 
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
        
        {Object.entries(spacing).map(([key, value]) => (
          <motion.div key={key} whileHover={{ scale: 1.01 }}>
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
                onChange={(e) => onSpacingChange(key as keyof SpacingSettings, e.target.value)}
                className="w-full"
              />
              <span>{value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ThemeLayoutSettings;
