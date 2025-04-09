
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye } from 'lucide-react';
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

interface ProductListViewProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
  onAddProduct: () => void;
}

const ProductListView = ({
  products,
  onEdit,
  onDelete,
  onView,
  onAddProduct
}: ProductListViewProps) => {
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
            <Table>
              <TableCaption>Toplam {products.length} ürün</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Ürün Adı</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Fiyat</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Eklenme Tarihi</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.price.toFixed(2)} ₺</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.createdAt.toLocaleDateString('tr-TR')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onView(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onEdit(product.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyProductState onAddProduct={onAddProduct} />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductListView;
