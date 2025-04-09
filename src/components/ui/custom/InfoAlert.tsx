
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'info' | 'warning' | 'success' | 'error';

interface InfoAlertProps {
  title: string;
  description: string;
  variant?: AlertVariant;
  className?: string;
  onClose?: () => void;
}

const InfoAlert = ({ 
  title, 
  description, 
  variant = 'info',
  className,
  onClose
}: InfoAlertProps) => {
  const getIcon = () => {
    switch (variant) {
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800';
      default:
        return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  return (
    <Alert className={cn(getVariantClass(), className)}>
      <div className="flex items-start">
        {getIcon()}
        <div className="ml-2">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>
            {description}
          </AlertDescription>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="ml-auto -mt-1 text-gray-500 hover:text-gray-700"
            aria-label="Kapat"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </Alert>
  );
};

export default InfoAlert;
