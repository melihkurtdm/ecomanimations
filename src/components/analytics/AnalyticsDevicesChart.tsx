
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DeviceStats } from '@/types/analytics';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface AnalyticsDevicesChartProps {
  data: DeviceStats;
}

const AnalyticsDevicesChart: React.FC<AnalyticsDevicesChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Mobil', value: data.mobile, icon: <Smartphone className="h-4 w-4" /> },
    { name: 'Masaüstü', value: data.desktop, icon: <Monitor className="h-4 w-4" /> },
    { name: 'Tablet', value: data.tablet, icon: <Tablet className="h-4 w-4" /> },
  ];

  const COLORS = ['#8B5CF6', '#3B82F6', '#F97316'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cihaz Dağılımı</CardTitle>
        <CardDescription>Ziyaretçilerin kullandığı cihaz türleri</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Oran']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-around mt-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full mb-2"
                style={{ backgroundColor: `${COLORS[index]}20` }}
              >
                <div style={{ color: COLORS[index] }}>{item.icon}</div>
              </div>
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-xl font-bold" style={{ color: COLORS[index] }}>{item.value}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsDevicesChart;
