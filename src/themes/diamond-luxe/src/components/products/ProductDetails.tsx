
import { useState } from "react";
import { Heart, ShoppingCart, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  details: string;
  specifications: {
    material: string;
    gemstone: string;
    weight: string;
    dimensions: string;
  };
  images: string[];
  reviews: {
    id: number;
    author: string;
    rating: number;
    date: string;
    text: string;
  }[];
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} has been added to your cart.`
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${isFavorite ? "removed from" : "added to"} your wishlist.`
    });
  };

  const handleShare = () => {
    toast({
      title: "Share This Product",
      description: "Link copied to clipboard."
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.images[activeImage]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`w-24 h-24 flex-shrink-0 border-2 ${
                activeImage === index ? "border-luxury-gold" : "border-transparent"
              }`}
              onClick={() => setActiveImage(index)}
            >
              <img 
                src={image} 
                alt={`${product.name} - view ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Product Info */}
      <div>
        <div className="pb-8 mb-8 border-b border-gray-200">
          <h1 className="font-playfair text-3xl md:text-4xl mb-3">{product.name}</h1>
          <p className="text-2xl font-montserrat text-luxury-gold mb-6">
            {formatPrice(product.price)}
          </p>
          
          <p className="text-gray-600 mb-8">
            {product.description}
          </p>
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-6 mb-8">
            <span className="font-medium">Quantity:</span>
            <div className="flex border border-gray-300">
              <button 
                className="w-10 h-10 flex items-center justify-center border-r border-gray-300 text-gray-500 hover:bg-gray-100"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 h-10 text-center border-none focus:outline-none"
              />
              <button 
                className="w-10 h-10 flex items-center justify-center border-l border-gray-300 text-gray-500 hover:bg-gray-100"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="luxury-button flex-1 gap-2"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
            
            <button 
              onClick={handleToggleFavorite}
              className={`p-4 border border-gray-200 flex items-center justify-center ${
                isFavorite ? "bg-luxury-gold/10 border-luxury-gold" : ""
              }`}
            >
              <Heart size={20} fill={isFavorite ? "#D4AF37" : "none"} stroke={isFavorite ? "#D4AF37" : "currentColor"} />
            </button>
            
            <button 
              onClick={handleShare}
              className="p-4 border border-gray-200 flex items-center justify-center"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details" className="data-[state=active]:text-luxury-gold">Details</TabsTrigger>
            <TabsTrigger value="specifications" className="data-[state=active]:text-luxury-gold">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:text-luxury-gold">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="pt-6">
            <p className="text-gray-600">{product.details}</p>
          </TabsContent>
          
          <TabsContent value="specifications" className="pt-6">
            <ul className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="grid grid-cols-2 border-b border-gray-100 pb-2">
                  <span className="font-medium capitalize">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{review.author}</h4>
                      <time className="text-gray-500 text-sm">{review.date}</time>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-luxury-gold" : "text-gray-300"}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
