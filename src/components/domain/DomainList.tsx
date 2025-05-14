
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, AlertCircle, CheckCircle, Clock, Trash } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Domain, DomainStatus } from '@/types/domain';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tables } from '@/integrations/supabase/types';

// Helper function to convert Supabase domain records to our Domain type
const convertToDomain = (record: Tables<"domains">): Domain => {
  return {
    id: typeof record.id === 'string' ? parseInt(record.id) : Number(record.id),
    domain: record.domain,
    status: record.status as DomainStatus || 'pending',
    primary: record.primary || false,
    createdAt: record.created_at || new Date().toISOString(),
    lastChecked: record.last_checked || new Date().toISOString(),
    verifiedAt: record.verified_at,
    errorMessage: record.error_message,
    isCustomDomain: true, // Default value
    hasPublishedTheme: false, // Default value
  };
};

const DomainList: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingDomain, setDeletingDomain] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load domains
  useEffect(() => {
    if (!user) return;
    
    const loadDomains = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('domains')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Convert Supabase records to Domain type
        const domainData = data ? data.map(convertToDomain) : [];
        setDomains(domainData);
      } catch (error) {
        console.error('Error loading domains:', error);
        toast({
          title: "Failed to load domains",
          description: error.message || "An error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDomains();
  }, [user, toast]);
  
  // Check status of all domains
  const refreshDomainStatus = async () => {
    if (!user) return;
    
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-domain-status', {});

      if (error) throw error;
      
      // Refetch domains to get updated status
      const { data: updatedDomains, error: fetchError } = await supabase
        .from('domains')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (fetchError) throw fetchError;
      
      // Convert Supabase records to Domain type
      const domainData = updatedDomains ? updatedDomains.map(convertToDomain) : [];
      setDomains(domainData);
      
      toast({
        title: "Domain status updated",
        description: `Checked ${data.checkedCount} domains`,
      });
    } catch (error) {
      console.error('Error checking domain status:', error);
      toast({
        title: "Status check failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Delete a domain
  const confirmDeleteDomain = async (domainId: string) => {
    try {
      const { error } = await supabase
        .from('domains')
        .delete()
        .eq('id', domainId);
        
      if (error) throw error;
      
      // Remove from local state
      setDomains(domains.filter(d => String(d.id) !== domainId));
      
      toast({
        title: "Domain deleted",
        description: "The domain has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting domain:', error);
      toast({
        title: "Delete failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setDeletingDomain(null);
    }
  };
  
  // Set a domain as primary
  const setPrimaryDomain = async (domainId: string) => {
    try {
      // First, set all domains to non-primary
      await supabase
        .from('domains')
        .update({ "primary": false })
        .eq('user_id', user.id);
        
      // Then set the selected one as primary
      const { error } = await supabase
        .from('domains')
        .update({ "primary": true })
        .eq('id', domainId);
        
      if (error) throw error;
      
      // Update local state
      setDomains(domains.map(d => ({
        ...d,
        primary: String(d.id) === domainId
      })));
      
      toast({
        title: "Primary domain updated",
        description: "Your primary domain has been updated.",
      });
    } catch (error) {
      console.error('Error setting primary domain:', error);
      toast({
        title: "Update failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Unknown</Badge>;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  
  if (domains.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No domains added yet.</p>
        <p className="text-sm text-muted-foreground">Add a domain to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Domains</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={refreshDomainStatus}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
        </Button>
      </div>
      
      <div className="space-y-3">
        {domains.map((domain) => (
          <div key={domain.id} className="border rounded-md p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(domain.status)}
                  <h4 className="font-medium">{domain.domain}</h4>
                  {domain.primary && (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">Primary</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(domain.status)}
                  <span className="text-xs text-muted-foreground">
                    Added {format(new Date(domain.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                {!domain.primary && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPrimaryDomain(domain.id.toString())}
                  >
                    Set as Primary
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setDeletingDomain(domain.id.toString())}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
            
            {domain.errorMessage && (
              <div className="mt-2 p-2 bg-red-50 text-red-800 text-sm rounded">
                Error: {domain.errorMessage}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <AlertDialog open={!!deletingDomain} onOpenChange={() => setDeletingDomain(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Domain</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this domain? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 hover:bg-red-600"
              onClick={() => deletingDomain && confirmDeleteDomain(deletingDomain)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DomainList;
