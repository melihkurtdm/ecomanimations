
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
  Copy,
  Globe
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { DomainStatus } from '@/types/domain';
import { testDomainAccess } from '@/services/domainService';

interface DomainCardProps {
  domain: string;
  status: DomainStatus;
  isPrimary: boolean;
  createdAt: string;
  isCustomDomain?: boolean;
  connectedStore?: string;
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
  isCustomDomain = true, // Default to true for custom domains
  connectedStore,
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
      console.log("Starting domain verification for:", domain);
      // Perform the actual verification process
      await onVerify();
      
      toast({
        title: "Domain doğrulama başarılı",
        description: "Alan adınız başarıyla doğrulandı.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error verifying domain:", error);
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
      console.error("Error refreshing domain:", error);
      toast({
        title: "Yenileme hatası",
        description: "Alan adı durumu yenilenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExternalVisit = async () => {
    setIsChecking(true);
    console.log("Testing domain access for:", domain, "isCustomDomain:", isCustomDomain);
    
    try {
      // Check if domain is actually accessible
      const url = isCustomDomain ? `https://${domain}` : `https://${domain}.shopset.net`;
      console.log("Attempting to visit URL:", url);
      
      // Test the domain access first
      const isAccessible = await testDomainAccess(domain, isCustomDomain);
      
      if (isAccessible) {
        // Open in a new tab if accessible
        window.open(url, '_blank');
        toast({
          title: "Site Açılıyor",
          description: `${url} adresine yönlendiriliyorsunuz.`,
        });
      } else {
        toast({
          title: "Site Henüz Hazır Değil",
          description: "Site henüz yayında değil veya erişilemez durumda.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error visiting domain:", error);
      toast({
        title: "Erişim Hatası",
        description: "Siteye erişim sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopyalandı",
      description: `"${text}" panoya kopyalandı`,
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

  const getDomainTypeIndicator = () => {
    if (isCustomDomain) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Globe className="h-4 w-4 text-blue-500 ml-1" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Özel Alan Adı</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Globe className="h-4 w-4 text-purple-500 ml-1" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Shopset Alt Alan Adı</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  };

  const getFullDomainDisplay = () => {
    if (isCustomDomain) {
      return domain;
    } else {
      return `${domain}.shopset.net`;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center p-4">
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium">{getFullDomainDisplay()}</span>
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
              {getDomainTypeIndicator()}
            </div>
            <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 mb-3 sm:mb-0">
              {getStatusBadge()}
              <span className="text-xs">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: tr })} eklendi
              </span>
              {connectedStore && (
                <span className="text-xs text-blue-600">
                  • <strong>{connectedStore}</strong> mağazasına bağlı
                </span>
              )}
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
            
            <Button size="sm" variant="outline" className="text-blue-600" onClick={handleExternalVisit} disabled={isChecking || status !== 'verified'}>
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
                <div className="mt-1 flex items-center">
                  <p className="font-medium">Değer kısmına tam olarak şunu yazın:</p>
                  <code className="font-mono bg-red-100 px-2 py-0.5 rounded mx-2">routes.shopset.net</code>
                  <button 
                    className="text-red-700 hover:text-red-900"
                    onClick={() => copyToClipboard("routes.shopset.net")}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
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
                    <li>
                      Host alanına <code className="font-mono bg-amber-50 px-1 rounded">@</code> veya <code className="font-mono bg-amber-50 px-1 rounded">www</code> yazın
                      <button 
                        className="ml-1 text-amber-700 hover:text-amber-900"
                        onClick={() => copyToClipboard("@")}
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </li>
                    <li>
                      Değer/Hedef alanına <code className="font-mono bg-amber-50 px-1 rounded">routes.shopset.net</code> yazın
                      <button 
                        className="ml-1 text-amber-700 hover:text-amber-900"
                        onClick={() => copyToClipboard("routes.shopset.net")}
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </li>
                    <li>TTL değerini otomatik veya 3600 olarak bırakın</li>
                    <li>Kaydedin ve DNS değişikliklerinin yayılması için bekleyin (24-48 saat sürebilir)</li>
                    <li className="font-semibold">Doğrulama tamamlandıktan sonra, temanız alan adınızda görünecektir</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {status === 'verified' && (
          <div className="px-4 py-3 bg-green-50 border-t border-green-200 text-sm text-green-800">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <div>
                <p>Alan adınız doğrulandı! Artık mağazanız bu adreste görüntülenecektir.</p>
                {connectedStore ? (
                  <p className="mt-1"><strong>{connectedStore}</strong> mağazası bu alan adı üzerinden erişilebilir.</p>
                ) : (
                  <p className="mt-1 text-amber-600">Henüz bir mağazaya bağlı değil. Mağaza kurulumunu tamamlayın.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DomainCard;
