
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, HelpCircle, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    id: "başlangıç",
    name: "Start",
    price: "₺0",
    period: "ay",
    description: "E-Ticarete yeni başlayanlar için.",
    discount: null,
    discount_period: null,
    cta: "Ücretsiz",
    highlighted: false,
    ctaText: "Hemen Başlayın",
    features: [
      { 
        name: "69.90 TL'den Başlayan Anlaşmalı Kargo Fiyatları", 
        included: true, 
        tooltip: "Anlaşmalı kargo firmalarımız ile uygun fiyatlı gönderim yapabilirsiniz" 
      },
      { 
        name: "%2.99 Sanal POS Oranı", 
        included: true, 
        tooltip: "Ödeme işlemleri için uygun komisyon oranları" 
      },
      { name: "ikas Hızında E-Ticaret Sitesi", included: true },
      { 
        name: "Sınırsız Trafik ve Web Alanı", 
        included: true, 
        tooltip: "Herhangi bir ziyaretçi sınırı veya depolama alanı kısıtlaması yoktur" 
      },
      { name: "Panelden Sipariş Oluşturma", included: true },
      { name: "7/24 AI Chatbot Desteği", included: true },
      { name: "Aylık 1000 E-Posta Gönderimi", included: true },
      { 
        name: "Social Login", 
        included: true, 
        tooltip: "Müşterileriniz sosyal medya hesaplarıyla kolayca giriş yapabilir" 
      },
      { name: "Sınırsız Ürün Yükleme", included: false },
      { name: "Kampanyalar", included: false },
      { name: "Otomatik Sepet Hatırlatma Bildirimi", included: false },
      { name: "Dijital Ürün Satışı", included: false },
      { name: "Trendyol ve Hepsiburada Entegrasyonu", included: false },
      { name: "Özelleştirilmiş Arama Sonuçları", included: false },
    ]
  },
  {
    id: "profesyonel",
    name: "Grow",
    price: "₺2.749",
    period: "ay",
    yearly_price: "₺32.988",
    original_yearly: "₺44.988",
    discount: "7 Gün",
    discount_period: "Ücretsiz Deneme",
    description: "E-Ticarette hızla büyüyün.",
    highlighted: true,
    ctaText: "7 Gün Ücretsiz Dene",
    features: [
      { name: "Start Pakete Ek;", included: true, isHeading: true },
      { 
        name: "69.90 TL'den Başlayan Anlaşmalı Kargo Fiyatları", 
        included: true, 
        tooltip: "Anlaşmalı kargo firmalarımız ile uygun fiyatlı gönderim yapabilirsiniz" 
      },
      { 
        name: "%0'dan Başlayan Sanal POS Oranı", 
        included: true, 
        tooltip: "Daha yüksek satış hacimlerinde düşen komisyon oranları" 
      },
      { name: "E-Ticaret ve Temel SEO Eğitimi", included: true },
      { name: "Sınırsız Ürün Yükleme", included: true },
      { name: "7/24 Canlı Telefon Desteği", included: true },
      { name: "Kampanyalar", included: true },
      { name: "Otomatik Sepet Hatırlatma Bildirimi", included: true },
      { name: "Tekrar Stokta Bildirimi", included: true, label: "Sınırsız" },
      { name: "Ürün Yorum Hatırlatma Bildirimi", included: true },
      { name: "Reklam ve Sosyal Medya Hesap Entegrasyon Desteği", included: true },
      { name: "Dijital Ürün", included: true },
      { name: "Blog", included: true },
      { name: "Trendyol ve Hepsiburada Entegrasyonu", included: false },
      { name: "Sınırsız E-İhracat", included: false },
      { name: "Cross-sell / Çapraz Satış", included: false },
    ]
  },
  {
    id: "kurumsal",
    name: "Scale",
    price: "₺4.099",
    period: "ay",
    yearly_price: "₺49.188",
    original_yearly: "₺69.948",
    discount: "7 Gün",
    discount_period: "Ücretsiz Deneme",
    description: "Tüm dünyaya satış yapın.",
    highlighted: false,
    ctaText: "7 Gün Ücretsiz Dene",
    features: [
      { name: "Grow Pakete Ek;", included: true, isHeading: true },
      { 
        name: "69.90 TL'den Başlayan Anlaşmalı Kargo Fiyatları", 
        included: true, 
        tooltip: "Anlaşmalı kargo firmalarımız ile uygun fiyatlı gönderim yapabilirsiniz" 
      },
      { 
        name: "%0'dan Başlayan Sanal POS Oranı", 
        included: true, 
        tooltip: "Daha yüksek satış hacimlerinde düşen komisyon oranları" 
      },
      { 
        name: "Trendyol ve Hepsiburada Entegrasyonu", 
        included: true, 
        tooltip: "Türkiye'nin önde gelen pazaryerlerine entegrasyon" 
      },
      { 
        name: "Sınırsız E-İhracat", 
        included: true, 
        tooltip: "Yurtdışı satışlarınız için gerekli tüm altyapı" 
      },
      { 
        name: "Gelişmiş Sepet Hatırlatma Bildirimleri", 
        included: true, 
        tooltip: "Sepeti terk eden müşterilerinize özel mesajlar gönderin" 
      },
      { 
        name: "Cross-sell / Çapraz Satış", 
        included: true, 
        tooltip: "Müşterilerinize ilgili ürünleri göstererek satışlarınızı artırın" 
      },
      { name: "Bundle / Paket Ürün", included: true },
      { name: "Asorti Satış", included: true },
      { name: "Bölge Bazlı Teslimat", included: true },
      { name: "Saat Bazlı Kargo", included: true },
      { name: "Ürün Yorumlarına Cevap Verme", included: true },
      { name: "Ürün Yorumlarında Görsel", included: true },
      { name: "B2B / Toptan Satış", included: false },
      { name: "Mobil Uygulama", included: false },
      { name: "ERP Entegrasyonları", included: false },
    ]
  },
  {
    id: "enterprise",
    name: "Scale Plus",
    price: "₺7.024",
    period: "ay",
    yearly_price: "₺84.288",
    original_yearly: "₺149.976",
    discount: "7 Gün",
    discount_period: "Ücretsiz Deneme",
    description: "E-Ticarette ihtiyacınız olan her şey.",
    tag: "Vade Farksız 12 Taksit",
    highlighted: false,
    ctaText: "7 Gün Ücretsiz Dene",
    features: [
      { name: "Scale Pakete Ek;", included: true, isHeading: true },
      { 
        name: "59.90 TL'den Başlayan Anlaşmalı Kargo Fiyatları", 
        included: true, 
        tooltip: "En uygun kargo fiyatları ile gönderim yapabilirsiniz" 
      },
      { 
        name: "%0'dan Başlayan Sanal POS Oranı", 
        included: true, 
        tooltip: "En düşük komisyon oranları" 
      },
      { name: "Birebir Panel Eğitimi", included: true },
      { name: "Öncelikli Destek Hattı", included: true, label: "7/24" },
      { name: "Amazon Türkiye ve Etsy Entegrasyonu", included: true },
      { 
        name: "19 Yurt içi, 7 Yurt dışı Pazaryeri Entegrasyonu", 
        included: true, 
        tooltip: "Tüm popüler pazaryerlerine entegrasyon" 
      },
      { 
        name: "Whatsapp ile Sepet Hatırlatma", 
        included: true, 
        tooltip: "Müşterilerinize WhatsApp üzerinden özel bildirimler gönderin" 
      },
      { 
        name: "ERP Entegrasyonları", 
        included: true, 
        tooltip: "Mevcut ERP sisteminizle sorunsuz entegrasyon" 
      },
      { 
        name: "Konfigratör / Ürün Takımı", 
        included: true, 
        tooltip: "Müşterilerinizin ürünleri özelleştirmesine olanak tanıyın" 
      },
      { name: "Özelleştirilmiş Arama Sonuçları", included: true },
      { 
        name: "Eş Anlamlı Kelimeler", 
        included: true, 
        tooltip: "Arama sonuçlarınızı eş anlamlı kelimelerle zenginleştirin" 
      },
      { 
        name: "Masterpass", 
        included: true, 
        tooltip: "Hızlı ödeme sistemi entegrasyonu" 
      },
      { name: "B2B / Toptan Satış", included: true },
      { name: "Mobil Uygulama", included: true, label: "Ücretsiz" },
    ]
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isYearly, setIsYearly] = useState(false);

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
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Basit ve <span className="gradient-text">Şeffaf Fiyatlandırma</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            İhtiyacınıza uygun planı seçin ve işletmenizi büyütmeye başlayın.
          </p>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1 rounded-full inline-flex items-center">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Yıllık
              {isYearly && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">%25 İndirim</Badge>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center -mx-4">
          {plans.map((plan, index) => (
            <div 
              key={index}
              ref={(el) => (planRefs.current[index] = el)}
              className={`w-full md:w-1/2 lg:w-1/4 px-2 mb-8 opacity-0 transition-all duration-500 ${
                plan.highlighted ? 'lg:-mt-4' : ''
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div 
                className={`rounded-2xl overflow-hidden border h-full flex flex-col transition-all duration-300 hover:shadow-xl relative ${
                  plan.highlighted 
                    ? 'border-brand-purple shadow-lg z-10 transform' 
                    : 'border-gray-200 shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-brand-purple text-white text-center text-sm font-semibold py-1">
                    En Popüler Plan
                  </div>
                )}
                
                {plan.tag && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      {plan.tag}
                    </Badge>
                  </div>
                )}
                
                <div className="p-5 md:p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    {plan.id === "başlangıç" ? (
                      <>
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-gray-600 text-sm ml-1">Ömür boyu</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">
                          {isYearly ? (plan.yearly_price || plan.price) : plan.price}
                        </span>
                        <span className="text-gray-600 text-sm ml-1">/{isYearly ? 'yıl' : plan.period}</span>
                        
                        {isYearly && plan.original_yearly && (
                          <div className="mt-1">
                            <span className="text-gray-500 text-sm line-through">{plan.original_yearly}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {plan.discount && (
                    <div className="mb-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {plan.discount} {plan.discount_period}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className={feature.isHeading ? "font-medium text-sm mt-4 mb-2" : "flex items-start"}>
                        {!feature.isHeading && (
                          <>
                            <div className={`mr-3 flex-shrink-0 mt-1 ${plan.highlighted ? 'text-brand-purple' : feature.included ? 'text-green-500' : 'text-gray-300'}`}>
                              {feature.included ? (
                                <Check size={16} />
                              ) : (
                                <X size={16} />
                              )}
                            </div>
                            <div className="flex-1 flex items-center text-sm">
                              <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                                {feature.name}
                              </span>
                              {feature.label && (
                                <Badge className="ml-2 text-xs" variant="outline">
                                  {feature.label}
                                </Badge>
                              )}
                              {feature.tooltip && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="h-3.5 w-3.5 ml-1 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-60 text-xs">{feature.tooltip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </>
                        )}
                        
                        {feature.isHeading && (
                          <span className="text-gray-700">{feature.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="px-5 md:px-6 pb-6">
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
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Tüm planlar için 30 gün para iade garantisi. Herhangi bir sebepten memnun kalmazsanız geri ödeme yapılır.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
