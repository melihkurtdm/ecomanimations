import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

// Dummy product data
const dummyProducts = [
  {
    id: '1',
    name: 'Luxury Diamond Watch',
    price: 1299.99,
    originalPrice: 1599.99,
    image: '/images/products/watch.jpg',
    discount: 20,
  },
  {
    id: '2',
    name: 'Premium Leather Wallet',
    price: 199.99,
    originalPrice: 249.99,
    image: '/images/products/wallet.jpg',
    discount: 15,
  },
  {
    id: '3',
    name: 'Designer Sunglasses',
    price: 299.99,
    image: '/images/products/sunglasses.jpg',
  },
  {
    id: '4',
    name: 'Gold Plated Necklace',
    price: 499.99,
    originalPrice: 599.99,
    image: '/images/products/necklace.jpg',
    discount: 25,
  },
  {
    id: '5',
    name: 'Luxury Perfume Set',
    price: 399.99,
    image: '/images/products/perfume.jpg',
  },
  {
    id: '6',
    name: 'Premium Watch Box',
    price: 149.99,
    originalPrice: 199.99,
    image: '/images/products/watch-box.jpg',
    discount: 10,
  },
];

const ProductGrid = () => {
  const [products, setProducts] = useState<typeof dummyProducts>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProducts(dummyProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-100 rounded-xl overflow-hidden"
        >
          <div className="aspect-square bg-gray-200 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products, each
            crafted with attention to detail and exceptional quality.
          </p>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white rounded-full font-medium hover:bg-[#BFA16A] transition-colors group"
          >
            View All Products
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid; 