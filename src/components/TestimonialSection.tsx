
import React, { useEffect, useRef } from 'react';

const testimonials = [
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
];

const TestimonialSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <section className="py-20 bg-gradient-to-br from-brand-purple/5 to-brand-blue/5">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 sm:px-6 lg:px-8 transform translate-y-10 opacity-0 transition-all duration-700"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Müşterilerimizin <span className="gradient-text">Başarı Hikayeleri</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Binlerce işletme E-Paket ile online satışlarını artırıyor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el)}
              className="opacity-0 transition-all duration-500"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-lg p-6 shadow-md h-full flex flex-col relative">
                <div className="text-brand-purple/20 text-6xl font-serif absolute top-3 left-4">"</div>
                <p className="text-gray-600 mb-6 relative z-10">{testimonial.quote}</p>
                <div className="mt-auto flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
