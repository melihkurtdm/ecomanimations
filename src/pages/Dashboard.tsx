
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import QuickAccessGrid from '@/components/dashboard/QuickAccessGrid';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import UserProfile from '@/components/dashboard/UserProfile';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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

  const activity = getRecentActivity();
  const stats = getStoreStats();

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader userName={user.email?.split('@')[0] || 'Kullanıcı'} />
      
      <StatCards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickAccessGrid />
        <ActivityFeed activities={activity} />
      </div>
      
      <UserProfile 
        email={user.email || ''} 
        createdAt={user.created_at} 
        onSignOut={signOut} 
      />
    </div>
  );
};

export default Dashboard;
