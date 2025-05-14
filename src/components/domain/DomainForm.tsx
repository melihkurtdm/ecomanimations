
import React, { useState } from 'react';
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
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      const { data, error } = await supabase.functions.invoke('add-domain', {
        body: {
          domain,
          selectedTheme,
          userId: user.id,
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Set DNS records for display
      setDnsRecords(data.dnsConfig);
      
      toast({
        title: "Domain added successfully",
        description: "Your domain has been added. DNS verification is in progress.",
      });

      if (onSuccess) {
        onSuccess(data);
      }
      
    } catch (error) {
      console.error('Error adding domain:', error);
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
        description: `Checked ${data.checkedCount} domain(s).`,
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
    if (!dnsRecords) return null;
    
    // Determine what to show based on Vercel's response
    let recordsToShow = [];
    
    if (dnsRecords.name?.length > 0) {
      recordsToShow = [
        {
          type: dnsRecords.aliasRecord ? 'A' : 'CNAME',
          name: dnsRecords.name,
          value: dnsRecords.aliasRecord ? 'Vercel A Record' : 'cname.vercel-dns.com',
          ttl: 60
        }
      ];
    } else if (dnsRecords.aRecord) {
      recordsToShow = [
        {
          type: 'A',
          name: '@',
          value: dnsRecords.aRecord,
          ttl: 60
        }
      ];
    } else if (dnsRecords.cname) {
      recordsToShow = [
        {
          type: 'CNAME',
          name: '@',
          value: dnsRecords.cname,
          ttl: 60
        }
      ];
    } else if (dnsRecords.configuredBy) {
      // Domain already configured
      return (
        <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
          <p className="font-medium">Domain verified!</p>
          <p>Your domain is already configured correctly.</p>
        </div>
      );
    }
    
    if (recordsToShow.length === 0) {
      return (
        <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-md">
          <p className="font-medium">No DNS records available</p>
          <p>Please try adding your domain again or contact support.</p>
        </div>
      );
    }
    
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
              {recordsToShow.map((record, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{record.type}</td>
                  <td className="px-4 py-2">{record.name}</td>
                  <td className="px-4 py-2 font-mono text-xs">{record.value}</td>
                  <td className="px-4 py-2">{record.ttl}</td>
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
