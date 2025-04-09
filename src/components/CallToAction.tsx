
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ctaRef} 
          className="rounded-2xl bg-gradient-to-r from-brand-purple to-brand-blue p-8 md:p-12 transform translate-y-10 opacity-0 transition-all duration-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                E-ticaret yolculuğunuza hemen bugün başlayın
              </h2>
              <p className="mb-6 text-white/90 text-lg">
                14 gün ücretsiz deneme süresi, kurulum ücreti yok, sözleşme yok. Hemen başlayın ve satışlarınızı artırın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-white/90 group">
                  Ücretsiz Deneyin
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Demo İzleyin
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-white/10 rounded-lg blur-3xl"></div>
              <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 border border-white/20 relative">
                <div className="space-y-4">
                  <div className="h-4 w-2/3 bg-white/30 rounded-full"></div>
                  <div className="h-4 w-full bg-white/30 rounded-full"></div>
                  <div className="h-4 w-5/6 bg-white/30 rounded-full"></div>
                  <div className="h-10 w-1/2 bg-white rounded-md mt-6 ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
