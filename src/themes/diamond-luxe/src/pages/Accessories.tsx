
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';

const accessoryProducts = [
  {
    id: 4,
    name: "Gold Tennis Bracelet",
    price: 3600,
    image: "https://images.unsplash.com/photo-1535632376185-8cfa625a3272?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Bracelets",
  },
  {
    id: 2,
    name: "Sapphire Pendant",
    price: 2800,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Necklaces",
  },
  {
    id: 8,
    name: "Ruby Pendant Necklace",
    price: 3200,
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfbfc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Necklaces",
  },
  {
    id: 5,
    name: "Diamond Stud Earrings",
    price: 2100,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Earrings",
  },
  {
    id: 9,
    name: "Vintage Pearl Earrings",
    price: 2200,
    image: "https://images.unsplash.com/photo-1675576185671-64e1769332c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Earrings",
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    price: 1950,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80",
    category: "Earrings",
  },
];

const Accessories = () => {
  const [sortOption, setSortOption] = useState('default');

  const sortedProducts = [...accessoryProducts].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    }
    // default sorting by id
    return a.id - b.id;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Banner */}
        <div 
          className="relative h-96 flex items-center justify-center mb-12"
          style={{
            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3) 100%), url(https://images.unsplash.com/photo-1604176424472-17cd740f74e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="text-center px-4">
            <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">Luxury Accessories</h1>
            <p className="text-white/80 max-w-xl mx-auto">
              Elevate your style with our premium selection of accessories crafted with the finest materials and exceptional attention to detail.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-playfair text-2xl">All Accessories</h2>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
              <select 
                id="sort" 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-luxury-gold"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => (
              <div 
                key={product.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Accessories;
