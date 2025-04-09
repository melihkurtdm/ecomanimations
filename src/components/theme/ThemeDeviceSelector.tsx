
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Smartphone, Tablet, Monitor, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface ThemeDeviceSelectorProps {
  activeDevice: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  onRotate: () => void;
  isRotated: boolean;
}

const ThemeDeviceSelector: React.FC<ThemeDeviceSelectorProps> = ({
  activeDevice,
  onDeviceChange,
  onRotate,
  isRotated
}) => {
  return (
    <div className="flex items-center justify-center bg-white shadow-sm border rounded-full p-1 mb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDeviceChange('mobile')}
        className={cn(
          "rounded-full px-3 relative",
          activeDevice === 'mobile' && "bg-gray-100"
        )}
      >
        <Smartphone className="h-4 w-4" />
        <span className="ml-2 text-xs font-medium">Mobil</span>
        {activeDevice === 'mobile' && (
          <motion.div
            layoutId="activeDevice"
            className="absolute inset-0 bg-gray-100 rounded-full -z-10"
            initial={false}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDeviceChange('tablet')}
        className={cn(
          "rounded-full px-3 relative",
          activeDevice === 'tablet' && "bg-gray-100"
        )}
      >
        <Tablet className="h-4 w-4" />
        <span className="ml-2 text-xs font-medium">Tablet</span>
        {activeDevice === 'tablet' && (
          <motion.div
            layoutId="activeDevice"
            className="absolute inset-0 bg-gray-100 rounded-full -z-10"
            initial={false}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDeviceChange('desktop')}
        className={cn(
          "rounded-full px-3 relative",
          activeDevice === 'desktop' && "bg-gray-100"
        )}
      >
        <Monitor className="h-4 w-4" />
        <span className="ml-2 text-xs font-medium">Masaüstü</span>
        {activeDevice === 'desktop' && (
          <motion.div
            layoutId="activeDevice"
            className="absolute inset-0 bg-gray-100 rounded-full -z-10"
            initial={false}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </Button>
      
      {activeDevice !== 'desktop' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRotate}
          className="rounded-full w-8 h-8 p-0 ml-2"
          title={isRotated ? "Dikey görünüme geç" : "Yatay görünüme geç"}
        >
          <RotateCw 
            className={cn(
              "h-4 w-4 transition-transform",
              isRotated && "rotate-90"
            )} 
          />
        </Button>
      )}
    </div>
  );
};

export default ThemeDeviceSelector;
