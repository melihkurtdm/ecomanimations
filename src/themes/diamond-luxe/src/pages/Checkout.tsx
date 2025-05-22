
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';

// Sample cart items
const cartItems = [
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

const Checkout = () => {
  const [orderComplete, setOrderComplete] = useState(false);
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 50;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  const handleCheckoutComplete = () => {
    setOrderComplete(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          {orderComplete ? (
            <div className="max-w-2xl mx-auto text-center py-16 opacity-0 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-600">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              
              <h1 className="font-playfair text-3xl md:text-4xl mb-6">Thank You for Your Order</h1>
              <p className="text-xl mb-4">Order #DL58291</p>
              <p className="text-gray-600 mb-8">
                We've received your order and are preparing it for shipment. You will receive a confirmation email shortly with your order details.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/" className="luxury-button">
                  Return to Homepage
                </a>
                <a href="/collections" className="px-6 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 transition-colors">
                  Continue Shopping
                </a>
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-playfair text-3xl md:text-4xl mb-12">Checkout</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <CheckoutForm onComplete={handleCheckoutComplete} />
                </div>
                
                <div>
                  <CheckoutSummary 
                    items={cartItems}
                    subtotal={subtotal}
                    shipping={shipping}
                    tax={tax}
                    total={total}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
