
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            if (entry.target === heroRef.current) {
              entry.target.classList.add('translate-y-0');
            }
            if (entry.target === imageRef.current) {
              entry.target.classList.add('translate-x-0');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 pt-28 pb-16 md:py-32">
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-brand-purple/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-blue/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div 
            ref={heroRef} 
            className="transform translate-y-10 opacity-0 transition-all duration-700 delay-100"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple/10 text-brand-purple mb-4">
              E-ticaret Çözümleriniz
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Modern <span className="gradient-text">E-ticaret</span> Platformunuz
            </h1>
            <p className="text-lg text-gray-600 mb-8 md:max-w-lg">
              Kullanıcı dostu arayüz ve profesyonel temalarla çevrimiçi mağazanızı hızlıca oluşturun. Satışlarınızı artırmak hiç bu kadar kolay olmamıştı.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group animate-pulse">
                Hemen Başlayın
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Demo İnceleyin
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                  👤
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                  👤
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                  👤
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">1,000+</span> işletme bizimle çalışıyor
              </p>
            </div>
          </div>
          
          <div 
            ref={imageRef} 
            className="transform translate-x-10 opacity-0 transition-all duration-700 delay-300 relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-200 animate-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-brand-blue/20 z-0"></div>
              <div className="bg-white p-2">
                <div className="bg-gray-100 rounded-lg flex flex-col overflow-hidden">
                  <div className="bg-gray-800 h-10 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="h-60 md:h-80 bg-white p-4 overflow-hidden">
                    <div className="bg-gray-100 h-8 w-1/2 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 h-24 rounded"></div>
                      <div className="bg-gray-100 h-24 rounded"></div>
                      <div className="bg-gray-100 h-24 rounded"></div>
                      <div className="bg-gray-100 h-24 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 h-3 w-3 rounded-full"></div>
                <span className="text-sm font-medium">Satışlar artıyor</span>
              </div>
              <div className="mt-2 h-12 w-32 bg-gray-100 rounded-md"></div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-white rounded-lg shadow-lg p-4 animate-float" style={{animationDelay: '1.5s'}}>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-brand-purple flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium">Kolay kurulum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
