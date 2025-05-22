
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "From engagement rings to statement pieces",
    link: "/collections/rings"
  },
  {
    id: 2,
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80",
    description: "Elegant pendants and chains",
    link: "/collections/necklaces"
  },
  {
    id: 3,
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "Studs, hoops, and drops",
    link: "/collections/earrings"
  },
  {
    id: 4,
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591320656-59019aca4fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "Timeless bracelets and cuffs",
    link: "/collections/bracelets"
  }
];

const CategoryShowcase = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl mb-3">Browse by Category</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Explore our collections categorized for your convenience
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <Link 
                to={category.link}
                className="block relative overflow-hidden group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div 
                  className="aspect-square overflow-hidden"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredCategory === category.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-playfair text-2xl mb-1">{category.name}</h3>
                  <p className="text-white/80 mb-4 text-sm">{category.description}</p>
                  <span className={`inline-block overflow-hidden transition-transform duration-300 ${
                    hoveredCategory === category.id ? 'translate-x-0' : '-translate-x-full'
                  }`}>
                    <span className="block w-12 h-0.5 bg-luxury-gold" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
