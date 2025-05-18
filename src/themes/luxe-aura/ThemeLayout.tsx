import React from "react";
import Navigation from "./src/components/Navigation";
import HomePage from "./src/components/home";
import ProductGrid from "./src/components/ProductGrid";
import ProductCard from "./src/components/ProductCard";

// Footer extracted from home.tsx
const LuxeAuraFooter = () => (
  <footer className="bg-[#0A1F33] text-white/80 py-16 px-6 md:px-12 lg:px-24">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div>
          <h3 className="text-2xl font-serif text-white mb-6">LuxeAura</h3>
          <p className="mb-6">
            Elevating everyday luxury through thoughtfully crafted products
            and exceptional experiences.
          </p>
          <div className="flex space-x-4">
            {/* Social icons (SVGs) */}
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              {/* Facebook Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              {/* Instagram Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              {/* Twitter Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>
        {/* Shop Column */}
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Shop</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Fragrances</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Jewelry</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
          </ul>
        </div>
        {/* About Column */}
        <div>
          <h4 className="text-lg font-medium text-white mb-4">About</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Artisans</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>
        {/* Support Column */}
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/10 text-sm text-white/60 flex flex-col md:flex-row justify-between items-center">
        <p>© 2023 LuxeAura. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex items-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
);

// Product Detail View (simple premium style)
const ProductDetailView = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 bg-white">
    <div className="max-w-xl w-full">
      <ProductCard
        id="detail-1"
        name="Diamond Tennis Bracelet"
        price={2499}
        originalPrice={2999}
        image="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80"
        isNew={true}
        isSale={true}
      />
      <div className="mt-8 text-lg text-gray-700 font-serif">
        This exquisite diamond tennis bracelet features hand-selected stones set in 18k gold. A timeless piece for the discerning collector.
      </div>
      <button className="mt-8 px-8 py-3 bg-[#0F2C4A] text-white rounded hover:bg-[#183E66] transition-colors font-serif text-lg">
        Add to Cart
      </button>
    </div>
  </div>
);

// Main ThemeLayout
const ThemeLayout = ({ page }: { page: string }) => {
  return (
    <div className="font-serif bg-[#FFFDF8] min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1">
        {page === "homepage" && <HomePage />}
        {page === "productList" && <ProductGrid />}
        {page === "productDetail" && <ProductDetailView />}
      </div>
      <LuxeAuraFooter />
    </div>
  );
};

export default ThemeLayout; 