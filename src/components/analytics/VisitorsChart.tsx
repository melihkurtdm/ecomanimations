
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TimeStats } from '@/types/analytics';

interface VisitorsChartProps {
  data: TimeStats[];
  period: 'day' | 'week' | 'month' | 'year';
}

const VisitorsChart: React.FC<VisitorsChartProps> = ({ data, period }) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-lg">Ziyaretçi ve Sayfa Görüntüleme İstatistikleri</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                width={40}
                tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
              />
              <Tooltip 
                formatter={(value: number) => [value.toLocaleString(), '']}
                labelFormatter={(label) => {
                  if (period === 'day') return `Saat: ${label}`;
                  if (period === 'week') return `Gün: ${label}`;
                  if (period === 'month') return `Tarih: ${label}`;
                  return `Ay: ${label}`;
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stackId="1"
                name="Ziyaretçi" 
                stroke="#4f46e5" 
                fill="#c7d2fe" 
              />
              <Area 
                type="monotone" 
                dataKey="pageViews" 
                stackId="2"
                name="Sayfa Görüntüleme" 
                stroke="#8b5cf6" 
                fill="#ddd6fe" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorsChart;
