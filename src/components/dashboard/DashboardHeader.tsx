
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Plus, Bell, Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = React.useState(false);

  const handleNavigateSettings = () => {
    navigate('/dashboard/settings');
    toast({
      title: "Ayarlar",
      description: "Hesap ayarlarınızı yönetebilirsiniz.",
    });
  };

  const handleCreateStore = () => {
    navigate('/dashboard/store-setup');
    toast({
      title: "Mağaza Oluşturma",
      description: "Yeni bir mağaza oluşturabilirsiniz.",
    });
  };

  const handleOpenSearch = () => {
    setShowSearchBar(!showSearchBar);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold">
            Hoş Geldiniz, <span className="gradient-text">{userName}</span>
          </h1>
          <p className="text-gray-500 mt-1">Mağazanızı ve temalarınızı kolayca yönetin</p>
        </motion.div>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div variants={itemVariants}>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleOpenSearch}
                    className="relative overflow-hidden"
                  >
                    <Search className="h-4 w-4" />
                    <motion.span 
                      className="absolute inset-0 bg-brand-purple"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hızlı arama</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div variants={itemVariants}>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="relative overflow-hidden"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-purple"></span>
                    </span>
                    <motion.span 
                      className="absolute inset-0 bg-brand-purple"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bildirimler</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div variants={itemVariants}>
                  <Button 
                    variant="outline" 
                    onClick={handleNavigateSettings}
                    className="relative overflow-hidden"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Ayarlar
                    <motion.span 
                      className="absolute inset-0 bg-brand-purple"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ayarlarınızı yönetin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    variant="default" 
                    onClick={handleCreateStore}
                    className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:from-brand-purple hover:to-brand-purple transition-all duration-300"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Mağaza
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Yeni bir mağaza oluşturun</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {showSearchBar && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Ürün, kategori veya müşteri ara..." 
                  className="flex-1 bg-transparent border-none outline-none"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardHeader;

