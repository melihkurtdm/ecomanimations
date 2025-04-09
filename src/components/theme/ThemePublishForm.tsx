
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
import { Globe, Archive, EyeOff, AlertTriangle } from 'lucide-react';

interface ThemePublishFormProps {
  isPublished: boolean;
  onPublish: () => void;
  onUnpublish: () => void;
}

const ThemePublishForm: React.FC<ThemePublishFormProps> = ({
  isPublished,
  onPublish,
  onUnpublish
}) => {
  const [publishSettings, setPublishSettings] = useState({
    visibility: 'public',
    customDomain: '',
    useHttps: true,
    indexable: true,
    maintenance: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setPublishSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          Tema Yayınlama Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isPublished && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 p-4 rounded-md border border-green-200"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Globe className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">Temanız yayında!</h3>
                <p className="text-sm text-green-600">Mağazanız şu anda ziyaretçilere açık.</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="publish-switch" className="font-medium">Tema Durumu</Label>
              <p className="text-sm text-gray-500">Temanızı yayınlayın veya yayından kaldırın</p>
            </div>
            <Switch 
              id="publish-switch" 
              checked={isPublished}
              onCheckedChange={(checked) => checked ? onPublish() : onUnpublish()}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label className="font-medium">Görünürlük</Label>
            <Select 
              value={publishSettings.visibility} 
              onValueChange={(value) => handleSettingChange('visibility', value)}
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
              <Input 
                type="password" 
                placeholder="Mağaza şifresi belirleyin" 
                className="mt-2"
              />
            )}
          </div>
          
          <div className="space-y-2">
            <Label className="font-medium">Özel Alan Adı</Label>
            <Input 
              placeholder="örn: magazam.com" 
              value={publishSettings.customDomain}
              onChange={(e) => handleSettingChange('customDomain', e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Premium hesaplar için özel alan adı bağlama özelliği sunuyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="https-switch" className="font-medium">HTTPS Kullan</Label>
                <p className="text-xs text-gray-500">Güvenli bağlantı</p>
              </div>
              <Switch 
                id="https-switch" 
                checked={publishSettings.useHttps}
                onCheckedChange={(checked) => handleSettingChange('useHttps', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="indexable-switch" className="font-medium">Arama Motorlarında İndekslenebilir</Label>
                <p className="text-xs text-gray-500">Google, Yandex vb.</p>
              </div>
              <Switch 
                id="indexable-switch" 
                checked={publishSettings.indexable}
                onCheckedChange={(checked) => handleSettingChange('indexable', checked)}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div>
              <Label htmlFor="maintenance-switch" className="font-medium">Bakım Modu</Label>
              <p className="text-xs text-gray-500">Sadece yöneticiler erişebilir</p>
            </div>
            <Switch 
              id="maintenance-switch" 
              checked={publishSettings.maintenance}
              onCheckedChange={(checked) => handleSettingChange('maintenance', checked)}
            />
          </div>
          
          {publishSettings.maintenance && (
            <Alert variant="destructive" className="bg-orange-50 text-orange-800 border-orange-200">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription>
                Bakım modu aktif olduğunda ziyaretçiler mağazanıza erişemez.
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            variant={isPublished ? "outline" : "default"} 
            className="flex-1"
            onClick={isPublished ? onUnpublish : onPublish}
          >
            {isPublished ? (
              <>
                <Archive className="mr-2 h-4 w-4" />
                Yayından Kaldır
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Yayınla
              </>
            )}
          </Button>
          
          <Button variant="outline" className="flex-1">
            <EyeOff className="mr-2 h-4 w-4" />
            Önizleme Bağlantısı Oluştur
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemePublishForm;
