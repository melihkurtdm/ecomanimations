
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DomainForm from '@/components/domain/DomainForm';
import DomainList from '@/components/domain/DomainList';
import { useAuth } from '@/contexts/AuthContext';

const DomainManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('domains');
  const { user } = useAuth();

  const handleDomainAdded = () => {
    // Switch to domains tab after adding a new domain
    setActiveTab('domains');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Domain Management</h1>
      
      {!user && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please sign in to manage your domains.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="domains">Your Domains</TabsTrigger>
          <TabsTrigger value="add">Add Domain</TabsTrigger>
        </TabsList>
        
        <TabsContent value="domains">
          <Card>
            <CardHeader>
              <CardTitle>Your Domains</CardTitle>
              <CardDescription>
                Manage your connected domains and check verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DomainList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add Domain</CardTitle>
              <CardDescription>
                Connect your domain to your store and apply your preferred theme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DomainForm onSuccess={handleDomainAdded} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>DNS Configuration Guide</CardTitle>
          <CardDescription>
            How to set up your domain with different providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <h3>Setting Up Your DNS Records</h3>
            <p>
              After adding your domain, you'll need to configure your DNS records with your domain 
              provider. Follow these common provider instructions:
            </p>
            
            <h4>GoDaddy</h4>
            <ol>
              <li>Log in to your GoDaddy account</li>
              <li>Go to the Domain Manager and select your domain</li>
              <li>Click "DNS" or "Manage DNS"</li>
              <li>Find the "Records" section</li>
              <li>Add a new A or CNAME record as specified above</li>
              <li>Save your changes</li>
            </ol>
            
            <h4>Namecheap</h4>
            <ol>
              <li>Log in to your Namecheap account</li>
              <li>Go to "Domain List" and click "Manage" next to your domain</li>
              <li>Select the "Advanced DNS" tab</li>
              <li>Add a new A or CNAME record as specified above</li>
              <li>Save your changes</li>
            </ol>
            
            <h4>Google Domains</h4>
            <ol>
              <li>Log in to your Google Domains account</li>
              <li>Select your domain</li>
              <li>Click "DNS" in the left menu</li>
              <li>Scroll to "Custom resource records"</li>
              <li>Add a new A or CNAME record as specified above</li>
              <li>Save your changes</li>
            </ol>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <h4 className="text-blue-800 mt-0">Important Notes:</h4>
              <ul>
                <li>DNS changes can take up to 48 hours to propagate</li>
                <li>Use the "Refresh Status" button to check if your domain is verified</li>
                <li>For root domains (@), some providers require A records instead of CNAME records</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainManagement;
