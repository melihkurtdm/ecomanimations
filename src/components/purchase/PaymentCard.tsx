
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Building, Wallet, Shield, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PaymentCardProps {
  displayPrice: string;
  selectedPaymentMethod: 'credit-card' | 'bank-transfer' | 'crypto';
  onPaymentMethodChange: (method: 'credit-card' | 'bank-transfer' | 'crypto') => void;
  onPayment: () => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  displayPrice,
  selectedPaymentMethod,
  onPaymentMethodChange,
  onPayment
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ödeme Bilgileri</CardTitle>
        <CardDescription>Güvenli ödeme işlemi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div 
              className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedPaymentMethod === 'credit-card' ? 'border-brand-purple bg-brand-purple/5' : 'hover:bg-gray-50'}`}
              onClick={() => onPaymentMethodChange('credit-card')}
            >
              <CreditCard className={`h-6 w-6 mb-2 ${selectedPaymentMethod === 'credit-card' ? 'text-brand-purple' : 'text-gray-500'}`} />
              <span className={`text-sm ${selectedPaymentMethod === 'credit-card' ? 'font-medium text-brand-purple' : ''}`}>Kredi Kartı</span>
            </div>
            <div 
              className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedPaymentMethod === 'bank-transfer' ? 'border-brand-purple bg-brand-purple/5' : 'hover:bg-gray-50'}`}
              onClick={() => onPaymentMethodChange('bank-transfer')}
            >
              <Building className={`h-6 w-6 mb-2 ${selectedPaymentMethod === 'bank-transfer' ? 'text-brand-purple' : 'text-gray-500'}`} />
              <span className={`text-sm ${selectedPaymentMethod === 'bank-transfer' ? 'font-medium text-brand-purple' : ''}`}>Havale/EFT</span>
            </div>
            <div 
              className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedPaymentMethod === 'crypto' ? 'border-brand-purple bg-brand-purple/5' : 'hover:bg-gray-50'}`}
              onClick={() => onPaymentMethodChange('crypto')}
            >
              <Wallet className={`h-6 w-6 mb-2 ${selectedPaymentMethod === 'crypto' ? 'text-brand-purple' : 'text-gray-500'}`} />
              <span className={`text-sm ${selectedPaymentMethod === 'crypto' ? 'font-medium text-brand-purple' : ''}`}>Kripto</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Paket ücreti:</span>
              <span>{displayPrice}</span>
            </div>
            {selectedPaymentMethod === 'credit-card' && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Taksit İmkanı:</span>
                <span>12 taksit</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Toplam:</span>
              <span>{displayPrice}</span>
            </div>
          </div>
          
          <div className="flex items-center mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
            <Shield className="h-5 w-5 text-blue-500 mr-2" />
            <span>Tüm ödeme işlemleri 256-bit SSL ile şifrelenerek korunmaktadır.</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg"
          onClick={onPayment}
        >
          <Package className="mr-2 h-5 w-5" />
          Paketi Satın Al
        </Button>
      </CardFooter>
    </Card>
  );
};
