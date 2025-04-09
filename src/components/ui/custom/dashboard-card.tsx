
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  borderColor?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const DashboardCard = ({ 
  hoverEffect = false, 
  borderColor, 
  children, 
  className, 
  onClick,
  ...props 
}: DashboardCardProps) => {
  const cardClasses = cn(
    className,
    borderColor && `border-l-4 ${borderColor}`,
    hoverEffect && 'transition-all duration-200 hover:shadow-lg cursor-pointer'
  );

  const cardContent = (
    <Card className={cardClasses} {...props}>
      {children}
    </Card>
  );

  if (hoverEffect) {
    return (
      <motion.div 
        whileHover={{ 
          scale: 1.02,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        onClick={onClick}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default DashboardCard;
