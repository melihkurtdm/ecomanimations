
export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'blocked';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  address: string;
  createdAt: string;
  communicationHistory: {
    id: string;
    type: 'email' | 'phone' | 'note' | 'other';
    date: string | Date;
    content: string;
    status: 'sent' | 'completed' | 'pending' | 'failed';
  }[];
  notes?: string;
};
