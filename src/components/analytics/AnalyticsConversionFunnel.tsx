
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ConversionStats } from '@/types/analytics';
import { Progress } from '@/components/ui/progress';
import { ArrowDown } from 'lucide-react';

interface AnalyticsConversionFunnelProps {
  data: ConversionStats;
}

const AnalyticsConversionFunnel: React.FC<AnalyticsConversionFunnelProps> = ({ data }) => {
  const { visits, addToCart, checkouts, purchases, conversionRate } = data;
  
  // Conversion rates between steps
  const visitToCartRate = ((addToCart / visits) * 100).toFixed(1);
  const cartToCheckoutRate = ((checkouts / addToCart) * 100).toFixed(1);
  const checkoutToPurchaseRate = ((purchases / checkouts) * 100).toFixed(1);
  
  // Progress percentages relative to visits
  const addToCartPercent = (addToCart / visits) * 100;
  const checkoutsPercent = (checkouts / visits) * 100;
  const purchasesPercent = (purchases / visits) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dönüşüm Hunisi</CardTitle>
        <CardDescription>Ziyaretçilerin satın alma sürecindeki aşamaları</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-violet-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-sm text-violet-800 mb-1">Ziyaretler</div>
            <div className="text-2xl font-bold text-violet-900">{visits.toLocaleString()}</div>
            <div className="text-xs text-violet-700 mt-1">Toplam</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-sm text-blue-800 mb-1">Sepete Eklemeler</div>
            <div className="text-2xl font-bold text-blue-900">{addToCart.toLocaleString()}</div>
            <div className="text-xs text-blue-700 mt-1">%{visitToCartRate} dönüşüm</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-sm text-green-800 mb-1">Ödeme Başlatan</div>
            <div className="text-2xl font-bold text-green-900">{checkouts.toLocaleString()}</div>
            <div className="text-xs text-green-700 mt-1">%{cartToCheckoutRate} dönüşüm</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-sm text-orange-800 mb-1">Satın Almalar</div>
            <div className="text-2xl font-bold text-orange-900">{purchases.toLocaleString()}</div>
            <div className="text-xs text-orange-700 mt-1">%{checkoutToPurchaseRate} dönüşüm</div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Ziyaretler</span>
              <span className="text-sm font-medium">{visits.toLocaleString()}</span>
            </div>
            <div className="h-3 w-full bg-violet-100 rounded-full">
              <div className="h-3 bg-violet-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ArrowDown className="text-gray-400" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Sepete Eklemeler</span>
              <span className="text-sm font-medium">{addToCart.toLocaleString()} ({visitToCartRate}%)</span>
            </div>
            <div className="h-3 w-full bg-blue-100 rounded-full">
              <div className="h-3 bg-blue-500 rounded-full" style={{ width: `${addToCartPercent}%` }}></div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ArrowDown className="text-gray-400" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Ödeme Başlatanlar</span>
              <span className="text-sm font-medium">{checkouts.toLocaleString()} ({cartToCheckoutRate}%)</span>
            </div>
            <div className="h-3 w-full bg-green-100 rounded-full">
              <div className="h-3 bg-green-500 rounded-full" style={{ width: `${checkoutsPercent}%` }}></div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ArrowDown className="text-gray-400" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Satın Almalar</span>
              <span className="text-sm font-medium">{purchases.toLocaleString()} ({checkoutToPurchaseRate}%)</span>
            </div>
            <div className="h-3 w-full bg-orange-100 rounded-full">
              <div className="h-3 bg-orange-500 rounded-full" style={{ width: `${purchasesPercent}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Toplam Dönüşüm Oranı</span>
              <div className="text-xl font-bold">%{conversionRate}</div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500">Ortalama Sipariş Değeri</div>
              <div className="text-xl font-bold">₺349.99</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsConversionFunnel;
