
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsPeriodSelectorProps {
  period: 'day' | 'week' | 'month' | 'year';
  onPeriodChange?: (value: 'day' | 'week' | 'month' | 'year') => void;
  onChange?: (value: 'day' | 'week' | 'month' | 'year') => void;
  locale?: 'tr' | 'en';
}

const translations = {
  tr: {
    day: 'Günlük',
    week: 'Haftalık',
    month: 'Aylık',
    year: 'Yıllık',
    analytics: 'Analitik Periyodu'
  },
  en: {
    day: 'Daily',
    week: 'Weekly',
    month: 'Monthly',
    year: 'Yearly',
    analytics: 'Analytics Period'
  }
};

const AnalyticsPeriodSelector: React.FC<AnalyticsPeriodSelectorProps> = ({ 
  period, 
  onPeriodChange, 
  onChange,
  locale = 'tr'
}) => {
  // Support both callback prop names for flexibility
  const handleChange = (value: 'day' | 'week' | 'month' | 'year') => {
    if (onChange) onChange(value);
    if (onPeriodChange) onPeriodChange(value);
  };

  const t = translations[locale];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <div className="flex items-center text-sm text-gray-500 mb-1 sm:mb-0 mr-2">
        <TrendingUp className="w-4 h-4 mr-1.5" />
        <span>{t.analytics}</span>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs 
          value={period} 
          onValueChange={(value) => handleChange(value as 'day' | 'week' | 'month' | 'year')}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="day" className="flex items-center justify-center px-3 py-1.5">
              <Calendar className="w-3.5 h-3.5 mr-1.5 sm:mr-2" />
              <span>{t.day}</span>
            </TabsTrigger>
            <TabsTrigger value="week" className="flex items-center justify-center px-3 py-1.5">
              <Calendar className="w-3.5 h-3.5 mr-1.5 sm:mr-2" />
              <span>{t.week}</span>
            </TabsTrigger>
            <TabsTrigger value="month" className="flex items-center justify-center px-3 py-1.5">
              <Calendar className="w-3.5 h-3.5 mr-1.5 sm:mr-2" />
              <span>{t.month}</span>
            </TabsTrigger>
            <TabsTrigger value="year" className="flex items-center justify-center px-3 py-1.5">
              <Calendar className="w-3.5 h-3.5 mr-1.5 sm:mr-2" />
              <span>{t.year}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AnalyticsPeriodSelector;
