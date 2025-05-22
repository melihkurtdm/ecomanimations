
import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Diamond Eternity Ring",
    price: 4500,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Rings",
  },
  {
    id: 2,
    name: "Sapphire Pendant",
    price: 2800,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Necklaces",
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    price: 1950,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80",
    category: "Earrings",
  },
  {
    id: 4,
    name: "Gold Tennis Bracelet",
    price: 3600,
    image: "https://images.unsplash.com/photo-1611591320656-59019aca4fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Bracelets",
  },
  {
    id: 5,
    name: "Diamond Stud Earrings",
    price: 2100,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Earrings",
  },
  {
    id: 6,
    name: "Platinum Wedding Band",
    price: 1800,
    image: "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Rings",
  }
];

const categories = ["All", ...new Set(products.map(p => p.category))];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("product-scroll");
    if (!container) return;
    
    const scrollAmount = 320; // Adjust based on your card width + gap
    const newPosition = direction === "left" 
      ? Math.max(scrollPosition - scrollAmount, 0)
      : Math.min(scrollPosition + scrollAmount, container.scrollWidth - container.clientWidth);
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl mb-3">Featured Collection</h2>
            <p className="text-gray-600 max-w-lg">
              Discover our handpicked selection of exquisite pieces, meticulously crafted for those who appreciate luxury.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 transition-all ${
                activeCategory === category
                  ? "bg-luxury-gold text-white"
                  : "bg-transparent text-luxury-black border border-luxury-gold hover:bg-luxury-gold/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products */}
        <div 
          id="product-scroll"
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="min-w-[280px] max-w-[280px] opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="relative overflow-hidden mb-4 shine-effect">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="luxury-button text-sm py-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-luxury-gold text-sm uppercase">{product.category}</span>
                  <h3 className="font-playfair text-xl mb-1">{product.name}</h3>
                  <p className="font-montserrat">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/collections" className="luxury-button inline-flex items-center gap-2">
            View All Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
