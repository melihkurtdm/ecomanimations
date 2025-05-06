
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Link, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { setNamecheapApiConfig } from "@/services/domainService";

interface NamecheapIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const NamecheapIntegrationDialog: React.FC<NamecheapIntegrationDialogProps> = ({
  open,
  onOpenChange,
  onComplete
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [username, setUsername] = useState("");
  const [clientIp, setClientIp] = useState("127.0.0.1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Hata",
        description: "Oturum açık değil.",
        variant: "destructive"
      });
      return;
    }
    
    if (!apiKey || !username) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm gerekli alanları doldurun.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would validate these credentials with Namecheap API
      // For now, we'll just store them
      const success = setNamecheapApiConfig(user.id, { apiKey, username, clientIp });
      
      if (success) {
        toast({
          title: "Bağlantı Başarılı",
          description: "Namecheap API bağlantısı başarıyla yapılandırıldı."
        });
        
        onComplete();
        onOpenChange(false);
      } else {
        toast({
          title: "Bağlantı Hatası",
          description: "Namecheap API bağlantısı yapılandırılırken bir hata oluştu.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error connecting to Namecheap API:", error);
      toast({
        title: "Bağlantı Hatası",
        description: "Namecheap API bağlantısı yapılandırılırken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Namecheap API Bağlantısı</DialogTitle>
          <DialogDescription>
            Alan adlarınızı otomatik olarak yapılandırmak için Namecheap API bilgilerinizi girin.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Namecheap API bilgilerini kontrol panelinizdeki API erişim bölümünden alabilirsiniz.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label htmlFor="username">Namecheap Kullanıcı Adı</Label>
              <Input
                id="username"
                placeholder="namecheap_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Anahtarı</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="api-key-xxxxxxxxxxxx"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500">
                API anahtarınızı Namecheap hesabınızdaki API erişim sayfasından alabilirsiniz.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientIp">İstemci IP Adresi</Label>
              <Input
                id="clientIp"
                placeholder="127.0.0.1"
                value={clientIp}
                onChange={(e) => setClientIp(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500">
                Namecheap API'ye erişim için yetkilendirilmiş IP adresinizi girin. Varsayılan olarak 127.0.0.1 kullanılabilir.
              </p>
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit" disabled={isSubmitting} className="ml-2">
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Bağlanıyor...
                </>
              ) : (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Bağlan
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NamecheapIntegrationDialog;
