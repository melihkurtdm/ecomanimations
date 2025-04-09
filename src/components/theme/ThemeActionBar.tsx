
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Palette, Settings } from 'lucide-react';

interface ThemeActionBarProps {
  selectedTheme: string | null;
  onCustomize: () => void;
  onContinue: () => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const ThemeActionBar: React.FC<ThemeActionBarProps> = ({ 
  selectedTheme, 
  onCustomize, 
  onContinue 
}) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 sticky bottom-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md z-10"
    >
      <Button 
        variant="outline"
        size="lg" 
        onClick={onCustomize}
        disabled={!selectedTheme}
        className="flex-1 group"
      >
        <Settings className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
        Bu Temayı Özelleştir
      </Button>
      
      <Button 
        size="lg" 
        onClick={onContinue}
        disabled={!selectedTheme}
        className="flex-1 group"
      >
        <Palette className="mr-2 h-5 w-5" />
        Bu Temayı Seç ve Devam Et
        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default ThemeActionBar;
