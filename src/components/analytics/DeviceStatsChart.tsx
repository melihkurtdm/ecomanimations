
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DeviceStats } from '@/types/analytics';

interface DeviceStatsChartProps {
  data: DeviceStats;
}

const COLORS = ['#4f46e5', '#8b5cf6', '#d946ef'];

const DeviceStatsChart: React.FC<DeviceStatsChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Mobil', value: data.mobile },
    { name: 'Masaüstü', value: data.desktop },
    { name: 'Tablet', value: data.tablet }
  ];

  const total = data.mobile + data.desktop + data.tablet;

  return (
    <Card className="col-span-1 md:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Cihaz Dağılımı</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`, '']} 
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {chartData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-2xl font-bold">{((item.value / total) * 100).toFixed(1)}%</div>
              <div className="text-xs text-gray-500">{item.value.toLocaleString()} ziyaretçi</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceStatsChart;
