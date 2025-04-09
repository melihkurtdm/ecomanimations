
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface EmptyCustomerStateProps {
  onAddCustomer: () => void;
}

const EmptyCustomerState: React.FC<EmptyCustomerStateProps> = ({ onAddCustomer }) => {
  return (
    <div className="text-center py-10">
      <div className="flex justify-center">
        <div className="bg-blue-50 p-3 rounded-full">
          <UserPlus className="h-8 w-8 text-blue-500" />
        </div>
      </div>
      
      <h3 className="mt-4 text-lg font-medium">Henüz müşteriniz yok</h3>
      <p className="mt-1 text-sm text-gray-500">
        İlk müşterinizi ekleyerek başlayın veya ürünlerinizi satışa sunun.
      </p>
      
      <div className="mt-6">
        <Button onClick={onAddCustomer} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Yeni Müşteri
        </Button>
      </div>
    </div>
  );
};

export default EmptyCustomerState;
