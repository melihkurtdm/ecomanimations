
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { DownloadCloud, RefreshCw, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

import AnalyticsPeriodSelector from '@/components/analytics/AnalyticsPeriodSelector';
import AnalyticsOverviewCards from '@/components/analytics/AnalyticsOverviewCards';
import VisitorsChart from '@/components/analytics/VisitorsChart';
import DeviceStatsChart from '@/components/analytics/DeviceStatsChart';
import TopPagesTable from '@/components/analytics/TopPagesTable';
import ConversionFunnelChart from '@/components/analytics/ConversionFunnelChart';
import LanguageSelector from '@/components/common/LanguageSelector';
import ThemeToggle from '@/components/common/ThemeToggle';

import { getAnalyticsData } from '@/services/analyticsService';
import { AnalyticsData } from '@/types/analytics';

const translations = {
  tr: {
    title: 'Mağaza Analytics',
    description: 'Ziyaretçi ve dönüşüm istatistiklerinizi analiz edin',
    back: 'Geri Dön',
    refresh: 'Yenile',
    export: 'Dışa Aktar',
    refreshSuccess: 'Veriler güncellendi',
    refreshSuccessDesc: 'Analytics verileri başarıyla güncellendi.',
    refreshError: 'Yenileme hatası',
    refreshErrorDesc: 'Analytics verileri güncellenirken bir hata oluştu.',
    exportStarted: 'Dışa aktarma başladı',
    exportStartedDesc: 'Analytics verileri CSV olarak indiriliyor.',
    exportCompleted: 'Dışa aktarma tamamlandı',
    exportCompletedDesc: 'Analytics verileri başarıyla indirildi.',
    loading: 'Yükleniyor...',
    loadingError: 'Veri yükleme hatası',
    loadingErrorDesc: 'Analytics verileri yüklenirken bir hata oluştu.'
  },
  en: {
    title: 'Store Analytics',
    description: 'Analyze your visitor and conversion statistics',
    back: 'Go Back',
    refresh: 'Refresh',
    export: 'Export',
    refreshSuccess: 'Data updated',
    refreshSuccessDesc: 'Analytics data has been successfully updated.',
    refreshError: 'Refresh error',
    refreshErrorDesc: 'An error occurred while updating analytics data.',
    exportStarted: 'Export started',
    exportStartedDesc: 'Analytics data is being downloaded as CSV.',
    exportCompleted: 'Export completed',
    exportCompletedDesc: 'Analytics data has been successfully downloaded.',
    loading: 'Loading...',
    loadingError: 'Data loading error',
    loadingErrorDesc: 'An error occurred while loading analytics data.'
  }
};

const StoreAnalytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = async () => {
    try {
      setLoading(true);
      // Convert period to format expected by getAnalyticsData
      const apiPeriod = period === 'day' ? '7d' : 
                        period === 'week' ? '7d' : 
                        period === 'month' ? '30d' : 
                        '90d';
      const analyticsData = await getAnalyticsData(apiPeriod);
      setData(analyticsData);
    } catch (error) {
      console.error('Analytics veri yükleme hatası:', error);
      toast({
        title: t.loadingError,
        description: t.loadingErrorDesc,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      // Convert period to format expected by getAnalyticsData
      const apiPeriod = period === 'day' ? '7d' : 
                        period === 'week' ? '7d' : 
                        period === 'month' ? '30d' : 
                        '90d';
      const analyticsData = await getAnalyticsData(apiPeriod);
      setData(analyticsData);
      
      toast({
        title: t.refreshSuccess,
        description: t.refreshSuccessDesc,
      });
    } catch (error) {
      toast({
        title: t.refreshError,
        description: t.refreshErrorDesc,
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExportData = () => {
    toast({
      title: t.exportStarted,
      description: t.exportStartedDesc,
    });
    
    // Gerçek bir uygulamada burada veri dışa aktarma işlemi yapılır
    setTimeout(() => {
      toast({
        title: t.exportCompleted,
        description: t.exportCompletedDesc,
      });
    }, 1500);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4 
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <p className="text-gray-500">{t.description}</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <ThemeToggle />
          <LanguageSelector />
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.back}
          </Button>
        </div>
      </div>

      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0"
        variants={itemVariants}
      >
        <AnalyticsPeriodSelector 
          period={period} 
          onChange={setPeriod} 
          locale={language}
        />
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing || loading}>
            {isRefreshing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {t.refresh}
          </Button>
          
          <Button variant="outline" onClick={handleExportData} disabled={loading || !data}>
            <DownloadCloud className="h-4 w-4 mr-2" />
            {t.export}
          </Button>
        </div>
      </motion.div>

      {loading && !data ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-8 w-1/2 mt-3" />
                  <Skeleton className="h-4 w-1/3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="col-span-full">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        data && (
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <AnalyticsOverviewCards data={data} />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <VisitorsChart data={data.timeStats} period={period} />
            </motion.div>
            
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={itemVariants}>
              <TopPagesTable data={data.topPages} />
              <DeviceStatsChart data={data.deviceStats} />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ConversionFunnelChart data={data.conversionStats} />
            </motion.div>
          </div>
        )
      )}
    </motion.div>
  );
};

export default StoreAnalytics;
