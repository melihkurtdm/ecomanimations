
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Globe, RotateCw, CheckCircle2 } from 'lucide-react';

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="gap-2"
          disabled={!isSaved || isPublished}
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
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Tüm değişiklikler kaydedildi</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button 
            onClick={onPublish} 
            disabled={isPublishing}
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
