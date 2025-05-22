
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CheckoutFormProps {
  onComplete: () => void;
}

const CheckoutForm = ({ onComplete }: CheckoutFormProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    
    // Payment Information
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    sameAsShipping: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Order Placed",
        description: "Thank you for your order! You will receive a confirmation email shortly."
      });
      onComplete();
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      {/* Checkout Steps */}
      <div className="flex justify-between mb-8">
        {["Shipping", "Payment", "Review"].map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                step > index + 1
                  ? "bg-luxury-gold text-white"
                  : step === index + 1
                  ? "bg-luxury-gold text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > index + 1 ? "✓" : index + 1}
            </div>
            <span
              className={`text-sm ${
                step === index + 1 ? "text-luxury-gold font-medium" : "text-gray-500"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Shipping Information */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="font-playfair text-xl mb-6">Shipping Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm">First Name *</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm">Last Name *</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm">Phone *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="address" className="block mb-2 text-sm">Address *</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="apartment" className="block mb-2 text-sm">Apartment, suite, etc. (optional)</label>
                <input
                  id="apartment"
                  name="apartment"
                  type="text"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block mb-2 text-sm">City *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="state" className="block mb-2 text-sm">State/Province *</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="luxury-input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block mb-2 text-sm">ZIP Code *</label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="luxury-input w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="country" className="block mb-2 text-sm">Country *</label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Italy">Italy</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Payment Information */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="font-playfair text-xl mb-6">Payment Information</h3>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label htmlFor="cardName" className="block mb-2 text-sm">Name on Card *</label>
                <input
                  id="cardName"
                  name="cardName"
                  type="text"
                  required
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                />
              </div>
              
              <div>
                <label htmlFor="cardNumber" className="block mb-2 text-sm">Card Number *</label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  required
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="luxury-input w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cardExpiry" className="block mb-2 text-sm">Expiry Date *</label>
                  <input
                    id="cardExpiry"
                    name="cardExpiry"
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    className="luxury-input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="cardCvc" className="block mb-2 text-sm">CVC *</label>
                  <input
                    id="cardCvc"
                    name="cardCvc"
                    type="text"
                    required
                    placeholder="123"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    className="luxury-input w-full"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sameAsShipping"
                    checked={formData.sameAsShipping}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm">Billing address same as shipping address</span>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Review Order */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="font-playfair text-xl mb-6">Review Your Order</h3>
            
            <div className="bg-gray-50 p-6 mb-6">
              <div className="mb-4">
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p className="text-gray-600">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.address} {formData.apartment && `, ${formData.apartment}`}<br />
                  {formData.city}, {formData.state} {formData.zipCode}<br />
                  {formData.country}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <p className="text-gray-600">
                  Email: {formData.email}<br />
                  Phone: {formData.phone}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 mb-6">
              <h4 className="font-medium mb-2">Payment Method</h4>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/40x25" alt="Credit Card" className="h-6 mr-3" />
                <span>Card ending in {formData.cardNumber.slice(-4)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" required />
                <span className="text-sm">I agree to the <a href="#" className="text-luxury-gold underline">Terms and Conditions</a> and <a href="#" className="text-luxury-gold underline">Privacy Policy</a></span>
              </label>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              className="px-6 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
            >
              Back
            </button>
          )}
          
          <div className={step === 1 ? "ml-auto" : ""}>
            <button
              type="submit"
              className="luxury-button"
            >
              {step < 3 ? "Continue" : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
