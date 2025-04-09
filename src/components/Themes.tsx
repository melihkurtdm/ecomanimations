
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Palette, Eye, PenSquare, Check } from "lucide-react";
import { toast } from '@/hooks/use-toast';

const themeData = [
  {
    id: "modern",
    name: "Modern Mağaza",
    description: "Minimalist ve çağdaş bir tasarımla ürünlerinizi ön plana çıkarın.",
    imageSrc: "https://placehold.co/600x400/9B87F5/FFFFFF?text=Modern+Mağaza+Teması",
    features: ["Satış odaklı", "Hızlı yükleme", "Mobil uyumlu"],
    color: "#9B87F5"
  },
  {
    id: "luxury",
    name: "Lüks Butik",
    description: "Premium ürünler için zarif ve sofistike bir tasarım.",
    imageSrc: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Lüks+Butik+Teması",
    features: ["Özel animasyonlar", "Galeri vitrini", "VIP özellikleri"],
    color: "#3B82F6"
  },
  {
    id: "popup",
    name: "Pop-up Mağaza",
    description: "Hızlı kampanyalar ve sınırlı süreli teklifler için ideal.",
    imageSrc: "https://placehold.co/600x400/A78BFA/FFFFFF?text=Pop-up+Mağaza+Teması",
    features: ["Geri sayım zamanlayıcısı", "Özel teklif blokları", "Sosyal medya entegrasyonu"],
    color: "#A78BFA"
  },
  {
    id: "catalog",
    name: "Büyük Katalog",
    description: "Binlerce ürün için optimize edilmiş geniş katalog tasarımı.",
    imageSrc: "https://placehold.co/600x400/60A5FA/FFFFFF?text=Büyük+Katalog+Teması",
    features: ["Gelişmiş filtreleme", "Hızlı arama", "Kategori organizasyonu"],
    color: "#60A5FA"
  },
  {
    id: "fashion",
    name: "Moda Butiği",
    description: "Moda ürünleri için trend ve çekici tasarım.",
    imageSrc: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Moda+Butiği+Teması",
    features: ["Lookbook özelliği", "Beden kılavuzu", "Stil önerileri"],
    color: "#8B5CF6"
  }
];

const Themes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slidesPerView = {
    sm: 1,
    md: 2,
    lg: 3
  };
  
  // Responsive slide calculation
  const getMaxSlides = () => {
    if (window.innerWidth > 1024) return themeData.length - slidesPerView.lg;
    if (window.innerWidth > 768) return themeData.length - slidesPerView.md;
    return themeData.length - slidesPerView.sm;
  };
  
  const [maxSlides, setMaxSlides] = useState(getMaxSlides());
  
  useEffect(() => {
    const handleResize = () => {
      setMaxSlides(getMaxSlides());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === maxSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? maxSlides : prev - 1));
  };

  const handleViewTheme = (index: number) => {
    if (user) {
      navigate('/dashboard/theme-selection');
      toast({
        title: "Tema detayları açılıyor",
        description: `${themeData[index].name} teması inceleniyor.`
      });
    } else {
      toast({
        title: "Giriş yapmanız gerekiyor",
        description: "Tema detaylarını görmek için lütfen giriş yapın.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  };

  const handleCustomizeTheme = () => {
    if (user) {
      navigate('/dashboard/theme-customization');
    } else {
      toast({
        title: "Giriş yapmanız gerekiyor",
        description: "Tema özelleştirmek için lütfen giriş yapın.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      } 
    }
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
    <section id="themes" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <motion.div 
        ref={sectionRef} 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Profesyonel <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Tema Koleksiyonu</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Markanıza uygun çeşitli temalar arasından seçim yapın ve tamamen özelleştirin
          </motion.p>
          
          {user && (
            <motion.div variants={itemVariants}>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={handleCustomizeTheme}
              >
                <Palette className="h-4 w-4 mr-2" />
                Tema Özelleştirme Sayfasına Git
              </Button>
            </motion.div>
          )}
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-md hover:bg-gray-100 opacity-80 hover:opacity-100 transition-opacity duration-300"
              onClick={prevSlide}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-md hover:bg-gray-100 opacity-80 hover:opacity-100 transition-opacity duration-300"
              onClick={nextSlide}
            >
              <ChevronRight size={20} />
            </Button>
          </div>

          <div className="relative overflow-hidden px-4">
            <motion.div 
              className="flex transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / themeData.length)}%)` }}
            >
              {themeData.map((theme, index) => (
                <motion.div 
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  variants={itemVariants}
                  className="w-full md:w-1/2 lg:w-1/3 px-4 flex-shrink-0 opacity-0 transition-opacity duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <motion.div 
                    className="theme-card bg-white rounded-xl overflow-hidden h-full shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ 
                      y: -10, 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={theme.imageSrc} 
                        alt={theme.name} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end"
                        style={{ 
                          background: isHovered === index 
                            ? `linear-gradient(to bottom, transparent 0%, ${theme.color}99 100%)` 
                            : 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)' 
                        }}
                      >
                        <h3 className="text-white font-bold text-xl p-4">{theme.name}</h3>
                      </div>
                      {isHovered === index && (
                        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Button 
                              size="sm" 
                              variant="secondary" 
                              className="bg-white/90 hover:bg-white shadow-lg"
                              onClick={() => handleViewTheme(index)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Önizle
                            </Button>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{theme.description}</p>
                      <div className="space-y-2">
                        {theme.features.map((feature, fIndex) => (
                          <motion.div 
                            key={fIndex} 
                            className="flex items-center"
                            initial={{ x: -10, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: fIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${theme.color}20` }}>
                              <div className="h-5 w-5 flex items-center justify-center">
                                <Check className="h-3 w-3" style={{ color: theme.color }} />
                              </div>
                            </div>
                            <span className="text-sm text-gray-700 ml-2">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex space-x-2 mt-6">
                        <Button 
                          variant="outline" 
                          className="flex-1 group"
                          onClick={() => handleViewTheme(index)}
                        >
                          <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                          <span>Görüntüle</span>
                        </Button>
                        {user && (
                          <Button 
                            className="flex-1 group"
                            style={{ 
                              backgroundColor: theme.color,
                              borderColor: theme.color
                            }}
                            onClick={() => navigate('/dashboard/theme-customization')}
                          >
                            <PenSquare className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                            <span>Düzenle</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center mt-8 space-x-2 md:hidden">
            {Array.from({ length: maxSlides + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-brand-purple scale-110' 
                    : 'bg-gray-300 scale-100'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Themes;
