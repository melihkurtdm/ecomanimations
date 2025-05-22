
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    toast({
      title: "Shopping Cart",
      description: "Your cart is currently empty",
    });
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <h1 className={`font-playfair text-2xl md:text-3xl font-bold transition-all duration-300 ${
              scrolled ? "text-luxury-black" : "text-white text-shadow"
            }`}>
              <span className="gradient-text">Diamond</span> Luxe
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {["Home", "Collections", "Jewelry", "Accessories", "About"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={`font-montserrat text-sm uppercase tracking-wider transition-colors ${
                      scrolled ? "text-luxury-black hover:text-luxury-gold" : "text-white hover:text-luxury-gold"
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              className={`hidden md:block transition-colors ${
                scrolled ? "text-luxury-black hover:text-luxury-gold" : "text-white hover:text-luxury-gold"
              }`}
            >
              <Search size={20} />
            </button>
            <button 
              className={`hidden md:block transition-colors ${
                scrolled ? "text-luxury-black hover:text-luxury-gold" : "text-white hover:text-luxury-gold"
              }`}
            >
              <Heart size={20} />
            </button>
            <button 
              className={`transition-colors ${
                scrolled ? "text-luxury-black hover:text-luxury-gold" : "text-white hover:text-luxury-gold"
              }`}
              onClick={handleCartClick}
            >
              <ShoppingCart size={20} />
            </button>
            <button 
              className={`hidden md:block transition-colors ${
                scrolled ? "text-luxury-black hover:text-luxury-gold" : "text-white hover:text-luxury-gold"
              }`}
            >
              <User size={20} />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={24} className={scrolled ? "text-luxury-black" : "text-white"} />
              ) : (
                <Menu size={24} className={scrolled ? "text-luxury-black" : "text-white"} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 pt-20">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col items-center">
              <ul className="flex flex-col items-center gap-8 py-8">
                {["Home", "Collections", "Jewelry", "Accessories", "About"].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="font-montserrat text-xl uppercase tracking-wider text-white hover:text-luxury-gold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex gap-8 py-8">
                <button className="text-white hover:text-luxury-gold transition-colors">
                  <Search size={24} />
                </button>
                <button className="text-white hover:text-luxury-gold transition-colors">
                  <Heart size={24} />
                </button>
                <button className="text-white hover:text-luxury-gold transition-colors">
                  <User size={24} />
                </button>
              </div>
              <Button 
                variant="outline" 
                className="mt-8 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Close Menu
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
