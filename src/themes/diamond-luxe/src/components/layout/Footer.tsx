
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h2 className="font-playfair text-2xl font-bold">
                <span className="gradient-text">Diamond</span> Luxe
              </h2>
            </Link>
            <p className="text-gray-400 mb-6">
              Exquisite luxury for those who appreciate the finer things in life. 
              Premium jewelry, haute couture, and exclusive accessories.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl mb-6 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-luxury-gold after:mt-2">
              Shopping
            </h3>
            <ul className="space-y-3">
              {["Collections", "New Arrivals", "Bestsellers", "Jewelry", "Accessories"].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-luxury-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-playfair text-xl mb-6 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-luxury-gold after:mt-2">
              Information
            </h3>
            <ul className="space-y-3">
              {["About Us", "Contact", "Shipping & Returns", "Privacy Policy", "Terms & Conditions"].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(" & ", "-").replace(" ", "-")}`}
                    className="text-gray-400 hover:text-luxury-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-xl mb-6 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-luxury-gold after:mt-2">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="luxury-input bg-transparent text-white border-gray-700"
              />
              <button className="luxury-button">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Diamond Luxe. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="American Express" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
