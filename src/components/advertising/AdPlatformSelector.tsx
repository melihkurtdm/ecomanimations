
import React, { useState } from 'react';
import { Check, Facebook, Instagram, Search, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AdPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
  badgeColor?: string;
}

const platforms: AdPlatform[] = [
  {
    id: 'google',
    name: 'Google Ads',
    icon: <Search className="h-6 w-6" />,
    description: 'Google Arama, Display ve YouTube reklamları',
    badge: 'Popüler',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    id: 'facebook',
    name: 'Facebook Ads',
    icon: <Facebook className="h-6 w-6" />,
    description: 'Facebook ve Instagram reklamları',
  },
  {
    id: 'instagram',
    name: 'Instagram Ads',
    icon: <Instagram className="h-6 w-6" />,
    description: 'Sadece Instagram reklamları',
    badge: 'Yeni',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
];

const AdPlatformSelector = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['google']);

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="space-y-4">
      <Alert variant="default" className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Birden fazla platform seçerek tek seferde birçok yerde reklam yayınlayabilirsiniz.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map(platform => (
          <Card 
            key={platform.id}
            className={`p-4 cursor-pointer border-2 transition-all ${
              selectedPlatforms.includes(platform.id) 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => togglePlatform(platform.id)}
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-full ${
                selectedPlatforms.includes(platform.id) ? 'bg-primary/10' : 'bg-gray-100'
              }`}>
                {platform.icon}
              </div>
              
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{platform.name}</h3>
                  {selectedPlatforms.includes(platform.id) && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
                
                <p className="text-sm text-gray-500 mt-1">{platform.description}</p>
                
                {platform.badge && (
                  <Badge className={`mt-2 ${platform.badgeColor}`}>
                    {platform.badge}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdPlatformSelector;
