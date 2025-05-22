
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section 
      className="py-24 relative"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%), url(https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRpYW1vbmR8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center text-white">
          <h2 className="font-playfair text-3xl md:text-4xl mb-6">Join Our Exclusive List</h2>
          <p className="mb-8">
            Subscribe to receive updates on new collections, special offers, and private events.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="luxury-input flex-1 text-white border-white bg-transparent"
              required
            />
            <button type="submit" className="luxury-button">
              <span>Subscribe</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          </form>
          
          <p className="text-sm text-white/70 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Diamond Luxe.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
