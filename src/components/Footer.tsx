
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <a href="#" className="text-2xl font-bold gradient-text">E-Paket</a>
            </div>
            <p className="text-gray-600 mb-6">
              Modern e-ticaret çözümleri ile işletmenizi online dünyada büyütün.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Özellikler</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Temalar</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Entegrasyonlar</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Fiyatlandırma</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Topluluk</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Şirket</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Kariyer</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Basın</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">İş Ortakları</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Destek</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Yardım Merkezi</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">Dokümantasyon</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">SSS</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">İletişim</a></li>
              <li>
                <a href="mailto:info@epaket.com" className="text-brand-purple flex items-center">
                  <Mail size={16} className="mr-2" />
                  info@epaket.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} E-Paket. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-brand-purple text-sm transition-colors">Gizlilik Politikası</a>
              <a href="#" className="text-gray-500 hover:text-brand-purple text-sm transition-colors">Kullanım Koşulları</a>
              <a href="#" className="text-gray-500 hover:text-brand-purple text-sm transition-colors">Çerez Politikası</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
