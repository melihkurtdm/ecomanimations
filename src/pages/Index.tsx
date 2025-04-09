
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
import { Palette, Store, LayoutDashboard } from "lucide-react";

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
          className="py-16 bg-gray-50"
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
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
              >
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  variant="outline"
                  className="w-full h-auto p-6 flex flex-col items-center justify-center space-y-3 border-2 hover:border-brand-purple hover:bg-white/80"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <LayoutDashboard className="h-8 w-8 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-semibold">Dashboard</h3>
                  <p className="text-gray-600 text-sm">Tüm mağaza yönetimi</p>
                </Button>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
              >
                <Button 
                  onClick={() => navigate('/dashboard/store')} 
                  variant="outline"
                  className="w-full h-auto p-6 flex flex-col items-center justify-center space-y-3 border-2 hover:border-brand-purple hover:bg-white/80"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <Store className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Mağaza</h3>
                  <p className="text-gray-600 text-sm">Ürünleri yönetin</p>
                </Button>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
              >
                <Button 
                  onClick={() => navigate('/dashboard/theme-customization')} 
                  variant="outline"
                  className="w-full h-auto p-6 flex flex-col items-center justify-center space-y-3 border-2 hover:border-brand-purple hover:bg-white/80"
                >
                  <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                    <Palette className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Tema</h3>
                  <p className="text-gray-600 text-sm">Görünümü özelleştirin</p>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
