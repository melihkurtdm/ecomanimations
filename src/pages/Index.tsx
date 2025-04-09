
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
import { Palette, Store, LayoutDashboard, ArrowRight, Activity, Settings, ChevronRight } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Themes />
      <Pricing />
      <TestimonialSection />
      <CallToAction />
      
      {user && (
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-16 bg-gradient-to-b from-gray-50 to-gray-100"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Mağazanıza <span className="gradient-text">Hızlı Erişim</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Mağazanızı ve temanızı yönetmek için aşağıdaki kısayolları kullanabilirsiniz
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="relative overflow-hidden bg-white rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute transform rotate-45 bg-brand-purple text-white font-medium py-1 right-[-35px] top-[25px] w-[135px] text-center text-xs">Önerilen</div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-5">
                      <LayoutDashboard className="h-6 w-6 text-brand-purple" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
                    <p className="text-gray-600 mb-4 flex-grow">Mağaza ve tema yönetiminin tamamına erişin.</p>
                    <Button 
                      onClick={() => navigate('/dashboard')} 
                      className="w-full group-hover:bg-brand-purple transition-colors"
                      variant="outline"
                    >
                      <span>Yönetim Paneli</span>
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
                <div className="bg-white rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                      <Store className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Mağaza</h3>
                    <p className="text-gray-600 mb-4 flex-grow">Ürünlerinizi ve kategorilerinizi yönetin.</p>
                    <Button 
                      onClick={() => navigate('/dashboard/store')} 
                      className="w-full group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors"
                      variant="outline"
                    >
                      <span>Mağazaya Git</span>
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
                <div className="bg-white rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mb-5">
                      <Palette className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Tema</h3>
                    <p className="text-gray-600 mb-4 flex-grow">Mağazanızın görünümünü özelleştirin.</p>
                    <Button 
                      onClick={() => navigate('/dashboard/theme-customization')} 
                      className="w-full group-hover:bg-pink-600 group-hover:border-pink-600 transition-colors"
                      variant="outline"
                    >
                      <span>Temayı Düzenle</span>
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
                <div className="bg-white rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-5">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">İstatistikler</h3>
                    <p className="text-gray-600 mb-4 flex-grow">Satış ve ziyaretçi istatistiklerinizi takip edin.</p>
                    <Button 
                      onClick={() => navigate('/dashboard/settings')} 
                      className="w-full group-hover:bg-green-600 group-hover:border-green-600 transition-colors"
                      variant="outline"
                    >
                      <span>İstatistikler</span>
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
                className="text-gray-600 hover:text-brand-purple group"
              >
                <span>Tüm Özellikler</span>
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
