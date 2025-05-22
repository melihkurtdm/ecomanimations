
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

const Index = () => {
  // Animate logo entrance on initial page load
  useEffect(() => {
    // Any initialization could go here
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoryShowcase />
        <Testimonials />
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
