import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#BFA16A] bg-clip-text text-transparent">
              Diamond Luxe
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative flex-1 max-w-xl"
            >
              <input
                type="text"
                placeholder="Search for luxury items..."
                className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-6"
            >
              <a href="/wishlist" className="text-gray-700 hover:text-[#D4AF37] transition-colors">
                <Heart className="w-6 h-6" />
              </a>
              <a href="/auth/login" className="flex items-center space-x-2 text-gray-700 hover:text-[#D4AF37] transition-colors">
                <User className="w-6 h-6" />
                <span>Sign In</span>
              </a>
              <a href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#D4AF37] transition-colors" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  0
                </motion.span>
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for luxury items..."
                    className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <a href="/wishlist" className="flex items-center space-x-2 text-gray-700 hover:text-[#D4AF37] transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </a>
                <a href="/auth/login" className="flex items-center space-x-2 text-gray-700 hover:text-[#D4AF37] transition-colors">
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </a>
                <a href="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-[#D4AF37] transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 