
import React, { useState, useEffect } from 'react';
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
  Globe,
  Palette,
  Link
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { DomainStatus } from '@/types/domain';
import { testDomainAccess, configureDnsViaNamecheapApi } from '@/services/domainService';
import { getThemeStatusForDomain, simulateThemePublicationProcess, forcePublishTheme, getNamecheapApiStatus } from '@/services/themeService';
import { useAuth } from '@/contexts/AuthContext';

interface DomainCardProps {
  domain: string;
  status: DomainStatus;
  isPrimary: boolean;
  createdAt: string;
  isCustomDomain?: boolean;
  connectedStore?: string;
  hasPublishedTheme?: boolean;
  namecheapConnected?: boolean;
  onVerify: () => Promise<void>;
  onMakePrimary: () => void;
  onDelete: () => void;
  onRefresh?: () => void;
  onConnectNamecheap?: () => void;
}

const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  status,
  isPrimary,
  createdAt,
  isCustomDomain = true, // Default to true for custom domains
  connectedStore,
  hasPublishedTheme,
  namecheapConnected,
  onVerify,
  onMakePrimary,
  onDelete,
  onRefresh,
  onConnectNamecheap
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isConfiguringDns, setIsConfiguringDns] = useState(false);
  const [isForcePublishing, setIsForcePublishing] = useState(false);
  const [themeStatus, setThemeStatus] = useState<{
    hasPublishedTheme: boolean;
    publishedAt?: string;
    themeName?: string;
  }>({ hasPublishedTheme: false });
  const [namecheapApiStatus, setNamecheapApiStatus] = useState<{
    isConnected: boolean;
    lastChecked?: string;
    apiStatus: 'connected' | 'disconnected' | 'pending';
  }>({ isConnected: false, apiStatus: 'pending' });

  // Load theme status for this domain
  useEffect(() => {
    if (user && status === 'verified') {
      const domainThemeStatus = getThemeStatusForDomain(user.id, domain);
      setThemeStatus(domainThemeStatus);
    }
    
    // Also load Namecheap API status
    if (user) {
      const apiStatus = getNamecheapApiStatus(user.id, domain);
      setNamecheapApiStatus(apiStatus);
      console.log(`Namecheap API status for ${domain}:`, apiStatus);
    }
  }, [domain, status, user]);

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
      
      // Also refresh theme status
      if (user && status === 'verified') {
        const domainThemeStatus = getThemeStatusForDomain(user.id, domain);
        setThemeStatus(domainThemeStatus);
      }
      
      // Also refresh Namecheap API status
      if (user) {
        const apiStatus = getNamecheapApiStatus(user.id, domain);
        setNamecheapApiStatus(apiStatus);
      }
      
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
          description: "Site henüz yayında değil veya erişilemez durumda. DNS ayarlarınızın yayılması için bekleyin veya 'Tema Yayınla' butonunu kullanın.",
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

  const handlePublishTheme = async () => {
    if (!user) return;
    
    setIsPublishing(true);
    try {
      const success = await simulateThemePublicationProcess(user.id, domain);
      
      if (success) {
        // Refresh theme status
        const domainThemeStatus = getThemeStatusForDomain(user.id, domain);
        setThemeStatus(domainThemeStatus);
        
        toast({
          title: "Tema Yayınlandı",
          description: `Temanız ${domain} adresinde başarıyla yayınlandı.`,
        });
      }
    } catch (error) {
      console.error("Error publishing theme:", error);
      toast({
        title: "Tema Yayınlama Hatası",
        description: "Tema yayınlanırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleForcePublish = async () => {
    if (!user) return;
    
    setIsForcePublishing(true);
    try {
      const success = await forcePublishTheme(user.id, domain);
      
      if (success) {
        // Refresh theme status
        const domainThemeStatus = getThemeStatusForDomain(user.id, domain);
        setThemeStatus(domainThemeStatus);
        
        toast({
          title: "Tema Zorla Yayınlandı",
          description: `Temanız ${domain} adresinde zorla yayınlandı.`,
        });
        
        // Also refresh the domain status
        if (onRefresh) {
          await onRefresh();
        }
      }
    } catch (error) {
      console.error("Error force publishing theme:", error);
      toast({
        title: "Tema Zorla Yayınlama Hatası",
        description: "Tema zorla yayınlanırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsForcePublishing(false);
    }
  };

  const handleConfigureDnsViaNamecheap = async () => {
    if (!user) return;
    
    setIsConfiguringDns(true);
    try {
      const success = await configureDnsViaNamecheapApi(user.id, domain);
      
      if (success) {
        // Refresh the domain status
        if (onRefresh) {
          await onRefresh();
        }
        
        // Refresh Namecheap API status
        const apiStatus = getNamecheapApiStatus(user.id, domain);
        setNamecheapApiStatus(apiStatus);
      }
    } catch (error) {
      console.error("Error configuring DNS via Namecheap API:", error);
      toast({
        title: "DNS Yapılandırma Hatası",
        description: "Namecheap API üzerinden DNS ayarları yapılandırılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsConfiguringDns(false);
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

  const getThemeBadge = () => {
    if (status !== 'verified') return null;
    
    if (themeStatus.hasPublishedTheme) {
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <Palette className="h-3 w-3 mr-1" />
          Tema Yayında
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
        <Palette className="h-3 w-3 mr-1" />
        Tema Yayınlanmadı
      </Badge>
    );
  };

  const getNamecheapBadge = () => {
    if (namecheapApiStatus.isConnected || namecheapConnected) {
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Link className="h-3 w-3 mr-1" />
          Namecheap Bağlı
        </Badge>
      );
    }
    
    return null;
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
              {getThemeBadge()}
              {getNamecheapBadge()}
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
                
                {/* Namecheap API Configuration Button */}
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleConfigureDnsViaNamecheap} 
                  disabled={isConfiguringDns || !isCustomDomain}
                  className="text-blue-600"
                >
                  {isConfiguringDns ? (
                    <>
                      <RefreshCcw className="h-4 w-4 mr-1 animate-spin" />
                      Yapılandırılıyor...
                    </>
                  ) : (
                    <>
                      <Link className="h-4 w-4 mr-1" />
                      Namecheap ile Yapılandır
                    </>
                  )}
                </Button>
              </>
            )}
            
            {status === 'verified' && !themeStatus.hasPublishedTheme && (
              <Button size="sm" variant="outline" onClick={handlePublishTheme} disabled={isPublishing} className="text-purple-600">
                {isPublishing ? (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-1 animate-spin" />
                    Yayınlanıyor...
                  </>
                ) : (
                  <>
                    <Palette className="h-4 w-4 mr-1" />
                    Tema Yayınla
                  </>
                )}
              </Button>
            )}
            
            {status !== 'verified' && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleForcePublish} 
                disabled={isForcePublishing}
                className="text-amber-600"
              >
                {isForcePublishing ? (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-1 animate-spin" />
                    Zorla Yayınlanıyor...
                  </>
                ) : (
                  <>
                    <Palette className="h-4 w-4 mr-1" />
                    Zorla Yayınla
                  </>
                )}
              </Button>
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
            
            <Button size="sm" variant="outline" className="text-red-600" onClick={onDelete} disabled={isPrimary}>
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
                <div className="mt-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleConfigureDnsViaNamecheap} 
                    disabled={isConfiguringDns || !isCustomDomain}
                    className="text-blue-600"
                  >
                    {isConfiguringDns ? (
                      <>
                        <RefreshCcw className="h-4 w-4 mr-1 animate-spin" />
                        Yapılandırılıyor...
                      </>
                    ) : (
                      <>
                        <Link className="h-4 w-4 mr-1" />
                        Namecheap ile Otomatik Yapılandır
                      </>
                    )}
                  </Button>
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
                  
                  <div className="mt-3 border-t border-amber-200 pt-2">
                    <p className="font-medium mb-1">Namecheap üzerinde otomatik yapılandırmak ister misiniz?</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleConfigureDnsViaNamecheap} 
                      disabled={isConfiguringDns || !isCustomDomain}
                      className="text-blue-600"
                    >
                      {isConfiguringDns ? (
                        <>
                          <RefreshCcw className="h-4 w-4 mr-1 animate-spin" />
                          Yapılandırılıyor...
                        </>
                      ) : (
                        <>
                          <Link className="h-4 w-4 mr-1" />
                          Namecheap ile Otomatik Yapılandır
                        </>
                      )}
                    </Button>
                  </div>
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
                <p>Alan adınız doğrulandı! {themeStatus.hasPublishedTheme ? 'Temanız yayında!' : 'Artık temanızı yayınlayabilirsiniz.'}</p>
                {themeStatus.hasPublishedTheme ? (
                  <p className="mt-1">
                    Tema <strong>{themeStatus.themeName || "Varsayılan Tema"}</strong> başarıyla yayınlandı. Mağazanız bu alan adı üzerinden erişilebilir.
                  </p>
                ) : (
                  <p className="mt-1 text-amber-600">
                    Henüz bir tema yayınlanmadı. "Tema Yayınla" butonunu kullanarak mağazanızı yayına alın.
                  </p>
                )}
                {!themeStatus.hasPublishedTheme && (
                  <div className="mt-2">
                    <Button size="sm" variant="outline" onClick={handlePublishTheme} disabled={isPublishing} className="text-purple-600">
                      {isPublishing ? (
                        <>
                          <RefreshCcw className="h-4 w-4 mr-1 animate-spin" />
                          Yayınlanıyor...
                        </>
                      ) : (
                        <>
                          <Palette className="h-4 w-4 mr-1" />
                          Tema Yayınla
                        </>
                      )}
                    </Button>
                  </div>
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
