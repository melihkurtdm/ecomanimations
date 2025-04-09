
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeStats } from '@/types/analytics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AnalyticsVisitorsChartProps {
  data: TimeStats[];
}

const AnalyticsVisitorsChart: React.FC<AnalyticsVisitorsChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ziyaretçi Trendi</CardTitle>
        <CardDescription>Zaman içinde ziyaretçi ve sayfa görüntüleme sayıları</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#e5e7eb' }} 
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#e5e7eb' }} 
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                itemStyle={{ padding: '2px 0' }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingBottom: '10px' }}
              />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                name="Ziyaretçiler" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 5, strokeWidth: 1 }}
              />
              <Line 
                type="monotone" 
                dataKey="pageViews" 
                name="Sayfa Görüntüleme" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 5, strokeWidth: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsVisitorsChart;
