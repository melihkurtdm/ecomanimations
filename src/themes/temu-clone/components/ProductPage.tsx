import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPageProps {
  productId: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // TODO: Implement API call to fetch product details
        // Simulated product data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProduct({
          id: productId,
          name: 'Akıllı Telefon X Pro',
          price: 12999,
          originalPrice: 14999,
          discount: 13,
          description: 'En son teknoloji ile üretilen akıllı telefon. 6.7 inç ekran, 256GB depolama, 12GB RAM ve 5000mAh batarya.',
          images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'
          ],
          features: [
            '6.7 inç Super AMOLED Ekran',
            '256GB Depolama',
            '12GB RAM',
            '5000mAh Batarya',
            '5G Desteği',
            'IP68 Su ve Toz Dayanıklılık'
          ],
          rating: 4.5,
          reviewCount: 128
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', { productId, quantity });
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 aspect-square rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ürün bulunamadı</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                %{product.discount} İndirim
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-orange-500' : 'border-transparent'
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-2 flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviewCount} değerlendirme)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-orange-500">
              {product.price.toLocaleString('tr-TR')} ₺
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                {product.originalPrice.toLocaleString('tr-TR')} ₺
              </span>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Özellikler</h3>
            <ul className="grid grid-cols-2 gap-2">
              {product.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-2 text-gray-600 hover:text-orange-500"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                className="w-16 text-center border-0 focus:ring-0"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-orange-500"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Sepete Ekle
            </button>

            <button className="p-3 text-gray-400 hover:text-orange-500">
              <Heart className="h-6 w-6" />
            </button>

            <button className="p-3 text-gray-400 hover:text-orange-500">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 