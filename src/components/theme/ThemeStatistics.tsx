
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDollarSign, Users, ShoppingCart, LineChart } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

const ThemeStatistics: React.FC = () => {
  const stats: StatItem[] = [
    {
      title: "Ziyaretçi",
      value: "1,234",
      change: "+12.5%",
      icon: <Users className="h-4 w-4 text-blue-500" />,
      trend: "up"
    },
    {
      title: "Dönüşüm Oranı",
      value: "3.2%",
      change: "+0.8%",
      icon: <LineChart className="h-4 w-4 text-green-500" />,
      trend: "up"
    },
    {
      title: "Sipariş",
      value: "48",
      change: "+24%",
      icon: <ShoppingCart className="h-4 w-4 text-purple-500" />,
      trend: "up"
    },
    {
      title: "Gelir",
      value: "₺12,450",
      change: "+18.2%",
      icon: <CircleDollarSign className="h-4 w-4 text-orange-500" />,
      trend: "up"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tema Performansı</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-full bg-gray-100">
                  {stat.icon}
                </div>
                <span className="text-sm text-gray-500">{stat.title}</span>
              </div>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className={`text-xs flex items-center ${
                stat.trend === 'up' 
                  ? 'text-green-600' 
                  : stat.trend === 'down' 
                    ? 'text-red-600' 
                    : 'text-gray-500'
              }`}>
                {stat.change}
                {stat.trend === 'up' && <span className="ml-1">↑</span>}
                {stat.trend === 'down' && <span className="ml-1">↓</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeStatistics;
