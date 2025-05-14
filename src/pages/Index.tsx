
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Themes from "@/components/Themes";
import Pricing from "@/components/Pricing";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Palette, Store, LayoutDashboard, ArrowRight, Activity, Settings, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/common/LanguageSelector";
import ThemeToggle from "@/components/common/ThemeToggle";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <ThemeToggle />
        <LanguageSelector />
      </div>
      
      <Navbar />
      <Hero />
      <Features />
      <Themes />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <Pricing />
      </motion.div>
      
      <TestimonialSection />
      <CallToAction />
      
      {user && (
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'tr' ? (
                  <>Mağazanıza <span className="gradient-text">Hızlı Erişim</span></>
                ) : (
                  <>Quick Access to <span className="gradient-text">Your Store</span></>
                )}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {language === 'tr' ? 
                  'Mağazanızı ve temanızı yönetmek için aşağıdaki kısayolları kullanabilirsiniz' : 
                  'Use the shortcuts below to manage your store and theme'}
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
            >
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute transform rotate-45 bg-brand-purple text-white font-medium py-1 right-[-35px] top-[25px] w-[135px] text-center text-xs">{language === 'tr' ? 'Önerilen' : 'Recommended'}</div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-5">
                      <LayoutDashboard className="h-6 w-6 text-brand-purple" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{language === 'tr' ? 'Mağaza ve tema yönetiminin tamamına erişin.' : 'Access complete store and theme management.'}</p>
                    <Button 
                      onClick={() => navigate('/dashboard')} 
                      className="w-full group-hover:bg-brand-purple transition-colors"
                      variant="outline"
                    >
                      <span>{language === 'tr' ? 'Yönetim Paneli' : 'Dashboard'}</span>
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-5">
                      <Store className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{language === 'tr' ? 'Mağaza' : 'Store'}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{language === 'tr' ? 'Ürünlerinizi ve kategorilerinizi yönetin.' : 'Manage your products and categories.'}</p>
                    <Button 
                      onClick={() => navigate('/dashboard/store')} 
                      className="w-full group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors"
                      variant="outline"
                    >
                      <span>{language === 'tr' ? 'Mağazaya Git' : 'Go to Store'}</span>
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center mb-5">
                      <Palette className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{language === 'tr' ? 'Tema' : 'Theme'}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{language === 'tr' ? 'Mağazanızın görünümünü özelleştirin.' : 'Customize the appearance of your store.'}</p>
                    <Button 
                      onClick={() => navigate('/dashboard/theme-customization')} 
                      className="w-full group-hover:bg-pink-600 group-hover:border-pink-600 transition-colors"
                      variant="outline"
                    >
                      <span>{language === 'tr' ? 'Temayı Düzenle' : 'Edit Theme'}</span>
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-5">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{language === 'tr' ? 'İstatistikler' : 'Statistics'}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{language === 'tr' ? 'Satış ve ziyaretçi istatistiklerinizi takip edin.' : 'Track your sales and visitor statistics.'}</p>
                    <Button 
                      onClick={() => navigate('/dashboard/analytics')} 
                      className="w-full group-hover:bg-green-600 group-hover:border-green-600 transition-colors"
                      variant="outline"
                    >
                      <span>{language === 'tr' ? 'İstatistikler' : 'Statistics'}</span>
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-5">
                      <Sparkles className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{language === 'tr' ? 'AI İçerik' : 'AI Content'}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{language === 'tr' ? 'Yapay zeka ile içerik oluşturun.' : 'Create content with artificial intelligence.'}</p>
                    <Button 
                      onClick={() => navigate('/dashboard/ai-content')} 
                      className="w-full group-hover:bg-purple-600 group-hover:border-purple-600 transition-colors"
                      variant="outline"
                    >
                      <span>{language === 'tr' ? 'İçerik Oluşturucu' : 'Content Creator'}</span>
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className="mt-10 text-center"
            >
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 dark:text-gray-300 hover:text-brand-purple group"
              >
                <span>{language === 'tr' ? 'Tüm Özellikler' : 'All Features'}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Button>
            </motion.div>
          </div>
        </motion.section>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
