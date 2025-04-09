
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
        <TabsTrigger value="day">Günlük</TabsTrigger>
        <TabsTrigger value="week">Haftalık</TabsTrigger>
        <TabsTrigger value="month">Aylık</TabsTrigger>
        <TabsTrigger value="year">Yıllık</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AnalyticsPeriodSelector;
