
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({
  id,
  name,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove
}: CartItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setItemQuantity(newQuantity);
      onUpdateQuantity(id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    onUpdateQuantity(id, newQuantity);
  };

  const decrementQuantity = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      onUpdateQuantity(id, newQuantity);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="w-24 h-24 flex-shrink-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </Link>
      
      {/* Product Details */}
      <div className="ml-6 flex-grow">
        <Link to={`/product/${id}`} className="font-playfair text-lg mb-1 hover:text-luxury-gold transition-colors">
          {name}
        </Link>
        <p className="text-luxury-gold">{formatPrice(price)}</p>
      </div>
      
      {/* Quantity */}
      <div className="flex border border-gray-300 mr-6">
        <button 
          className="w-8 h-8 flex items-center justify-center border-r border-gray-300 text-gray-500 hover:bg-gray-100"
          onClick={decrementQuantity}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={itemQuantity}
          onChange={handleQuantityChange}
          className="w-10 h-8 text-center border-none focus:outline-none"
        />
        <button 
          className="w-8 h-8 flex items-center justify-center border-l border-gray-300 text-gray-500 hover:bg-gray-100"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>
      
      {/* Subtotal */}
      <div className="w-24 text-right font-medium">
        {formatPrice(price * itemQuantity)}
      </div>
      
      {/* Remove Button */}
      <button 
        onClick={() => onRemove(id)}
        className="ml-6 text-gray-400 hover:text-luxury-gold transition-colors"
        aria-label="Remove item"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CartItem;
