
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Star, LayoutList, Zap } from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface ThemeCategoriesProps {
  categories: CategoryItem[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const ThemeCategories: React.FC<ThemeCategoriesProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <TabsList className="bg-transparent">
      {categories.map((category) => (
        <TabsTrigger 
          key={category.id}
          value={category.id}
          onClick={() => onCategoryChange(category.id)}
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <div className="flex items-center">
            {category.icon}
            <span className="ml-2">{category.name}</span>
          </div>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default ThemeCategories;
