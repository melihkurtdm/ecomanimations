
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeItem } from './ThemeCard';

interface ThemePreviewModalProps {
  theme: ThemeItem | null;
  onClose: () => void;
}

const ThemePreviewModal: React.FC<ThemePreviewModalProps> = ({ theme, onClose }) => {
  if (!theme) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-white w-full max-w-5xl rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">
            {theme.name} Teması Önizleme
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
          >
            Kapat
          </Button>
        </div>
        <div className="p-4 h-[70vh] overflow-auto">
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={theme.imageSrc} 
              alt="Tema Önizleme" 
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreviewModal;
