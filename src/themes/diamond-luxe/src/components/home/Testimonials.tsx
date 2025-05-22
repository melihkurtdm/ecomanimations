
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Elizabeth Morgan",
    title: "Fashion Influencer",
    quote: "Diamond Luxe consistently delivers exquisite pieces that elevate any outfit. Their attention to detail and customer service is impeccable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
  },
  {
    id: 2,
    name: "James Anderson",
    title: "CEO, Anderson Industries",
    quote: "The craftsmanship on my wife's anniversary gift was nothing short of extraordinary. Diamond Luxe has made a lifetime customer out of me.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
  },
  {
    id: 3,
    name: "Sophia Chen",
    title: "Interior Designer",
    quote: "I've been collecting pieces from Diamond Luxe for years. Each item feels uniquely personal and the quality is consistently exceptional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentTestimonial]);

  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="py-24 bg-white relative">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-luxury-gold/30 rounded-full opacity-50" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border border-luxury-gold/30 rounded-full opacity-50" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="font-playfair text-3xl md:text-4xl mb-16">What Our Clients Say</h2>
          
          {/* Testimonial Slider */}
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 absolute inset-0 ${
                  index === currentTestimonial
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                <div className="mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-luxury-gold p-1">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                </div>
                
                <blockquote>
                  <p className="text-xl italic mb-6">"{testimonial.quote}"</p>
                  <footer>
                    <p className="font-playfair text-lg">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </footer>
                </blockquote>
              </div>
            ))}
            
            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={handlePrev}
                className="p-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white transition-colors"
                aria-label="Previous testimonial"
                disabled={isAnimating}
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Indicators */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (isAnimating || index === currentTestimonial) return;
                      setIsAnimating(true);
                      setTimeout(() => {
                        setCurrentTestimonial(index);
                        setIsAnimating(false);
                      }, 500);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial
                        ? "bg-luxury-gold scale-150"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    disabled={isAnimating}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                className="p-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white transition-colors"
                aria-label="Next testimonial"
                disabled={isAnimating}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
