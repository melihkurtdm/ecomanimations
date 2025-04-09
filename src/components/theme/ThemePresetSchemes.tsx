
import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Hazır Tema Şemaları</h3>
      <div className="grid grid-cols-2 gap-4">
        {colorSchemes.map((scheme, index) => (
          <motion.button
            key={index}
            onClick={() => onSchemeSelect(scheme.scheme)}
            className="p-4 border border-gray-200 rounded-md hover:border-brand-purple transition-colors"
            whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="font-medium mb-2">{scheme.name}</h4>
            <div className="flex space-x-2">
              {Object.values(scheme.scheme).map((color, i) => (
                <motion.div
                  key={i}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ThemePresetSchemes;
