
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter from '@/components/products/ProductFilter';
import { ShoppingCart, ArrowUp, ArrowDown, Grid3X3, List } from "lucide-react";

// Sample product data
const productData = [
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
  },
  {
    id: 7,
    name: "Emerald Halo Ring",
    price: 3200,
    image: "https://images.unsplash.com/photo-1603561596142-979a303c2d3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    category: "Rings",
  },
  {
    id: 8,
    name: "Ruby Pendant Necklace",
    price: 2600,
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfbfc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Necklaces",
  },
  {
    id: 9,
    name: "Vintage Pearl Earrings",
    price: 1750,
    image: "https://images.unsplash.com/photo-1675576185671-64e1769332c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Earrings",
  }
];

const Collections = () => {
  const [products, setProducts] = useState(productData);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [sortBy, setSortBy] = useState("featured");
  const [view, setView] = useState("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (filters: { [key: string]: string[] }) => {
    let filtered = [...productData];
    
    // Filter by category
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => filters.category.includes(product.category));
    }
    
    // Filter by price range
    if (filters.price.length > 0) {
      filtered = filtered.filter(product => {
        return filters.price.some(range => {
          if (range === "Under $1,000") return product.price < 1000;
          if (range === "$1,000 - $2,500") return product.price >= 1000 && product.price <= 2500;
          if (range === "$2,500 - $5,000") return product.price > 2500 && product.price <= 5000;
          if (range === "$5,000 - $10,000") return product.price > 5000 && product.price <= 10000;
          if (range === "Over $10,000") return product.price > 10000;
          return false;
        });
      });
    }
    
    // Apply sorting
    sortProducts(filtered, sortBy);
  };
  
  // Handle sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    sortProducts(filteredProducts, value);
  };
  
  const sortProducts = (products: typeof productData, sortType: string) => {
    let sorted = [...products];
    
    switch (sortType) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // "featured" - no sorting, use default order
        break;
    }
    
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-12">
        {/* Page Header */}
        <div 
          className="relative h-64 mb-12"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%), url(https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl">
              <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">Our Collections</h1>
              <p className="text-white/80">
                Discover our exclusive selection of handcrafted luxury pieces.
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Filters & Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
            <button 
              className="flex items-center gap-2 lg:hidden"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <span>Filters</span>
              {mobileFiltersOpen ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </button>
            
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={handleSortChange}
                className="luxury-input w-40"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" ? "text-luxury-gold" : "text-gray-400"}`}
                aria-label="Grid view"
              >
                <Grid3X3 size={18} />
              </button>
              <button 
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" ? "text-luxury-gold" : "text-gray-400"}`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-64 flex-shrink-0 ${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
              <ProductFilter onFilterChange={handleFilterChange} />
            </aside>
            
            {/* Products Grid */}
            <div className="flex-1">
              <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
