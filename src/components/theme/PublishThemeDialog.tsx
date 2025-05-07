import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Globe, RotateCw, CheckCircle2, AlertTriangle, Link, ExternalLink } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getVerifiedDomains, getDnsInstructions, testDomainAccess, configureDnsViaNamecheapApi, isNamecheapApiConnected } from '@/services/domainService';
import { simulateThemePublicationProcess, isThemePublishedToDomain, getThemeStatusForDomain, debugThemePublications } from '@/services/themeService';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface PublishThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPublishing: boolean;
  isPublished: boolean;
  isSaved: boolean;
  onPublish: () => void;
}

const PublishThemeDialog: React.FC<PublishThemeDialogProps> = ({
  open,
  onOpenChange,
  isPublishing,
  isPublished,
  isSaved,
  onPublish
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [verifiedDomains, setVerifiedDomains] = useState<any[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [publishingToDomain, setPublishingToDomain] = useState(false);
  const [activePublications, setActivePublications] = useState<any[]>([]);
  const [hasNamecheapApi, setHasNamecheapApi] = useState(false);
  const [testingDomain, setTestingDomain] = useState(false);

  // Load verified domains when dialog opens
  useEffect(() => {
    if (open && user) {
      // Get all verified domains
      const domains = getVerifiedDomains(user.id);
      setVerifiedDomains(domains);
      
      // Check if Namecheap API is connected
      setHasNamecheapApi(isNamecheapApiConnected(user.id));
      
      // Get active theme publications for all domains
      const activePubs = domains.filter(d => d.hasPublishedTheme).map(d => {
        const status = getThemeStatusForDomain(user.id, d.domain);
        return {
          domain: d.domain,
          isCustomDomain: d.isCustomDomain,
          publishedAt: status.publishedAt,
          themeName: status.themeName
        };
      });
      setActivePublications(activePubs);
      
      // Debug log for publications
      debugThemePublications(user.id);
      
      if (domains.length > 0) {
        // Select the primary domain by default, or the first one
        const primaryDomain = domains.find(d => d.primary) || domains[0];
        setSelectedDomain(primaryDomain.domain);
      }
    }
  }, [open, user]);

  const handlePublishClick = async () => {
    if (!isSaved && !isPublished) {
      toast({
        title: "Değişiklikler kaydedilmedi",
        description: "Lütfen önce değişiklikleri kaydedin.",
        variant: "destructive",
      });
      return;
    }
    
    // First call the parent onPublish to save the theme
    onPublish();
    
    // Then publish to the selected domain if one is selected
    if (selectedDomain && user) {
      setPublishingToDomain(true);
      
      try {
        console.log(`Publishing theme to domain: ${selectedDomain}`);
        const success = await simulateThemePublicationProcess(user.id, selectedDomain);
        
        if (success) {
          toast({
            title: "Tema Yayınlandı",
            description: `Tema başarıyla ${selectedDomain} adresinde yayınland��.`,
          });
          
          // Refresh the domain list to update status
          const domains = getVerifiedDomains(user.id);
          setVerifiedDomains(domains);
          
          // Update active publications
          const activePubs = domains.filter(d => d.hasPublishedTheme).map(d => {
            const status = getThemeStatusForDomain(user.id, d.domain);
            return {
              domain: d.domain,
              isCustomDomain: d.isCustomDomain,
              publishedAt: status.publishedAt,
              themeName: status.themeName
            };
          });
          setActivePublications(activePubs);
        } else {
          toast({
            title: "Tema Yayınlama Hatası",
            description: "Tema yayınlanırken bir hata oluştu. Lütfen domain ayarlarınızı kontrol edin.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error publishing theme:", error);
        toast({
          title: "Tema Yayınlama Hatası",
          description: "Tema yayınlanırken bir hata oluştu. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
      } finally {
        setPublishingToDomain(false);
      }
    }
  };
  
  const handleTestDomain = async (domain: string, isCustom: boolean) => {
    if (!user) return;
    
    setTestingDomain(true);
    try {
      const isAccessible = await testDomainAccess(domain, isCustom);
      
      if (isAccessible) {
        toast({
          title: "Domain Erişimi Başarılı",
          description: `${isCustom ? domain : domain + '.shopset.net'} adresine başarıyla erişildi.`,
        });
      } else {
        toast({
          title: "Domain Erişimi Başarısız",
          description: "Domain henüz erişilebilir değil. DNS yayılmasının tamamlanması 24-48 saat sürebilir.",
          variant: "destructive",
        });
        
        // Offer to configure DNS via Namecheap API if available
        if (hasNamecheapApi) {
          toast({
            title: "Namecheap API Bağlantısı Mevcut",
            description: "DNS ayarlarını otomatik yapılandırmak ister misiniz?",
            action: (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => configureDnsViaNamecheapApi(user.id, domain)}
              >
                Yapılandır
              </Button>
            ),
          });
        }
      }
    } catch (error) {
      console.error("Error testing domain access:", error);
      toast({
        title: "Test Hatası",
        description: "Domain erişimi test edilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setTestingDomain(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="gap-2"
        >
          <Globe className="h-4 w-4" />
          {isPublished ? "Yayın Ayarları" : "Yayına Al"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Temayı Yayınla</DialogTitle>
          <DialogDescription>
            Bu tema mağazanızda yayınlandığında müşterileriniz tarafından görülebilir olacaktır.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Temanızı yayınlamadan önce tüm değişiklikleri kaydettiğinizden emin olun.
          </p>
          
          <div className="flex items-center space-x-2 text-sm mb-4">
            {isSaved ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Tüm değişiklikler kaydedildi</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-red-500">Kaydedilmemiş değişiklikler var</span>
              </>
            )}
          </div>
          
          {/* Aktif Tema Yayınları */}
          {activePublications.length > 0 && (
            <div className="mb-6 border rounded-md p-4 bg-gray-50">
              <h3 className="font-medium text-gray-800 mb-2">
                Aktif Tema Yayınları
              </h3>
              
              <div className="space-y-3">
                {activePublications.map((pub, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                    <div>
                      <div className="font-medium text-sm">
                        {pub.isCustomDomain ? pub.domain : `${pub.domain}.shopset.net`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {pub.themeName || "Adsız Tema"} • {new Date(pub.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-8"
                        onClick={() => handleTestDomain(pub.domain, pub.isCustomDomain)}
                        disabled={testingDomain}
                      >
                        {testingDomain ? (
                          <RotateCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <Link className="h-3 w-3" />
                        )}
                        <span className="sr-only">Test Et</span>
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8"
                        onClick={() => window.open(
                          pub.isCustomDomain 
                            ? `https://${pub.domain}` 
                            : `https://${pub.domain}.shopset.net`, 
                          '_blank'
                        )}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Ziyaret Et
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {verifiedDomains.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="domain-select" className="block text-sm font-medium text-gray-700">
                  Yayınlanacak Alan Adı
                </label>
                <select
                  id="domain-select"
                  className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                >
                  {verifiedDomains.map((domain) => (
                    <option key={domain.id} value={domain.domain}>
                      {domain.isCustomDomain ? domain.domain : `${domain.domain}.shopset.net`}
                      {domain.primary ? " (Birincil)" : ""}
                      {domain.hasPublishedTheme ? " (Yayında)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedDomain && user && (
                <div className="bg-gray-50 p-4 rounded-md border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Domain Durumu</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Seçilen alan adının durumu ve DNS ayarları
                      </p>
                    </div>
                    
                    {selectedDomain && verifiedDomains.find(d => d.domain === selectedDomain)?.status === 'verified' && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Doğrulanmış
                      </Badge>
                    )}
                  </div>
                  
                  <Separator className="my-3" />
                  
                  {selectedDomain && (
                    <>
                      <div className="text-sm">
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <div className="font-medium">Alan Adı:</div>
                          <div className="col-span-2">
                            {verifiedDomains.find(d => d.domain === selectedDomain)?.isCustomDomain 
                              ? selectedDomain 
                              : `${selectedDomain}.shopset.net`
                            }
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <div className="font-medium">Durum:</div>
                          <div className="col-span-2">
                            {verifiedDomains.find(d => d.domain === selectedDomain)?.status === 'verified'
                              ? 'Doğrulanmış'
                              : verifiedDomains.find(d => d.domain === selectedDomain)?.status === 'pending'
                                ? 'Beklemede'
                                : 'Hata'
                            }
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div className="font-medium">Tema Durumu:</div>
                          <div className="col-span-2">
                            {isThemePublishedToDomain(user.id, selectedDomain)
                              ? 'Yayında'
                              : 'Yayınlanmamış'
                            }
                            {isThemePublishedToDomain(user.id, selectedDomain) && (
                              <div className="text-xs text-gray-500 mt-1">
                                {getThemeStatusForDomain(user.id, selectedDomain).themeName || 'Adsız Tema'}{' '}
                                {getThemeStatusForDomain(user.id, selectedDomain).publishedAt && 
                                  `• ${new Date(getThemeStatusForDomain(user.id, selectedDomain).publishedAt!).toLocaleDateString()}`
                                }
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {verifiedDomains.find(d => d.domain === selectedDomain)?.status !== 'verified' && (
                        <Alert className="mt-3 bg-amber-50 border-amber-200">
                          <AlertDescription className="text-amber-800">
                            Bu alan adı henüz doğrulanmamış. Tema yayınlamak için önce alan adınızı doğrulamanız gerekiyor.
                            <div className="mt-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate('/dashboard/domain-management')}
                              >
                                Domain Yönetimine Git
                              </Button>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {verifiedDomains.find(d => d.domain === selectedDomain)?.status === 'verified' && 
                       user && isThemePublishedToDomain(user.id, selectedDomain) && (
                        <Alert className="mt-3 bg-blue-50 border-blue-200">
                          <AlertDescription className="text-blue-800">
                            Bu alan adında zaten yayınlanmış bir tema var. Yayınlarsanız mevcut tema güncellenecektir.
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 rounded p-3 text-sm text-amber-800">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                <span>Doğrulanmış alan adınız bulunmuyor.</span>
              </div>
              <p className="mt-1 pl-6">
                Tema yayınlamak için önce <a href="/dashboard/domain-management" className="text-blue-600 underline">alan adları</a> sayfasından bir alan adı doğrulayın.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button 
            onClick={handlePublishClick} 
            disabled={isPublishing || publishingToDomain || (!isSaved && !isPublished) || !selectedDomain || 
                    (selectedDomain && verifiedDomains.find(d => d.domain === selectedDomain)?.status !== 'verified')}
            className="gap-2"
          >
            {isPublishing || publishingToDomain ? (
              <>
                <RotateCw className="h-4 w-4 animate-spin" />
                Yayınlanıyor...
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                Yayınla
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishThemeDialog;
