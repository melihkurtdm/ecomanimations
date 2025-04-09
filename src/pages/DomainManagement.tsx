
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  PlusCircle, 
  Globe, 
  RefreshCw, 
  AlertTriangle, 
  Info, 
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import DomainCard, { DomainItem } from '@/components/domain/DomainCard';

// Mock data for domains
const mockDomains: DomainItem[] = [
  {
    id: '1',
    name: 'mystore.com',
    status: 'active',
    type: 'primary',
    ssl: true,
    createdAt: '2023-05-15'
  },
  {
    id: '2',
    name: 'store.example.org',
    status: 'pending',
    type: 'secondary',
    ssl: false,
    createdAt: '2023-06-20'
  },
  {
    id: '3',
    name: 'old-store.net',
    status: 'error',
    type: 'redirect',
    ssl: false,
    createdAt: '2023-04-10',
    errorMessage: 'DNS kayıtları doğrulanamadı. A kaydının doğru yapılandırıldığından emin olun.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const DomainManagement = () => {
  const navigate = useNavigate();
  const [domains] = useState<DomainItem[]>(mockDomains);
  const [activeDomains, setActiveDomains] = useState<DomainItem[]>(
    domains.filter(domain => domain.status === 'active')
  );
  const [pendingDomains, setPendingDomains] = useState<DomainItem[]>(
    domains.filter(domain => domain.status === 'pending')
  );
  const [errorDomains, setErrorDomains] = useState<DomainItem[]>(
    domains.filter(domain => domain.status === 'error')
  );
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);
  const [newDomainName, setNewDomainName] = useState('');
  const [newDomainType, setNewDomainType] = useState<'primary' | 'secondary' | 'redirect'>('secondary');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDomain = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newDomain: DomainItem = {
        id: `domain-${Date.now()}`,
        name: newDomainName,
        status: 'pending',
        type: newDomainType,
        ssl: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setPendingDomains([...pendingDomains, newDomain]);
      setIsAddDomainOpen(false);
      setNewDomainName('');
      setNewDomainType('secondary');
      setIsLoading(false);
      
      toast({
        title: "Domain eklendi",
        description: "Domain başarıyla eklendi ve doğrulama aşamasında.",
      });
    }, 1500);
  };

  const handleDeleteDomain = (domainId: string) => {
    // Simulated deletion logic
    setActiveDomains(activeDomains.filter(domain => domain.id !== domainId));
    setPendingDomains(pendingDomains.filter(domain => domain.id !== domainId));
    setErrorDomains(errorDomains.filter(domain => domain.id !== domainId));
    
    toast({
      title: "Domain silindi",
      description: "Domain başarıyla silindi.",
    });
  };

  const handleEditDomain = (domainId: string) => {
    // This would open an edit dialog in a real implementation
    toast({
      title: "Domain düzenleme",
      description: "Domain düzenleme özelliği henüz uygulanmadı.",
    });
  };

  const handleVerifyDomain = (domainId: string) => {
    // Simulated verification logic
    toast({
      title: "Doğrulama başlatıldı",
      description: "Domain doğrulama işlemi başlatıldı. Bu işlem birkaç dakika sürebilir.",
    });
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold"
          >
            Domain Yönetimi
          </motion.h1>
          <motion.p 
            variants={itemVariants} 
            className="text-gray-600 mt-2"
          >
            Mağazanız için özel domain adreslerini yönetin
          </motion.p>
        </div>
        <motion.div variants={itemVariants}>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="group"
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Dashboard'a Dön
          </Button>
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants} className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-500" />
              Domain Ayarları
            </CardTitle>
            <CardDescription>
              Mağazanız için özel domain adreslerini ekleyin ve yönetin. Özel domainler sayesinde profesyonel bir görünüm kazanın.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
              <div className="flex">
                <Info className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-700">Özel Domain Kullanımı</h3>
                  <p className="text-sm text-blue-600 mt-1">
                    Özel domain kullanarak markanızı güçlendirebilir ve müşterilerinize daha profesyonel bir deneyim sunabilirsiniz.
                  </p>
                  <div className="mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white text-blue-600 border-blue-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Domain Ayarları Rehberi
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Kayıtlı Domainler</h2>
              <Dialog open={isAddDomainOpen} onOpenChange={setIsAddDomainOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Yeni Domain Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Domain Ekle</DialogTitle>
                    <DialogDescription>
                      Mağazanız için yeni bir domain adresi ekleyin. Eklenen domain, DNS ayarları yapılandırıldıktan sonra aktif olacaktır.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain">Domain Adı</Label>
                      <Input 
                        id="domain" 
                        placeholder="ornek.com" 
                        value={newDomainName}
                        onChange={(e) => setNewDomainName(e.target.value)}
                      />
                      <p className="text-xs text-gray-500">Tam domain adını girin (örn: mystore.com)</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Domain Tipi</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          type="button" 
                          variant={newDomainType === "primary" ? "default" : "outline"} 
                          onClick={() => setNewDomainType("primary")}
                          className="justify-start"
                        >
                          Ana
                        </Button>
                        <Button 
                          type="button" 
                          variant={newDomainType === "secondary" ? "default" : "outline"}
                          onClick={() => setNewDomainType("secondary")}
                          className="justify-start"
                        >
                          İkincil
                        </Button>
                        <Button 
                          type="button" 
                          variant={newDomainType === "redirect" ? "default" : "outline"}
                          onClick={() => setNewDomainType("redirect")}
                          className="justify-start"
                        >
                          Yönlendirme
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddDomainOpen(false)}
                    >
                      İptal
                    </Button>
                    <Button 
                      onClick={handleAddDomain} 
                      disabled={!newDomainName || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Ekleniyor...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Domain Ekle
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">
                  Tümü ({domains.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Aktif ({activeDomains.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Beklemede ({pendingDomains.length})
                </TabsTrigger>
                <TabsTrigger value="error">
                  Hata ({errorDomains.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {domains.length > 0 ? (
                    domains.map(domain => (
                      <DomainCard 
                        key={domain.id} 
                        domain={domain} 
                        onEdit={handleEditDomain}
                        onDelete={handleDeleteDomain}
                        onVerify={domain.status === 'pending' ? handleVerifyDomain : undefined}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <Globe className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <h3 className="text-lg font-medium text-gray-600 mb-1">Henüz domain eklenmemiş</h3>
                      <p className="text-gray-500 mb-4">Mağazanız için özel bir domain ekleyerek profesyonel bir görünüm kazanın</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="active">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeDomains.length > 0 ? (
                    activeDomains.map(domain => (
                      <DomainCard 
                        key={domain.id} 
                        domain={domain} 
                        onEdit={handleEditDomain}
                        onDelete={handleDeleteDomain}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <AlertTriangle className="h-12 w-12 mx-auto text-yellow-400 mb-2" />
                      <h3 className="text-lg font-medium text-gray-600 mb-1">Aktif domain bulunamadı</h3>
                      <p className="text-gray-500">Henüz aktif bir domaininiz bulunmuyor</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="pending">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingDomains.length > 0 ? (
                    pendingDomains.map(domain => (
                      <DomainCard 
                        key={domain.id} 
                        domain={domain} 
                        onEdit={handleEditDomain}
                        onDelete={handleDeleteDomain}
                        onVerify={handleVerifyDomain}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <CheckCircle className="h-12 w-12 mx-auto text-green-400 mb-2" />
                      <h3 className="text-lg font-medium text-gray-600 mb-1">Bekleyen domain yok</h3>
                      <p className="text-gray-500">Şu anda bekleyen domain bulunmuyor</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="error">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {errorDomains.length > 0 ? (
                    errorDomains.map(domain => (
                      <DomainCard 
                        key={domain.id} 
                        domain={domain} 
                        onEdit={handleEditDomain}
                        onDelete={handleDeleteDomain}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <CheckCircle className="h-12 w-12 mx-auto text-green-400 mb-2" />
                      <h3 className="text-lg font-medium text-gray-600 mb-1">Hatalı domain yok</h3>
                      <p className="text-gray-500">Şu anda hatalı domain bulunmuyor</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DomainManagement;
