
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  createdAt: Date;
}

interface ProductCardProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
}

const ProductCard = ({ product, onEdit, onDelete, onView }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full border border-gray-200 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 flex flex-col h-full">
            <div className="flex-1">
              <div className="bg-gray-100 h-32 rounded-md flex items-center justify-center mb-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Package
                    className="h-12 w-12 text-gray-400"
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
              
              <div className="mb-2">
                <Badge variant="outline" className="bg-gray-50 text-xs">
                  {product.category}
                </Badge>
              </div>
              
              <h3 className="font-medium text-lg mb-1 line-clamp-2">{product.name}</h3>
              
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-lg">{product.price.toFixed(2)} ₺</p>
                <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} adet` : 'Stokta yok'}
                </p>
              </div>
              
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {product.description || 'Bu ürün için açıklama girilmemiş.'}
              </p>
            </div>
            
            <div className="flex justify-between gap-2 mt-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onView(product)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Detay
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ürün detaylarını görüntüle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(product.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Düzenle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sil</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Missing import for Package icon, let's add it
import { Package } from 'lucide-react';

export default ProductCard;
