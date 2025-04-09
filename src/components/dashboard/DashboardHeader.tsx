
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const navigate = useNavigate();

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold">Hoş Geldiniz, {userName}</h1>
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
  );
};

export default DashboardHeader;
