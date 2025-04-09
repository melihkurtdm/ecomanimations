
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

const featuresList = [
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
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <section id="features" className="py-20 bg-white">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 sm:px-6 lg:px-8 transform translate-y-10 opacity-0 transition-all duration-700"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            E-ticaretin <span className="gradient-text">Tüm Gücü</span> Elinizde
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Satışlarınızı artırmak ve çevrimiçi varlığınızı geliştirmek için ihtiyacınız olan tüm araçlar tek bir platformda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <div 
              key={index}
              ref={(el) => (featuresRefs.current[index] = el)}
              className={`feature-card p-6 opacity-0 transition-all duration-500`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
