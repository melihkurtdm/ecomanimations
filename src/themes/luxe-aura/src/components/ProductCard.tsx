import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, ShoppingBag, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  isNew?: boolean;
  isSale?: boolean;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "Luxury Silk Scarf",
  price = 129.99,
  originalPrice = 159.99,
  image = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
  isNew = false,
  isSale = false,
  onQuickView = () => {},
  onAddToCart = () => {},
  onAddToWishlist = () => {},
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(id);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWishlist(id);
  };

  return (
    <TooltipProvider>
      <Card
        className="group relative overflow-hidden rounded-md border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[320px] w-full overflow-hidden bg-gray-50">
          {/* Product image */}
          <motion.img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {isNew && (
              <Badge variant="secondary" className="bg-navy text-white">
                New
              </Badge>
            )}
            {isSale && (
              <Badge variant="destructive" className="bg-red-600 text-white">
                Sale
              </Badge>
            )}
          </div>

          {/* Quick actions overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-full bg-white text-gray-800 hover:bg-cream hover:text-navy"
                    onClick={handleQuickView}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick view</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-full bg-white text-gray-800 hover:bg-cream hover:text-navy"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to wishlist</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-full bg-white text-gray-800 hover:bg-cream hover:text-navy"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to cart</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </motion.div>
        </div>

        <CardContent className="p-4">
          <div className="mb-1 text-sm font-light text-gray-500">LuxeAura</div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-navy">
              ${price.toFixed(2)}
            </span>
            {originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ProductCard;
