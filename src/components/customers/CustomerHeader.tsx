
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Search } from 'lucide-react';
import CustomerFilters from './CustomerFilters';
import { Customer } from '@/types/customer';

interface CustomerHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddCustomer: () => void;
  selectedStatus: 'all' | Customer['status'];
  onStatusChange: (status: 'all' | Customer['status']) => void;
}

const CustomerHeader = ({ 
  searchTerm, 
  onSearchChange,
  onAddCustomer,
  selectedStatus,
  onStatusChange
}: CustomerHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Müşteri Yönetimi</h1>
        <Button onClick={onAddCustomer} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Yeni Müşteri
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Müşteri adı, telefon veya email ara..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <CustomerFilters
          selectedStatus={selectedStatus}
          onStatusChange={onStatusChange}
        />
      </div>
    </div>
  );
};

export default CustomerHeader;
