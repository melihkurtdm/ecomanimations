import React from 'react';
import { ShoppingCart } from 'lucide-react';

// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Deri Ceket",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    discount: 20
  },
  {
    id: 2,
    name: "İpek Gömlek",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    discount: 15
  },
  {
    id: 3,
    name: "Dar Kesim Kot Pantolon",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    discount: 0
  },
  {
    id: 4,
    name: "Ekose Blazer Ceket",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    discount: 25
  },
  {
    id: 5,
    name: "Bohem Tarz Elbise",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    discount: 10
  },
  {
    id: 6,
    name: "Vintage Deri Çanta",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    discount: 0
  },
  {
    id: 7,
    name: "Spor Sweatshirt",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    discount: 30
  },
  {
    id: 8,
    name: "Tasarım Bot",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    discount: 15
  }
];

const ProductGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Öne Çıkan Ürünler</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  %{product.discount} İndirim
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div>
                  {product.discount > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-orange-600 font-bold">
                        {((product.price * (100 - product.discount)) / 100).toFixed(2)} ₺
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        {product.price.toFixed(2)} ₺
                      </span>
                    </div>
                  ) : (
                    <span className="text-orange-600 font-bold">{product.price.toFixed(2)} ₺</span>
                  )}
                </div>
                <button className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid; 