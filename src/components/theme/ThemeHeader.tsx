
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Palette, EyeIcon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface ThemeHeaderProps {
  title: string;
  description: string;
  onBack: () => void;
  previewMode: boolean;
  onTogglePreview: () => void;
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

const ThemeHeader: React.FC<ThemeHeaderProps> = ({ 
  title, 
  description, 
  onBack, 
  previewMode, 
  onTogglePreview 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <motion.h1 
          variants={itemVariants}
          className="text-2xl font-bold"
        >
          {title}
        </motion.h1>
        <motion.p 
          variants={itemVariants} 
          className="text-gray-600 mt-2"
        >
          {description}
        </motion.p>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Dashboard'a Dön
        </Button>
        
        <AnimatePresence mode="wait">
          {previewMode ? (
            <motion.div
              key="editMode"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                onClick={onTogglePreview}
                className="flex items-center"
              >
                <Palette className="h-4 w-4 mr-2" />
                Düzenleme Modu
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="previewMode"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                onClick={onTogglePreview}
                className="flex items-center"
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                Ön İzleme
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeHeader;
