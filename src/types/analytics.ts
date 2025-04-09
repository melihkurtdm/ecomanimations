
export interface PageView {
  page: string;
  count: number;
  bounceRate: number;
}

export interface DeviceStats {
  mobile: number;
  desktop: number;
  tablet: number;
}

export interface LocationStats {
  country: string;
  count: number;
  percentage: number;
}

export interface TimeStats {
  date: string;
  visitors: number;
  pageViews: number;
}

export interface ConversionStats {
  visits: number;
  addToCart: number;
  checkouts: number;
  purchases: number;
  conversionRate: number;
}

export interface AnalyticsData {
  totalVisitors: number;
  uniqueVisitors: number;
  totalPageViews: number;
  averageSessionTime: string;
  bounceRate: number;
  topPages: PageView[];
  deviceStats: DeviceStats;
  topLocations: LocationStats[];
  timeStats: TimeStats[];
  conversionStats: ConversionStats;
}
