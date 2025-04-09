
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Facebook, Search, CheckCircle2, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { validateApiConnection, getAdAccounts } from '@/services/adPlatformService';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface AdApiConnectionProps {
  selectedPlatforms: string[];
  onConnectionStatusChange: (connected: boolean) => void;
}

const AdApiConnection: React.FC<AdApiConnectionProps> = ({ 
  selectedPlatforms, 
  onConnectionStatusChange 
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{[key: string]: {
    connected: boolean;
    accounts: {id: string, name: string}[];
    selectedAccount?: string;
  }}>({});
  
  useEffect(() => {
    if (selectedPlatforms.length > 0) {
      checkConnections();
    }
  }, [selectedPlatforms]);
  
  useEffect(() => {
    const allConnected = selectedPlatforms.every(
      platform => connectionStatus[platform]?.connected
    );
    onConnectionStatusChange(allConnected);
  }, [connectionStatus, selectedPlatforms]);
  
  const checkConnections = async () => {
    setIsChecking(true);
    
    const newStatus = { ...connectionStatus };
    
    for (const platform of selectedPlatforms) {
      try {
        // Call the API validation function
        const isConnected = await validateApiConnection(platform);
        
        if (isConnected) {
          // Only if truly connected, fetch accounts
          const accounts = await getAdAccounts(platform as 'google' | 'facebook' | 'instagram');
          newStatus[platform] = {
            connected: true,
            accounts,
            selectedAccount: accounts.length > 0 ? accounts[0].id : undefined
          };
        } else {
          newStatus[platform] = {
            connected: false,
            accounts: []
          };
        }
      } catch (error) {
        console.error(`Error checking connection for ${platform}:`, error);
        newStatus[platform] = {
          connected: false,
          accounts: []
        };
      }
    }
    
    setConnectionStatus(newStatus);
    setIsChecking(false);
  };
  
  const handleAccountSelect = (platform: string, accountId: string) => {
    setConnectionStatus(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        selectedAccount: accountId
      }
    }));
  };
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google':
        return <Search className="h-5 w-5" />;
      case 'facebook':
      case 'instagram':
        return <Facebook className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };
  
  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'google':
        return 'Google Ads';
      case 'facebook':
        return 'Facebook Ads';
      case 'instagram':
        return 'Instagram Ads';
      default:
        return platform;
    }
  };
  
  const handleConnectAccount = async (platform: string) => {
    setIsChecking(true);
    
    try {
      // In a real implementation, this would open OAuth flow or API key input
      // For this demo, we'll simulate a successful connection after delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // After successful connection, update the status
      const accounts = await getAdAccounts(platform as 'google' | 'facebook' | 'instagram');
      
      setConnectionStatus(prev => ({
        ...prev,
        [platform]: {
          connected: true,
          accounts,
          selectedAccount: accounts.length > 0 ? accounts[0].id : undefined
        }
      }));
      
      toast({
        title: `${getPlatformName(platform)} bağlantısı kuruldu`,
        description: "Hesabınız başarıyla bağlandı.",
      });
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
      
      toast({
        title: "Bağlantı hatası",
        description: `${getPlatformName(platform)} hesabınızla bağlantı kurulamadı.`,
        variant: "destructive"
      });
      
      setConnectionStatus(prev => ({
        ...prev,
        [platform]: {
          connected: false,
          accounts: []
        }
      }));
    } finally {
      setIsChecking(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 border-blue-200">
        <AlertDescription className="text-blue-800">
          Reklam platformlarınızla bağlantı kurarak pazarlama kampanyalarınızı doğrudan yönetebilirsiniz.
        </AlertDescription>
      </Alert>
      
      {isChecking && (
        <div className="space-y-2 py-4">
          <div className="flex justify-between text-sm">
            <span>API bağlantıları kontrol ediliyor...</span>
            <span>Lütfen bekleyin</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
      )}
      
      <div className="grid gap-4">
        {selectedPlatforms.map(platform => (
          <Card key={platform}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(platform)}
                  <CardTitle className="text-base">{getPlatformName(platform)}</CardTitle>
                </div>
                
                {connectionStatus[platform]?.connected ? (
                  <div className="flex items-center text-green-600 gap-1 text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Bağlantı Kuruldu</span>
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600 gap-1 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Bağlantı Gerekiyor</span>
                  </div>
                )}
              </div>
              <CardDescription>
                {connectionStatus[platform]?.connected 
                  ? 'Hesap seçin ve reklam kampanyanızı oluşturun' 
                  : 'API bağlantısı kurmak için hesap seçin'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {connectionStatus[platform]?.accounts.length > 0 && (
                <Select 
                  value={connectionStatus[platform]?.selectedAccount} 
                  onValueChange={(value) => handleAccountSelect(platform, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Hesap seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {connectionStatus[platform]?.accounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </CardContent>
            
            {!connectionStatus[platform]?.connected && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleConnectAccount(platform)}
                  disabled={isChecking}
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Hesaba Bağlan
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={checkConnections}
          disabled={isChecking || selectedPlatforms.length === 0}
        >
          Bağlantıları Yenile
        </Button>
      </div>
    </div>
  );
};

export default AdApiConnection;
