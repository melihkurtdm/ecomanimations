
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import ProductCard from './ProductCard';
import EmptyProductState from './EmptyProductState';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  createdAt: Date;
}

interface ProductGridViewProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
  onAddProduct: () => void;
}

const ProductGridView = ({
  products,
  onEdit,
  onDelete,
  onView,
  onAddProduct
}: ProductGridViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Ürünlerim</CardTitle>
          <CardDescription>Mağazanızdaki tüm ürünleri yönetin</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                />
              ))}
            </div>
          ) : (
            <EmptyProductState onAddProduct={onAddProduct} />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductGridView;
