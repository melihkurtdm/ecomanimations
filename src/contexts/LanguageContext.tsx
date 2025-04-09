
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Common
    'save': 'Kaydet',
    'cancel': 'İptal',
    'delete': 'Sil',
    'edit': 'Düzenle',
    'create': 'Oluştur',
    'search': 'Ara',
    'loading': 'Yükleniyor',
    'noData': 'Veri bulunamadı',
    'back': 'Geri Dön',
    'next': 'İleri',
    'settings': 'Ayarlar',
    
    // Theme
    'themeCustomization': 'Tema Özelleştirme',
    'themeDescription': 'Mağazanızın görünümünü özelleştirin',
    'colors': 'Renkler',
    'typography': 'Yazı',
    'layout': 'Düzen',
    'presets': 'Hazır',
    'saveChanges': 'Değişiklikleri Kaydet',
    'resetDefaults': 'Varsayılana Döndür',
    'themePublish': 'Temayı Yayınla',
    
    // Analytics
    'analytics': 'Analitikler',
    'visitors': 'Ziyaretçiler',
    'pageViews': 'Sayfa Görüntüleme',
    'bounceRate': 'Hemen Çıkma Oranı',
    'conversionRate': 'Dönüşüm Oranı',
    'topPages': 'En Çok Ziyaret Edilen Sayfalar',
    'deviceStats': 'Cihaz İstatistikleri',
    'refreshData': 'Verileri Yenile',
    'exportData': 'Dışa Aktar',
    
    // Store
    'products': 'Ürünler',
    'categories': 'Kategoriler',
    'orders': 'Siparişler',
    'customers': 'Müşteriler',
    'addProduct': 'Ürün Ekle',
    'editProduct': 'Ürün Düzenle',
    'deleteProduct': 'Ürün Sil',
    
    // Dashboard
    'dashboard': 'Dashboard',
    'overview': 'Genel Bakış',
    'recentActivity': 'Son Aktiviteler',
    'quickAccess': 'Hızlı Erişim',
    'viewAll': 'Tümünü Gör',
  },
  en: {
    // Common
    'save': 'Save',
    'cancel': 'Cancel',
    'delete': 'Delete',
    'edit': 'Edit',
    'create': 'Create',
    'search': 'Search',
    'loading': 'Loading',
    'noData': 'No data found',
    'back': 'Go Back',
    'next': 'Next',
    'settings': 'Settings',
    
    // Theme
    'themeCustomization': 'Theme Customization',
    'themeDescription': 'Customize the appearance of your store',
    'colors': 'Colors',
    'typography': 'Typography',
    'layout': 'Layout',
    'presets': 'Presets',
    'saveChanges': 'Save Changes',
    'resetDefaults': 'Reset to Defaults',
    'themePublish': 'Publish Theme',
    
    // Analytics
    'analytics': 'Analytics',
    'visitors': 'Visitors',
    'pageViews': 'Page Views',
    'bounceRate': 'Bounce Rate',
    'conversionRate': 'Conversion Rate',
    'topPages': 'Top Pages',
    'deviceStats': 'Device Statistics',
    'refreshData': 'Refresh Data',
    'exportData': 'Export Data',
    
    // Store
    'products': 'Products',
    'categories': 'Categories',
    'orders': 'Orders',
    'customers': 'Customers',
    'addProduct': 'Add Product',
    'editProduct': 'Edit Product',
    'deleteProduct': 'Delete Product',
    
    // Dashboard
    'dashboard': 'Dashboard',
    'overview': 'Overview',
    'recentActivity': 'Recent Activity',
    'quickAccess': 'Quick Access',
    'viewAll': 'View All',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'tr',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      // If no preference, try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      setLanguage(browserLang === 'en' ? 'en' : 'tr');
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
