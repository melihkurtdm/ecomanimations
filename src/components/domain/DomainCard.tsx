import React, { useState } from 'react';
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
  Trash2,
  RefreshCcw,
  ArrowUpRight
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { DomainStatus } from '@/types/domain';

interface DomainCardProps {
  domain: string;
  status: DomainStatus;
  isPrimary: boolean;
  createdAt: string;
  onVerify: () => Promise<void>;
  onMakePrimary: () => void;
  onDelete: () => void;
  onRefresh?: () => void;
}

const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  status,
  isPrimary,
  createdAt,
  onVerify,
  onMakePrimary,
  onDelete,
  onRefresh
}) => {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleVerifyDomain = async () => {
    try {
      setIsVerifying(true);
      // Perform the actual verification process
      await onVerify();
      
      toast({
        title: "Domain doğrulama başarılı",
        description: "Alan adınız başarıyla doğrulandı.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Doğrulama hatası",
        description: "Alan adınız doğrulanırken bir hata oluştu. Lütfen DNS ayarlarınızı kontrol edin.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRefreshDomain = async () => {
    if (!onRefresh) return;
    
    try {
      setIsRefreshing(true);
      await onRefresh();
      toast({
        title: "Domain durumu güncellendi",
        description: "Alan adı durumu yenilendi.",
      });
    } catch (error) {
      toast({
        title: "Yenileme hatası",
        description: "Alan adı durumu yenilenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExternalVisit = () => {
    setIsChecking(true);
    // Check if domain is actually accessible
    const url = `https://${domain}`;
    
    // Try to fetch the domain first to check if it's available
    fetch(url, { mode: 'no-cors' })
      .then(() => {
        window.open(url, '_blank');
        setIsChecking(false);
      })
      .catch((error) => {
        console.error("Domain ziyaret edilemiyor:", error);
        toast({
          title: "Alan adı erişilebilir değil",
          description: "Bu alan adına henüz erişilemiyor. DNS ayarlarınızın yayılması 24-48 saat sürebilir.",
          variant: "destructive",
        });
        setIsChecking(false);
      });
  };

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
              <>
                <Button size="sm" variant="outline" onClick={handleVerifyDomain} disabled={isVerifying}>
                  {isVerifying ? (
                    <>
                      <RefreshCcw className="h-4 w-4 mr-1 animate-spin" />
                      Doğrulanıyor...
                    </>
                  ) : (
                    <>
                      <RotateCw className="h-4 w-4 mr-1" />
                      Doğrula
                    </>
                  )}
                </Button>
                <Button size="sm" variant="outline" onClick={handleRefreshDomain} disabled={isRefreshing}>
                  {isRefreshing ? (
                    <RefreshCcw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCcw className="h-4 w-4" />
                  )}
                </Button>
              </>
            )}
            
            {status === 'verified' && !isPrimary && (
              <Button size="sm" variant="outline" onClick={onMakePrimary}>
                <Star className="h-4 w-4 mr-1" />
                Birincil Yap
              </Button>
            )}
            
            <Button size="sm" variant="outline" className="text-blue-600" onClick={handleExternalVisit} disabled={isChecking}>
              {isChecking ? (
                <>
                  <RefreshCcw className="h-4 w-4 mr-1 animate-spin" />
                  Kontrol ediliyor...
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Ziyaret Et
                </>
              )}
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
                <p className="mt-1 font-medium">Değer kısmına tam olarak şunu yazın: <span className="font-mono bg-red-100 px-1 rounded">routes.storehub.app</span></p>
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
                <div className="mt-2 bg-amber-100 p-2 rounded-md">
                  <p className="font-medium">CNAME kaydı nasıl eklenir:</p>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>Domain sağlayıcınızın kontrol paneline giriş yapın</li>
                    <li>DNS ayarları veya DNS yönetimi bölümünü bulun</li>
                    <li>Yeni bir CNAME kaydı ekleyin</li>
                    <li>Host alanına <span className="font-mono bg-amber-50 px-1 rounded">@</span> veya domaininizi yazın</li>
                    <li>Değer/Hedef alanına <span className="font-mono bg-amber-50 px-1 rounded">routes.storehub.app</span> yazın</li>
                    <li>TTL değerini otomatik veya 3600 olarak bırakın</li>
                    <li>Kaydedin ve DNS değişikliklerinin yayılması için bekleyin (24-48 saat sürebilir)</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DomainCard;
