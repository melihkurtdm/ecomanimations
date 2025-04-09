
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { DownloadCloud, RefreshCw, ArrowLeft } from 'lucide-react';

import AnalyticsPeriodSelector from '@/components/analytics/AnalyticsPeriodSelector';
import AnalyticsOverviewCards from '@/components/analytics/AnalyticsOverviewCards';
import VisitorsChart from '@/components/analytics/VisitorsChart';
import DeviceStatsChart from '@/components/analytics/DeviceStatsChart';
import TopPagesTable from '@/components/analytics/TopPagesTable';
import ConversionFunnelChart from '@/components/analytics/ConversionFunnelChart';

import { fetchAnalyticsData } from '@/services/analyticsService';
import { AnalyticsData } from '@/types/analytics';

const StoreAnalytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
      const analyticsData = await fetchAnalyticsData(period);
      setData(analyticsData);
    } catch (error) {
      console.error('Analytics veri yükleme hatası:', error);
      toast({
        title: 'Veri yükleme hatası',
        description: 'Analytics verileri yüklenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      const analyticsData = await fetchAnalyticsData(period);
      setData(analyticsData);
      
      toast({
        title: 'Veriler güncellendi',
        description: 'Analytics verileri başarıyla güncellendi.',
      });
    } catch (error) {
      toast({
        title: 'Yenileme hatası',
        description: 'Analytics verileri güncellenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExportData = () => {
    toast({
      title: 'Dışa aktarma başladı',
      description: 'Analytics verileri CSV olarak indiriliyor.',
    });
    
    // Gerçek bir uygulamada burada veri dışa aktarma işlemi yapılır
    setTimeout(() => {
      toast({
        title: 'Dışa aktarma tamamlandı',
        description: 'Analytics verileri başarıyla indirildi.',
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mağaza Analytics</h1>
          <p className="text-gray-500">Ziyaretçi ve dönüşüm istatistiklerinizi analiz edin</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <AnalyticsPeriodSelector period={period} onChange={setPeriod} />
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing || loading}>
            {isRefreshing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Yenile
          </Button>
          
          <Button variant="outline" onClick={handleExportData} disabled={loading || !data}>
            <DownloadCloud className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
        </div>
      </div>

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
            <AnalyticsOverviewCards data={data} />
            
            <VisitorsChart data={data.timeStats} period={period} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TopPagesTable data={data.topPages} />
              <DeviceStatsChart data={data.deviceStats} />
            </div>
            
            <ConversionFunnelChart data={data.conversionStats} />
          </div>
        )
      )}
    </div>
  );
};

export default StoreAnalytics;
