
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

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

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
