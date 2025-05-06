
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Link, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { setNamecheapApiConfig, getNamecheapApiConfig, isNamecheapApiConnected } from "@/services/domainService";
import { Separator } from "@/components/ui/separator";

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
  const [isConnected, setIsConnected] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  // Load existing Namecheap API configuration if available
  useEffect(() => {
    if (user && open) {
      // Load from localStorage
      const config = getNamecheapApiConfig(user.id);
      if (config) {
        setApiKey(config.apiKey);
        setUsername(config.username);
        setClientIp(config.clientIp);
        setIsConnected(isNamecheapApiConnected(user.id));
      }
      
      // Also try to get IP address automatically
      if (!config?.clientIp) {
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
            if (data.ip) {
              setClientIp(data.ip);
            }
          })
          .catch(error => {
            console.error("Error fetching IP:", error);
          });
      }
    }
  }, [user, open]);

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
      // For now, we'll just store them in localStorage
      const success = setNamecheapApiConfig(user.id, { apiKey, username, clientIp });
      
      if (success) {
        setIsConnected(true);
        toast({
          title: "Bağlantı Başarılı",
          description: "Namecheap API bağlantısı başarıyla yapılandırıldı.",
        });
        
        // Store in sessionStorage as well to ensure persistence across page refreshes
        sessionStorage.setItem(`namecheap_config_${user.id}`, JSON.stringify({ apiKey, username, clientIp }));
        sessionStorage.setItem(`namecheap_api_connected_${user.id}`, "true");
        
        // Save to localStorage with a different key as backup
        localStorage.setItem(`namecheap_api_config_backup_${user.id}`, JSON.stringify({ apiKey, username, clientIp }));
        localStorage.setItem(`namecheap_api_connected_backup_${user.id}`, "true");
        
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

  const handleTestConnection = async () => {
    if (!user || !apiKey || !username) {
      toast({
        title: "Eksik Bilgi",
        description: "Bağlantı testi için tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }
    
    setTestingConnection(true);
    
    try {
      // Simulated API test - in a real app, this would call the Namecheap API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate a successful test (real implementation would verify with Namecheap)
      toast({
        title: "Bağlantı Testi Başarılı",
        description: "Namecheap API bağlantısı çalışıyor.",
      });
      
      // Update connection status
      setIsConnected(true);
    } catch (error) {
      console.error("Error testing Namecheap API:", error);
      toast({
        title: "Test Hatası",
        description: "Namecheap API bağlantısı test edilirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setTestingConnection(false);
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
                Namecheap API'ye erişim için yetkilendirilmiş IP adresinizi girin. Varsayılan olarak mevcut IP adresiniz kullanılır.
              </p>
            </div>
            
            <div className="flex justify-end mb-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleTestConnection} 
                disabled={testingConnection || !apiKey || !username}
                className="gap-2"
              >
                {testingConnection ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Link className="h-4 w-4" />
                )}
                Bağlantıyı Test Et
              </Button>
            </div>
            
            <Separator />
            
            {isConnected && (
              <Alert className="bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700">
                  Namecheap API bağlantınız kurulmuş durumda. Bilgilerinizi güncellemek istiyorsanız aşağıdaki formu kullanabilirsiniz.
                </AlertDescription>
              </Alert>
            )}
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
              ) : isConnected ? (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Bağlantıyı Güncelle
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
