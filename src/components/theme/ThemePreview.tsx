
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Bookmark, CheckCircle2, ShoppingCart, Search, User, Heart, Menu } from 'lucide-react';
import ThemeDeviceSelector, { DeviceType } from './ThemeDeviceSelector';

interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
    button: string;
  };
  spacing: {
    section: string;
    element: string;
  };
  borderRadius: string;
}

interface ThemePreviewProps {
  themeSettings: ThemeSettings;
  previewAnimation: boolean;
  isSaved: boolean;
  isPublished: boolean;
  onRefreshPreview: () => void;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({
  themeSettings,
  previewAnimation,
  isSaved,
  isPublished,
  onRefreshPreview
}) => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');
  const [isRotated, setIsRotated] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const getPreviewWidth = () => {
    switch (activeDevice) {
      case 'mobile':
        return isRotated ? '568px' : '320px';
      case 'tablet':
        return isRotated ? '1024px' : '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  const getPreviewHeight = () => {
    switch (activeDevice) {
      case 'mobile':
        return isRotated ? '320px' : '568px';
      case 'tablet':
        return isRotated ? '768px' : '1024px';
      case 'desktop':
      default:
        return 'auto';
    }
  };

  const products = [
    {
      id: 1,
      name: "Premium Ürün",
      description: "Özel tasarım premium ürün",
      price: "₺299.99",
      discount: "₺399.99",
      isNew: true,
      image: "https://placehold.co/300x300/9B87F5/FFFFFF?text=Premium"
    },
    {
      id: 2,
      name: "Trend Ürün",
      description: "Bu sezonun en trend ürünü",
      price: "₺199.99",
      isHot: true,
      image: "https://placehold.co/300x300/A78BFA/FFFFFF?text=Trend"
    },
    {
      id: 3,
      name: "Sezon Fırsatı",
      description: "Sınırlı sayıda, kaçırmayın",
      price: "₺149.99",
      discount: "₺249.99",
      image: "https://placehold.co/300x300/8B5CF6/FFFFFF?text=Fırsat"
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tema Ön İzleme</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRefreshPreview}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Canlandır</span>
        </Button>
      </CardHeader>
      <CardContent>
        <ThemeDeviceSelector 
          activeDevice={activeDevice}
          onDeviceChange={setActiveDevice}
          onRotate={() => setIsRotated(!isRotated)}
          isRotated={isRotated}
        />

        <div 
          className="overflow-hidden flex items-center justify-center border border-gray-200 rounded-lg shadow-lg"
          style={{ height: activeDevice !== 'desktop' ? '500px' : 'auto' }}
        >
          <motion.div 
            className="border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all"
            style={{ 
              fontFamily: themeSettings.fonts.body,
              width: getPreviewWidth(),
              height: getPreviewHeight(),
              maxWidth: '100%',
              maxHeight: activeDevice !== 'desktop' ? '100%' : 'auto',
              transform: activeDevice !== 'desktop' && isRotated ? 'rotate(90deg)' : 'none',
            }}
            animate={previewAnimation ? { y: [0, -5, 0], transition: { duration: 0.5 } } : {}}
          >
            {/* Site Header */}
            <motion.header 
              className="sticky top-0 z-10"
              style={{ 
                backgroundColor: themeSettings.colors.background,
                borderBottom: `1px solid ${themeSettings.colors.secondary}30`, 
              }}
              animate={previewAnimation ? { 
                y: [0, -2, 0], 
                transition: { duration: 0.5, delay: 0.1 } 
              } : {}}
            >
              {/* Top Bar */}
              <div 
                className="py-1 px-4 text-xs hidden sm:flex justify-between items-center"
                style={{ 
                  backgroundColor: `${themeSettings.colors.primary}15`,
                  color: themeSettings.colors.text
                }}
              >
                <div>Hoş geldiniz! Ücretsiz kargo için min. 250₺</div>
                <div className="flex gap-2">
                  <span>Yardım</span>
                  <span>|</span>
                  <span>İletişim</span>
                </div>
              </div>
              
              {/* Main Header */}
              <div className="p-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold flex items-center" style={{ fontFamily: themeSettings.fonts.heading }}>
                  <motion.span 
                    style={{ color: themeSettings.colors.primary }}
                    animate={previewAnimation ? { 
                      scale: [1, 1.05, 1],
                      transition: { duration: 0.5, delay: 0.2 } 
                    } : {}}
                  >
                    Mağaza
                  </motion.span>
                  <span style={{ color: themeSettings.colors.text }}>Adı</span>
                </div>
                
                {/* Search (hidden on mobile) */}
                <div className="hidden md:flex relative rounded-full overflow-hidden" style={{ 
                  borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.75}rem`,
                  border: `1px solid ${themeSettings.colors.secondary}30`
                }}>
                  <input 
                    type="text" 
                    placeholder="Ürün Ara..." 
                    className="py-1 px-4 pr-10 text-sm focus:outline-none w-64"
                    style={{ backgroundColor: themeSettings.colors.background }}
                  />
                  <button style={{ 
                    backgroundColor: themeSettings.colors.primary,
                    color: "#fff",
                    padding: "0.25rem 0.75rem"
                  }}>
                    <Search size={16} />
                  </button>
                </div>
                
                {/* Action Icons */}
                <div className="flex items-center gap-3">
                  <button className="hidden sm:flex items-center text-sm" style={{ color: themeSettings.colors.text }}>
                    <User size={18} className="mr-1" />
                    <span className="hidden md:inline">Hesabım</span>
                  </button>
                  <button className="hidden sm:flex items-center text-sm" style={{ color: themeSettings.colors.text }}>
                    <Heart size={18} className="mr-1" />
                    <span className="hidden md:inline">Favoriler</span>
                  </button>
                  <motion.button 
                    className="flex items-center text-sm relative"
                    whileHover={{ scale: 1.05 }}
                    style={{ color: themeSettings.colors.text }}
                  >
                    <ShoppingCart size={20} className="mr-1" />
                    <span className="hidden md:inline">Sepet</span>
                    <span 
                      className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs rounded-full"
                      style={{ 
                        backgroundColor: themeSettings.colors.accent,
                        color: "#FFFFFF",
                      }}
                    >
                      3
                    </span>
                  </motion.button>
                  <button className="md:hidden" style={{ color: themeSettings.colors.text }}>
                    <Menu size={22} />
                  </button>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="hidden md:flex justify-center py-2 px-4 gap-5 text-sm bg-white" style={{ 
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" 
              }}>
                {["Ana Sayfa", "Yeni Gelenler", "Kadın", "Erkek", "Aksesuar", "İndirim", "Kampanyalar"].map((item, i) => (
                  <motion.a 
                    key={i}
                    href="#"
                    className="relative py-1 px-2"
                    style={{ 
                      color: themeSettings.colors.text,
                      fontWeight: i === 0 ? "600" : "normal",
                    }}
                    whileHover={{ 
                      color: themeSettings.colors.primary,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item}
                    {i === 0 && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5" 
                        style={{ backgroundColor: themeSettings.colors.primary }}
                        layoutId="navIndicator"
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.header>
            
            {/* Main Content */}
            <motion.div 
              className="p-6"
              style={{ 
                backgroundColor: themeSettings.colors.background,
                color: themeSettings.colors.text,
                padding: themeSettings.spacing.section
              }}
            >
              {/* Hero Banner */}
              <motion.div 
                className="text-center mb-8 p-8 rounded-xl"
                style={{ 
                  marginBottom: themeSettings.spacing.section,
                  background: `linear-gradient(135deg, ${themeSettings.colors.primary}15, ${themeSettings.colors.secondary}30)`,
                  borderRadius: `${parseFloat(themeSettings.borderRadius)}rem`,
                }}
                animate={previewAnimation ? { 
                  scale: [1, 1.01, 1],
                  transition: { duration: 0.7, delay: 0.2 } 
                } : {}}
              >
                <motion.h1 
                  className="text-3xl font-bold mb-3"
                  style={{ 
                    fontFamily: themeSettings.fonts.heading,
                    color: themeSettings.colors.primary,
                    fontWeight: "800"
                  }}
                >
                  Yeni Sezon Koleksiyonu
                </motion.h1>
                <p className="mb-4 max-w-2xl mx-auto">En yeni tasarımlar ve en kaliteli ürünler şimdi mağazamızda. Yeni sezon indirimleri için acele edin!</p>
                <motion.button 
                  className="px-6 py-2 font-medium inline-flex items-center gap-2"
                  style={{ 
                    backgroundColor: themeSettings.colors.accent, 
                    color: "#FFFFFF",
                    borderRadius: `${parseFloat(themeSettings.borderRadius)}rem`,
                    fontFamily: themeSettings.fonts.button
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={16} />
                  Alışverişe Başla
                </motion.button>
              </motion.div>
              
              {/* Featured Products */}
              <div className="mb-8" style={{ marginBottom: themeSettings.spacing.section }}>
                <div className="flex justify-between items-center mb-4">
                  <h2 
                    className="text-xl font-bold"
                    style={{ 
                      fontFamily: themeSettings.fonts.heading,
                      marginBottom: themeSettings.spacing.element
                    }}
                  >
                    Öne Çıkan Ürünler
                  </h2>
                  <a 
                    href="#" 
                    className="text-sm flex items-center" 
                    style={{ color: themeSettings.colors.primary }}
                  >
                    Tümünü Gör
                  </a>
                </div>
                
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  style={{ gap: themeSettings.spacing.element }}
                >
                  {products.map((product, idx) => (
                    <motion.div 
                      key={product.id}
                      className="relative overflow-hidden group"
                      style={{ 
                        borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.75}rem`,
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)",
                        border: `1px solid ${themeSettings.colors.secondary}15`
                      }}
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
                      }}
                      onHoverStart={() => setHoveredProduct(idx)}
                      onHoverEnd={() => setHoveredProduct(null)}
                      animate={previewAnimation ? { 
                        y: [0, -5, 0],
                        transition: { duration: 0.5, delay: 0.3 + (idx * 0.1) } 
                      } : {}}
                    >
                      {/* Product Image */}
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-700"
                          style={{ 
                            transform: hoveredProduct === idx ? "scale(1.05)" : "scale(1)"
                          }}
                        />
                        
                        {/* Quick Action Buttons */}
                        <AnimatePresence>
                          {hoveredProduct === idx && (
                            <motion.div 
                              className="absolute bottom-2 left-0 right-0 flex justify-center gap-2"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.button 
                                className="w-8 h-8 rounded-full flex items-center justify-center" 
                                style={{ 
                                  backgroundColor: "#FFFFFF", 
                                  color: themeSettings.colors.text 
                                }}
                                whileHover={{ 
                                  backgroundColor: themeSettings.colors.primary,
                                  color: "#FFFFFF"
                                }}
                              >
                                <Heart size={14} />
                              </motion.button>
                              <motion.button 
                                className="w-8 h-8 rounded-full flex items-center justify-center" 
                                style={{ 
                                  backgroundColor: "#FFFFFF", 
                                  color: themeSettings.colors.text 
                                }}
                                whileHover={{ 
                                  backgroundColor: themeSettings.colors.primary,
                                  color: "#FFFFFF"
                                }}
                              >
                                <Search size={14} />
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Product Badges */}
                        {product.isNew && (
                          <div 
                            className="absolute top-2 left-2 py-1 px-2 text-xs font-medium rounded"
                            style={{ 
                              backgroundColor: themeSettings.colors.accent, 
                              color: "#FFFFFF"
                            }}
                          >
                            Yeni
                          </div>
                        )}
                        
                        {product.isHot && (
                          <div 
                            className="absolute top-2 left-2 py-1 px-2 text-xs font-medium rounded"
                            style={{ 
                              backgroundColor: themeSettings.colors.primary, 
                              color: "#FFFFFF"
                            }}
                          >
                            Trend
                          </div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-3">
                        <h3 
                          className="font-medium text-base mb-1"
                          style={{ fontFamily: themeSettings.fonts.heading }}
                        >
                          {product.name}
                        </h3>
                        <p 
                          className="text-sm opacity-75 mb-2 line-clamp-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span 
                              className="font-bold"
                              style={{ color: themeSettings.colors.primary }}
                            >
                              {product.price}
                            </span>
                            {product.discount && (
                              <span 
                                className="text-xs line-through opacity-50"
                              >
                                {product.discount}
                              </span>
                            )}
                          </div>
                          <motion.button 
                            className="p-2 rounded-full"
                            style={{ 
                              backgroundColor: themeSettings.colors.secondary, 
                              color: "#FFFFFF",
                              borderRadius: `${parseFloat(themeSettings.borderRadius) * 0.5}rem`,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ShoppingCart size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <motion.div 
                className="mb-8 p-6 rounded-xl text-center"
                style={{
                  background: `linear-gradient(45deg, ${themeSettings.colors.primary}, ${themeSettings.colors.secondary})`,
                  color: "#FFFFFF",
                  borderRadius: `${parseFloat(themeSettings.borderRadius)}rem`,
                }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: themeSettings.fonts.heading }}>
                  Üyelere Özel %15 İndirim
                </h3>
                <p className="mb-4">Hemen üye olun, indirimlerden ve özel fırsatlardan ilk siz haberdar olun.</p>
                <button
                  className="px-6 py-2 font-medium bg-white rounded-full"
                  style={{
                    color: themeSettings.colors.primary,
                    borderRadius: `${parseFloat(themeSettings.borderRadius)}rem`,
                    fontFamily: themeSettings.fonts.button
                  }}
                >
                  Üye Ol
                </button>
              </motion.div>
            </motion.div>
            
            {/* Footer */}
            <motion.footer 
              className="p-4 text-center text-sm"
              style={{ 
                backgroundColor: themeSettings.colors.primary,
                color: "#FFFFFF",
                padding: themeSettings.spacing.element
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left mb-4">
                <div>
                  <h4 className="font-bold mb-2">Mağazamız</h4>
                  <ul className="space-y-1 text-xs opacity-80">
                    <li>Hakkımızda</li>
                    <li>İletişim</li>
                    <li>Mağazalarımız</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Yardım</h4>
                  <ul className="space-y-1 text-xs opacity-80">
                    <li>Sipariş Takibi</li>
                    <li>İade & Değişim</li>
                    <li>SSS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Kategoriler</h4>
                  <ul className="space-y-1 text-xs opacity-80">
                    <li>Kadın</li>
                    <li>Erkek</li>
                    <li>Aksesuar</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Takip Edin</h4>
                  <ul className="space-y-1 text-xs opacity-80">
                    <li>Instagram</li>
                    <li>Facebook</li>
                    <li>Twitter</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20 text-xs">
                © 2025 Mağaza Adı. Tüm hakları saklıdır.
              </div>
            </motion.footer>
          </motion.div>
        </div>

        {isSaved && !isPublished && (
          <motion.div 
            className="flex justify-end mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-center">
              <Bookmark className="h-5 w-5 text-yellow-500 mr-2" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Değişiklikleriniz kaydedildi</p>
                <p className="text-yellow-600">Mağazanızı ziyaret eden müşteriler bu temayı görebilir.</p>
              </div>
            </div>
          </motion.div>
        )}

        {isPublished && (
          <motion.div 
            className="flex justify-end mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-sm">
                <p className="font-medium text-green-800">Temanız yayında!</p>
                <p className="text-green-600">Mağazanızı ziyaret eden müşteriler bu temayı görebilir.</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThemePreview;
