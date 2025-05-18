import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavigationProps {
  transparent?: boolean;
}

const Navigation = ({ transparent = false }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Mock cart count

  // Categories for dropdown menus
  const categories = {
    women: ["Dresses", "Tops", "Bottoms", "Accessories", "Shoes"],
    men: ["Shirts", "Pants", "Outerwear", "Accessories", "Shoes"],
    jewelry: ["Necklaces", "Earrings", "Bracelets", "Rings", "Watches"],
    home: ["Decor", "Bedding", "Bath", "Kitchen", "Furniture"],
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBackgroundClass =
    isScrolled || !transparent ? "bg-white shadow-sm" : "bg-transparent";

  const textColorClass =
    isScrolled || !transparent ? "text-gray-800" : "text-white";

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 ${navBackgroundClass} transition-all duration-300`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className={`font-serif text-2xl font-bold ${textColorClass}`}
              >
                LuxeAura
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(categories).map(([category, subcategories]) => (
                <DropdownMenu key={category}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center ${textColorClass} hover:text-gold-400 transition-colors group`}
                    >
                      <span className="font-medium capitalize">{category}</span>
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white p-2 rounded-md shadow-lg">
                    {subcategories.map((subcat) => (
                      <DropdownMenuItem
                        key={subcat}
                        className="py-2 px-3 hover:bg-cream-100 cursor-pointer"
                      >
                        {subcat}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>

            {/* Right side icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                className={`${textColorClass} hover:text-gold-400 transition-colors`}
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                className={`${textColorClass} hover:text-gold-400 transition-colors`}
              >
                <User className="h-5 w-5" />
              </button>
              <button
                className={`${textColorClass} hover:text-gold-400 transition-colors relative`}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                className={textColorClass}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-8">
                <a
                  href="/"
                  className="font-serif text-2xl font-bold text-gray-800"
                >
                  LuxeAura
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-6">
                {Object.entries(categories).map(([category, subcategories]) => (
                  <div key={category} className="border-b border-gray-100 pb-4">
                    <h3 className="font-medium text-lg capitalize mb-3">
                      {category}
                    </h3>
                    <ul className="space-y-3 pl-2">
                      {subcategories.map((subcat) => (
                        <li key={subcat}>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gold-400 transition-colors"
                          >
                            {subcat}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-around">
                <Button variant="ghost" className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
                <Button variant="ghost" className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account
                </Button>
                <Button variant="ghost" className="flex items-center relative">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-gold-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
