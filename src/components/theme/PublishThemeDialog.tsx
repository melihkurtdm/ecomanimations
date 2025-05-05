
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Globe, RotateCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getVerifiedDomains } from '@/services/domainService';
import { simulateThemePublicationProcess, isThemePublishedToDomain } from '@/services/themeService';

interface PublishThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPublishing: boolean;
  isPublished: boolean;
  isSaved: boolean;
  onPublish: () => void;
}

const PublishThemeDialog: React.FC<PublishThemeDialogProps> = ({
  open,
  onOpenChange,
  isPublishing,
  isPublished,
  isSaved,
  onPublish
}) => {
  const { user } = useAuth();
  const [verifiedDomains, setVerifiedDomains] = useState<any[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [publishingToDomain, setPublishingToDomain] = useState(false);

  // Load verified domains when dialog opens
  useEffect(() => {
    if (open && user) {
      const domains = getVerifiedDomains(user.id);
      setVerifiedDomains(domains);
      if (domains.length > 0) {
        // Select the primary domain by default, or the first one
        const primaryDomain = domains.find(d => d.primary) || domains[0];
        setSelectedDomain(primaryDomain.domain);
      }
    }
  }, [open, user]);

  const handlePublishClick = async () => {
    if (!isSaved && !isPublished) {
      toast({
        title: "Değişiklikler kaydedilmedi",
        description: "Lütfen önce değişiklikleri kaydedin.",
        variant: "destructive",
      });
      return;
    }
    
    // First call the parent onPublish to save the theme
    onPublish();
    
    // Then publish to the selected domain if one is selected
    if (selectedDomain && user) {
      setPublishingToDomain(true);
      
      try {
        console.log(`Publishing theme to domain: ${selectedDomain}`);
        const success = await simulateThemePublicationProcess(user.id, selectedDomain);
        
        if (success) {
          toast({
            title: "Tema Yayınlandı",
            description: `Tema başarıyla ${selectedDomain} adresinde yayınlandı.`,
          });
        } else {
          toast({
            title: "Tema Yayınlama Hatası",
            description: "Tema yayınlanırken bir hata oluştu. Lütfen tekrar deneyin.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error publishing theme:", error);
        toast({
          title: "Tema Yayınlama Hatası",
          description: "Tema yayınlanırken bir hata oluştu. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
      } finally {
        setPublishingToDomain(false);
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="gap-2"
        >
          <Globe className="h-4 w-4" />
          {isPublished ? "Yayın Ayarları" : "Yayına Al"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Temayı Yayınla</DialogTitle>
          <DialogDescription>
            Bu tema mağazanızda yayınlandığında müşterileriniz tarafından görülebilir olacaktır.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Temanızı yayınlamadan önce tüm değişiklikleri kaydettiğinizden emin olun.
          </p>
          
          <div className="flex items-center space-x-2 text-sm mb-4">
            {isSaved ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Tüm değişiklikler kaydedildi</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-red-500">Kaydedilmemiş değişiklikler var</span>
              </>
            )}
          </div>
          
          {verifiedDomains.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="domain-select" className="block text-sm font-medium text-gray-700">
                  Yayınlanacak Alan Adı
                </label>
                <select
                  id="domain-select"
                  className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                >
                  {verifiedDomains.map((domain) => (
                    <option key={domain.id} value={domain.domain}>
                      {domain.isCustomDomain ? domain.domain : `${domain.domain}.shopset.net`}
                      {domain.primary ? " (Birincil)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedDomain && user && isThemePublishedToDomain(user.id, selectedDomain) && (
                <div className="flex items-center text-sm text-amber-600">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>Bu alan adında zaten yayınlanmış bir tema var. Yayınlarsanız mevcut tema güncellenecektir.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 rounded p-3 text-sm text-amber-800">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                <span>Doğrulanmış alan adınız bulunmuyor.</span>
              </div>
              <p className="mt-1 pl-6">
                Tema yayınlamak için önce <a href="/dashboard/domain-management" className="text-blue-600 underline">alan adları</a> sayfasından bir alan adı doğrulayın.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button 
            onClick={handlePublishClick} 
            disabled={isPublishing || publishingToDomain || (!isSaved && !isPublished) || !selectedDomain}
            className="gap-2"
          >
            {isPublishing || publishingToDomain ? (
              <>
                <RotateCw className="h-4 w-4 animate-spin" />
                Yayınlanıyor...
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                Yayınla
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishThemeDialog;
