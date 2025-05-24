import React from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

const ThemeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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