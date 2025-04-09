
import { AnalyticsData } from '@/types/analytics';

type Period = '7d' | '30d' | '90d' | 'year';

// Bu servis normalde gerçek bir API'ye istek atarak verileri alır
// Şu anda mock veri döndürüyoruz
export const getAnalyticsData = async (period: Period): Promise<AnalyticsData> => {
  // Gerçek uygulama için burada bir API çağrısı olacak
  // Örnek: return await fetch(`/api/analytics?period=${period}`).then(res => res.json());
  
  // Gecikme simülasyonu
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock veri
  const mockData: AnalyticsData = {
    totalVisitors: period === '7d' ? 1423 : period === '30d' ? 5842 : period === '90d' ? 15789 : 32456,
    uniqueVisitors: period === '7d' ? 954 : period === '30d' ? 3517 : period === '90d' ? 10234 : 21345,
    totalPageViews: period === '7d' ? 4532 : period === '30d' ? 18245 : period === '90d' ? 52436 : 105678,
    averageSessionTime: period === '7d' ? "2m 45s" : period === '30d' ? "3m 12s" : period === '90d' ? "2m 58s" : "3m 05s",
    bounceRate: period === '7d' ? 42 : period === '30d' ? 38 : period === '90d' ? 35 : 37,
    
    topPages: [
      { page: "Ana Sayfa", count: period === '7d' ? 856 : period === '30d' ? 3245 : period === '90d' ? 8965 : 18436, bounceRate: 32 },
      { page: "Ürünler", count: period === '7d' ? 645 : period === '30d' ? 2567 : period === '90d' ? 6789 : 13567, bounceRate: 28 },
      { page: "Hakkımızda", count: period === '7d' ? 234 : period === '30d' ? 921 : period === '90d' ? 2345 : 4532, bounceRate: 45 },
      { page: "İletişim", count: period === '7d' ? 187 : period === '30d' ? 756 : period === '90d' ? 1987 : 3876, bounceRate: 38 },
      { page: "Blog", count: period === '7d' ? 123 : period === '30d' ? 546 : period === '90d' ? 1456 : 2875, bounceRate: 52 }
    ],
    
    deviceStats: {
      mobile: period === '7d' ? 65 : period === '30d' ? 62 : period === '90d' ? 64 : 63,
      desktop: period === '7d' ? 30 : period === '30d' ? 32 : period === '90d' ? 31 : 32,
      tablet: period === '7d' ? 5 : period === '30d' ? 6 : period === '90d' ? 5 : 5
    },
    
    topLocations: [
      { country: "Türkiye", count: period === '7d' ? 954 : period === '30d' ? 3865 : period === '90d' ? 10435 : 21345, percentage: 67 },
      { country: "Almanya", count: period === '7d' ? 187 : period === '30d' ? 756 : period === '90d' ? 1987 : 4234, percentage: 13 },
      { country: "ABD", count: period === '7d' ? 142 : period === '30d' ? 584 : period === '90d' ? 1579 : 3245, percentage: 10 },
      { country: "İngiltere", count: period === '7d' ? 86 : period === '30d' ? 351 : period === '90d' ? 947 : 1932, percentage: 6 },
      { country: "Diğer", count: period === '7d' ? 54 : period === '30d' ? 286 : period === '90d' ? 841 : 1700, percentage: 4 }
    ],
    
    timeStats: [
      { date: "1 Oca", visitors: period === '7d' ? 0 : period === '30d' ? 0 : 145, pageViews: period === '7d' ? 0 : period === '30d' ? 0 : 432 },
      { date: "15 Oca", visitors: period === '7d' ? 0 : period === '30d' ? 0 : 178, pageViews: period === '7d' ? 0 : period === '30d' ? 0 : 567 },
      { date: "1 Şub", visitors: period === '7d' ? 0 : period === '30d' ? 0 : 210, pageViews: period === '7d' ? 0 : period === '30d' ? 0 : 689 },
      { date: "15 Şub", visitors: period === '7d' ? 0 : period === '30d' ? 0 : 195, pageViews: period === '7d' ? 0 : period === '30d' ? 0 : 621 },
      { date: "1 Mar", visitors: period === '7d' ? 0 : period === '30d' ? 124 : 232, pageViews: period === '7d' ? 0 : period === '30d' ? 398 : 734 },
      { date: "15 Mar", visitors: period === '7d' ? 0 : period === '30d' ? 156 : 268, pageViews: period === '7d' ? 0 : period === '30d' ? 487 : 843 },
      { date: "1 Nis", visitors: period === '7d' ? 145 : period === '30d' ? 198 : 312, pageViews: period === '7d' ? 432 : period === '30d' ? 623 : 987 },
      { date: "5 Nis", visitors: period === '7d' ? 167 : period === '30d' ? 220 : 335, pageViews: period === '7d' ? 521 : period === '30d' ? 712 : 1076 },
      { date: "10 Nis", visitors: period === '7d' ? 189 : period === '30d' ? 245 : 356, pageViews: period === '7d' ? 567 : period === '30d' ? 765 : 1145 },
      { date: "15 Nis", visitors: period === '7d' ? 212 : period === '30d' ? 278 : 389, pageViews: period === '7d' ? 654 : period === '30d' ? 854 : 1234 },
      { date: "20 Nis", visitors: period === '7d' ? 241 : period === '30d' ? 310 : 418, pageViews: period === '7d' ? 732 : period === '30d' ? 932 : 1332 },
    ],
    
    conversionStats: {
      visits: period === '7d' ? 1423 : period === '30d' ? 5842 : period === '90d' ? 15789 : 32456,
      addToCart: period === '7d' ? 325 : period === '30d' ? 1345 : period === '90d' ? 3657 : 7543, 
      checkouts: period === '7d' ? 187 : period === '30d' ? 756 : period === '90d' ? 1987 : 4123,
      purchases: period === '7d' ? 124 : period === '30d' ? 498 : period === '90d' ? 1345 : 2756,
      conversionRate: period === '7d' ? 8.7 : period === '30d' ? 8.5 : period === '90d' ? 8.5 : 8.5
    }
  };
  
  return mockData;
};
