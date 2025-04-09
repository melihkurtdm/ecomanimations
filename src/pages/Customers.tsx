
import React, { useState } from 'react';
import { 
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset 
} from '@/components/ui/sidebar';
import CustomerHeader from '@/components/customers/CustomerHeader';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerDetailDrawer from '@/components/customers/CustomerDetailDrawer';
import { Customer } from '@/types/customer';
import { useToast } from '@/components/ui/use-toast';
import EmptyCustomerState from '@/components/customers/EmptyCustomerState';

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 555 123 4567',
    status: 'active',
    totalOrders: 8,
    totalSpent: 2450.75,
    lastOrderDate: '2025-03-15T10:30:00Z',
    address: 'Atatürk Bulvarı No:123, Çankaya, Ankara',
    createdAt: '2024-09-15T14:22:00Z',
    communicationHistory: [
      {
        id: '1',
        type: 'email',
        date: '2025-03-20T09:15:00Z',
        content: 'Yeni ürün koleksiyonumuz hakkında bilgilendirme e-postası gönderildi.',
        status: 'sent'
      },
      {
        id: '2',
        type: 'phone',
        date: '2025-03-05T14:30:00Z',
        content: 'Siparişi ile ilgili teslimat bilgisi verildi, müşteri teşekkür etti.',
        status: 'completed'
      }
    ],
    notes: 'Premium müşteri, genellikle elektronik ürünleri tercih ediyor.'
  },
  {
    id: '2',
    name: 'Ayşe Kaya',
    email: 'ayse.kaya@example.com',
    phone: '+90 555 987 6543',
    status: 'active',
    totalOrders: 5,
    totalSpent: 1280.50,
    lastOrderDate: '2025-04-01T15:45:00Z',
    address: 'Bağdat Caddesi No:456, Kadıköy, İstanbul',
    createdAt: '2024-10-05T11:30:00Z',
    communicationHistory: [
      {
        id: '1',
        type: 'note',
        date: '2025-04-02T10:00:00Z',
        content: 'Müşteri geçmiş siparişlerinden memnun olduğunu belirtti, indirim kuponu gönderildi.',
        status: 'completed'
      }
    ],
    notes: ''
  },
  {
    id: '3',
    name: 'Mehmet Demir',
    email: 'mehmet.demir@example.com',
    phone: '+90 555 444 3333',
    status: 'inactive',
    totalOrders: 2,
    totalSpent: 350.25,
    lastOrderDate: '2024-11-10T09:20:00Z',
    address: 'Cumhuriyet Mahallesi 123. Sokak No:7, Konak, İzmir',
    createdAt: '2024-09-25T16:45:00Z',
    communicationHistory: [],
    notes: 'Uzun süredir alışveriş yapmadı, özel teklif gönderilebilir.'
  },
  {
    id: '4',
    name: 'Zeynep Şahin',
    email: 'zeynep.sahin@example.com',
    phone: '+90 555 222 1111',
    status: 'blocked',
    totalOrders: 1,
    totalSpent: 125.00,
    lastOrderDate: '2024-07-22T13:10:00Z',
    address: 'Kültür Mahallesi 456. Sokak No:12, Merkez, Antalya',
    createdAt: '2024-07-15T10:20:00Z',
    communicationHistory: [
      {
        id: '1',
        type: 'note',
        date: '2024-07-23T11:30:00Z',
        content: 'Müşteri ürünleri iade etmeye çalıştı ancak iade süresi geçmişti. Şikayet oluşturuldu.',
        status: 'completed'
      },
      {
        id: '2',
        type: 'email',
        date: '2024-07-25T15:45:00Z',
        content: 'Hesabın askıya alındığına dair bilgilendirme e-postası gönderildi.',
        status: 'sent'
      }
    ],
    notes: 'Kötüye kullanım nedeniyle hesap askıya alındı.'
  }
];

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();
  
  const filteredCustomers = MOCK_CUSTOMERS.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.toLowerCase().includes(searchLower)
    );
  });
  
  const handleOpenCustomerDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };
  
  const handleAddCustomer = () => {
    toast({
      title: "Yeni müşteri ekleme",
      description: "Bu özellik henüz geliştirme aşamasındadır.",
    });
  };
  
  const handleAddCommunication = (
    customerId: string, 
    communication: Omit<Customer['communicationHistory'][0], 'id'>
  ) => {
    // In a real app, this would update the database
    // For now, we'll just show a toast message
    toast({
      title: "İletişim kaydedildi",
      description: "Müşteri ile iletişim başarıyla kaydedildi.",
    });
    
    // Update the local state for demo purposes
    const updatedCustomers = MOCK_CUSTOMERS.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          communicationHistory: [
            {
              id: `temp-${Date.now()}`,
              ...communication
            },
            ...customer.communicationHistory
          ]
        };
      }
      return customer;
    });
    
    // Find the updated customer to update the selected customer state
    const updatedCustomer = updatedCustomers.find(c => c.id === customerId) || null;
    setSelectedCustomer(updatedCustomer);
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            {/* Sidebar content can be added here if needed */}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="container py-6">
            <CustomerHeader 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAddCustomer={handleAddCustomer}
            />
            
            {filteredCustomers.length > 0 ? (
              <CustomerTable 
                customers={filteredCustomers}
                onViewCustomer={handleOpenCustomerDetail}
              />
            ) : (
              <EmptyCustomerState onAddCustomer={handleAddCustomer} />
            )}
            
            <CustomerDetailDrawer 
              customer={selectedCustomer}
              open={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              onAddCommunication={handleAddCommunication}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Customers;
