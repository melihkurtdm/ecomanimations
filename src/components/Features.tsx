
import React, { useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Palette, 
  CreditCard, 
  BarChart4, 
  Smartphone, 
  Globe, 
  Box, 
  Search
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const featuresList = {
  tr: [
    {
      icon: <ShoppingBag className="text-brand-purple" size={24} />,
      title: "Kolay Ürün Yönetimi",
      description: "Ürünlerinizi saniyeler içinde ekleyin, düzenleyin ve yönetin. Toplu işlemlerle zamandan tasarruf edin."
    },
    {
      icon: <Palette className="text-brand-purple" size={24} />,
      title: "Özelleştirilebilir Temalar",
      description: "Sürükle ve bırak tema editörü ile markanıza uygun mağaza tasarımları oluşturun."
    },
    {
      icon: <CreditCard className="text-brand-purple" size={24} />,
      title: "Güvenli Ödeme Sistemleri",
      description: "Tüm popüler ödeme yöntemlerini destekleyen güvenli ödeme altyapısı."
    },
    {
      icon: <BarChart4 className="text-brand-purple" size={24} />,
      title: "Detaylı Raporlama",
      description: "Satış analizleri, ziyaretçi istatistikleri ve dönüşüm oranları ile işinizi büyütün."
    },
    {
      icon: <Smartphone className="text-brand-purple" size={24} />,
      title: "Mobil Uyumlu",
      description: "Tüm cihazlarda mükemmel görünen duyarlı tasarımlar ile müşterilerinize ulaşın."
    },
    {
      icon: <Globe className="text-brand-purple" size={24} />,
      title: "Çoklu Dil Desteği",
      description: "Global pazarlara açılın. Mağazanızı farklı dillerde sunarak uluslararası satış yapın."
    },
    {
      icon: <Box className="text-brand-purple" size={24} />,
      title: "Stok Yönetimi",
      description: "Gelişmiş stok takibi ile ürünlerinizi verimli şekilde yönetin, otomatik uyarılar alın."
    },
    {
      icon: <Search className="text-brand-purple" size={24} />,
      title: "SEO Dostu",
      description: "Arama motorlarında üst sıralarda yer alın ve organik trafiğinizi artırın."
    }
  ],
  en: [
    {
      icon: <ShoppingBag className="text-brand-purple" size={24} />,
      title: "Easy Product Management",
      description: "Add, edit, and manage your products in seconds. Save time with batch operations."
    },
    {
      icon: <Palette className="text-brand-purple" size={24} />,
      title: "Customizable Themes",
      description: "Create store designs that match your brand with the drag and drop theme editor."
    },
    {
      icon: <CreditCard className="text-brand-purple" size={24} />,
      title: "Secure Payment Systems",
      description: "Secure payment infrastructure supporting all popular payment methods."
    },
    {
      icon: <BarChart4 className="text-brand-purple" size={24} />,
      title: "Detailed Reporting",
      description: "Grow your business with sales analytics, visitor statistics, and conversion rates."
    },
    {
      icon: <Smartphone className="text-brand-purple" size={24} />,
      title: "Mobile Friendly",
      description: "Reach your customers with responsive designs that look perfect on all devices."
    },
    {
      icon: <Globe className="text-brand-purple" size={24} />,
      title: "Multi-Language Support",
      description: "Expand to global markets. Present your store in different languages for international sales."
    },
    {
      icon: <Box className="text-brand-purple" size={24} />,
      title: "Inventory Management",
      description: "Efficiently manage your products with advanced inventory tracking and automatic alerts."
    },
    {
      icon: <Search className="text-brand-purple" size={24} />,
      title: "SEO Friendly",
      description: "Rank high in search engines and increase your organic traffic."
    }
  ]
};

const Features = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRefs = useRef<(HTMLDivElement | null)[]>([]);

  const texts = {
    tr: {
      heading: "E-ticaretin Tüm Gücü Elinizde",
      description: "Satışlarınızı artırmak ve çevrimiçi varlığınızı geliştirmek için ihtiyacınız olan tüm araçlar tek bir platformda"
    },
    en: {
      heading: "All the Power of E-commerce in Your Hands",
      description: "All the tools you need to increase your sales and enhance your online presence on a single platform"
    }
  };

  const t = texts[language];
  const currentFeatures = featuresList[language];

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
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    featuresRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      featuresRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animasyonlu arka plan elementleri */}
      <motion.div 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-brand-purple/5 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-brand-blue/5 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
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
            E-ticaretin <span className="gradient-text">Tüm Gücü</span> Elinizde
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {currentFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              ref={(el) => (featuresRefs.current[index] = el)}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="feature-card opacity-0 transition-all duration-500 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <motion.div 
                className="h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4"
                whileHover={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 0.6
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
