import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Globe, Copy, CheckCircle, ExternalLink, Shield, AlertTriangle, X } from 'lucide-react';
import DomainCard from '@/components/domain/DomainCard';

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

// Örnek domain verileri
const domains = [
  {
    id: 1,
    domain: 'magaza1.example.com',
    status: 'verified' as 'verified',
    primary: true,
    createdAt: '2023-08-15',
    lastChecked: '2023-09-01'
  }
];

// Örnek subdomain
const subdomain = 'magaza1.storehub.app';

const DomainManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newDomain, setNewDomain] = useState('');
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [redirectMode, setRedirectMode] = useState('permanent');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState('domains');
  const [forceSSL, setForceSSL] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleAddDomain = () => {
    if (!newDomain) {
      toast({
        title: "Alan adı gerekli",
        description: "Lütfen bir alan adı girin.",
        variant: "destructive",
      });
      return;
    }

    if (!/^(?!:\/\/)([a-zA-Z0-9-_]+\.)?[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/.test(newDomain)) {
      toast({
        title: "Geçersiz alan adı",
        description: "Lütfen geçerli bir alan adı girin (örn: example.com veya sub.example.com)",
        variant: "destructive",
      });
      return;
    }

    setVerifying(true);

    // Doğrulama simülasyonu
    setTimeout(() => {
      setVerifying(false);
      toast({
        title: "Alan adı eklendi",
        description: `${newDomain} alan adı eklendi. DNS doğrulaması gerekiyor.`,
      });
      setNewDomain('');
      setIsAddingDomain(false);
    }, 2000);
  };

  const handleVerifyDomain = (domain: string) => {
    toast({
      title: "Alan adı doğrulanıyor",
      description: `${domain} alan adı doğrulanıyor...`,
    });

    // Doğrulama simülasyonu
    setTimeout(() => {
      toast({
        title: "Alan adı doğrulandı",
        description: `${domain} alan adı başarıyla doğrulandı.`,
      });
    }, 2000);
  };

  const handleMakePrimary = (domain: string) => {
    toast({
      title: "Birincil alan adı ayarlandı",
      description: `${domain} artık birincil alan adınız.`,
    });
  };

  const handleDeleteDomain = (domain: string) => {
    toast({
      title: "Alan adı silindi",
      description: `${domain} alan adı silindi.`,
    });
  };

  const handleCopyDNS = () => {
    navigator.clipboard.writeText('CNAME record pointing to routes.storehub.app');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center mb-8"
        variants={itemVariants}
      >
        <Button 
          variant="ghost" 
          className="mr-4"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri Dön
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Domain Yönetimi</h1>
          <p className="text-gray-500">Mağazanız için özel alan adlarını yönetin</p>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mb-6"
      >
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="domains">Alan Adları</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="domains" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-500" />
                  StorHub Alan Adı
                </CardTitle>
                <CardDescription>
                  Mağazanıza erişmek için varsayılan alan adı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-grow font-medium">{subdomain}</div>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(subdomain);
                        toast({
                          title: "Kopyalandı",
                          description: "Alan adı panoya kopyalandı.",
                        });
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Kopyala
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => window.open(`https://${subdomain}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ziyaret Et
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-500" />
                    Özel Alan Adları
                  </span>
                  <Button 
                    size="sm" 
                    variant={isAddingDomain ? "secondary" : "default"}
                    onClick={() => setIsAddingDomain(!isAddingDomain)}
                  >
                    {isAddingDomain ? "İptal" : "Alan Adı Ekle"}
                  </Button>
                </CardTitle>
                <CardDescription>
                  Mağazanız için özel alan adları ekleyin ve yönetin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isAddingDomain && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <h3 className="text-sm font-medium mb-3">Yeni Alan Adı Ekle</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="domain">Alan Adı</Label>
                        <div className="flex gap-2 mt-1.5">
                          <Input 
                            id="domain" 
                            placeholder="example.com" 
                            value={newDomain}
                            onChange={(e) => setNewDomain(e.target.value)}
                          />
                          <Button 
                            onClick={handleAddDomain}
                            disabled={verifying}
                          >
                            {verifying ? "Doğrulanıyor..." : "Ekle"}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5">
                          Alan adınızı ekledikten sonra DNS ayarlarını yapmanız gerekecek
                        </p>
                      </div>

                      {showAdvanced ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="redirect">Yönlendirme Türü</Label>
                            <select 
                              id="redirect"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={redirectMode}
                              onChange={(e) => setRedirectMode(e.target.value)}
                            >
                              <option value="permanent">Kalıcı Yönlendirme (301)</option>
                              <option value="temporary">Geçici Yönlendirme (302)</option>
                              <option value="none">Yönlendirme Yok</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="ssl" 
                              checked={forceSSL}
                              onCheckedChange={setForceSSL}
                            />
                            <Label htmlFor="ssl">HTTPS'yi zorunlu kıl</Label>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          variant="link" 
                          className="px-0 h-auto"
                          onClick={() => setShowAdvanced(true)}
                        >
                          Gelişmiş Ayarlar
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}

                {domains.length > 0 ? (
                  <div className="space-y-4">
                    {domains.map((domain) => (
                      <DomainCard 
                        key={domain.id}
                        domain={domain.domain}
                        status={domain.status}
                        isPrimary={domain.primary}
                        createdAt={domain.createdAt}
                        onVerify={() => handleVerifyDomain(domain.domain)}
                        onMakePrimary={() => handleMakePrimary(domain.domain)}
                        onDelete={() => handleDeleteDomain(domain.domain)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                      <Globe className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-medium">Henüz özel alan adı eklenmemiş</h3>
                    <p className="text-gray-500 mt-1 mb-4">
                      Mağazanız için özel bir alan adı eklemek için "Alan Adı Ekle" butonuna tıklayın
                    </p>
                    <Button 
                      onClick={() => setIsAddingDomain(true)}
                      variant={isAddingDomain ? "secondary" : "default"}
                    >
                      Alan Adı Ekle
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  DNS Ayarları
                </CardTitle>
                <CardDescription>
                  Alan adınızı doğrulamak için DNS kayıtlarını yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sm font-medium">CNAME Kaydı</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8"
                        onClick={handleCopyDNS}
                      >
                        {!copied ? (
                          <>
                            <Copy className="h-3.5 w-3.5 mr-1" />
                            Kopyala
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                            Kopyalandı
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-gray-100 rounded p-3 font-mono text-sm">
                      <p>CNAME <span className="text-blue-600">@</span> routes.storehub.app</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Bu DNS kaydını domain sağlayıcınızın yönetim panelinden ekleyin. Değişikliklerin yayılması 24-48 saat sürebilir.
                    </p>
                  </div>

                  <div className="flex p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800">DNS Değişikliklerinin Yayılması</h4>
                      <p className="text-xs text-amber-700 mt-1">
                        DNS değişiklikleri hemen etkili olmayabilir. Sistemler genellikle bu değişiklikleri 24-48 saat içinde işler.
                        Bu süre zarfında alan adınız doğrulama bekliyor olarak görünebilir.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Yönlendirme Ayarları</CardTitle>
                <CardDescription>
                  Farklı alan adları arasındaki yönlendirmeleri yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-domain">Birincil Alan Adı</Label>
                  <div className="flex gap-2">
                    <select 
                      id="primary-domain"
                      className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value={subdomain}>{subdomain}</option>
                      {domains.map(domain => (
                        <option key={domain.id} value={domain.domain}>{domain.domain}</option>
                      ))}
                    </select>
                    <Button variant="outline">Uygula</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Birincil alan adı, diğer tüm alan adlarının yönlendirileceği ana adrestir.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="redirect-www" defaultChecked />
                    <Label htmlFor="redirect-www">www. ile başlayan adresleri otomatik yönlendir</Label>
                  </div>
                  <p className="text-xs text-muted-foreground pl-7">
                    www.example.com adresini example.com adresine otomatik olarak yönlendir (veya tam tersi)
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="force-ssl" defaultChecked />
                    <Label htmlFor="force-ssl">HTTPS'yi zorunlu kıl</Label>
                  </div>
                  <p className="text-xs text-muted-foreground pl-7">
                    Tüm HTTP trafiğini HTTPS'ye (güvenli bağlantı) yönlendir
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Ayarları Kaydet</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>SSL Sertifikası</CardTitle>
                <CardDescription>
                  SSL sertifikası durumunu görüntüleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-4 bg-gray-50">
                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">SSL Sertifikası Aktif</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Tüm alan adlarınız için otomatik SSL sertifikaları oluşturuldu ve aktif durumda.
                      </p>
                      <div className="mt-3">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Güvenli
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sık Sorulan Sorular</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Özel alan adı nasıl eklerim?</h3>
              <p className="text-sm text-gray-600">
                "Alan Adı Ekle" butonuna tıklayarak özel alan adınızı ekleyebilirsiniz. Ardından, DNS sağlayıcınızda gerekli CNAME kaydını eklemeniz gerekir.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">DNS ayarları ne kadar sürede etkili olur?</h3>
              <p className="text-sm text-gray-600">
                DNS değişiklikleri genellikle 24-48 saat içinde yayılır. Bu süre zarfında alan adınız "Doğrulama Bekliyor" durumunda olabilir.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">SSL sertifikası otomatik olarak oluşturulur mu?</h3>
              <p className="text-sm text-gray-600">
                Evet, doğrulanan her alan adı için otomatik olarak SSL sertifikası oluşturulur ve yenilenir.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DomainManagement;
