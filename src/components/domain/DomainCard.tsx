
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Settings, 
  Trash2, 
  AlertTriangle 
} from 'lucide-react';

export interface DomainItem {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'error';
  type: 'primary' | 'secondary' | 'redirect';
  ssl: boolean;
  createdAt: string;
  errorMessage?: string;
}

interface DomainCardProps {
  domain: DomainItem;
  onEdit: (domainId: string) => void;
  onDelete: (domainId: string) => void;
  onVerify?: (domainId: string) => void;
}

const DomainCard: React.FC<DomainCardProps> = ({ domain, onEdit, onDelete, onVerify }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{domain.name}</CardTitle>
          <Badge className={getStatusColor(domain.status)}>
            <div className="flex items-center space-x-1">
              {domain.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
              {domain.status === 'pending' && <AlertTriangle className="h-3 w-3 mr-1" />}
              {domain.status === 'error' && <XCircle className="h-3 w-3 mr-1" />}
              <span>{domain.status === 'active' ? 'Aktif' : 
                    domain.status === 'pending' ? 'Beklemede' : 'Hata'}</span>
            </div>
          </Badge>
        </div>
        <CardDescription>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {domain.type === 'primary' ? 'Ana Domain' : 
               domain.type === 'secondary' ? 'İkincil Domain' : 'Yönlendirme'}
            </Badge>
            {domain.ssl && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                <CheckCircle className="h-3 w-3 mr-1" /> SSL
              </Badge>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <div className="flex items-center text-gray-500 mb-1">
            <span>Oluşturulma: {new Date(domain.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>
          
          {domain.status === 'error' && domain.errorMessage && (
            <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded-md text-red-700 text-xs">
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                <span>{domain.errorMessage}</span>
              </div>
            </div>
          )}
          
          {domain.status === 'pending' && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-100 rounded-md text-yellow-700 text-xs">
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                <span>DNS ayarlarının yapılandırılması ve doğrulanması gerekiyor.</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          {domain.status === 'active' && (
            <Button variant="outline" size="sm" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-1" />
              Ziyaret Et
            </Button>
          )}
          
          {domain.status === 'pending' && onVerify && (
            <Button variant="outline" size="sm" onClick={() => onVerify(domain.id)} className="flex-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              Doğrula
            </Button>
          )}
          
          <Button variant="outline" size="sm" onClick={() => onEdit(domain.id)} className="flex-1">
            <Settings className="h-4 w-4 mr-1" />
            Düzenle
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => onDelete(domain.id)} className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-1" />
            Sil
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DomainCard;
