// src/themes/diamond-luxe/ThemeLayout.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

interface ThemeLayoutProps {
  page?: string;
}

const ThemeLayout: React.FC<ThemeLayoutProps> = ({ page = 'homepage' }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {page === 'homepage' && (
            <>
              <HeroBanner />
              <ProductGrid />
            </>
          )}
          {/* Add more page conditions here as needed */}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ThemeLayout; 