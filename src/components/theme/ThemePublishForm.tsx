import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Globe, Archive, EyeOff, AlertTriangle, Check, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ThemePublishFormProps {
  isPublished: boolean;
  onPublish: () => void;
  onUnpublish: () => void;
  themeSettings?: any;
}

const ThemePublishForm: React.FC<ThemePublishFormProps> = ({
  isPublished,
  onPublish,
  onUnpublish,
  themeSettings
}) => {
  const [publishSettings, setPublishSettings] = useState({
    visibility: 'public',
    customDomain: '',
    useHttps: true,
    indexable: true,
    maintenance: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setPublishSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePublish = async () => {
    setIsLoading(true);
    
    try {
      const domain = window.location.hostname;
      
      // Save theme settings to Supabase if they exist
      if (themeSettings) {
        const { error } = await supabase
          .from("stores")
          .update({
            theme_settings: themeSettings
          })
          .eq("domain", domain);
          
        if (error) {
          throw error;
        }
      }
      
      // Call the onPublish callback
      onPublish();
      
      toast({
        title: "Tema başarıyla yayınlandı",
        description: publishSettings.customDomain 
          ? `Temanız ${publishSettings.customDomain} adresinde yayında.` 
          : "Temanız başarıyla yayınlandı.",
        action: (
          <div className="bg-green-500 text-white p-1 rounded-full">
            <Check className="h-4 w-4" />
          </div>
        ),
      });
    } catch (error: any) {
      console.error("Theme publishing error:", error);
      toast({
        title: "Yayınlama başarısız",
        description: "Tema yayınlanırken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpublish = () => {
    setIsLoading(true);
    
    // Yayından kaldırma işlemi simülasyonu
    setTimeout(() => {
      setIsLoading(false);
      onUnpublish();
      
      toast({
        title: "Tema yayından kaldırıldı",
        description: "Temanız artık ziyaretçilere kapalı.",
      });
    }, 1000);
  };

  const handlePreviewLink = () => {
    const domain = publishSettings.customDomain || 'tema-onizleme.lovable.app';
    
    toast({
      title: "Önizleme bağlantısı oluşturuldu",
      description: `Temanızı ${domain}/preview adresinden önizleyebilirsiniz.`,
    });
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2,
        ease: "easeInOut",
        yoyo: Infinity
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card className="border-gray-200 dark:border-gray-700 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardTitle className="flex items-center">
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mr-2"
            >
              <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Tema Yayınlama Ayarları
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {isPublished && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center">
                <motion.div 
                  variants={pulseVariants}
                  animate="pulse"
                  className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-3"
                >
                  <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                </motion.div>
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-400">Temanız yayında!</h3>
                  <p className="text-sm text-green-600 dark:text-green-500">Mağazanız şu anda ziyaretçilere açık.</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="publish-switch" className="font-medium">Tema Durumu</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Temanızı yayınlayın veya yayından kaldırın</p>
              </div>
              <Switch 
                id="publish-switch" 
                checked={isPublished}
                onCheckedChange={(checked) => checked ? handlePublish() : handleUnpublish()}
                disabled={isLoading}
              />
            </div>
            
            <Separator className="my-4" />
            
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Label className="font-medium">Görünürlük</Label>
              <Select 
                value={publishSettings.visibility} 
                onValueChange={(value) => handleSettingChange('visibility', value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Görünürlük seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Herkese Açık</SelectItem>
                  <SelectItem value="password">Şifre Korumalı</SelectItem>
                  <SelectItem value="private">Sadece Yöneticiler</SelectItem>
                </SelectContent>
              </Select>
              
              {publishSettings.visibility === 'password' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input 
                    type="password" 
                    placeholder="Mağaza şifresi belirleyin" 
                    className="mt-2"
                    disabled={isLoading}
                  />
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Label className="font-medium">Özel Alan Adı</Label>
              <Input 
                placeholder="örn: magazam.com" 
                value={publishSettings.customDomain}
                onChange={(e) => handleSettingChange('customDomain', e.target.value)}
                disabled={isLoading}
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Premium hesaplar için özel alan adı bağlama özelliği sunuyoruz.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="flex items-center justify-between space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div>
                  <Label htmlFor="https-switch" className="font-medium">HTTPS Kullan</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Güvenli bağlantı</p>
                </div>
                <Switch 
                  id="https-switch" 
                  checked={publishSettings.useHttps}
                  onCheckedChange={(checked) => handleSettingChange('useHttps', checked)}
                  disabled={isLoading}
                />
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div>
                  <Label htmlFor="indexable-switch" className="font-medium">Arama Motorlarında İndekslenebilir</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Google, Yandex vb.</p>
                </div>
                <Switch 
                  id="indexable-switch" 
                  checked={publishSettings.indexable}
                  onCheckedChange={(checked) => handleSettingChange('indexable', checked)}
                  disabled={isLoading}
                />
              </motion.div>
            </div>
            
            <motion.div 
              className="flex items-center justify-between pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <Label htmlFor="maintenance-switch" className="font-medium">Bakım Modu</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sadece yöneticiler erişebilir</p>
              </div>
              <Switch 
                id="maintenance-switch" 
                checked={publishSettings.maintenance}
                onCheckedChange={(checked) => handleSettingChange('maintenance', checked)}
                disabled={isLoading}
              />
            </motion.div>
            
            {publishSettings.maintenance && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-800">
                  <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <AlertDescription>
                    Bakım modu aktif olduğunda ziyaretçiler mağazanıza erişemez.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <motion.div
              className="flex-1"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Button 
                variant={isPublished ? "outline" : "default"} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md dark:shadow-purple-500/20"
                onClick={isPublished ? handleUnpublish : handlePublish}
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isPublished ? "Yayından Kaldırılıyor..." : "Yayınlanıyor..."}
                  </>
                ) : isPublished ? (
                  <>
                    <Archive className="mr-2 h-4 w-4" />
                    Yayından Kaldır
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                    </motion.div>
                    Yayınla
                  </>
                )}
              </Button>
            </motion.div>
            
            <motion.div
              className="flex-1"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Button 
                variant="outline" 
                className="w-full transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={handlePreviewLink}
                disabled={isLoading}
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <EyeOff className="mr-2 h-4 w-4" />
                </motion.div>
                Önizleme Bağlantısı Oluştur
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-3 w-3 text-purple-500" />
              <span>Yayınlanan siteler otomatik olarak koyu tema ile başlar</span>
              <Sparkles className="h-3 w-3 text-purple-500" />
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ThemePublishForm;
