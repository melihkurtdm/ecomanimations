
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ConversionStats } from '@/types/analytics';

interface ConversionFunnelChartProps {
  data: ConversionStats;
}

const ConversionFunnelChart: React.FC<ConversionFunnelChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Ziyaretler', value: data.visits, fill: '#c7d2fe' },
    { name: 'Sepete Ekle', value: data.addToCart, fill: '#a5b4fc' },
    { name: 'Ödeme Başlat', value: data.checkouts, fill: '#818cf8' },
    { name: 'Satın Alma', value: data.purchases, fill: '#4f46e5' }
  ];

  const steps = [
    { label: 'Ziyaretler', value: data.visits, percent: 100 },
    { label: 'Sepete Ekle', value: data.addToCart, percent: (data.addToCart / data.visits) * 100 },
    { label: 'Ödeme Başlat', value: data.checkouts, percent: (data.checkouts / data.visits) * 100 },
    { label: 'Satın Alma', value: data.purchases, percent: (data.purchases / data.visits) * 100 }
  ];

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-lg">Dönüşüm Hunisi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip 
                formatter={(value: number) => [value.toLocaleString(), '']} 
                cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
              />
              <Bar dataKey="value" background={{ fill: '#f5f5f5' }}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium">{step.label}</div>
              <div className="text-2xl font-bold">{step.value.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{step.percent.toFixed(1)}%</div>
              {index < steps.length - 1 && (
                <div className="flex justify-center mt-2">
                  <div className="h-0.5 w-8 bg-gray-200 transform rotate-45 translate-x-3"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            <span className="font-bold">Toplam Dönüşüm Oranı:</span> {data.conversionRate.toFixed(1)}% (satın alma / ziyaret)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnelChart;
