import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white opacity-10 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Yaz İndirimleri Başladı!
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Seçili ürünlerde %50'ye varan indirimler ve ücretsiz kargo fırsatını kaçırmayın.
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Hemen Alışverişe Başla
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner; 