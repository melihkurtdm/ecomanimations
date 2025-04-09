
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export interface ThemeItem {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  features: string[];
  color: string;
  badge?: string;
  category: string;
}

interface ThemeCardProps {
  theme: ThemeItem;
  isSelected: boolean;
  onSelect: (themeId: string) => void;
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

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, isSelected, onSelect }) => {
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
        }}
        onClick={() => onSelect(theme.id)}
      >
        <div className="relative overflow-hidden">
          <img 
            src={theme.imageSrc} 
            alt={theme.name} 
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" 
          />
          {theme.badge && (
            <Badge 
              className="absolute top-3 right-3"
              style={{ 
                backgroundColor: theme.color,
                borderColor: theme.color
              }}
            >
              {theme.badge}
            </Badge>
          )}
          {isSelected && (
            <motion.div 
              className="absolute top-3 left-3 bg-white bg-opacity-90 text-brand-purple rounded-full p-1.5 shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <CheckCircle className="h-5 w-5" style={{ color: theme.color }} />
            </motion.div>
          )}
        </div>
        <CardHeader className="pb-2">
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
              className="w-full transition-all duration-300"
              style={{ backgroundColor: `${theme.color}20`, color: theme.color, borderColor: `${theme.color}30` }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Seçildi
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ThemeCard;
