
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CheckoutSummary = ({ 
  items, 
  subtotal, 
  shipping, 
  tax, 
  total 
}: CheckoutSummaryProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-gray-50 p-6 lg:p-8">
      <h3 className="font-playfair text-xl mb-6 pb-6 border-b border-gray-200">
        Order Summary
      </h3>
      
      <div className="max-h-80 overflow-y-auto mb-6">
        {items.map(item => (
          <div key={item.id} className="flex items-center py-3">
            <div className="w-16 h-16 flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex-grow">
              <Link to={`/product/${item.id}`} className="font-medium text-sm hover:text-luxury-gold transition-colors">
                {item.name}
              </Link>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Qty: {item.quantity}</span>
                <span>{formatPrice(item.price)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 py-4 border-t border-b border-gray-200 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </div>
      
      <div className="flex justify-between font-medium text-lg mb-8">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      
      <div className="space-y-4">
        {/* Payment Icons */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
          <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
          <img src="https://via.placeholder.com/40x25" alt="American Express" className="h-6" />
          <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
        </div>
        
        {/* Security Message */}
        <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Secure checkout - 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
