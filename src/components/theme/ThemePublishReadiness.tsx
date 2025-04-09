
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCheck, Zap, ExternalLink, Globe, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ThemePublishReadinessProps {
  isPrepared: boolean;
  isValidated: boolean;
  isSaved: boolean;
  onPrepare: () => void;
  onValidate: () => void;
  onPublish: () => void;
}

const ThemePublishReadiness: React.FC<ThemePublishReadinessProps> = ({
  isPrepared,
  isValidated,
  isSaved,
  onPrepare,
  onValidate,
  onPublish
}) => {
  const isReady = isPrepared && isValidated && isSaved;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Yayın Hazırlığı</span>
          {isReady && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCheck className="h-3 w-3 mr-1" />
              Yayına Hazır
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Temanızı yayınlamadan önce bu adımları tamamlayın
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isSaved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                1
              </div>
              <span className="font-medium">Değişiklikleri Kaydedin</span>
            </div>
            {isSaved ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Tamamlandı
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Bekliyor
              </Badge>
            )}
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isValidated ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                2
              </div>
              <span className="font-medium">Temayı Doğrulayın</span>
            </div>
            {isValidated ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Tamamlandı
              </Badge>
            ) : (
              <Button variant="outline" size="sm" onClick={onValidate}>
                <ShieldCheck className="h-4 w-4 mr-2" />
                Doğrula
              </Button>
            )}
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isPrepared ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                3
              </div>
              <span className="font-medium">İçeriği Hazırlayın</span>
            </div>
            {isPrepared ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Tamamlandı
              </Badge>
            ) : (
              <Button variant="outline" size="sm" onClick={onPrepare}>
                <Zap className="h-4 w-4 mr-2" />
                Hazırla
              </Button>
            )}
          </div>
          
          <Separator />
          
          <div className="mt-6">
            <Button 
              className="w-full"
              disabled={!isReady}
              onClick={onPublish}
            >
              <Globe className="h-4 w-4 mr-2" />
              Temayı Yayınla
            </Button>
            
            {!isReady && (
              <p className="text-xs text-center mt-2 text-amber-600">
                Temayı yayınlamak için önce tüm adımları tamamlayın
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemePublishReadiness;
