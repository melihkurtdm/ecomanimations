
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "Diamond Eternity Ring",
    price: 4500,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    quantity: 1
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    price: 1950,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80",
    quantity: 1
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 50) : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax - discount;

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart."
    });
  };

  const handleApplyPromoCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Example promo codes
    if (promoCode.toLowerCase() === "welcome10") {
      const discountAmount = subtotal * 0.10; // 10% off
      setDiscount(discountAmount);
      toast({
        title: "Promo Code Applied",
        description: "10% discount has been applied to your order."
      });
    } else {
      setDiscount(0);
      toast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid or has expired."
      });
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
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-playfair text-3xl md:text-4xl mb-8">Shopping Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
                
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <Link to="/collections" className="text-luxury-gold hover:text-luxury-darkGold transition-colors flex items-center gap-2">
                    <ArrowLeft size={16} />
                    Continue Shopping
                  </Link>
                  
                  <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="luxury-input w-full sm:w-auto"
                    />
                    <button 
                      type="submit"
                      className="luxury-button"
                      disabled={!promoCode}
                    >
                      Apply
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-gray-50 p-6">
                <h2 className="font-playfair text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-8">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <Link to="/checkout" className="luxury-button w-full flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>
                
                {/* Secure Checkout Badge */}
                <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Secure checkout - 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="font-playfair text-2xl mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                It looks like you haven't added any items to your cart yet. Explore our collections to find something special.
              </p>
              <Link to="/collections" className="luxury-button">
                Browse Collections
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper component for the left arrow icon
const ArrowLeft = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
};

export default Cart;
