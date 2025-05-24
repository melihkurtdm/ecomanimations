import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Temu Clone</h3>
            <p className="text-gray-600 text-sm">
              Modern ve dinamik alışveriş deneyimi sunan e-ticaret platformu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-600 text-sm">Hakkımızda</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600 text-sm">Kariyer</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600 text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600 text-sm">İletişim</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-600 text-sm">Sipariş Takibi</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600 text-sm">İade ve Değişim</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600 text-sm">Sıkça Sorulan Sorular</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600 text-sm">Gizlilik Politikası</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-orange-600">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 Temu Clone. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 