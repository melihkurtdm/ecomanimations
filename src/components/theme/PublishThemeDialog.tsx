
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Globe, RotateCw, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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
  const handleClick = () => {
    if (!isSaved && !isPublished) {
      toast({
        title: "Değişiklikler kaydedilmedi",
        description: "Lütfen önce değişiklikleri kaydedin.",
        variant: "destructive",
      });
      return;
    }
    
    onPublish();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="gap-2"
          disabled={!isSaved || isPublished}
          onClick={(e) => {
            if (!isSaved && !isPublished) {
              e.preventDefault();
              toast({
                title: "Değişiklikler kaydedilmedi",
                description: "Lütfen önce değişiklikleri kaydedin.",
                variant: "destructive",
              });
            }
          }}
        >
          <Globe className="h-4 w-4" />
          {isPublished ? "Yayında" : "Yayına Al"}
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
          
          <div className="flex items-center space-x-2 text-sm">
            {isSaved ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Tüm değişiklikler kaydedildi</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-red-500" />
                <span className="text-red-500">Kaydedilmemiş değişiklikler var</span>
              </>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button 
            onClick={handleClick} 
            disabled={isPublishing || (!isSaved && !isPublished)}
            className="gap-2"
          >
            {isPublishing ? (
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
