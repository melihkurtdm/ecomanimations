
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Globe, CircleDollarSign, BarChart3, Zap, Info } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AdPlatformSelector from '@/components/advertising/AdPlatformSelector';
import AdApiConnection from '@/components/advertising/AdApiConnection';
import AdBudgetForm from '@/components/advertising/AdBudgetForm';
import AdCreativeUploader from '@/components/advertising/AdCreativeUploader';
import AdCampaignList from '@/components/advertising/AdCampaignList';
import AdAiOptimization from '@/components/advertising/AdAiOptimization';
import { publishAdCampaign, updateApiConnectionStatus } from '@/services/adPlatformService';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1
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

// Reklam yönetimi sayfası
const AdvertisingManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('create');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['google']);
  const [allConnectionsEstablished, setAllConnectionsEstablished] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');
  const [budget, setBudget] = useState({
    daily: 100,
    total: 1000,
    currency: 'TRY',
    duration: 10,
    automaticBidding: true,
  });
  const [creatives, setCreatives] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [useAiOptimization, setUseAiOptimization] = useState(false);

  // Oturum kontrolü
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // API bağlantı durumu değiştiğinde
  const handleConnectionStatusChange = (isConnected: boolean) => {
    setAllConnectionsEstablished(isConnected);
  };

  // Platform seçimi değiştiğinde
  const handlePlatformSelection = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
  };

  // Bütçe değiştiğinde
  const handleBudgetChange = (newBudget: any) => {
    setBudget(newBudget);
  };

  // Kreatifler değiştiğinde
  const handleCreativesChange = (newCreatives: any) => {
    setCreatives(newCreatives);
  };

  // AI Optimizasyonu değiştiğinde
  const handleAiOptimizationChange = (enabled: boolean) => {
    setUseAiOptimization(enabled);
  };

  // Form doğrulama
  const validateForm = () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: "Platform seçimi gerekli",
        description: "En az bir reklam platformu seçmelisiniz.",
        variant: "destructive",
      });
      return false;
    }

    if (!allConnectionsEstablished) {
      toast({
        title: "API bağlantısı gerekli",
        description: "Devam etmek için tüm seçili platformlara bağlanmalısınız.",
        variant: "destructive",
      });
      return false;
    }

    if (!targetUrl) {
      toast({
        title: "Hedef URL gerekli",
        description: "Reklamın yönlendirileceği bir URL girmelisiniz.",
        variant: "destructive",
      });
      return false;
    }

    if (!budget.daily || !budget.total) {
      toast({
        title: "Bütçe bilgileri gerekli",
        description: "Günlük ve toplam bütçe bilgilerini girmelisiniz.",
        variant: "destructive",
      });
      return false;
    }

    if (!creatives || creatives.length === 0) {
      toast({
        title: "Reklam görseli gerekli",
        description: "En az bir reklam görseli veya videosu yüklemelisiniz.",
        variant: "destructive",
      });
      return false;
    }

    // Yüklenmiş kreatif kontrolü
    const hasUploadedCreative = creatives.some((creative: any) => creative.file || creative.preview);
    if (!hasUploadedCreative) {
      toast({
        title: "Reklam görseli gerekli",
        description: "En az bir reklam görseli veya videosu yüklemelisiniz.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // Kampanya yayınlama
  const handlePublishCampaign = async () => {
    if (!validateForm()) return;

    setIsPublishing(true);

    try {
      // Test için reklam hesaplarına bağlantı simüle edilmesi
      selectedPlatforms.forEach(platform => {
        updateApiConnectionStatus(platform, true);
      });

      // Reklam kampanyası yayınlama
      const campaignData = {
        platforms: selectedPlatforms,
        budget,
        creatives,
        targetUrl,
        useAiOptimization
      };

      const response = await publishAdCampaign(campaignData);

      toast({
        title: "Kampanya yayınlandı",
        description: "Reklam kampanyanız başarıyla yayınlandı ve inceleniyor.",
      });

      // Başarıyla yayınlandı, kampanya listesi sekmesine geçiş
      setActiveTab('campaigns');
    } catch (error: any) {
      toast({
        title: "Kampanya yayınlanamadı",
        description: error.message || "Bir hata oluştu, lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
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
          <h1 className="text-2xl font-bold">Reklam Yönetimi</h1>
          <p className="text-gray-500">Reklam kampanyalarınızı yönetin ve performans takibi yapın</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="create">Kampanya Oluştur</TabsTrigger>
            <TabsTrigger value="campaigns">Kampanyalarım</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-500" />
                  Reklam Platformları
                </CardTitle>
                <CardDescription>
                  Kampanyanızı yayınlamak istediğiniz platformları seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <AdPlatformSelector onSelectionChange={handlePlatformSelection} />
                
                <Separator />
                
                <AdApiConnection 
                  selectedPlatforms={selectedPlatforms}
                  onConnectionStatusChange={handleConnectionStatusChange}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CircleDollarSign className="h-5 w-5 mr-2 text-green-500" />
                  Kampanya Detayları ve Bütçe
                </CardTitle>
                <CardDescription>
                  Kampanya hedefini ve bütçe bilgilerini belirleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="target-url">Hedef URL</Label>
                  <div className="mt-1.5">
                    <Input 
                      id="target-url" 
                      placeholder="https://www.example.com" 
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Reklamınıza tıklayan kullanıcıların yönlendirileceği sayfa
                  </p>
                </div>
                
                <Separator />
                
                <AdBudgetForm onBudgetChange={handleBudgetChange} />
              </CardContent>
            </Card>

            <AdAiOptimization 
              onEnableAiOptimization={handleAiOptimizationChange}
              creatives={creatives}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-orange-500" />
                  Reklam Görselleri
                </CardTitle>
                <CardDescription>
                  Kampanyanız için görsel ve metin içeriklerini yükleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdCreativeUploader onCreativesChange={handleCreativesChange} />
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Alert className="bg-blue-50 border-blue-200 flex-1 mr-4 py-2">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Reklam kampanyanız incelendikten sonra onay alırsa yayınlanacaktır.
                </AlertDescription>
              </Alert>
              
              <Button 
                size="lg"
                onClick={handlePublishCampaign}
                disabled={isPublishing || !allConnectionsEstablished}
                className="min-w-[150px]"
              >
                {isPublishing ? "Yayınlanıyor..." : "Reklamı Yayınla"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  Kampanyalarım
                </CardTitle>
                <CardDescription>
                  Aktif ve geçmiş reklam kampanyalarınızı görüntüleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdCampaignList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AdvertisingManager;
