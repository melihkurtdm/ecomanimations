
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsOverviewCards from '@/components/analytics/AnalyticsOverviewCards';
import AnalyticsPeriodSelector from '@/components/analytics/AnalyticsPeriodSelector';
import AnalyticsVisitorsChart from '@/components/analytics/AnalyticsVisitorsChart';
import AnalyticsDevicesChart from '@/components/analytics/AnalyticsDevicesChart';
import AnalyticsTopPagesTable from '@/components/analytics/AnalyticsTopPagesTable';
import AnalyticsLocationTable from '@/components/analytics/AnalyticsLocationTable';
import AnalyticsConversionFunnel from '@/components/analytics/AnalyticsConversionFunnel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAnalyticsData } from '@/services/analyticsService';
import { AnalyticsData } from '@/types/analytics';
import { ArrowDownIcon, ArrowUpIcon, BarChart3, LineChart, PieChart, Table2 } from 'lucide-react';

// Define a mapping type to convert UI period to API period
type UIPeriod = 'day' | 'week' | 'month' | 'year';
type APIPeriod = '7d' | '30d' | '90d' | 'year';

const Analytics = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [period, setPeriod] = useState<UIPeriod>('month');
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(true);

  // Convert UI period to API period
  const getAPIPeriod = (uiPeriod: UIPeriod): APIPeriod => {
    switch (uiPeriod) {
      case 'day': return '7d';
      case 'week': return '7d';
      case 'month': return '30d';
      case 'year': return 'year';
    }
  };

  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Oturum açmanız gerekiyor",
        description: "Analitik verilerini görüntülemek için lütfen giriş yapın.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsAnalyticsLoading(true);
      try {
        const apiPeriod = getAPIPeriod(period);
        const data = await getAnalyticsData(apiPeriod);
        setAnalyticsData(data);
      } catch (error) {
        toast({
          title: "Analitik verileri yüklenemedi",
          description: "Lütfen daha sonra tekrar deneyin.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyticsLoading(false);
      }
    };

    if (user) {
      fetchAnalytics();
    }
  }, [period, user]);

  const handlePeriodChange = (newPeriod: UIPeriod) => {
    setPeriod(newPeriod);
  };

  if (isLoading || isAnalyticsLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analitik & Raporlar</h1>
        <p className="text-gray-600">
          Mağazanızın performansını takip edin, ziyaretçi davranışlarını analiz edin ve satışlarınızı artırın.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <AnalyticsPeriodSelector period={period} onPeriodChange={handlePeriodChange} />
        
        <div className="flex items-center">
          {analyticsData && (
            <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center mr-4">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              <span>%12 artış</span>
              <span className="text-xs text-green-600 ml-1">geçen aya göre</span>
            </div>
          )}
          <button 
            className="text-sm text-gray-500 flex items-center"
            onClick={() => {
              toast({
                title: "Rapor indiriliyor",
                description: "Analitik raporu hazırlanıyor, lütfen bekleyin.",
              });
            }}
          >
            <span className="mr-1">Rapor İndir</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          </button>
        </div>
      </div>

      {analyticsData ? (
        <div className="space-y-6">
          <AnalyticsOverviewCards data={analyticsData} />

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Genel Bakış
              </TabsTrigger>
              <TabsTrigger value="visitors" className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                Ziyaretçiler
              </TabsTrigger>
              <TabsTrigger value="pages" className="flex items-center">
                <Table2 className="h-4 w-4 mr-2" />
                Sayfalar
              </TabsTrigger>
              <TabsTrigger value="conversions" className="flex items-center">
                <PieChart className="h-4 w-4 mr-2" />
                Dönüşümler
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <AnalyticsVisitorsChart data={analyticsData.timeStats} />
                <AnalyticsDevicesChart data={analyticsData.deviceStats} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnalyticsTopPagesTable data={analyticsData.topPages} />
                <AnalyticsLocationTable data={analyticsData.topLocations} />
              </div>
            </TabsContent>
            
            <TabsContent value="visitors">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ziyaretçi Trendi</CardTitle>
                    <CardDescription>Belirtilen zaman aralığında ziyaretçi ve sayfa görüntüleme sayıları</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <AnalyticsVisitorsChart data={analyticsData.timeStats} />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnalyticsDevicesChart data={analyticsData.deviceStats} />
                  <AnalyticsLocationTable data={analyticsData.topLocations} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pages">
              <div className="space-y-6">
                <AnalyticsTopPagesTable data={analyticsData.topPages} fullWidth />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Hemen Çıkma Oranı</CardTitle>
                    <CardDescription>Sayfaları ziyaret edip başka hiçbir etkileşimde bulunmadan ayrılan kullanıcıların yüzdesi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-4xl font-bold">{analyticsData.bounceRate}%</div>
                      {analyticsData.bounceRate > 50 ? (
                        <div className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          <span>Yüksek</span>
                        </div>
                      ) : (
                        <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                          <span>İyi</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Hemen çıkma oranını düşürmek için:</p>
                      <ul className="list-disc pl-5 mt-2">
                        <li>Sayfa yükleme hızını artırın</li>
                        <li>İçerik kalitesini geliştirin</li>
                        <li>Açılış sayfalarını optimize edin</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="conversions">
              <div className="space-y-6">
                <AnalyticsConversionFunnel data={analyticsData.conversionStats} />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Dönüşüm İpuçları</CardTitle>
                    <CardDescription>Dönüşüm oranınızı artırmaya yönelik öneriler</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Sepetten Çıkma Oranını Azaltın</h4>
                        <p className="text-sm text-blue-700">
                          Müşterilerinizin {analyticsData.conversionStats.addToCart - analyticsData.conversionStats.checkouts} kez sepete ürün ekledikleri halde ödeme yapmaktan vazgeçtikleri görülüyor.
                        </p>
                        <div className="mt-2 text-sm">
                          <ul className="list-disc pl-5 text-blue-700">
                            <li>Bedava kargo seçeneği sunun</li>
                            <li>Ödeme sürecini basitleştirin</li>
                            <li>Sepet hatırlatma e-postaları gönderin</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Ürün Sayfalarını İyileştirin</h4>
                        <p className="text-sm text-green-700">
                          Ziyaretçilerinizin ürünleri inceledikten sonra sepete eklemeleri için ikna edici içerikler sunun.
                        </p>
                        <div className="mt-2 text-sm">
                          <ul className="list-disc pl-5 text-green-700">
                            <li>Yüksek kaliteli ürün görselleri ekleyin</li>
                            <li>Detaylı ürün açıklamaları yazın</li>
                            <li>Müşteri yorumlarını görünür kılın</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Henüz analitik veri bulunmuyor.</p>
          <p className="text-sm text-gray-400">E-ticaret siteniz yayına alındıktan sonra veriler burada görüntülenecektir.</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
