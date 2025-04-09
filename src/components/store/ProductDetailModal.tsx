
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, Package, Tag, Truck, Clock } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  createdAt: Date;
}

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetailModal = ({ product, open, onOpenChange }: ProductDetailModalProps) => {
  if (!product) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Ürün Detayları</DialogTitle>
          <DialogDescription>
            Bu ürünün detaylı bilgilerini ve istatistiklerini görüntüleyin.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/3 bg-gray-100 rounded-xl p-4 flex items-center justify-center">
              <Package className="h-20 w-20 text-muted-foreground" />
            </div>
            
            <div className="w-full sm:w-2/3">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              
              <div className="flex mt-2 gap-2 flex-wrap">
                <Badge variant="outline" className="bg-blue-50">
                  <Tag className="h-3.5 w-3.5 mr-1" />
                  {product.category}
                </Badge>
                <Badge variant="outline" className="bg-green-50">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {formatDate(product.createdAt)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Fiyat</p>
                  <p className="text-lg font-semibold">{product.price.toFixed(2)} ₺</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Stok</p>
                  <p className="text-lg font-semibold">{product.stock} adet</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Ürün Açıklaması</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {product.description ? (
                <p>{product.description}</p>
              ) : (
                <p className="text-gray-500 italic">Bu ürün için açıklama girilmemiş.</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-blue-50 p-4 rounded-lg"
            >
              <div className="flex gap-2 items-center text-blue-600 mb-2">
                <Calendar className="h-5 w-5" />
                <h3 className="font-medium">Eklenme Tarihi</h3>
              </div>
              <p>{formatDate(product.createdAt)}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-green-50 p-4 rounded-lg"
            >
              <div className="flex gap-2 items-center text-green-600 mb-2">
                <Truck className="h-5 w-5" />
                <h3 className="font-medium">Kargo Durumu</h3>
              </div>
              <p>{product.stock > 0 ? 'Hemen Kargoya Verilir' : 'Stokta Yok'}</p>
            </motion.div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <DialogClose asChild>
            <Button variant="outline">Kapat</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
