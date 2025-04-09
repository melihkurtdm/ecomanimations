
import React from 'react';
import { 
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Grid3X3, List, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface StoreHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  onAddProduct: () => void;
}

const StoreHeader = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAddProduct
}: StoreHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Mağaza Ürün Yönetimi
        </motion.h1>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={onAddProduct}
            className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple hover:to-brand-purple transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni Ürün Ekle
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Ürün Arama</CardTitle>
                <CardDescription>İsim veya kategori ile ürünlerinizi arayın</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => onViewModeChange('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => onViewModeChange('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ürün ara..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default StoreHeader;
