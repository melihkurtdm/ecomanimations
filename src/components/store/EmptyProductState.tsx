
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';

interface EmptyProductStateProps {
  onAddProduct: () => void;
}

const EmptyProductState = ({ onAddProduct }: EmptyProductStateProps) => {
  return (
    <div className="text-center py-8">
      <Package className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Hiç ürün bulunamadı</h3>
      <p className="text-muted-foreground mt-2">
        Henüz hiç ürün eklemediniz veya arama kriterinize uygun ürün yok.
      </p>
      <Button 
        onClick={onAddProduct} 
        className="mt-4"
      >
        <Plus className="mr-2 h-4 w-4" />
        İlk ürününüzü ekleyin
      </Button>
    </div>
  );
};

export default EmptyProductState;
