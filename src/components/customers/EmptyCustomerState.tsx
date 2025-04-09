
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';

interface EmptyCustomerStateProps {
  onAddCustomer: () => void;
}

const EmptyCustomerState = ({ onAddCustomer }: EmptyCustomerStateProps) => {
  return (
    <div className="text-center py-8">
      <Users className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Hiç müşteri bulunamadı</h3>
      <p className="text-muted-foreground mt-2">
        Henüz hiç müşteri eklemdiniz veya arama kriterinize uygun müşteri yok.
      </p>
      <Button 
        onClick={onAddCustomer} 
        className="mt-4"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        İlk müşterinizi ekleyin
      </Button>
    </div>
  );
};

export default EmptyCustomerState;
