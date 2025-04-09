
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AdBudgetForm from '@/components/advertising/AdBudgetForm';
import AdCreativeUploader from '@/components/advertising/AdCreativeUploader';
import AdCampaignList from '@/components/advertising/AdCampaignList';
import AdPlatformSelector from '@/components/advertising/AdPlatformSelector';
import AdApiConnection from '@/components/advertising/AdApiConnection';
import { MegaphoneIcon, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { publishAdCampaign } from '@/services/adPlatformService';

const AdvertisingManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('campaigns');
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishingAd, setPublishingAd] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  
  // State for campaign setup
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['google']);
  const [dailyBudget, setDailyBudget] = useState<number>(50);
  const [campaignSettings, setCampaignSettings] = useState({
    duration: '30',
    currency: 'TRY',
    automaticBidding: true
  });
  const [apiConnectionValid, setApiConnectionValid] = useState(false);
  const [creatives, setCreatives] = useState<any[]>([]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handlePlatformsChange = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
  };
  
  const handleBudgetChange = (budget: number) => {
    setDailyBudget(budget);
  };
  
  const handleCampaignSettingsChange = (settings: any) => {
    setCampaignSettings(settings);
  };
  
  const handleCreativesChange = (newCreatives: any[]) => {
    setCreatives(newCreatives);
  };
  
  const handleConnectionStatusChange = (isConnected: boolean) => {
    setApiConnectionValid(isConnected);
  };
  
  const handleCreateTestCampaign = () => {
    toast({
      title: "Test kampanya oluşturuldu",
      description: "Kampanyanız test modunda oluşturuldu. Gerçek reklam yayınlanmayacak.",
    });
  };

  const handlePublishAd = async () => {
    setPublishingAd(true);
    
    try {
      const campaignData = {
        platforms: selectedPlatforms,
        budget: {
          daily: dailyBudget,
          total: dailyBudget * parseInt(campaignSettings.duration),
          currency: campaignSettings.currency,
          duration: parseInt(campaignSettings.duration),
          automaticBidding: campaignSettings.automaticBidding
        },
        creatives: creatives,
        targetUrl: 'https://your-store-url.com'
      };
      
      const response = await publishAdCampaign(campaignData);
      
      console.log("Campaign published:", response);
      
      setPublishSuccess(true);
      setTimeout(() => {
        setPublishDialogOpen(false);
        setPublishSuccess(false);
        setActiveTab('campaigns');
        
        toast({
          title: "Reklam kampanyanız oluşturuldu",
          description: "Kampanyanız inceleme aşamasında ve yakında yayına alınacak.",
        });
      }, 2000);
    } catch (error) {
      console.error("Error publishing campaign:", error);
      toast({
        title: "Hata",
        description: "Reklam yayınlanırken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setPublishingAd(false);
    }
  };

  if (!user) return null;

  const canPublish = selectedPlatforms.length > 0 && apiConnectionValid && creatives.some(c => c.file);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <MegaphoneIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Reklam Yöneticisi</h1>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Reklam sistemlerini bilmenize gerek kalmadan, Google ve Meta platformlarında kolayca reklam oluşturun ve yönetin.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="campaigns">Kampanyalarım</TabsTrigger>
          <TabsTrigger value="create">Yeni Kampanya</TabsTrigger>
          <TabsTrigger value="reports">Raporlar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktif Kampanyalar</CardTitle>
              <CardDescription>
                Tüm platformlardaki aktif reklam kampanyalarınızı buradan yönetebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdCampaignList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reklam Platformu Seçin</CardTitle>
              <CardDescription>
                Reklamınızın yayınlanacağı platformları seçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdPlatformSelector onSelectionChange={handlePlatformsChange} />
            </CardContent>
          </Card>
          
          {selectedPlatforms.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>API Bağlantısı</CardTitle>
                <CardDescription>
                  Reklam platformları ile bağlantı kurun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdApiConnection 
                  selectedPlatforms={selectedPlatforms}
                  onConnectionStatusChange={handleConnectionStatusChange}
                />
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Reklam Bütçesi</CardTitle>
              <CardDescription>
                Günlük ve toplam kampanya bütçenizi belirleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdBudgetForm 
                onBudgetChange={handleBudgetChange}
                onSettingsChange={handleCampaignSettingsChange}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reklam Görselleri</CardTitle>
              <CardDescription>
                Reklamınızda kullanılacak görselleri yükleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdCreativeUploader onCreativesChange={handleCreativesChange} />
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Kaydet</Button>
              <Button onClick={handleCreateTestCampaign}>Test Kampanya Oluştur</Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
                onClick={() => setPublishDialogOpen(true)}
                disabled={!canPublish}
              >
                Reklamı Yayınla
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reklam Performansı</CardTitle>
              <CardDescription>
                Kampanyalarınızın performans istatistiklerini görüntüleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-12 text-center border border-dashed rounded-lg">
                <p className="text-muted-foreground">Henüz aktif kampanya bulunmuyor</p>
                <Button variant="outline" className="mt-4" onClick={() => setActiveTab('create')}>
                  İlk Kampanyanızı Oluşturun
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {publishSuccess ? "Kampanya Yayınlandı!" : "Reklam Kampanyası Yayınla"}
            </DialogTitle>
            <DialogDescription>
              {publishSuccess 
                ? "Reklam kampanyanız başarıyla oluşturuldu ve incelemeye gönderildi." 
                : "Kampanyanızı yayınlamak üzeresiniz. Bu işlem gerçek reklam harcaması oluşturacaktır."}
            </DialogDescription>
          </DialogHeader>
          
          {publishSuccess ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-muted-foreground">
                Kampanyanız yakında yayınlanacak ve reklam gösterimlerine başlayacaktır.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center p-2 border rounded-md bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                  <p className="text-sm text-amber-800">
                    Bu işlem gerçek para harcayacaktır. Toplam kampanya bütçesi: 
                    <span className="font-bold ml-1">
                      {dailyBudget * parseInt(campaignSettings.duration)} {campaignSettings.currency}
                    </span>
                  </p>
                </div>
                
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium mb-2">Kampanya Özeti</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Platformlar:</span>
                      <span>{selectedPlatforms.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Günlük Bütçe:</span>
                      <span>{dailyBudget} {campaignSettings.currency}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Süre:</span>
                      <span>{campaignSettings.duration} gün</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Görseller:</span>
                      <span>{creatives.filter(c => c.file).length} adet</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setPublishDialogOpen(false)}>
                  İptal
                </Button>
                <Button 
                  onClick={handlePublishAd}
                  disabled={publishingAd}
                >
                  {publishingAd ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      İşleniyor...
                    </>
                  ) : (
                    "Onaylıyorum, Yayınla"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdvertisingManager;
