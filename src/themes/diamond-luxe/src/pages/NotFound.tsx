
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
          <h1 className="font-playfair text-5xl md:text-7xl mb-4">404</h1>
          <div className="w-20 h-1 bg-luxury-gold mb-8"></div>
          <h2 className="font-playfair text-2xl md:text-3xl mb-6">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mb-12">
            We're sorry, but the page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="luxury-button">
              Return to Homepage
            </Link>
            <Link to="/collections" className="px-6 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 transition-colors">
              Browse Collections
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
