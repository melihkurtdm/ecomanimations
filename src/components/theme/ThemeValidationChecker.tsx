
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertTriangle, InfoIcon, RefreshCcw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface ValidationResult {
  name: string;
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

interface ThemeValidationCheckerProps {
  themeId: string;
  onFixIssues?: () => void;
}

const ThemeValidationChecker: React.FC<ThemeValidationCheckerProps> = ({ 
  themeId,
  onFixIssues
}) => {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ValidationResult[]>([]);
  
  const checkTheme = async () => {
    setIsChecking(true);
    setProgress(0);
    setResults([]);
    
    // Simulate validation checking process
    try {
      // Progress bar animation
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }
      
      // Example validation results - in a real app, these would come from actual checks
      const validationResults: ValidationResult[] = [
        {
          name: 'Renk Şeması',
          status: 'success',
          message: 'Tüm tema renkleriniz doğru şekilde tanımlanmış.'
        },
        {
          name: 'Mobil Uyumluluk',
          status: 'success',
          message: 'Temanız mobil cihazlarda düzgün görüntüleniyor.'
        },
        {
          name: 'Yazı Tipleri',
          status: 'warning',
          message: 'Özel yazı tiplerinde yükleme sorunları olabilir.'
        },
        {
          name: 'Resim Boyutları',
          status: 'error',
          message: 'Bazı resimler çok büyük, sayfanın yüklenmesi yavaşlayabilir.'
        },
        {
          name: 'SEO Uyumluluğu',
          status: 'info',
          message: 'Meta açıklamaları tanımlanmış, ancak daha detaylı olabilir.'
        }
      ];
      
      setResults(validationResults);
      
      // Count issues
      const errorCount = validationResults.filter(r => r.status === 'error').length;
      const warningCount = validationResults.filter(r => r.status === 'warning').length;
      
      if (errorCount > 0 || warningCount > 0) {
        toast({
          title: `Kontrol tamamlandı: ${errorCount} hata, ${warningCount} uyarı bulundu`,
          description: "Temanızı yayınlamadan önce bu sorunları düzeltmenizi öneririz.",
          variant: "default",
        });
      } else {
        toast({
          title: "Harika! Temanız tamamen geçerli",
          description: "Temanızda herhangi bir sorun tespit edilmedi.",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Doğrulama hatası",
        description: "Tema kontrolü sırasında bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
      setProgress(100);
    }
  };
  
  const getStatusIcon = (status: ValidationResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getStatusClass = (status: ValidationResult['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'warning':
        return 'bg-amber-50 border-amber-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      case 'info':
        return 'bg-blue-50 border-blue-100';
    }
  };

  const hasIssues = results.some(r => r.status === 'error' || r.status === 'warning');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tema Doğrulama</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={checkTheme}
            disabled={isChecking}
          >
            {isChecking ? (
              <RefreshCcw className="h-4 w-4 animate-spin" />
            ) : (
              <span>Kontrol Et</span>
            )}
          </Button>
        </CardTitle>
        <CardDescription>
          Temanızı yayınlamadan önce olası sorunları kontrol edin
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isChecking && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Tema kontrol ediliyor...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
        
        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map((result, index) => (
              <div 
                key={index} 
                className={`p-3 border rounded-md ${getStatusClass(result.status)}`}
              >
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3">
                    {getStatusIcon(result.status)}
                  </div>
                  <div>
                    <h4 className="font-medium">{result.name}</h4>
                    <p className="text-sm text-gray-600">{result.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !isChecking && (
          <div className="text-center py-6 text-gray-500">
            Temanızı kontrol etmek için "Kontrol Et" butonuna tıklayın
          </div>
        )}
      </CardContent>
      
      {results.length > 0 && hasIssues && (
        <CardFooter className="flex justify-end border-t pt-4">
          <Button 
            variant="default" 
            onClick={onFixIssues}
          >
            Sorunları Otomatik Düzelt
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ThemeValidationChecker;
