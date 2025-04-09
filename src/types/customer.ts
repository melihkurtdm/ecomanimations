
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  lastOrderDate?: Date;
  totalOrders: number;
  totalSpent: number;
  notes?: string;
  status: 'active' | 'inactive' | 'blocked';
  communicationHistory: {
    id: string;
    date: Date;
    type: 'email' | 'phone' | 'note' | 'other';
    content: string;
    status: 'pending' | 'sent' | 'completed' | 'failed';
  }[];
}
