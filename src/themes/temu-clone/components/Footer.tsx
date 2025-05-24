import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Temu Clone</h3>
            <p className="text-gray-600 mb-4">
              Modern ve dinamik bir e-ticaret deneyimi sunan platformumuzda en iyi ürünleri keşfedin.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-orange-500">Hakkımızda</a>
              </li>
              <li>
                <a href="/careers" className="text-gray-600 hover:text-orange-500">Kariyer</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-orange-500">Blog</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-orange-500">İletişim</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li>
                <a href="/track-order" className="text-gray-600 hover:text-orange-500">Sipariş Takibi</a>
              </li>
              <li>
                <a href="/returns" className="text-gray-600 hover:text-orange-500">İade ve Değişim</a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-orange-500">Sıkça Sorulan Sorular</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-orange-500">Gizlilik Politikası</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Temu Clone. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 