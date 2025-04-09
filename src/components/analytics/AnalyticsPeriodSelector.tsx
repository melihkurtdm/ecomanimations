
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalyticsPeriodSelectorProps {
  period: 'day' | 'week' | 'month' | 'year';
  onChange: (value: 'day' | 'week' | 'month' | 'year') => void;
}

const AnalyticsPeriodSelector: React.FC<AnalyticsPeriodSelectorProps> = ({ period, onChange }) => {
  return (
    <Tabs 
      value={period} 
      onValueChange={(value) => onChange(value as 'day' | 'week' | 'month' | 'year')}
      className="w-full sm:w-auto"
    >
      <TabsList className="grid grid-cols-4 w-full sm:w-auto">
        <TabsTrigger value="day">Bugün</TabsTrigger>
        <TabsTrigger value="week">Bu Hafta</TabsTrigger>
        <TabsTrigger value="month">Bu Ay</TabsTrigger>
        <TabsTrigger value="year">Bu Yıl</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AnalyticsPeriodSelector;
