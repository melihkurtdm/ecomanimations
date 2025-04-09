
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalyticsPeriodSelectorProps {
  period: 'day' | 'week' | 'month' | 'year';
  onPeriodChange?: (value: 'day' | 'week' | 'month' | 'year') => void;
  onChange?: (value: 'day' | 'week' | 'month' | 'year') => void;
}

const AnalyticsPeriodSelector: React.FC<AnalyticsPeriodSelectorProps> = ({ 
  period, 
  onPeriodChange, 
  onChange 
}) => {
  // Support both callback prop names for flexibility
  const handleChange = (value: 'day' | 'week' | 'month' | 'year') => {
    if (onChange) onChange(value);
    if (onPeriodChange) onPeriodChange(value);
  };

  return (
    <Tabs 
      value={period} 
      onValueChange={(value) => handleChange(value as 'day' | 'week' | 'month' | 'year')}
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
