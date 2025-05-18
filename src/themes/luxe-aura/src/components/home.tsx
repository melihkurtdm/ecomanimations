import React from "react";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import ProductGrid from "./ProductGrid";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section with Parallax Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>

        {/* Featured Collections Section */}
        <motion.section
          className="py-16 px-6 md:px-12 lg:px-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#0F2C4A] mb-3">
              Featured Collections
            </h2>
            <p className="text-[#6A7986] mb-12 max-w-2xl">
              Discover our curated selection of premium products, handpicked for
              the discerning customer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Collection Card 1 */}
              <motion.div
                className="relative overflow-hidden rounded-lg aspect-[3/4] group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                  alt="Luxury Accessories"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-serif mb-2">
                    Luxury Accessories
                  </h3>
                  <p className="text-white/80 mb-4">
                    Elevate your style with our premium accessories
                  </p>
                  <button className="w-fit bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded hover:bg-white/30 transition-colors">
                    Explore Collection
                  </button>
                </div>
              </motion.div>

              {/* Collection Card 2 */}
              <motion.div
                className="relative overflow-hidden rounded-lg aspect-[3/4] group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"
                  alt="Signature Fragrances"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-serif mb-2">
                    Signature Fragrances
                  </h3>
                  <p className="text-white/80 mb-4">
                    Discover scents that define your presence
                  </p>
                  <button className="w-fit bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded hover:bg-white/30 transition-colors">
                    Explore Collection
                  </button>
                </div>
              </motion.div>

              {/* Collection Card 3 */}
              <motion.div
                className="relative overflow-hidden rounded-lg aspect-[3/4] group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1526280760714-f9e8b26f318f?w=800&q=80"
                  alt="Artisan Jewelry"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-serif mb-2">
                    Artisan Jewelry
                  </h3>
                  <p className="text-white/80 mb-4">
                    Handcrafted pieces for timeless elegance
                  </p>
                  <button className="w-fit bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded hover:bg-white/30 transition-colors">
                    Explore Collection
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Featured Products Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-[#0F2C4A] mb-3">
                Featured Products
              </h2>
              <p className="text-[#6A7986] max-w-2xl">
                Discover our most coveted items, each selected for their
                exceptional quality and design.
              </p>
            </motion.div>

            <ProductGrid />

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <button className="px-8 py-3 bg-[#0F2C4A] text-white rounded hover:bg-[#183E66] transition-colors">
                View All Products
              </button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#F8F5F0]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-[#0F2C4A] mb-3">
                What Our Clients Say
              </h2>
              <p className="text-[#6A7986] max-w-2xl mx-auto">
                The experiences of our valued customers reflect our commitment
                to excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
                      alt="Emily R."
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0F2C4A]">Emily R.</h4>
                    <p className="text-sm text-[#6A7986]">Loyal Customer</p>
                  </div>
                </div>
                <p className="text-[#4A5568] italic">
                  "The attention to detail in every LuxeAura product is
                  remarkable. From the packaging to the product itself,
                  everything speaks of quality and elegance."
                </p>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=James"
                      alt="James T."
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0F2C4A]">James T.</h4>
                    <p className="text-sm text-[#6A7986]">New Customer</p>
                  </div>
                </div>
                <p className="text-[#4A5568] italic">
                  "I was hesitant to shop online for luxury items, but
                  LuxeAura's customer service and product quality exceeded my
                  expectations. Will definitely be returning."
                </p>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia"
                      alt="Sophia L."
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0F2C4A]">Sophia L.</h4>
                    <p className="text-sm text-[#6A7986]">Repeat Customer</p>
                  </div>
                </div>
                <p className="text-[#4A5568] italic">
                  "The artisan jewelry collection is simply stunning. Each piece
                  feels unique and special. LuxeAura has become my go-to for
                  meaningful gifts."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#0F2C4A] text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-8 md:mb-0 md:mr-8 md:max-w-md">
                <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
                  Join Our Community
                </h2>
                <p className="text-white/80">
                  Subscribe to receive exclusive offers, early access to new
                  collections, and personalized recommendations.
                </p>
              </div>

              <div className="w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 min-w-[280px]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#D4AF37] text-[#0F2C4A] font-medium rounded hover:bg-[#E5C158] transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Shop Column */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Accessories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fragrances
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Jewelry
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Artisans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Store Locator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-sm text-white/60 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 LuxeAura. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
