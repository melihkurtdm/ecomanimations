
import React, { useState } from 'react';
import { Customer } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter 
} from '@/components/ui/drawer';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/formatters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Mail, Phone, MessageSquareText, Send, MapPin, ClipboardList } from 'lucide-react';

interface CustomerDetailDrawerProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCommunication: (
    customerId: string, 
    communication: Omit<Customer['communicationHistory'][0], 'id'>
  ) => void;
}

const CustomerDetailDrawer = ({ 
  customer, 
  open, 
  onOpenChange,
  onAddCommunication
}: CustomerDetailDrawerProps) => {
  const [newCommunication, setNewCommunication] = useState({
    type: 'note' as const,
    content: '',
    status: 'completed' as const
  });

  if (!customer) return null;

  const handleAddCommunication = () => {
    if (!newCommunication.content.trim()) return;
    
    onAddCommunication(customer.id, {
      date: new Date(),
      ...newCommunication
    });
    
    setNewCommunication({
      type: 'note',
      content: '',
      status: 'completed'
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl">{customer.name}</DrawerTitle>
              <DrawerDescription className="flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3" /> 
                Müşteri olma tarihi: {formatDate(customer.createdAt)}
              </DrawerDescription>
            </div>
            <StatusBadge status={customer.status} />
          </div>
        </DrawerHeader>
        
        <div className="px-4">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detaylar</TabsTrigger>
              <TabsTrigger value="communications">İletişim Geçmişi</TabsTrigger>
              <TabsTrigger value="orders">Siparişler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 py-4">
              <CustomerDetails customer={customer} />
            </TabsContent>
            
            <TabsContent value="communications" className="space-y-4 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Yeni İletişim Ekle</CardTitle>
                  <CardDescription>Müşteri ile iletişim detaylarını kaydedin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="comm-type">İletişim Türü</Label>
                    <Select 
                      value={newCommunication.type} 
                      onValueChange={(value: any) => setNewCommunication(prev => ({...prev, type: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="İletişim türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">E-posta</SelectItem>
                        <SelectItem value="phone">Telefon</SelectItem>
                        <SelectItem value="note">Not</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">İçerik</Label>
                    <Textarea 
                      id="content" 
                      placeholder="İletişim içeriğini yazın..." 
                      value={newCommunication.content}
                      onChange={(e) => setNewCommunication(prev => ({...prev, content: e.target.value}))}
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAddCommunication} 
                    disabled={!newCommunication.content.trim()}
                    className="w-full"
                  >
                    <MessageSquareText className="h-4 w-4 mr-2" />
                    İletişim Ekle
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>İletişim Geçmişi</CardTitle>
                  <CardDescription>
                    Toplam {customer.communicationHistory.length} iletişim kaydı
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {customer.communicationHistory.length > 0 ? (
                    <div className="space-y-4">
                      {customer.communicationHistory.sort((a, b) => 
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                      ).map(comm => (
                        <div key={comm.id} className="border-b pb-3 last:border-0">
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center gap-2">
                              {comm.type === 'email' && <Mail className="h-4 w-4 text-blue-500" />}
                              {comm.type === 'phone' && <Phone className="h-4 w-4 text-green-500" />}
                              {comm.type === 'note' && <MessageSquareText className="h-4 w-4 text-amber-500" />}
                              {comm.type === 'other' && <ClipboardList className="h-4 w-4 text-purple-500" />}
                              <span className="text-sm font-medium">
                                {comm.type === 'email' && 'E-posta'}
                                {comm.type === 'phone' && 'Telefon'}
                                {comm.type === 'note' && 'Not'}
                                {comm.type === 'other' && 'Diğer'}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDateTime(comm.date)}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{comm.content}</p>
                          <div className="flex justify-end mt-1">
                            <Badge 
                              variant="outline" 
                              className={
                                comm.status === 'sent' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                comm.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                comm.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                'bg-red-50 text-red-700 border-red-200'
                              }
                            >
                              {comm.status === 'sent' && 'Gönderildi'}
                              {comm.status === 'completed' && 'Tamamlandı'}
                              {comm.status === 'pending' && 'Beklemede'}
                              {comm.status === 'failed' && 'Başarısız'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      Henüz iletişim kaydı bulunmuyor
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-4 py-4">
              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sipariş Özeti</CardTitle>
                    <CardDescription>Müşteri sipariş bilgileri</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Toplam Sipariş Sayısı:</span>
                      <span>{customer.totalOrders}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Toplam Harcama:</span>
                      <span>{formatCurrency(customer.totalSpent)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Son Sipariş Tarihi:</span>
                      <span>
                        {customer.lastOrderDate ? formatDate(customer.lastOrderDate) : 'Henüz sipariş yok'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Son Siparişler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4 text-muted-foreground">
                      Sipariş bilgileri henüz mevcut değil
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DrawerFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Kapat
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const CustomerDetails = ({ customer }: { customer: Customer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Müşteri Bilgileri</CardTitle>
        <CardDescription>Temel müşteri bilgileri</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="font-medium">E-posta</div>
              <div>{customer.email}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="font-medium">Telefon</div>
              <div>{customer.phone}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="font-medium">Adres</div>
              <div>{customer.address}</div>
            </div>
          </div>
        </div>
        
        {customer.notes && (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MessageSquareText className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <div className="font-medium">Notlar</div>
                <div>{customer.notes}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Status Badge bileşeni
const StatusBadge = ({ status }: { status: Customer['status'] }) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Aktif</Badge>;
    case 'inactive':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pasif</Badge>;
    case 'blocked':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Engelli</Badge>;
    default:
      return null;
  }
};

export default CustomerDetailDrawer;
