
import React from 'react';
import { Check, Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export type CustomerFilterOptions = {
  search: string;
  status: ('active' | 'inactive' | 'blocked')[];
  totalOrdersMin: number | null;
  totalSpentMin: number | null;
}

interface CustomerFiltersProps {
  filters: CustomerFilterOptions;
  onFilterChange: (filters: CustomerFilterOptions) => void;
}

const CustomerFilters = ({ filters, onFilterChange }: CustomerFiltersProps) => {
  const statusOptions = [
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Pasif' },
    { value: 'blocked', label: 'Engelli' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value,
    });
  };

  const handleStatusToggle = (value: 'active' | 'inactive' | 'blocked') => {
    const newStatuses = filters.status.includes(value)
      ? filters.status.filter(s => s !== value)
      : [...filters.status, value];
    
    onFilterChange({
      ...filters,
      status: newStatuses,
    });
  };

  const handleTotalOrdersChange = (value: string) => {
    const numValue = value === '' ? null : parseInt(value, 10);
    onFilterChange({
      ...filters,
      totalOrdersMin: numValue,
    });
  };

  const handleTotalSpentChange = (value: string) => {
    const numValue = value === '' ? null : parseInt(value, 10);
    onFilterChange({
      ...filters,
      totalSpentMin: numValue,
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      search: '',
      status: [],
      totalOrdersMin: null,
      totalSpentMin: null,
    });
  };

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.status.length > 0 || 
    filters.totalOrdersMin !== null || 
    filters.totalSpentMin !== null;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Müşteri ara..."
          className="w-full bg-white pl-9"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex items-center gap-2">
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={handleResetFilters} className="h-9">
            <X className="mr-2 h-4 w-4" />
            Filtreleri Temizle
          </Button>
        )}
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Filtreler
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                  {filters.status.length + (filters.totalOrdersMin !== null ? 1 : 0) + (filters.totalSpentMin !== null ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0" align="end">
            <Command>
              <CommandInput placeholder="Filtreleri ara..." />
              <CommandList>
                <CommandEmpty>Filtre bulunamadı.</CommandEmpty>
                <CommandGroup heading="Müşteri Durumu">
                  {statusOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleStatusToggle(option.value as any)}
                      className="flex items-center justify-between"
                    >
                      <span>{option.label}</span>
                      {filters.status.includes(option.value as any) && (
                        <Check className="h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
                
                <CommandSeparator />
                
                <CommandGroup heading="Sipariş Sayısı">
                  <div className="p-2">
                    <Input
                      placeholder="Min. sipariş sayısı"
                      value={filters.totalOrdersMin === null ? '' : filters.totalOrdersMin}
                      onChange={(e) => handleTotalOrdersChange(e.target.value)}
                      type="number"
                      min="0"
                    />
                  </div>
                </CommandGroup>
                
                <CommandSeparator />
                
                <CommandGroup heading="Toplam Harcama">
                  <div className="p-2">
                    <Input
                      placeholder="Min. harcama tutarı"
                      value={filters.totalSpentMin === null ? '' : filters.totalSpentMin}
                      onChange={(e) => handleTotalSpentChange(e.target.value)}
                      type="number"
                      min="0"
                    />
                  </div>
                </CommandGroup>
              </CommandList>
              
              <div className="border-t p-2">
                <Button variant="outline" size="sm" className="w-full" onClick={handleResetFilters}>
                  Filtreleri Temizle
                </Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CustomerFilters;
