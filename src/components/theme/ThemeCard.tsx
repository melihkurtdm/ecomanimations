
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export interface ThemeItem {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  features: string[];
  color: string;
  badge?: string;
  category: string;
  previewUrl?: string;
  designStyle?: string;
  layout?: string;
  customStyles?: {
    cardBorderRadius?: string;
    buttonStyle?: string;
    headerStyle?: string;
  };
}

interface ThemeCardProps {
  theme: ThemeItem;
  isSelected: boolean;
  onSelect: (themeId: string) => void;
  onPreview?: (themeId: string) => void;
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

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, isSelected, onSelect, onPreview }) => {
  // Get theme custom styles or use defaults
  const borderRadius = theme.customStyles?.cardBorderRadius || '0.5rem';
  const buttonStyle = theme.customStyles?.buttonStyle || '';
  const headerStyle = theme.customStyles?.headerStyle || '';
  
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card 
        className={`overflow-hidden cursor-pointer transition-all duration-300 ${
          isSelected 
            ? 'ring-2 ring-offset-2 shadow-lg' 
            : 'hover:shadow-md'
        }`}
        style={{ 
          borderColor: isSelected ? theme.color : undefined,
          borderRadius
        }}
        onClick={() => onSelect(theme.id)}
      >
        <div className="relative overflow-hidden group">
          <img 
            src={theme.imageSrc} 
            alt={theme.name} 
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          
          {/* Theme badge */}
          {theme.badge && (
            <Badge 
              className="absolute top-3 right-3 z-10"
              style={{ 
                backgroundColor: theme.color,
                borderColor: theme.color
              }}
            >
              {theme.badge}
            </Badge>
          )}
          
          {/* Selected indicator */}
          {isSelected && (
            <motion.div 
              className="absolute top-3 left-3 bg-white bg-opacity-90 text-brand-purple rounded-full p-1.5 shadow-lg z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <CheckCircle className="h-5 w-5" style={{ color: theme.color }} />
            </motion.div>
          )}
          
          {/* Preview overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            {onPreview && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="bg-white text-gray-800 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreview(theme.id);
                      }}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Önizle
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Temayı önizle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        
        <CardHeader className={`pb-2 ${headerStyle}`}>
          <CardTitle className="flex items-center justify-between">
            <span>{theme.name}</span>
            <span className="h-4 w-4 rounded-full" style={{ backgroundColor: theme.color }}></span>
          </CardTitle>
          <CardDescription>{theme.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2">
            {theme.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="h-4 w-4 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${theme.color}20` }}>
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.color }}></div>
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          {isSelected && (
            <Button 
              variant="secondary" 
              className={`w-full transition-all duration-300 ${buttonStyle}`}
              style={{ backgroundColor: `${theme.color}20`, color: theme.color, borderColor: `${theme.color}30` }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Seçildi
            </Button>
          )}
          
          {!isSelected && theme.previewUrl && (
            <Button 
              variant="outline" 
              size="sm"
              className={`w-full text-gray-600 ${buttonStyle}`}
              onClick={(e) => {
                e.stopPropagation();
                window.open(theme.previewUrl, '_blank');
              }}
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Demo
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ThemeCard;
