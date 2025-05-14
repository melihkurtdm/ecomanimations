
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const translations = {
    tr: {
      tagline: "E-ticaret Çözümleriniz",
      heading: "E-ticaretin Tüm Gücü Elinizde",
      description: "Satışlarınızı artırmak ve çevrimiçi varlığınızı geliştirmek için ihtiyacınız olan tüm araçlar tek bir platformda",
      startButton: "Hemen Başlayın",
      demoButton: "Demo İnceleyin",
      businesses: "işletme bizimle çalışıyor",
      salesIncreasing: "Satışlar artıyor",
      easySetup: "Kolay kurulum"
    },
    en: {
      tagline: "Your E-commerce Solutions",
      heading: "The Full Power of E-commerce in Your Hands",
      description: "Create your online store quickly with a user-friendly interface and professional themes. Increasing your sales has never been easier.",
      startButton: "Start Now",
      demoButton: "View Demo",
      businesses: "businesses work with us",
      salesIncreasing: "Sales increasing",
      easySetup: "Easy setup"
    }
  };

  const t = translations[language];

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
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-28 pb-16 md:py-32">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-gray-900/60 dark:from-black/70 dark:via-black/50 dark:to-black/80"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            ref={heroRef} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.2,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="transform translate-y-10 opacity-0 transition-all duration-700 delay-100"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple/10 text-brand-purple mb-4 dark:bg-white/10 dark:text-white"
            >
              {t.tagline}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white dark:text-white"
            >
              {t.heading}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg text-gray-200 dark:text-gray-300 mb-8 md:max-w-lg"
            >
              {t.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">{t.startButton}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </Button>
              <Button variant="outline" size="lg" className="relative overflow-hidden group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                <span className="relative z-10 text-white">{t.demoButton}</span>
                <motion.span 
                  className="absolute inset-0 bg-white/10 z-0"
                  initial={{ y: "-100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mt-10"
            >
              <video
                controls
                style={{ width: '100%', maxWidth: '640px', borderRadius: '12px', margin: '0 auto' }}
              >
                <source
                  src="https://raw.githubusercontent.com/melihkurtdm/ecomanimations/main/videos/intro.mp4"
                  type="video/mp4"
                />
                Tarayıcınız video etiketini desteklemiyor.
              </video>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-xs text-white"
                >
                  A
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs text-white"
                >
                  B
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-xs text-white"
                >
                  C
                </motion.div>
              </div>
              <p className="text-sm text-gray-200 dark:text-gray-300">
                <span className="font-semibold">1,000+</span> {t.businesses}
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            ref={imageRef} 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.4,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="transform translate-x-10 opacity-0 transition-all duration-700 delay-300 relative"
          >
            <motion.div 
              className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-brand-blue/20 z-0"></div>
              <div className="bg-white dark:bg-gray-800 p-2">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col overflow-hidden">
                  <div className="bg-gray-800 h-10 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="h-60 md:h-80 bg-white dark:bg-gray-900 p-4 overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-800 h-8 w-1/2 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        className="bg-gray-100 dark:bg-gray-800 h-24 rounded"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      ></motion.div>
                      <motion.div 
                        className="bg-gray-100 dark:bg-gray-800 h-24 rounded"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      ></motion.div>
                      <motion.div 
                        className="bg-gray-100 dark:bg-gray-800 h-24 rounded"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      ></motion.div>
                      <motion.div 
                        className="bg-gray-100 dark:bg-gray-800 h-24 rounded"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10"
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-500 h-3 w-3 rounded-full"></div>
                <span className="text-sm font-medium">{t.salesIncreasing}</span>
              </div>
              <div className="mt-2 h-12 w-32">
                <motion.div 
                  className="h-2 w-1/3 bg-green-200 dark:bg-green-900 rounded-md mb-2"
                  animate={{ width: ['33%', '80%', '40%', '90%', '70%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="h-2 w-1/2 bg-green-200 dark:bg-green-900 rounded-md mb-2"
                  animate={{ width: ['50%', '30%', '70%', '40%', '85%'] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                ></motion.div>
                <motion.div 
                  className="h-2 w-2/3 bg-green-200 dark:bg-green-900 rounded-md"
                  animate={{ width: ['66%', '90%', '50%', '75%', '95%'] }}
                  transition={{ duration: 5.5, repeat: Infinity, delay: 1 }}
                ></motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10"
              initial={{ opacity: 0, y: -20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="h-6 w-6 rounded-full bg-brand-purple flex items-center justify-center text-white text-xs"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✓
                </motion.div>
                <span className="text-sm font-medium">{t.easySetup}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
