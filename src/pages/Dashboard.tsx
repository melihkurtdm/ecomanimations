
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
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userStore, setUserStore] = useState<any>(null);
  const [isPulsing, setIsPulsing] = useState(false);
  const [verifiedDomains, setVerifiedDomains] = useState<any[]>([]);
  const [isVisitingStore, setIsVisitingStore] = useState(false);

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
          console.log("Loaded store data:", storeData);
        } catch (error) {
          console.error("Error parsing store data:", error);
        }
      }
      
      // Load user's domain information from localStorage
      const storedDomains = localStorage.getItem(`domains_${user.id}`);
      if (storedDomains) {
        try {
          const domainsData = JSON.parse(storedDomains);
          const verified = domainsData.filter((domain: any) => domain.status === 'verified');
          setVerifiedDomains(verified);
          console.log("Loaded verified domains:", verified);
        } catch (error) {
          console.error("Error parsing domains data:", error);
        }
      }
      
      // Delay hiding loading screen for better UX
      setTimeout(() => {
        setLoading(false);
      }, 800);
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
    if (!userStore) {
      toast({
        title: "Mağaza bulunamadı",
        description: "Ziyaret edilecek bir mağaza bulunamadı.",
        variant: "destructive",
      });
      return;
    }
    
    setIsVisitingStore(true);
    
    try {
      console.log("Attempting to visit store with data:", { userStore, verifiedDomains });
      
      // Determine the URL based on store data
      let storeUrl = "";
      
      // Check for verified domains first
      const primaryDomain = verifiedDomains.find(domain => domain.primary === true);
      if (primaryDomain) {
        // For custom domains use https://domain.com
        if (primaryDomain.isCustomDomain) {
          storeUrl = `https://${primaryDomain.domain}`;
          console.log("Using primary custom domain URL:", storeUrl);
        } else {
          // For shopset subdomains
          storeUrl = `https://${primaryDomain.domain}.shopset.net`;
          console.log("Using primary subdomain URL:", storeUrl);
        }
      } else if (verifiedDomains.length > 0) {
        // If there's no primary but there are verified domains, use the first one
        const firstVerified = verifiedDomains[0];
        if (firstVerified.isCustomDomain) {
          storeUrl = `https://${firstVerified.domain}`;
          console.log("Using first verified custom domain URL:", storeUrl);
        } else {
          storeUrl = `https://${firstVerified.domain}.shopset.net`;
          console.log("Using first verified subdomain URL:", storeUrl);
        }
      } else if (userStore.customDomain) {
        // If there are no verified domains but there's a custom domain in store settings
        storeUrl = `https://${userStore.customDomain}`;
        console.log("Using store custom domain URL:", storeUrl);
      } else if (userStore.domain) {
        // As a last resort, use the subdomain from store settings
        storeUrl = `https://${userStore.domain}.shopset.net`;
        console.log("Using store subdomain URL:", storeUrl);
      }
      
      if (storeUrl) {
        // Simulate theme activation
        const message = `Mağazanız ziyaret ediliyor: ${storeUrl}`;
        console.log(message);
        
        toast({
          title: "Mağazanız açılıyor",
          description: "Yeni sekmede mağazanız açılıyor...",
        });
        
        window.open(storeUrl, '_blank');
      } else {
        toast({
          title: "Mağaza URL'si bulunamadı",
          description: "Mağaza URL'si bulunamadı. Lütfen domain ayarlarınızı kontrol edin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error visiting store:", error);
      toast({
        title: "Hata",
        description: "Mağaza ziyaret edilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsVisitingStore(false);
    }
  };

  const handleDomainManagement = () => {
    navigate('/dashboard/domain-management');
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

  // Fix the TypeScript error with repeatType by using proper literal types
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
        repeatType: "reverse" as "reverse" | "loop" | "mirror"
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
            className="mb-8 flex flex-col gap-3 items-center"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={isPulsing ? "pulse" : ""}
              className="w-full max-w-md"
            >
              <Button 
                onClick={handleVisitStore}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md flex items-center justify-center gap-2 px-6 py-3"
                disabled={isVisitingStore}
              >
                {isVisitingStore ? (
                  <>
                    <RotateCw className="h-5 w-5 animate-spin" />
                    Mağaza Açılıyor...
                  </>
                ) : (
                  <>
                    <Globe className="h-5 w-5 animate-pulse" />
                    Mağazanızı Ziyaret Edin
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </motion.div>
            
            <Button 
              variant="outline" 
              onClick={handleDomainManagement}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Alan Adlarını Yönet
            </Button>
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
