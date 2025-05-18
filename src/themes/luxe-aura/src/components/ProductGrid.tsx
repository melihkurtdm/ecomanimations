import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  title?: string;
  products?: Product[];
  columns?: number;
  showFilters?: boolean;
}

const ProductGrid = ({
  title = "Featured Collection",
  products = [
    {
      id: "1",
      name: "Silk Evening Gown",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80",
      category: "Dresses",
    },
    {
      id: "2",
      name: "Leather Crossbody Bag",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      category: "Accessories",
    },
    {
      id: "3",
      name: "Gold Statement Earrings",
      price: 459,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      category: "Jewelry",
    },
    {
      id: "4",
      name: "Cashmere Wrap Coat",
      price: 1899,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      category: "Outerwear",
    },
    {
      id: "5",
      name: "Satin Heeled Sandals",
      price: 699,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      category: "Shoes",
    },
    {
      id: "6",
      name: "Pearl Embellished Clutch",
      price: 549,
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
      category: "Accessories",
    },
    {
      id: "7",
      name: "Velvet Blazer",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
      category: "Clothing",
    },
    {
      id: "8",
      name: "Diamond Tennis Bracelet",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
      category: "Jewelry",
    },
  ],
  columns = 4,
  showFilters = true,
}: ProductGridProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(["All", ...uniqueCategories]);
  }, [products]);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === activeCategory),
      );
    }
  }, [activeCategory, products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-16 bg-white">
      <div className="mb-12 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="w-24 h-0.5 bg-amber-700 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>

      {showFilters && (
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-amber-700 text-white"
                    : "bg-transparent text-gray-700 hover:bg-amber-50"
                } border border-amber-200 rounded-md`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      <motion.div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-6 md:gap-8`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {filteredProducts.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard
              name={product.name}
              price={product.price}
              image={product.image}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductGrid;
