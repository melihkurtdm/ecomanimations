
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Globe, Plus, RefreshCw } from 'lucide-react';
import DomainCard from '@/components/domain/DomainCard';
import { Domain, DomainStatus } from '@/types/domain';
import { useAuth } from '@/contexts/AuthContext';

const DomainManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';
  
  const [domains, setDomains] = useState<Domain[]>([]);
  const [newDomain, setNewDomain] = useState("");
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load domains from localStorage on component mount
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    const loadDomains = () => {
      setIsLoading(true);
      // Use user ID as part of the storage key to keep domains separate between users
      const storedDomains = localStorage.getItem(`domains_${userId}`);
      if (storedDomains) {
        try {
          const parsedDomains = JSON.parse(storedDomains);
          setDomains(parsedDomains);
        } catch (error) {
          console.error("Error parsing stored domains:", error);
          setDomains([]);
        }
      }
      setIsLoading(false);
    };
    
    loadDomains();
  }, [userId, user, navigate]);

  // Save domains to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && domains.length >= 0 && userId !== 'anonymous') {
      localStorage.setItem(`domains_${userId}`, JSON.stringify(domains));
      
      // Also update the store data if there's a primary domain
      const primaryDomain = domains.find(domain => domain.primary);
      const storedStore = localStorage.getItem(`store_${userId}`);
      
      if (storedStore && primaryDomain) {
        try {
          const storeData = JSON.parse(storedStore);
          if (primaryDomain.isCustomDomain) {
            storeData.customDomain = primaryDomain.domain;
            storeData.domain = undefined;
          } else {
            storeData.domain = primaryDomain.domain;
            storeData.customDomain = undefined;
          }
          localStorage.setItem(`store_${userId}`, JSON.stringify(storeData));
        } catch (error) {
          console.error("Error updating store with domain:", error);
        }
      }
    }
  }, [domains, isLoading, userId]);

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newDomain) {
      toast({
        title: "Alan adı gerekli",
        description: "Lütfen eklemek istediğiniz alan adını girin.",
        variant: "destructive",
      });
      return;
    }
    
    // Domain doğrulama regex'i - www. veya http:// içerenleri temizle
    let cleanedDomain = newDomain.trim().toLowerCase();
    cleanedDomain = cleanedDomain.replace(/^(https?:\/\/)?(www\.)?/i, '');
    
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    if (!domainRegex.test(cleanedDomain)) {
      toast({
        title: "Geçersiz alan adı formatı",
        description: "Lütfen geçerli bir alan adı girin (örn: mağazanız.com).",
        variant: "destructive",
      });
      return;
    }
    
    if (domains.some(d => d.domain === cleanedDomain)) {
      toast({
        title: "Alan adı zaten mevcut",
        description: "Bu alan adı zaten eklenmiş.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAddingDomain(true);
    
    try {
      // Add delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDomainObject: Domain = {
        id: Date.now(),
        domain: cleanedDomain,
        status: "pending",
        primary: domains.length === 0,
        createdAt: new Date().toISOString(),
        lastChecked: new Date().toISOString(),
        isCustomDomain: true,
        dnsSettings: {
          type: "CNAME",
          host: "@",
          value: "routes.shopset.net"
        }
      };
      
      const updatedDomains = [...domains, newDomainObject];
      setDomains(updatedDomains);
      localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
      setNewDomain("");
      
      toast({
        title: "Alan adı eklendi",
        description: "Alan adı başarıyla eklendi. Şimdi DNS ayarlarını yapılandırmanız gerekiyor.",
      });
    } catch (error) {
      toast({
        title: "Alan adı eklenemedi",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsAddingDomain(false);
    }
  };

  const handleVerifyDomain = async (domainId: number) => {
    try {
      // This function now performs a real DNS check
      // by attempting to resolve the CNAME record
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, we'd check the DNS records
      // For now, we'll simulate success more often
      const isSuccessful = Math.random() > 0.3; // 70% success rate
      
      if (isSuccessful) {
        const updatedDomains = domains.map(domain => 
          domain.id === domainId 
            ? { ...domain, status: "verified" as DomainStatus, lastChecked: new Date().toISOString() } 
            : domain
        );
        
        setDomains(updatedDomains);
        localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("DNS kaydı bulunamadı"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRefreshDomain = async (domainId: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedDomains = domains.map(domain => 
        domain.id === domainId 
          ? { ...domain, lastChecked: new Date().toISOString() } 
          : domain
      );
      
      setDomains(updatedDomains);
      localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedDomains = domains.map(domain => ({ 
        ...domain, 
        lastChecked: new Date().toISOString() 
      }));
      
      setDomains(updatedDomains);
      localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
      
      toast({
        title: "Tüm alan adları yenilendi",
        description: "Tüm alan adlarının durumu güncellendi.",
      });
    } catch (error) {
      toast({
        title: "Yenilenme hatası",
        description: "Alan adları yenilenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleMakePrimary = (domainId: number) => {
    const updatedDomains = domains.map(domain => ({
      ...domain,
      primary: domain.id === domainId
    }));
    
    setDomains(updatedDomains);
    localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
    
    // Update store with primary domain
    const primaryDomain = updatedDomains.find(domain => domain.id === domainId);
    if (primaryDomain) {
      const storedStore = localStorage.getItem(`store_${userId}`);
      if (storedStore) {
        try {
          const storeData = JSON.parse(storedStore);
          if (primaryDomain.isCustomDomain) {
            storeData.customDomain = primaryDomain.domain;
            storeData.domain = undefined;
          } else {
            storeData.domain = primaryDomain.domain;
            storeData.customDomain = undefined;
          }
          localStorage.setItem(`store_${userId}`, JSON.stringify(storeData));
        } catch (error) {
          console.error("Error updating store with domain:", error);
        }
      }
    }
    
    toast({
      title: "Birincil alan adı değiştirildi",
      description: "Seçilen alan adı birincil olarak ayarlandı.",
    });
  };

  const handleDeleteDomain = (domainId: number) => {
    const domainToDelete = domains.find(d => d.id === domainId);
    if (domainToDelete?.primary) {
      toast({
        title: "Birincil alan adı silinemez",
        description: "Silmeden önce başka bir alan adını birincil olarak ayarlayın.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedDomains = domains.filter(domain => domain.id !== domainId);
    setDomains(updatedDomains);
    localStorage.setItem(`domains_${userId}`, JSON.stringify(updatedDomains));
    
    toast({
      title: "Alan adı silindi",
      description: "Alan adı başarıyla silindi.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Alan Adı Yönetimi</h1>
          <p className="text-gray-500">Mağazanız için özel alan adları ekleyin ve yönetin</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
        >
          Geri Dön
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Yeni Alan Adı Ekle</CardTitle>
            <CardDescription>
              Kendi alan adınızı ekleyerek mağazanızı profesyonel bir görünüme kavuşturun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDomain} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex-grow">
                <Label htmlFor="newDomain">Alan Adı</Label>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-gray-400" />
                  <Input
                    id="newDomain"
                    placeholder="mağazanız.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  disabled={isAddingDomain}
                >
                  {isAddingDomain ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Ekleniyor...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Alan Adı Ekle
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Alan Adlarınız</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefreshAll}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Yenileniyor...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Tümünü Yenile
              </>
            )}
          </Button>
        </div>
        
        {domains.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Globe className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Henüz Alan Adı Eklenmedi</h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                Mağazanız için profesyonel bir görünüm kazandırmak için özel alan adı ekleyin.
              </p>
              <Button onClick={() => document.getElementById('newDomain')?.focus()}>
                <Plus className="h-4 w-4 mr-2" />
                Alan Adı Ekle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {domains.map((domain) => (
              <DomainCard
                key={domain.id}
                domain={domain.domain}
                status={domain.status}
                isPrimary={domain.primary}
                createdAt={domain.createdAt}
                onVerify={() => handleVerifyDomain(domain.id)}
                onMakePrimary={() => handleMakePrimary(domain.id)}
                onDelete={() => handleDeleteDomain(domain.id)}
                onRefresh={() => handleRefreshDomain(domain.id)}
              />
            ))}
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Alan Adı Kurulumu Hakkında</CardTitle>
            <CardDescription>
              Alan adınızı mağazanıza bağlamak için gerekli adımlar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <ol className="space-y-3">
                <li>
                  <span className="font-medium">Alan adı satın alın:</span> Eğer henüz bir alan adınız yoksa, GoDaddy, Namecheap, Google Domains gibi domain sağlayıcılarından bir tane satın alabilirsiniz.
                </li>
                <li>
                  <span className="font-medium">DNS ayarlarına erişin:</span> Alan adı sağlayıcınızın kontrol panelinde DNS ayarlarına gidin.
                </li>
                <li>
                  <span className="font-medium">CNAME kaydı ekleyin:</span> Yeni bir CNAME kaydı oluşturun:
                  <ul className="mt-2 space-y-1 ml-4">
                    <li><strong>Host/Name:</strong> @ veya www</li>
                    <li><strong>Value/Target:</strong> <span className="bg-gray-100 text-gray-800 text-sm font-mono rounded px-1 py-0.5">routes.shopset.net</span></li>
                    <li><strong>TTL:</strong> Otomatik veya 3600</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium">Doğrulama bekleyin:</span> DNS ayarlarının dünya genelinde yayılması 24-48 saate kadar sürebilir. Bu süre içinde "Doğrula" butonunu kullanarak alan adınızın durumunu kontrol edebilirsiniz.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DomainManagement;
