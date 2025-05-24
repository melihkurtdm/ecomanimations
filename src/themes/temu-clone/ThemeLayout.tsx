import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

interface ThemeLayoutProps {
  page?: string;
}

const ThemeLayout: React.FC<ThemeLayoutProps> = ({ page = 'homepage' }) => {
  const { themeSettings } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      style={{
        '--theme-primary': themeSettings?.colors?.primary || '#FF6B00',
        '--theme-secondary': themeSettings?.colors?.secondary || '#FF8F3F',
        '--theme-accent': themeSettings?.colors?.accent || '#FF6B00',
        '--theme-background': themeSettings?.colors?.background || '#FFFFFF',
        '--theme-text': themeSettings?.colors?.text || '#1F2937',
        '--theme-surface': themeSettings?.colors?.surface || '#F9FAFB',
        '--theme-border': themeSettings?.colors?.border || '#E5E7EB',
      } as React.CSSProperties}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8"
        >
          <HeroBanner />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ProductGrid />
          </motion.div>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </motion.div>
  );
};

export default ThemeLayout; 