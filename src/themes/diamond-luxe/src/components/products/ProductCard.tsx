
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    toast({
      title: !isFavorite ? "Added to Wishlist" : "Removed from Wishlist",
      description: !isFavorite 
        ? `${product.name} has been added to your wishlist.` 
        : `${product.name} has been removed from your wishlist.`
    });
  };

  return (
    <div className="group">
      <Link 
        to={`/product/${product.id}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden mb-4 shine-effect aspect-square">
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div 
            className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
              isFavorite 
                ? "bg-luxury-gold text-white" 
                : "bg-white text-luxury-black hover:bg-luxury-gold/20"
            } ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <div 
            className={`absolute inset-x-0 bottom-0 py-4 px-6 transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <button className="luxury-button w-full text-sm py-2">
              Quick View
            </button>
          </div>
        </div>
        <div className="text-center">
          <span className="text-luxury-gold text-xs uppercase tracking-wider">{product.category}</span>
          <h3 className="font-playfair text-lg mb-1 transition-colors group-hover:text-luxury-gold">{product.name}</h3>
          <p className="font-montserrat">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
