import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
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
    <div className="min-h-screen bg-gray-50" style={{
      '--theme-primary': themeSettings?.colors?.primary || '#FF6B00',
      '--theme-secondary': themeSettings?.colors?.secondary || '#FF8F3F',
      '--theme-accent': themeSettings?.colors?.accent || '#FF6B00',
      '--theme-background': themeSettings?.colors?.background || '#FFFFFF',
      '--theme-text': themeSettings?.colors?.text || '#1F2937',
    } as React.CSSProperties}>
      <Navbar />
      <main>
        <HeroBanner />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default ThemeLayout; 