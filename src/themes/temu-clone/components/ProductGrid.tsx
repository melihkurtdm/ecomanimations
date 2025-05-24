import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

// Dummy product data
const dummyProducts = [
  {
    id: '1',
    name: 'Premium Deri Ceket',
    price: 1299.99,
    originalPrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    discount: 20
  },
  {
    id: '2',
    name: 'Akıllı Telefon X Pro',
    price: 12999.99,
    originalPrice: 14999.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    discount: 13
  },
  {
    id: '3',
    name: 'Kablosuz Kulaklık',
    price: 899.99,
    originalPrice: 1299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    discount: 31
  },
  {
    id: '4',
    name: 'Akıllı Saat',
    price: 2499.99,
    originalPrice: 2999.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    discount: 17
  },
  {
    id: '5',
    name: 'Laptop Pro',
    price: 24999.99,
    originalPrice: 27999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    discount: 11
  },
  {
    id: '6',
    name: 'Gaming Mouse',
    price: 599.99,
    originalPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    discount: 25
  }
];

const ProductGrid = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-4 animate-pulse"
            >
              <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          En çok tercih edilen ve en yüksek puan alan ürünlerimizi keşfedin.
          Her gün yeni ürünler ve fırsatlar sizi bekliyor.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a
          href="/products"
          className="inline-flex items-center px-8 py-4 bg-[var(--theme-primary)] text-white rounded-full font-medium hover:bg-[var(--theme-secondary)] transition-colors"
        >
          Tüm Ürünleri Gör
        </a>
      </motion.div>
    </section>
  );
};

export default ProductGrid; 