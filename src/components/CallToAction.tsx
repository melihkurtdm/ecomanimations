
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CallToAction = () => {
  const { language } = useLanguage();
  const ctaRef = useRef<HTMLDivElement>(null);

  const translations = {
    tr: {
      heading: "E-ticaret yolculuğunuza hemen bugün başlayın",
      description: "14 gün ücretsiz deneme süresi, kurulum ücreti yok, sözleşme yok. Hemen başlayın ve satışlarınızı artırın.",
      tryButton: "Ücretsiz Deneyin",
      demoButton: "Demo İzleyin"
    },
    en: {
      heading: "Start your e-commerce journey today",
      description: "14-day free trial, no setup fee, no contract. Get started now and increase your sales.",
      tryButton: "Try for Free",
      demoButton: "Watch Demo"
    }
  };

  const t = translations[language];

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
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animasyonlu arka plan elementleri */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 50, 0],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ctaRef} 
          className="rounded-2xl bg-gradient-to-r from-brand-purple to-brand-blue p-8 md:p-12 transform translate-y-10 opacity-0 transition-all duration-700 relative z-10 overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Shiny gradient effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-45"
            initial={{ left: "-100%" }}
            animate={{ left: "200%" }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut"
            }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {t.heading}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 text-white/90 text-lg"
              >
                {t.description}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="bg-white text-brand-purple hover:bg-white/90 group relative overflow-hidden">
                  <span className="relative z-10">{t.tryButton}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  <motion.span 
                    className="absolute inset-0 bg-white/30"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 relative overflow-hidden">
                  <span className="relative z-10">{t.demoButton}</span>
                  <motion.span 
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </div>
            <div className="relative hidden md:block">
              <motion.div 
                className="absolute inset-0 bg-white/10 rounded-lg blur-3xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 0.8, 0.6] 
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="bg-white/20 backdrop-blur-lg rounded-lg p-6 border border-white/20 relative"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className="h-4 w-2/3 bg-white/30 rounded-full"
                    animate={{ width: ["65%", "40%", "65%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="h-4 w-full bg-white/30 rounded-full"
                    animate={{ width: ["100%", "80%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.div 
                    className="h-4 w-5/6 bg-white/30 rounded-full"
                    animate={{ width: ["83%", "60%", "83%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  <motion.div 
                    className="h-10 w-1/2 bg-white rounded-md mt-6 ml-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
