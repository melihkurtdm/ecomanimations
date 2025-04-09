
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AdBudgetForm from '@/components/advertising/AdBudgetForm';
import AdCreativeUploader from '@/components/advertising/AdCreativeUploader';
import AdCampaignList from '@/components/advertising/AdCampaignList';
import AdPlatformSelector from '@/components/advertising/AdPlatformSelector';
import { MegaphoneIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AdvertisingManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('campaigns');

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleCreateTestCampaign = () => {
    toast({
      title: "Test kampanya oluşturuldu",
      description: "Kampanyanız test modunda oluşturuldu. Gerçek reklam yayınlanmayacak.",
    });
  };

  if (!user) return null;

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
              <AdPlatformSelector />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reklam Bütçesi</CardTitle>
              <CardDescription>
                Günlük ve toplam kampanya bütçenizi belirleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdBudgetForm />
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
              <AdCreativeUploader />
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Kaydet</Button>
              <Button onClick={handleCreateTestCampaign}>Test Kampanya Oluştur</Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
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
    </div>
  );
};

export default AdvertisingManager;
