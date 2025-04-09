
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: "başlangıç",
    name: "Başlangıç",
    price: "₺399",
    period: "ay",
    description: "Küçük işletmeler ve yeni başlayanlar için ideal",
    features: [
      "Aylık 100 sipariş",
      "3 tema seçeneği",
      "Temel ürün yönetimi",
      "Mobil uyumlu mağaza",
      "7/24 e-posta desteği"
    ],
    highlighted: false,
    ctaText: "Ücretsiz Deneyin"
  },
  {
    id: "profesyonel",
    name: "Profesyonel",
    price: "₺999",
    period: "ay",
    description: "Büyüyen işletmeler için tam kapsamlı çözüm",
    features: [
      "Sınırsız sipariş",
      "Tüm temalar",
      "Gelişmiş ürün yönetimi",
      "SEO optimizasyonu",
      "Çoklu dil desteği",
      "Özel domain",
      "7/24 öncelikli destek"
    ],
    highlighted: true,
    ctaText: "Hemen Başlayın"
  },
  {
    id: "kurumsal",
    name: "Kurumsal",
    price: "₺2499",
    period: "ay",
    description: "Büyük ölçekli işletmeler ve markalar için",
    features: [
      "Sınırsız sipariş",
      "Tüm temalar + özel tema",
      "Gelişmiş API erişimi",
      "Özel entegrasyonlar",
      "Çoklu mağaza yönetimi",
      "Özel müşteri yöneticisi",
      "Öncelikli 7/24 telefon desteği"
    ],
    highlighted: false,
    ctaText: "Bize Ulaşın"
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    planRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      planRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleSelectPlan = (planId: string) => {
    navigate(`/purchase?package=${planId}`);
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 sm:px-6 lg:px-8 transform translate-y-10 opacity-0 transition-all duration-700"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Basit ve <span className="gradient-text">Şeffaf Fiyatlandırma</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            İhtiyacınıza uygun planı seçin ve işletmenizi büyütmeye başlayın. Yıllık ödemelerde %20 indirim.
          </p>
        </div>

        <div className="flex flex-wrap justify-center -mx-4">
          {plans.map((plan, index) => (
            <div 
              key={index}
              ref={(el) => (planRefs.current[index] = el)}
              className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 opacity-0 transition-all duration-500"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div 
                className={`rounded-2xl overflow-hidden border h-full flex flex-col transition-all duration-300 hover:shadow-xl ${
                  plan.highlighted 
                    ? 'border-brand-purple shadow-lg relative z-10 transform scale-105 md:scale-110' 
                    : 'border-gray-200 shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-brand-purple text-white text-center text-sm font-semibold py-1">
                    En Popüler Plan
                  </div>
                )}
                <div className="p-6 md:p-8 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <div className={`mr-3 mt-1 ${plan.highlighted ? 'text-brand-purple' : 'text-gray-600'}`}>
                          <Check size={16} />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 md:px-8 pb-8">
                  <Button 
                    className={`w-full ${plan.highlighted ? 'bg-brand-purple hover:bg-brand-purple/90' : ''}`}
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
