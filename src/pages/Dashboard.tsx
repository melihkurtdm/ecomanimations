
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import QuickAccessGrid from '@/components/dashboard/QuickAccessGrid';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import UserProfile from '@/components/dashboard/UserProfile';
import LoadingScreen from '@/components/ui/loading-screen';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, RotateCw, Globe } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userStore, setUserStore] = useState<any>(null);
  const [isPulsing, setIsPulsing] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else {
      // Load user's store information from localStorage
      const storedStore = localStorage.getItem(`store_${user.id}`);
      if (storedStore) {
        try {
          const storeData = JSON.parse(storedStore);
          setUserStore(storeData);
        } catch (error) {
          console.error("Error parsing store data:", error);
        }
      }
    }
  }, [user, navigate]);

  // Add pulsing animation effect
  useEffect(() => {
    if (userStore) {
      const interval = setInterval(() => {
        setIsPulsing(prev => !prev);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [userStore]);

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

  const handleCreateStore = () => {
    navigate('/dashboard/store-setup');
  };

  const handleVisitStore = () => {
    if (!userStore) return;
    
    // Determine the URL based on store data
    let storeUrl = "";
    if (userStore.customDomain) {
      storeUrl = `https://${userStore.customDomain}`;
    } else if (userStore.domain) {
      storeUrl = `https://${userStore.domain}.shopset.net`;
    }
    
    if (storeUrl) {
      window.open(storeUrl, '_blank');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0px 0px 0px rgba(0, 0, 0, 0.1)",
        "0px 5px 15px rgba(0, 0, 0, 0.2)",
        "0px 0px 0px rgba(0, 0, 0, 0.1)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" // Fixed: Using a valid literal value instead of a string variable
      }
    }
  };

  const activity = getRecentActivity();
  const stats = getStoreStats();

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <motion.div 
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <DashboardHeader userName={user.email?.split('@')[0] || 'Kullanıcı'} />
        
        {userStore ? (
          <motion.div 
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={isPulsing ? "pulse" : ""}
            >
              <Button 
                onClick={handleVisitStore}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md flex items-center gap-2 px-6 py-3"
              >
                <Globe className="h-5 w-5 animate-pulse" />
                Mağazanızı Ziyaret Edin
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                onClick={handleCreateStore}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md"
              >
                Yeni Mağaza Oluştur
              </Button>
            </motion.div>
          </motion.div>
        )}
        
        <motion.div variants={itemVariants}>
          <StatCards stats={stats} />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          <QuickAccessGrid />
          <ActivityFeed activities={activity} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <UserProfile 
            email={user.email || ''} 
            createdAt={user.created_at} 
            onSignOut={signOut} 
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Dashboard;
