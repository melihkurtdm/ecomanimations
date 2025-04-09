
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Brain, TrendingUp, Users, Target, BarChart4, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface AdAiOptimizationProps {
  onEnableAiOptimization: (enabled: boolean) => void;
  creatives: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    preview?: string;
  }>;
}

const AdAiOptimization: React.FC<AdAiOptimizationProps> = ({ 
  onEnableAiOptimization,
  creatives 
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedTab, setSelectedTab] = useState('optimization');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  
  // Random performance improvement predictions
  const expectedImprovements = {
    ctr: Math.floor(Math.random() * 20) + 15, // 15-35%
    conversions: Math.floor(Math.random() * 25) + 20, // 20-45%
    roi: Math.floor(Math.random() * 30) + 25, // 25-55%
  };
  
  // Mock audience insights
  const audienceInsights = [
    { 
      segment: 'Teknoloji Meraklıları', 
      creativeType: 'image', 
      performance: 'yüksek',
      improvement: '+32%',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    { 
      segment: 'Genç Profesyoneller', 
      creativeType: 'video', 
      performance: 'yüksek',
      improvement: '+28%',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    { 
      segment: 'Öğrenciler', 
      creativeType: 'carousel', 
      performance: 'orta',
      improvement: '+17%',
      color: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    { 
      segment: 'Ebeveynler', 
      creativeType: 'image', 
      performance: 'düşük',
      improvement: '+12%',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    }
  ];
  
  const handleEnableChange = (checked: boolean) => {
    setIsEnabled(checked);
    onEnableAiOptimization(checked);
    
    if (checked) {
      // Simulate analysis process
      setIsAnalyzing(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setShowPreview(true);
            
            toast({
              title: "AI Analizi Tamamlandı",
              description: "Kampanyanız için optimizasyon önerileri hazır.",
            });
            
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    } else {
      setShowPreview(false);
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-purple-100">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-base">AI Optimizasyonu</CardTitle>
              <CardDescription>
                Yapay zeka ile reklam performansını otomatik optimize edin
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enable-ai"
                checked={isEnabled}
                onCheckedChange={handleEnableChange}
              />
              <Label htmlFor="enable-ai" className="font-medium">
                {isEnabled ? "Aktif" : "Pasif"}
              </Label>
            </div>
            
            {isEnabled && (
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                <Brain className="h-3.5 w-3.5 mr-1" />
                AI Destekli
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isAnalyzing ? (
          <div className="space-y-4 py-6">
            <div className="text-center">
              <h3 className="font-medium mb-2">Kampanya Analiz Ediliyor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AI modelimiz performans tahminleri ve optimizasyon önerileri oluşturuyor...
              </p>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Veriler analiz ediliyor</span>
              <span>{progress}%</span>
            </div>
          </div>
        ) : (
          <>
            {!isEnabled ? (
              <div className="space-y-4 py-6">
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    AI optimizasyonu etkinleştirerek, reklam performansınızı otomatik olarak iyileştirebilirsiniz.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <Card className="bg-gray-50 border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Target className="h-8 w-8 text-purple-500 mb-2" />
                        <h3 className="font-medium">Doğru Kitleyi Hedefleyin</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Her yaratıcı içerik için en uygun hedef kitleyi belirler
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-50 border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <BarChart4 className="h-8 w-8 text-green-500 mb-2" />
                        <h3 className="font-medium">Performansı Analiz Edin</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Hangi reklamların daha iyi performans gösterdiğini analiz eder
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-50 border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <TrendingUp className="h-8 w-8 text-blue-500 mb-2" />
                        <h3 className="font-medium">Otomatik İyileştirin</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Bütçeyi performansı yüksek içeriklere yönlendirir
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : showPreview && (
              <div className="space-y-4 mt-2">
                <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="optimization">Optimizasyon</TabsTrigger>
                    <TabsTrigger value="insights">İzleyici İçgörüleri</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="optimization" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-green-50 border-green-100 shadow-none">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-green-800">Tıklama Oranı (CTR)</h3>
                            <Badge className="bg-green-200 text-green-800 border-0">
                              +{expectedImprovements.ctr}%
                            </Badge>
                          </div>
                          <p className="text-sm text-green-700 mt-1">
                            Daha hedefli gösterimi ile daha yüksek tıklama oranı
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-blue-50 border-blue-100 shadow-none">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-blue-800">Dönüşümler</h3>
                            <Badge className="bg-blue-200 text-blue-800 border-0">
                              +{expectedImprovements.conversions}%
                            </Badge>
                          </div>
                          <p className="text-sm text-blue-700 mt-1">
                            Daha ilgili kitlelere gösterim ile daha yüksek dönüşüm
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-purple-50 border-purple-100 shadow-none">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-purple-800">Yatırım Getirisi (ROI)</h3>
                            <Badge className="bg-purple-200 text-purple-800 border-0">
                              +{expectedImprovements.roi}%
                            </Badge>
                          </div>
                          <p className="text-sm text-purple-700 mt-1">
                            Daha verimli bütçe kullanımı ile daha yüksek ROI
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Alert variant="default" className="bg-amber-50 border-amber-200">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800">
                        Optimizasyon, kampanya başladıktan sonra gerçek performans verilerine göre sürekli güncellenecektir.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-3 mt-4">
                      <h3 className="font-medium">Kreatif Tahsisleri</h3>
                      <p className="text-sm text-muted-foreground">
                        Yapay zeka, her bir kreatifi hangi kitlelere göstereceğini otomatik olarak belirleyecek
                      </p>
                      
                      <div className="space-y-4 mt-2">
                        {creatives.map((creative, index) => (
                          <div key={creative.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm">{creative.title || `Kreatif ${index + 1}`}</h4>
                              <Badge variant="outline">
                                {creative.type === 'image' ? 'Görsel' : 'Video'}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              {[
                                { audience: 'Teknoloji Meraklıları', allocation: 45 },
                                { audience: 'Genç Profesyoneller', allocation: 35 },
                                { audience: index > 0 ? 'Ebeveynler' : 'Öğrenciler', allocation: 20 }
                              ].map((segment, i) => (
                                <div key={i} className="flex items-center justify-between text-xs bg-gray-50 px-2 py-1.5 rounded">
                                  <span>{segment.audience}</span>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className="font-medium">{segment.allocation}%</span>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Bütçe tahsisi</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="insights" className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <h3 className="font-medium">Kitle İçgörüleri</h3>
                      <p className="text-sm text-muted-foreground">
                        Farklı kitleler için en iyi performans gösteren kreatif türleri
                      </p>
                      
                      <div className="space-y-3 mt-2">
                        {audienceInsights.map((insight, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border rounded-lg p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 text-purple-500 mr-2" />
                                  <h4 className="font-medium">{insight.segment}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  <span className="font-medium">En iyi kreatif türü:</span> {insight.creativeType}
                                </p>
                              </div>
                              
                              <Badge className={insight.color}>
                                {insight.improvement} performans
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <Alert variant="default" className="bg-blue-50 border-blue-200">
                      <Info className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        Bu içgörüler, benzer kampanyalardan elde edilen veriler ve AI tahminlerine dayanmaktadır.
                        Kampanyanız başladıktan sonra gerçek verilerle güncellenecektir.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      {isEnabled && !isAnalyzing && (
        <CardFooter className="flex justify-between border-t pt-4 px-6">
          <p className="text-xs text-muted-foreground">
            AI optimizasyonu aktif. Sistem, kampanyanızı otomatik olarak optimize edecek.
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsEnabled(false);
              onEnableAiOptimization(false);
              setShowPreview(false);
              
              toast({
                title: "AI Optimizasyonu Devre Dışı",
                description: "AI destekli optimizasyon kapatıldı.",
              });
            }}
          >
            Devre Dışı Bırak
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AdAiOptimization;
