
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import CustomerHeader from '@/components/customers/CustomerHeader';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerDetailDrawer from '@/components/customers/CustomerDetailDrawer';
import CustomerAddDialog from '@/components/customers/CustomerAddDialog';
import { Customer } from '@/types/customer';

// Örnek müşteri verileri
const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 555 123 4567',
    address: 'Kadıköy, İstanbul',
    createdAt: new Date('2023-02-15'),
    lastOrderDate: new Date('2023-05-20'),
    totalOrders: 5,
    totalSpent: 2750.50,
    notes: 'Premium müşteri',
    status: 'active',
    communicationHistory: [
      {
        id: '1',
        date: new Date('2023-05-20'),
        type: 'email',
        content: 'Siparişiniz yola çıktı.',
        status: 'sent'
      },
      {
        id: '2',
        date: new Date('2023-05-18'),
        type: 'phone',
        content: 'Ödeme onaylandı.',
        status: 'completed'
      }
    ]
  },
  {
    id: '2',
    name: 'Zeynep Kaya',
    email: 'zeynep.kaya@example.com',
    phone: '+90 555 987 6543',
    address: 'Beyoğlu, İstanbul',
    createdAt: new Date('2023-03-10'),
    lastOrderDate: new Date('2023-06-05'),
    totalOrders: 3,
    totalSpent: 1250.75,
    notes: 'İndirim kuponlarına ilgili',
    status: 'active',
    communicationHistory: [
      {
        id: '3',
        date: new Date('2023-06-05'),
        type: 'email',
        content: 'İndirim kuponu gönderildi.',
        status: 'sent'
      }
    ]
  },
  {
    id: '3',
    name: 'Mehmet Demir',
    email: 'mehmet.demir@example.com',
    phone: '+90 555 456 7890',
    address: 'Beşiktaş, İstanbul',
    createdAt: new Date('2023-01-05'),
    lastOrderDate: new Date('2023-06-15'),
    totalOrders: 8,
    totalSpent: 4320.25,
    notes: 'VIP müşteri',
    status: 'active',
    communicationHistory: [
      {
        id: '4',
        date: new Date('2023-06-15'),
        type: 'email',
        content: 'Yeni ürünler hakkında bilgilendirme.',
        status: 'sent'
      },
      {
        id: '5',
        date: new Date('2023-06-10'),
        type: 'phone',
        content: 'Sipariş detayları konuşuldu.',
        status: 'completed'
      }
    ]
  },
];

const Customers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Yetkisiz kullanıcıları yönlendir
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailDrawer(true);
  };

  const handleAddCustomer = () => {
    setShowAddDialog(true);
  };

  const onAddSubmit = (data: Omit<Customer, 'id' | 'createdAt' | 'communicationHistory'>) => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      createdAt: new Date(),
      communicationHistory: [],
      ...data,
    };
    
    setCustomers([...customers, newCustomer]);
    toast.success('Yeni müşteri başarıyla eklendi');
    setShowAddDialog(false);
  };

  const addCommunication = (customerId: string, communication: Omit<Customer['communicationHistory'][0], 'id'>) => {
    setCustomers(prev => prev.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          communicationHistory: [
            ...customer.communicationHistory,
            {
              id: Date.now().toString(),
              ...communication
            }
          ]
        };
      }
      return customer;
    }));

    toast.success('İletişim kaydı eklendi');
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <CustomerHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddCustomer={handleAddCustomer}
      />

      <CustomerTable 
        customers={filteredCustomers}
        onViewCustomer={handleViewCustomer}
      />

      <CustomerDetailDrawer 
        customer={selectedCustomer}
        open={showDetailDrawer}
        onOpenChange={setShowDetailDrawer}
        onAddCommunication={addCommunication}
      />

      <CustomerAddDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={onAddSubmit}
      />
    </motion.div>
  );
};

export default Customers;
