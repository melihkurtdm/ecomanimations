
import React from 'react';
import { Customer } from '@/types/customer';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/formatters';
import EmptyCustomerState from './EmptyCustomerState';

interface CustomerTableProps {
  customers: Customer[];
  onViewCustomer: (customer: Customer) => void;
}

const CustomerTable = ({ customers, onViewCustomer }: CustomerTableProps) => {
  if (customers.length === 0) {
    return <EmptyCustomerState onAddCustomer={() => {}} />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Müşteri</TableHead>
            <TableHead>İletişim</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead className="text-right">Toplam Sipariş</TableHead>
            <TableHead className="text-right">Toplam Harcama</TableHead>
            <TableHead className="text-right">Son Sipariş</TableHead>
            <TableHead className="text-center">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{customer.email}</span>
                  <span className="text-xs">{customer.phone}</span>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={customer.status} />
              </TableCell>
              <TableCell className="text-right">{customer.totalOrders}</TableCell>
              <TableCell className="text-right">{formatCurrency(customer.totalSpent)}</TableCell>
              <TableCell className="text-right">
                {customer.lastOrderDate 
                  ? formatDate(customer.lastOrderDate) 
                  : 'Henüz sipariş yok'}
              </TableCell>
              <TableCell className="text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewCustomer(customer)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Status Badge bileşeni
const StatusBadge = ({ status }: { status: Customer['status'] }) => {
  switch (status) {
    case 'active':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Aktif</Badge>;
    case 'inactive':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pasif</Badge>;
    case 'blocked':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Engelli</Badge>;
    default:
      return null;
  }
};

export default CustomerTable;
