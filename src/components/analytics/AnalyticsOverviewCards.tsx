
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Eye, Clock, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { AnalyticsData } from '@/types/analytics';

interface AnalyticsOverviewCardsProps {
  data: AnalyticsData;
}

const AnalyticsOverviewCards: React.FC<AnalyticsOverviewCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12.5%</span>
            </div>
          </div>
          <h3 className="mt-3 text-2xl font-bold">{data.uniqueVisitors.toLocaleString()}</h3>
          <p className="text-sm text-gray-500">Ziyaretçi</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Eye className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex items-center bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>8.3%</span>
            </div>
          </div>
          <h3 className="mt-3 text-2xl font-bold">{data.totalPageViews.toLocaleString()}</h3>
          <p className="text-sm text-gray-500">Sayfa Görüntüleme</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex items-center bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>5.2%</span>
            </div>
          </div>
          <h3 className="mt-3 text-2xl font-bold">{data.averageSessionTime}</h3>
          <p className="text-sm text-gray-500">Ortalama Oturum</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="flex items-center bg-red-50 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>2.8%</span>
            </div>
          </div>
          <h3 className="mt-3 text-2xl font-bold">{data.bounceRate.toFixed(1)}%</h3>
          <p className="text-sm text-gray-500">Hemen Çıkma Oranı</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsOverviewCards;
