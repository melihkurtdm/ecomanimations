
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonials = {
  tr: [
    {
      quote: "E-Paket sayesinde online mağazamı sadece 2 günde açtım. Satışlarım ilk ayda %40 arttı!",
      author: "Mehmet Yılmaz",
      company: "ModaBoutique",
      image: "https://placehold.co/100/9B87F5/FFFFFF?text=MY"
    },
    {
      quote: "Kullanımı çok kolay ve müşteri desteği mükemmel. Shopify'dan taşındıktan sonra maliyetlerimiz yarı yarıya düştü.",
      author: "Ayşe Kaya",
      company: "Doğal Kozmetik",
      image: "https://placehold.co/100/3B82F6/FFFFFF?text=AK"
    },
    {
      quote: "Tema özelleştirme aracı gerçekten etkileyici. Hiç kodlama bilmeden tamamen markamıza uygun bir site yapabildik.",
      author: "Emre Demir",
      company: "TeknoMarket",
      image: "https://placehold.co/100/A78BFA/FFFFFF?text=ED"
    }
  ],
  en: [
    {
      quote: "Thanks to E-Paket, I opened my online store in just 2 days. My sales increased by 40% in the first month!",
      author: "Michael Johnson",
      company: "FashionBoutique",
      image: "https://placehold.co/100/9B87F5/FFFFFF?text=MJ"
    },
    {
      quote: "Very easy to use and excellent customer support. After moving from Shopify, our costs dropped by half.",
      author: "Emily Parker",
      company: "Natural Cosmetics",
      image: "https://placehold.co/100/3B82F6/FFFFFF?text=EP"
    },
    {
      quote: "The theme customization tool is truly impressive. We were able to create a site perfectly suited to our brand without any coding knowledge.",
      author: "David Smith",
      company: "TechMarket",
      image: "https://placehold.co/100/A78BFA/FFFFFF?text=DS"
    }
  ]
};

const TestimonialSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  const texts = {
    tr: {
      heading: "Müşterilerimizin Başarı Hikayeleri",
      description: "Binlerce işletme E-Paket ile online satışlarını artırıyor"
    },
    en: {
      heading: "Success Stories from Our Customers",
      description: "Thousands of businesses increase their online sales with E-Paket"
    }
  };

  const t = texts[language];
  const currentTestimonials = testimonials[language];

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

    testimonialRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      testimonialRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-brand-purple/5 to-brand-blue/5 relative overflow-hidden dark:from-gray-900 dark:to-gray-800">
      {/* Animasyonlu arka plan elementleri */}
      <motion.div 
        className="absolute top-40 left-10 w-72 h-72 rounded-full bg-brand-purple/5 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 sm:px-6 lg:px-8 transform translate-y-10 opacity-0 transition-all duration-700 relative z-10"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full mx-auto"></div>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="gradient-text">{t.heading.split(' ')[0]}</span> {t.heading.split(' ').slice(1).join(' ')}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t.description}
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {currentTestimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el)}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="opacity-0 transition-all duration-500 h-full"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg h-full flex flex-col relative"
                initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-brand-purple/20 text-6xl font-serif absolute top-3 left-4 dark:text-white/10">"</div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">{testimonial.quote}</p>
                </motion.div>
                <div className="mt-auto flex items-center">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-brand-purple/30"
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
