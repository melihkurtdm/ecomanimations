
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface Package {
  name: string;
  price: string;
  numericPrice: number;
  period: string;
  description: string;
  features: string[];
  badge?: string;
  tag?: string;
  yearlyPrice?: string;
  originalYearlyPrice?: string;
}

interface PackageCardProps {
  packageData: Package;
  isYearly: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({ packageData, isYearly }) => {
  const getDisplayPrice = () => {
    if (packageData.numericPrice === 0) return packageData.price;
    
    if (isYearly && packageData.yearlyPrice) {
      return packageData.yearlyPrice;
    }
    
    return packageData.price;
  };

  const getOriginalPrice = () => {
    if (isYearly && packageData.originalYearlyPrice) {
      return packageData.originalYearlyPrice;
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Seçilen Paket: {packageData.name}</CardTitle>
            <CardDescription>{packageData.description}</CardDescription>
          </div>
          {packageData.tag && (
            <Badge className="bg-brand-purple text-white">{packageData.tag}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {packageData.numericPrice > 0 && (
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-1 rounded-full inline-flex items-center">
                <button
                  onClick={() => {/* Handled in parent */}}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    !isYearly ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                  disabled
                >
                  Aylık
                </button>
                <button
                  onClick={() => {/* Handled in parent */}}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    isYearly ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                  disabled
                >
                  Yıllık
                  {isYearly && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">%25 İndirim</Badge>
                  )}
                </button>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="font-medium">Fiyat:</span>
            <div className="text-right">
              <span className="text-xl font-bold">{getDisplayPrice()}</span>
              {packageData.numericPrice > 0 && (
                <span className="text-gray-600 text-sm ml-1">/{isYearly ? 'yıl' : packageData.period}</span>
              )}
              {getOriginalPrice() && (
                <div className="text-gray-500 text-sm line-through">{getOriginalPrice()}</div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-3">Paket İçeriği:</h3>
            <ul className="space-y-2">
              {packageData.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
