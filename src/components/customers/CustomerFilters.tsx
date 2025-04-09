
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Customer } from '@/types/customer';

type StatusFilter = Customer['status'] | 'all';

interface CustomerFiltersProps {
  selectedStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({ selectedStatus, onStatusChange }) => {
  const clearFilters = () => {
    onStatusChange('all');
  };
  
  const statusOptions = [
    { value: 'all', label: 'Tüm durumlar' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Pasif' },
    { value: 'blocked', label: 'Engelli' },
  ];

  const hasActiveFilters = selectedStatus !== 'all';
  
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Müşteri Durumu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {statusOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={selectedStatus === option.value}
              onCheckedChange={() => onStatusChange(option.value as StatusFilter)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="flex items-center gap-1 text-sm text-muted-foreground"
        >
          <X className="h-3 w-3" />
          Filtreleri Temizle
        </Button>
      )}
    </div>
  );
};

export default CustomerFilters;
