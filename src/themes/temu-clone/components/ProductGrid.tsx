import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// Dummy product data
const dummyProducts = [
  {
    id: '1',
    name: 'Akıllı Telefon X Pro',
    price: 12999,
    originalPrice: 14999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    discount: 13
  },
  {
    id: '2',
    name: 'Kablosuz Kulaklık',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    discount: 31
  },
  {
    id: '3',
    name: 'Akıllı Saat',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    discount: 17
  },
  {
    id: '4',
    name: 'Laptop Ultra',
    price: 24999,
    originalPrice: 27999,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    discount: 11
  },
  {
    id: '5',
    name: 'Bluetooth Hoparlör',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    discount: 25
  },
  {
    id: '6',
    name: 'Gaming Mouse',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    discount: 20
  }
];

const ProductGrid = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(dummyProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
              <div className="mt-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Öne Çıkan Ürünler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            image={product.image}
            discount={product.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid; 