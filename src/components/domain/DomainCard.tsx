
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Star, 
  ExternalLink, 
  RotateCw, 
  Trash2
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DomainCardProps {
  domain: string;
  status: 'verified' | 'pending' | 'error';
  isPrimary: boolean;
  createdAt: string;
  onVerify: () => void;
  onMakePrimary: () => void;
  onDelete: () => void;
}

const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  status,
  isPrimary,
  createdAt,
  onVerify,
  onMakePrimary,
  onDelete
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'verified':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Doğrulandı
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Doğrulama Bekliyor
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Hata
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center p-4">
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium">{domain}</span>
              {isPrimary && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Birincil Alan Adı</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 mb-3 sm:mb-0">
              {getStatusBadge()}
              <span className="text-xs">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: tr })} eklendi
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {status === 'pending' && (
              <Button size="sm" variant="outline" onClick={onVerify}>
                <RotateCw className="h-4 w-4 mr-1" />
                Doğrula
              </Button>
            )}
            
            {status === 'verified' && !isPrimary && (
              <Button size="sm" variant="outline" onClick={onMakePrimary}>
                <Star className="h-4 w-4 mr-1" />
                Birincil Yap
              </Button>
            )}
            
            <Button size="sm" variant="outline" className="text-blue-600" onClick={() => window.open(`https://${domain}`, '_blank')}>
              <ExternalLink className="h-4 w-4 mr-1" />
              Ziyaret Et
            </Button>
            
            <Button size="sm" variant="outline" className="text-red-600" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-1" />
              Sil
            </Button>
          </div>
        </div>
        
        {status === 'error' && (
          <div className="px-4 py-3 bg-red-50 border-t border-red-200 text-sm text-red-800">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
              <div>
                <p>DNS kaydı bulunamadı. Lütfen DNS ayarlarınızı kontrol edin ve CNAME kaydını doğru şekilde ekleyin.</p>
              </div>
            </div>
          </div>
        )}
        
        {status === 'pending' && (
          <div className="px-4 py-3 bg-amber-50 border-t border-amber-200 text-sm text-amber-800">
            <div className="flex">
              <Clock className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <div>
                <p>Alan adınız DNS doğrulamasını bekliyor. Lütfen DNS ayarlarınızı kontrol edin.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DomainCard;
