
import { AnalyticsData } from '@/types/analytics';

// Gerçek bir uygulamada bu veriler API'den gelecektir
export const fetchAnalyticsData = async (period: 'day' | 'week' | 'month' | 'year'): Promise<AnalyticsData> => {
  // Simüle edilmiş bir gecikme
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Örnek veri - gerçek bir uygulamada API'den gelecektir
  return {
    totalVisitors: period === 'day' ? 125 : period === 'week' ? 842 : period === 'month' ? 3254 : 28756,
    uniqueVisitors: period === 'day' ? 98 : period === 'week' ? 623 : period === 'month' ? 2187 : 18934,
    totalPageViews: period === 'day' ? 348 : period === 'week' ? 2467 : period === 'month' ? 9845 : 87234,
    averageSessionTime: period === 'day' ? '2m 34s' : period === 'week' ? '2m 58s' : period === 'month' ? '3m 12s' : '3m 24s',
    bounceRate: period === 'day' ? 35.4 : period === 'week' ? 32.7 : period === 'month' ? 28.9 : 25.6,
    topPages: [
      { page: 'Ana Sayfa', count: period === 'day' ? 143 : period === 'week' ? 987 : period === 'month' ? 3876 : 34567, bounceRate: 24.5 },
      { page: 'Ürünler', count: period === 'day' ? 98 : period === 'week' ? 754 : period === 'month' ? 2987 : 26754, bounceRate: 18.2 },
      { page: 'Hakkımızda', count: period === 'day' ? 54 : period === 'week' ? 423 : period === 'month' ? 1876 : 15432, bounceRate: 42.8 },
      { page: 'İletişim', count: period === 'day' ? 38 : period === 'week' ? 245 : period === 'month' ? 985 : 8765, bounceRate: 38.6 },
      { page: 'Blog', count: period === 'day' ? 15 : period === 'week' ? 134 : period === 'month' ? 567 : 4532, bounceRate: 45.2 }
    ],
    deviceStats: {
      mobile: period === 'day' ? 68 : period === 'week' ? 472 : period === 'month' ? 1854 : 16435,
      desktop: period === 'day' ? 42 : period === 'week' ? 284 : period === 'month' ? 1142 : 9876,
      tablet: period === 'day' ? 15 : period === 'week' ? 86 : period === 'month' ? 258 : 2445
    },
    topLocations: [
      { country: 'Türkiye', count: period === 'day' ? 87 : period === 'week' ? 623 : period === 'month' ? 2456 : 22345, percentage: 68.5 },
      { country: 'Almanya', count: period === 'day' ? 15 : period === 'week' ? 98 : period === 'month' ? 354 : 2987, percentage: 12.4 },
      { country: 'ABD', count: period === 'day' ? 8 : period === 'week' ? 56 : period === 'month' ? 178 : 1564, percentage: 6.8 },
      { country: 'İngiltere', count: period === 'day' ? 7 : period === 'week' ? 42 : period === 'month' ? 145 : 1123, percentage: 4.9 },
      { country: 'Diğer', count: period === 'day' ? 8 : period === 'week' ? 23 : period === 'month' ? 121 : 743, percentage: 7.4 }
    ],
    timeStats: generateTimeStats(period),
    conversionStats: {
      visits: period === 'day' ? 125 : period === 'week' ? 842 : period === 'month' ? 3254 : 28756,
      addToCart: period === 'day' ? 42 : period === 'week' ? 346 : period === 'month' ? 1423 : 12567,
      checkouts: period === 'day' ? 18 : period === 'week' ? 154 : period === 'month' ? 687 : 6234,
      purchases: period === 'day' ? 12 : period === 'week' ? 98 : period === 'month' ? 456 : 4123,
      conversionRate: period === 'day' ? 9.6 : period === 'week' ? 11.3 : period === 'month' ? 14.1 : 14.8
    }
  };
};

// Zaman bazlı istatistikler için yardımcı fonksiyon
function generateTimeStats(period: 'day' | 'week' | 'month' | 'year'): { date: string; visitors: number; pageViews: number }[] {
  const result = [];
  const now = new Date();
  let steps: number;
  let format: string;
  let interval: number;

  switch (period) {
    case 'day':
      steps = 24; // 24 saat
      format = 'HH:00';
      interval = 1; // 1 saat
      break;
    case 'week':
      steps = 7; // 7 gün
      format = 'EEE';
      interval = 1; // 1 gün
      break;
    case 'month':
      steps = 30; // 30 gün
      format = 'dd MMM';
      interval = 1; // 1 gün
      break;
    case 'year':
      steps = 12; // 12 ay
      format = 'MMM';
      interval = 1; // 1 ay
      break;
    default:
      steps = 7;
      format = 'EEE';
      interval = 1;
  }

  for (let i = 0; i < steps; i++) {
    const date = new Date();
    switch (period) {
      case 'day':
        date.setHours(date.getHours() - (steps - i - 1));
        break;
      case 'week':
      case 'month':
        date.setDate(date.getDate() - (steps - i - 1));
        break;
      case 'year':
        date.setMonth(date.getMonth() - (steps - i - 1));
        break;
    }

    const formattedDate = period === 'day' ? `${date.getHours()}:00` : 
                          period === 'week' ? ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][date.getDay()] :
                          period === 'month' ? `${date.getDate()} ${['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'][date.getMonth()]}` :
                          ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'][date.getMonth()];

    // Bazı rastgele veriler üretelim (gerçekçi görünmesi için)
    const baseVisitor = period === 'day' ? 5 : period === 'week' ? 20 : period === 'month' ? 30 : 400;
    const variationVisitor = period === 'day' ? 10 : period === 'week' ? 40 : period === 'month' ? 100 : 800;
    const basePageViews = period === 'day' ? 15 : period === 'week' ? 60 : period === 'month' ? 90 : 1200;
    const variationPageViews = period === 'day' ? 30 : period === 'week' ? 120 : period === 'month' ? 300 : 2400;

    const visitors = Math.floor(baseVisitor + Math.random() * variationVisitor);
    const pageViews = Math.floor(basePageViews + Math.random() * variationPageViews);

    result.push({
      date: formattedDate,
      visitors,
      pageViews
    });
  }

  return result;
}
