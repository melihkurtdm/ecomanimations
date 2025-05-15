
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Globe, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface DomainFormProps {
  onSuccess?: (data: any) => void;
}

const DomainForm: React.FC<DomainFormProps> = ({ onSuccess }) => {
  const [domain, setDomain] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('minimalist');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dnsRecords, setDnsRecords] = useState<any>(null);
  const [defaultStore, setDefaultStore] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch user's default store on component mount
  useEffect(() => {
    const fetchDefaultStore = async () => {
      if (!user) return;
      
      try {
        const { data: stores, error } = await supabase
          .from('stores')
          .select('*')
          .eq('user_id', user.id)
          .limit(1);
        
        if (error) {
          console.error('Error fetching store:', error);
          return;
        }
        
        if (stores && stores.length > 0) {
          setDefaultStore(stores[0]);
          console.log('Default store found:', stores[0]);
        }
      } catch (err) {
        console.error('Error in fetchDefaultStore:', err);
      }
    };
    
    fetchDefaultStore();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDebugInfo(null);
    
    if (!domain) {
      toast({
        title: "Domain field is empty",
        description: "Please enter a domain name.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add a domain.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Use the store ID from the default store if available
      const storeId = defaultStore?.id || null;
      
      console.log('Submitting domain with:', {
        domain,
        theme: selectedTheme,
        userId: user.id,
        storeId,
      });
      
      // Capture the actual request payload for debugging
      const requestBody = {
        domain,
        theme: selectedTheme,
        userId: user.id,
        storeId,
      };
      
      setDebugInfo({
        requestSent: true,
        requestBody,
        timestamp: new Date().toISOString()
      });
      
      const response = await supabase.functions.invoke('add-domain', {
        body: requestBody,
      });
      
      // Update debug info with response
      setDebugInfo(prev => ({
        ...prev,
        responseReceived: true,
        responseError: response.error,
        responseData: response.data,
        responseStatus: response.error ? 'error' : 'success'
      }));
      
      // Check for errors in the response
      if (response.error) {
        console.error('Error from add-domain function:', response.error);
        throw new Error(response.error.message || 'Failed to add domain');
      }

      const data = response.data;
      
      if (!data || data.error) {
        console.error('Error returned from add-domain function:', data?.error || 'Unknown error');
        throw new Error(data?.error || 'Failed to add domain');
      }

      console.log('Domain added successfully:', data);
      
      // Set DNS records for display
      setDnsRecords(data.dnsRecords);
      
      toast({
        title: "Domain added successfully",
        description: "Your domain has been added. DNS verification is in progress.",
      });

      if (onSuccess) {
        onSuccess(data);
      }
      
    } catch (error) {
      console.error('Error adding domain:', error);
      setError(error.message);
      toast({
        title: "Failed to add domain",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkDomainStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.functions.invoke('check-domain-status', {});

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Domain status checked",
        description: `Checked ${data.checkedCount} domain(s). Verified ${data.verifiedCount} domain(s).`,
      });

    } catch (error) {
      console.error('Error checking domain status:', error);
      toast({
        title: "Status check failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const renderDnsRecords = () => {
    if (!dnsRecords || dnsRecords.length === 0) return null;
    
    return (
      <div className="mt-6 border rounded-md overflow-hidden">
        <div className="bg-muted p-4">
          <h3 className="font-medium">DNS Configuration Required</h3>
          <p className="text-sm text-muted-foreground">
            Add these records to your DNS provider to verify your domain
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Name/Host</th>
                <th className="px-4 py-2 text-left font-medium">Value/Target</th>
                <th className="px-4 py-2 text-left font-medium">TTL</th>
              </tr>
            </thead>
            <tbody>
              {dnsRecords.map((record: any, index: number) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{record.type}</td>
                  <td className="px-4 py-2">{record.name}</td>
                  <td className="px-4 py-2 font-mono text-xs">{record.value}</td>
                  <td className="px-4 py-2">{record.ttl || "Auto"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-muted/20 p-4 border-t">
          <p className="text-sm text-muted-foreground">
            DNS changes can take up to 48 hours to propagate. Click "Check Status" to verify your domain.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={checkDomainStatus}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Check Status
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-md">
          <p className="font-medium">Error occurred:</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2">
            Please check that your Vercel API token has the correct permissions and that it is valid.
          </p>
        </div>
      )}
      
      {/* Debug Info Panel - Gönderimdeki değerleri görmek için */}
      {debugInfo && (
        <div className="p-4 border border-blue-200 bg-blue-50 text-blue-800 rounded-md text-xs">
          <p className="font-medium">Debug Information:</p>
          <pre className="mt-2 overflow-auto max-h-40">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Domain Name</Label>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Input
              id="domain"
              placeholder="yourdomain.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="flex-1"
              disabled={isSubmitting}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Enter your domain without http:// or www (e.g., example.com)
          </p>
        </div>

        <div className="space-y-2">
          <Label>Select Theme</Label>
          <RadioGroup 
            value={selectedTheme} 
            onValueChange={setSelectedTheme}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="minimalist" id="minimalist" />
              <Label htmlFor="minimalist" className="cursor-pointer">Minimalist</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="elegant" id="elegant" />
              <Label htmlFor="elegant" className="cursor-pointer">Elegant</Label>
            </div>
          </RadioGroup>
        </div>

        {defaultStore && (
          <div className="p-2 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              Domain will be connected to your store: <strong>{defaultStore.store_name || 'Default Store'}</strong>
              (ID: {defaultStore.id})
            </p>
          </div>
        )}

        {!defaultStore && (
          <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              No store found. Domain will be added without store connection.
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !domain}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Domain...
            </>
          ) : (
            "Add Domain"
          )}
        </Button>
      </form>

      {renderDnsRecords()}
    </div>
  );
};

export default DomainForm;
