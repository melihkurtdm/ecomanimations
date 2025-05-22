
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const heroSlides = [
  {
    id: 1,
    title: "Timeless Elegance",
    subtitle: "Exclusive Diamond Collection",
    description: "Discover our handcrafted jewelry pieces designed for the extraordinary.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    buttonText: "Explore Collection",
    buttonLink: "/collections"
  },
  {
    id: 2,
    title: "Exquisite Design",
    subtitle: "Luxury Accessories",
    description: "Elevate your style with our premium selection of accessories.",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80",
    buttonText: "Shop Now",
    buttonLink: "/accessories"
  },
  {
    id: 3,
    title: "Artisanal Craftsmanship",
    subtitle: "Haute Couture Collection",
    description: "Experience the pinnacle of craftsmanship with our bespoke creations.",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2233&q=80",
    buttonText: "Discover More",
    buttonLink: "/collections"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 500);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3) 100%), url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <div className={`max-w-xl transition-all duration-1000 ${isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
          <h3 className="text-luxury-gold font-montserrat uppercase tracking-widest text-sm md:text-base mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {slide.subtitle}
          </h3>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {slide.title}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-md opacity-0 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            {slide.description}
          </p>
          <Link 
            to={slide.buttonLink}
            className="luxury-button inline-flex items-center gap-2 opacity-0 animate-fade-in" 
            style={{ animationDelay: '0.9s' }}
          >
            {slide.buttonText}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center md:justify-start items-center gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-12 h-1 transition-all duration-300 ${
                  index === currentSlide ? 'bg-luxury-gold' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
