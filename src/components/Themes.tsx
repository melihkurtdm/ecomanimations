
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const themeData = [
  {
    name: "Modern Mağaza",
    description: "Minimalist ve çağdaş bir tasarımla ürünlerinizi ön plana çıkarın.",
    imageSrc: "https://placehold.co/600x400/9B87F5/FFFFFF?text=Modern+Mağaza+Teması",
    features: ["Satış odaklı", "Hızlı yükleme", "Mobil uyumlu"]
  },
  {
    name: "Lüks Butik",
    description: "Premium ürünler için zarif ve sofistike bir tasarım.",
    imageSrc: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Lüks+Butik+Teması",
    features: ["Özel animasyonlar", "Galeri vitrini", "VIP özellikleri"]
  },
  {
    name: "Pop-up Mağaza",
    description: "Hızlı kampanyalar ve sınırlı süreli teklifler için ideal.",
    imageSrc: "https://placehold.co/600x400/A78BFA/FFFFFF?text=Pop-up+Mağaza+Teması",
    features: ["Geri sayım zamanlayıcısı", "Özel teklif blokları", "Sosyal medya entegrasyonu"]
  },
  {
    name: "Büyük Katalog",
    description: "Binlerce ürün için optimize edilmiş geniş katalog tasarımı.",
    imageSrc: "https://placehold.co/600x400/60A5FA/FFFFFF?text=Büyük+Katalog+Teması",
    features: ["Gelişmiş filtreleme", "Hızlı arama", "Kategori organizasyonu"]
  },
  {
    name: "Moda Butiği",
    description: "Moda ürünleri için trend ve çekici tasarım.",
    imageSrc: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Moda+Butiği+Teması",
    features: ["Lookbook özelliği", "Beden kılavuzu", "Stil önerileri"]
  }
];

const Themes = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maxSlides = themeData.length - (window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === maxSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? maxSlides : prev - 1));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            if (entry.target === sectionRef.current) {
              entry.target.classList.add('translate-y-0');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="themes" className="py-20 bg-gray-50">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 sm:px-6 lg:px-8 transform translate-y-10 opacity-0 transition-all duration-700"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Profesyonel <span className="gradient-text">Tema Koleksiyonu</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Markanıza uygun çeşitli temalar arasından seçim yapın ve tamamen özelleştirin
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-md hover:bg-gray-100"
              onClick={prevSlide}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-md hover:bg-gray-100"
              onClick={nextSlide}
            >
              <ChevronRight size={20} />
            </Button>
          </div>

          <div className="relative overflow-hidden px-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / themeData.length)}%)` }}
            >
              {themeData.map((theme, index) => (
                <div 
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="w-full md:w-1/2 lg:w-1/3 px-4 flex-shrink-0 opacity-0 transition-opacity duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="theme-card bg-white h-full">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={theme.imageSrc} 
                        alt={theme.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
                        <h3 className="text-white font-bold text-xl p-4">{theme.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{theme.description}</p>
                      <div className="space-y-2">
                        {theme.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-brand-purple/20 flex items-center justify-center mr-2">
                              <div className="h-2 w-2 rounded-full bg-brand-purple"></div>
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="mt-6 w-full">Görüntüle</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center mt-8 space-x-2 md:hidden">
            {Array.from({ length: maxSlides + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-brand-purple' : 'bg-gray-300'
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

export default Themes;
