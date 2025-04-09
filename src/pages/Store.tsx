
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2 
} from 'lucide-react';

// Sample product data structure
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  createdAt: Date;
}

const Store = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Test Ürün 1',
      price: 199.99,
      stock: 25,
      category: 'Elektronik',
      description: 'Bu bir test ürünüdür.',
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'Test Ürün 2',
      price: 299.99,
      stock: 10,
      category: 'Giyim',
      description: 'Bu başka bir test ürünüdür.',
      createdAt: new Date('2023-02-20')
    },
  ]);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const handleAddProduct = () => {
    // In a real application, this would open a modal or navigate to an add product form
    console.log('Add product clicked');
  };

  const handleEditProduct = (id: string) => {
    console.log('Edit product with ID:', id);
  };

  const handleDeleteProduct = (id: string) => {
    console.log('Delete product with ID:', id);
    // In a real application, this would show a confirmation dialog
    setProducts(products.filter(product => product.id !== id));
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mağaza Ürün Yönetimi</h1>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Ürün Ekle
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ürün Arama</CardTitle>
          <CardDescription>İsim veya kategori ile ürünlerinizi arayın</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ürün ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ürünlerim</CardTitle>
          <CardDescription>Mağazanızdaki tüm ürünleri yönetin</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProducts.length > 0 ? (
            <Table>
              <TableCaption>Toplam {filteredProducts.length} ürün</TableCaption>
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
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price.toFixed(2)} ₺</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.createdAt.toLocaleDateString('tr-TR')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Hiç ürün bulunamadı</h3>
              <p className="text-muted-foreground mt-2">
                Henüz hiç ürün eklemediniz veya arama kriterinize uygun ürün yok.
              </p>
              <Button 
                onClick={handleAddProduct} 
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                İlk ürününüzü ekleyin
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Store;
