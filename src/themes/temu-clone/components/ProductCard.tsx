import React from 'react';
import { ShoppingCart } from 'lucide-react';

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

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-sm font-medium px-2 py-1 rounded">
            %{discount} İndirim
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-gray-800 font-medium mb-2 line-clamp-2">{name}</h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-orange-500">
            {price.toLocaleString('tr-TR')} ₺
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {originalPrice.toLocaleString('tr-TR')} ₺
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200"
        >
          <ShoppingCart className="h-5 w-5" />
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 