
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: { [key: string]: string[] }) => void;
}

const ProductFilter = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState({
    category: [] as string[],
    price: [] as string[],
    material: [] as string[]
  });

  const [collapsedSections, setCollapsedSections] = useState({
    category: false,
    price: false,
    material: false
  });

  const categories = ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches"];
  const priceRanges = ["Under $1,000", "$1,000 - $2,500", "$2,500 - $5,000", "$5,000 - $10,000", "Over $10,000"];
  const materials = ["Gold", "White Gold", "Rose Gold", "Platinum", "Silver", "Diamond", "Pearl", "Gemstones"];

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      
      if (updatedFilters[type].includes(value)) {
        updatedFilters[type] = updatedFilters[type].filter(v => v !== value);
      } else {
        updatedFilters[type] = [...updatedFilters[type], value];
      }
      
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      category: [] as string[],
      price: [] as string[],
      material: [] as string[]
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-xl">Filters</h2>
        {Object.values(filters).some(arr => arr.length > 0) && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-luxury-gold hover:underline"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Category Filter */}
      <div className="py-4 border-b border-gray-200">
        <button 
          className="w-full flex items-center justify-between mb-4"
          onClick={() => toggleSection('category')}
        >
          <h3 className="font-montserrat font-medium">Category</h3>
          {collapsedSections.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {!collapsedSections.category && (
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => toggleFilter('category', category)}
                  className="hidden"
                />
                <div className={`w-4 h-4 border flex-shrink-0 ${
                  filters.category.includes(category) 
                    ? 'bg-luxury-gold border-luxury-gold' 
                    : 'border-gray-300'
                }`}>
                  {filters.category.includes(category) && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white w-full h-full p-0.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Filter */}
      <div className="py-4 border-b border-gray-200">
        <button 
          className="w-full flex items-center justify-between mb-4"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-montserrat font-medium">Price Range</h3>
          {collapsedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {!collapsedSections.price && (
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label key={range} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.price.includes(range)}
                  onChange={() => toggleFilter('price', range)}
                  className="hidden"
                />
                <div className={`w-4 h-4 border flex-shrink-0 ${
                  filters.price.includes(range) 
                    ? 'bg-luxury-gold border-luxury-gold' 
                    : 'border-gray-300'
                }`}>
                  {filters.price.includes(range) && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white w-full h-full p-0.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Material Filter */}
      <div className="py-4">
        <button 
          className="w-full flex items-center justify-between mb-4"
          onClick={() => toggleSection('material')}
        >
          <h3 className="font-montserrat font-medium">Material</h3>
          {collapsedSections.material ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {!collapsedSections.material && (
          <div className="space-y-2">
            {materials.map(material => (
              <label key={material} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.material.includes(material)}
                  onChange={() => toggleFilter('material', material)}
                  className="hidden"
                />
                <div className={`w-4 h-4 border flex-shrink-0 ${
                  filters.material.includes(material) 
                    ? 'bg-luxury-gold border-luxury-gold' 
                    : 'border-gray-300'
                }`}>
                  {filters.material.includes(material) && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white w-full h-full p-0.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">{material}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
