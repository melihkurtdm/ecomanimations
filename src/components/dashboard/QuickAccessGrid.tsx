
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Palette, Settings, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const QuickAccessGrid = () => {
  const navigate = useNavigate();
  
  const handleNavigateStore = () => {
    navigate('/dashboard/store');
    toast({
      title: "Mağaza Sayfası",
      description: "Mağazanızı yönetebilirsiniz.",
    });
  };

  const handleNavigateTheme = () => {
    navigate('/dashboard/theme-customization');
    toast({
      title: "Tema Özelleştirme",
      description: "Mağazanızın temasını özelleştirebilirsiniz.",
    });
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
    <motion.div 
      variants={itemVariants}
      className="lg:col-span-2"
    >
      <Card>
        <CardHeader>
          <CardTitle>Hızlı Erişim</CardTitle>
          <CardDescription>Sık kullanılan özellikler</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            className="group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={handleNavigateStore}
          >
            <Card className="border border-gray-200 transition-colors group-hover:border-brand-purple">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Store className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Mağaza Yönetimi</h3>
                  <p className="text-sm text-gray-500">Ürünlerinizi yönetin</p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400 group-hover:text-brand-purple transition-colors" />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={handleNavigateTheme}
          >
            <Card className="border border-gray-200 transition-colors group-hover:border-brand-purple">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Tema Özelleştirme</h3>
                  <p className="text-sm text-gray-500">Görünümü değiştirin</p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400 group-hover:text-brand-purple transition-colors" />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/dashboard/theme-selection')}
          >
            <Card className="border border-gray-200 transition-colors group-hover:border-brand-purple">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  <Palette className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium">Tema Seçimi</h3>
                  <p className="text-sm text-gray-500">Hazır temalar</p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400 group-hover:text-brand-purple transition-colors" />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/dashboard/settings')}
          >
            <Card className="border border-gray-200 transition-colors group-hover:border-brand-purple">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Ayarlar</h3>
                  <p className="text-sm text-gray-500">Hesap ve mağaza ayarları</p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400 group-hover:text-brand-purple transition-colors" />
              </CardContent>
            </Card>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickAccessGrid;
