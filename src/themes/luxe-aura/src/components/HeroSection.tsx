import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  featuredProducts?: Array<{
    id: string;
    name: string;
    image: string;
  }>;
}

const HeroSection = ({
  title = "Elevate Your Style",
  subtitle = "Discover our curated collection of luxury items that define elegance and sophistication",
  ctaText = "Shop Collection",
  ctaLink = "/collection",
  backgroundImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
  featuredProducts = [
    {
      id: "1",
      name: "Silk Scarf",
      image:
        "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&q=80",
    },
    {
      id: "2",
      name: "Gold Bracelet",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    },
    {
      id: "3",
      name: "Leather Bag",
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    },
  ],
}: HeroSectionProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-[700px] overflow-hidden bg-background">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8 lg:px-16 max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 hover:text-black font-medium px-8 py-6 rounded-none"
            onClick={() => (window.location.href = ctaLink)}
          >
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Featured Products */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 md:gap-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="relative overflow-hidden w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-white/50 cursor-pointer"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 1)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs md:text-sm font-medium">
                  {product.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
