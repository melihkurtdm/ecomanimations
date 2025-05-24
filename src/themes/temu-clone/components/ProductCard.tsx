import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  discount
}) => {
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {discount && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 bg-[var(--theme-primary)] text-white px-3 py-1 rounded-full text-sm font-medium"
          >
            %{discount} İndirim
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-[var(--theme-primary)]">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="p-2 bg-[var(--theme-primary)] text-white rounded-full hover:bg-[var(--theme-secondary)] transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Quick View Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white text-[var(--theme-primary)] rounded-full font-medium"
        >
          Hızlı Bakış
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard; 