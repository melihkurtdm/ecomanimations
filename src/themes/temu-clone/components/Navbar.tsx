import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-orange-500">
              Temu Clone
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-orange-500">Ana Sayfa</a>
            <a href="/products" className="text-gray-700 hover:text-orange-500">Ürünler</a>
            <a href="/categories" className="text-gray-700 hover:text-orange-500">Kategoriler</a>
            <a href="/deals" className="text-gray-700 hover:text-orange-500">Fırsatlar</a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün ara..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <a href="/login" className="hidden md:flex items-center text-gray-700 hover:text-orange-500">
              <User className="h-6 w-6" />
              <span className="ml-2">Giriş Yap</span>
            </a>
            <a href="/cart" className="relative text-gray-700 hover:text-orange-500">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-orange-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Ana Sayfa</a>
              <a href="/products" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Ürünler</a>
              <a href="/categories" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Kategoriler</a>
              <a href="/deals" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Fırsatlar</a>
              <a href="/login" className="block px-3 py-2 text-gray-700 hover:text-orange-500">Giriş Yap</a>
            </div>
            {/* Mobile Search */}
            <div className="px-4 py-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün ara..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 