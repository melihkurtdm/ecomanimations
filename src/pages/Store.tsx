
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import StoreHeader from '@/components/store/StoreHeader';
import ProductListView from '@/components/store/ProductListView';
import ProductGridView from '@/components/store/ProductGridView';
import ProductDetailModal from '@/components/store/ProductDetailModal';
import ProductAddDialog from '@/components/store/ProductAddDialog';
import ProductEditDialog from '@/components/store/ProductEditDialog';
import ProductDeleteDialog from '@/components/store/ProductDeleteDialog';

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

interface ProductFormValues {
  id?: string;
  name: string;
  price: string;
  stock: string;
  category: string;
  description: string;
}

const Store = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showDetailModal, setShowDetailModal] = useState(false);
  
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
    {
      id: '3',
      name: 'Premium Laptop Standı',
      price: 349.99,
      stock: 15,
      category: 'Elektronik',
      description: 'Ergonomik tasarımlı, ayarlanabilir yükseklikte laptop standı.',
      createdAt: new Date('2023-03-10')
    },
    {
      id: '4',
      name: 'Akıllı Saat',
      price: 899.99,
      stock: 8,
      category: 'Elektronik',
      description: 'Nabız ölçme, adım sayma ve bildirim alma özellikleri ile tam donanımlı akıllı saat.',
      createdAt: new Date('2023-03-25')
    },
  ]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const handleViewProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowDetailModal(true);
  };

  const handleAddProduct = () => {
    setShowAddDialog(true);
  };

  const handleEditProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setCurrentProduct(product);
      setShowEditDialog(true);
    }
  };

  const handleDeleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setCurrentProduct(product);
      setShowDeleteConfirm(true);
    }
  };

  const confirmDelete = () => {
    if (currentProduct) {
      setProducts(products.filter(product => product.id !== currentProduct.id));
      toast.success('Ürün başarıyla silindi');
      setShowDeleteConfirm(false);
      setCurrentProduct(null);
    }
  };

  const onAddSubmit = (data: ProductFormValues) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: data.name,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      category: data.category,
      description: data.description,
      createdAt: new Date()
    };
    
    setProducts([...products, newProduct]);
    toast.success('Yeni ürün başarıyla eklendi');
    setShowAddDialog(false);
  };

  const onEditSubmit = (data: ProductFormValues) => {
    if (currentProduct) {
      const updatedProducts = products.map((product) => 
        product.id === currentProduct.id
          ? {
              ...product,
              name: data.name,
              price: parseFloat(data.price),
              stock: parseInt(data.stock),
              category: data.category,
              description: data.description,
            }
          : product
      );
      
      setProducts(updatedProducts);
      toast.success('Ürün başarıyla güncellendi');
      setShowEditDialog(false);
      setCurrentProduct(null);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      <StoreHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddProduct={handleAddProduct}
      />

      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <ProductListView 
            key="list-view"
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
            onAddProduct={handleAddProduct}
          />
        ) : (
          <ProductGridView 
            key="grid-view"
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
            onAddProduct={handleAddProduct}
          />
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={currentProduct} 
        open={showDetailModal} 
        onOpenChange={setShowDetailModal} 
      />

      {/* Add Product Dialog */}
      <ProductAddDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog} 
        onSubmit={onAddSubmit} 
      />

      {/* Edit Product Dialog */}
      <ProductEditDialog 
        product={currentProduct} 
        open={showEditDialog} 
        onOpenChange={setShowEditDialog} 
        onSubmit={onEditSubmit} 
      />

      {/* Delete Confirmation Dialog */}
      <ProductDeleteDialog 
        product={currentProduct} 
        open={showDeleteConfirm} 
        onOpenChange={setShowDeleteConfirm} 
        onConfirmDelete={confirmDelete} 
      />
    </motion.div>
  );
};

export default Store;
