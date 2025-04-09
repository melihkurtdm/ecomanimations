
import React from 'react';
import { AnalyticsData } from '@/types/analytics';
import { ArrowDown, ArrowUp, Users, Clock, BarChart3, MousePointer2 } from 'lucide-react';

interface AnalyticsOverviewCardsProps {
  data: AnalyticsData;
}

const AnalyticsOverviewCards: React.FC<AnalyticsOverviewCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Visitors Card */}
      <div className="bg-white border rounded-lg p-5 transition-shadow hover:shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Ziyaretçiler</p>
            <h2 className="text-2xl font-bold">{data.totalVisitors.toLocaleString()}</h2>
            
            <div className="flex items-center mt-2">
              <div className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                12.5%
              </div>
              <span className="text-xs text-gray-500 ml-2">Önceki döneme göre</span>
            </div>
          </div>
          
          <div className="bg-purple-100 p-2 rounded-lg">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Tekil Ziyaretçi:</span>
            <span className="font-medium">{data.uniqueVisitors.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {/* Page Views Card */}
      <div className="bg-white border rounded-lg p-5 transition-shadow hover:shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Sayfa Görüntüleme</p>
            <h2 className="text-2xl font-bold">{data.totalPageViews.toLocaleString()}</h2>
            
            <div className="flex items-center mt-2">
              <div className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                8.3%
              </div>
              <span className="text-xs text-gray-500 ml-2">Önceki döneme göre</span>
            </div>
          </div>
          
          <div className="bg-blue-100 p-2 rounded-lg">
            <MousePointer2 className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Ziyaretçi Başına Sayfa:</span>
            <span className="font-medium">{(data.totalPageViews / data.totalVisitors).toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Average Session Time Card */}
      <div className="bg-white border rounded-lg p-5 transition-shadow hover:shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Ortalama Oturum Süresi</p>
            <h2 className="text-2xl font-bold">{data.averageSessionTime}</h2>
            
            <div className="flex items-center mt-2">
              <div className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                5.2%
              </div>
              <span className="text-xs text-gray-500 ml-2">Önceki döneme göre</span>
            </div>
          </div>
          
          <div className="bg-green-100 p-2 rounded-lg">
            <Clock className="h-5 w-5 text-green-600" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Hedef Süre:</span>
            <span className="font-medium">3m 30s</span>
          </div>
        </div>
      </div>
      
      {/* Bounce Rate Card */}
      <div className="bg-white border rounded-lg p-5 transition-shadow hover:shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Hemen Çıkma Oranı</p>
            <h2 className="text-2xl font-bold">{data.bounceRate}%</h2>
            
            <div className="flex items-center mt-2">
              <div className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-xs font-medium flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                2.1%
              </div>
              <span className="text-xs text-gray-500 ml-2">Önceki döneme göre</span>
            </div>
          </div>
          
          <div className="bg-orange-100 p-2 rounded-lg">
            <BarChart3 className="h-5 w-5 text-orange-600" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Hedef Oran:</span>
            <span className="font-medium">{'<'} 40%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverviewCards;
