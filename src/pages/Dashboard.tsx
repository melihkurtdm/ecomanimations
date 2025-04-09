
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Palette, Store, Settings, BarChart3, Plus, ChevronRight, Users, ShoppingBag, Box } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

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

  const handleCreateStore = () => {
    navigate('/dashboard/store-setup');
    toast({
      title: "Mağaza Oluşturma",
      description: "Yeni bir mağaza oluşturabilirsiniz.",
    });
  };

  const handleNavigateSettings = () => {
    navigate('/dashboard/settings');
    toast({
      title: "Ayarlar",
      description: "Hesap ayarlarınızı yönetebilirsiniz.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const cardHoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const getRecentActivity = () => {
    // Simüle edilmiş etkinlik verileri
    return [
      { id: 1, activity: "Yeni bir ürün eklediniz", time: "1 saat önce" },
      { id: 2, activity: "Tema güncellemesi yaptınız", time: "3 saat önce" },
      { id: 3, activity: "1 yeni sipariş aldınız", time: "Dün" }
    ];
  };

  const getStoreStats = () => {
    // Simüle edilmiş mağaza istatistikleri
    return {
      orders: 35,
      customers: 129,
      products: 48,
      revenue: "4,850"
    };
  };

  const activity = getRecentActivity();
  const stats = getStoreStats();

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold">Hoş Geldiniz, {user.email?.split('@')[0]}</h1>
          <p className="text-gray-500 mt-1">Mağazanızı ve temalarınızı kolayca yönetin</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" onClick={handleNavigateSettings}>
            <Settings className="h-4 w-4 mr-2" />
            Ayarlar
          </Button>
          <Button variant="default" onClick={handleCreateStore}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Mağaza
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover="hover"
            variants={cardHoverVariants}
          >
            <Card className="h-full border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between">
                  <span>Siparişler</span>
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                </CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.orders}</div>
                <div className="text-sm text-green-500 mt-1">↑ 12% artış</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover="hover"
            variants={cardHoverVariants}
          >
            <Card className="h-full border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between">
                  <span>Müşteriler</span>
                  <Users className="h-5 w-5 text-purple-500" />
                </CardTitle>
                <CardDescription>Toplam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.customers}</div>
                <div className="text-sm text-green-500 mt-1">↑ 8% artış</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover="hover"
            variants={cardHoverVariants}
          >
            <Card className="h-full border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between">
                  <span>Ürünler</span>
                  <Box className="h-5 w-5 text-green-500" />
                </CardTitle>
                <CardDescription>Aktif listelenen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.products}</div>
                <div className="text-sm text-green-500 mt-1">↑ 15% artış</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Son Etkinlikler</CardTitle>
              <CardDescription>Hesabınızdaki son işlemler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activity.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-purple mt-2 mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.activity}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Tüm etkinlikleri görüntüle
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı Bilgileriniz</CardTitle>
            <CardDescription>Hesap detaylarınız</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 bg-gray-50 rounded-md">
                <div>
                  <span className="text-sm font-medium text-gray-500">E-posta:</span> 
                  <span className="ml-1">{user.email}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Üyelik:</span> 
                  <span className="ml-1">{new Date(user.created_at).toLocaleDateString('tr-TR')} tarihinden beri</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => signOut()}
                >
                  Çıkış Yap
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
