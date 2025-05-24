import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Yaz İndirimleri Başladı!
          </h2>
          <p className="text-lg md:text-xl mb-8 text-orange-100">
            Seçili ürünlerde %50'ye varan indirimler ve ücretsiz kargo fırsatını kaçırmayın.
          </p>
          <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2">
            Hemen Alışverişe Başla
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Hero; 