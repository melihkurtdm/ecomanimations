
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Facebook, Search, PauseCircle, PlayCircle, BarChart, Settings } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AdCampaign {
  id: string;
  name: string;
  platform: 'google' | 'facebook' | 'instagram';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: {
    total: number;
    spent: number;
    currency: string;
  };
  performance: {
    impressions: number;
    clicks: number;
    ctr: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
}

const mockCampaigns: AdCampaign[] = [
  {
    id: '1',
    name: 'Yaz Koleksiyonu Tanıtımı',
    platform: 'facebook',
    status: 'active',
    budget: {
      total: 1500,
      spent: 675,
      currency: 'TRY'
    },
    performance: {
      impressions: 12500,
      clicks: 430,
      ctr: 3.44
    },
    dateRange: {
      start: '2025-06-01',
      end: '2025-06-30'
    }
  },
  {
    id: '2',
    name: 'Arama Motoru Reklamı',
    platform: 'google',
    status: 'paused',
    budget: {
      total: 2000,
      spent: 1200,
      currency: 'TRY'
    },
    performance: {
      impressions: 8700,
      clicks: 320,
      ctr: 3.68
    },
    dateRange: {
      start: '2025-05-15',
      end: '2025-06-15'
    }
  }
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'facebook':
      return <Facebook className="h-4 w-4" />;
    case 'google':
      return <Search className="h-4 w-4" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>;
    case 'paused':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Duraklatıldı</Badge>;
    case 'completed':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Tamamlandı</Badge>;
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Taslak</Badge>;
    default:
      return null;
  }
};

const AdCampaignList = () => {
  const toggleCampaignStatus = (campaignId: string, currentStatus: string) => {
    // This would update the campaign status via API
    console.log(`Toggle campaign ${campaignId} from ${currentStatus} to ${currentStatus === 'active' ? 'paused' : 'active'}`);
  };

  return (
    <div>
      {mockCampaigns.length > 0 ? (
        <div className="space-y-4">
          {mockCampaigns.map(campaign => (
            <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-muted">
                      {getPlatformIcon(campaign.platform)}
                    </div>
                    <h3 className="font-medium">{campaign.name}</h3>
                    {getStatusBadge(campaign.status)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {new Date(campaign.dateRange.start).toLocaleDateString('tr-TR')} - {new Date(campaign.dateRange.end).toLocaleDateString('tr-TR')}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
                  >
                    {campaign.status === 'active' ? 
                      <PauseCircle className="h-5 w-5 text-muted-foreground" /> : 
                      <PlayCircle className="h-5 w-5 text-muted-foreground" />
                    }
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Bütçe Kullanımı</span>
                  <span className="font-medium">
                    {campaign.budget.spent} / {campaign.budget.total} {campaign.budget.currency}
                  </span>
                </div>
                <Progress value={(campaign.budget.spent / campaign.budget.total) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="text-sm text-muted-foreground">Gösterim</div>
                  <div className="font-medium">{campaign.performance.impressions.toLocaleString()}</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="text-sm text-muted-foreground">Tıklama</div>
                  <div className="font-medium">{campaign.performance.clicks.toLocaleString()}</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="text-sm text-muted-foreground">CTR</div>
                  <div className="font-medium">%{campaign.performance.ctr.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Detaylı Rapor
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <div className="text-muted-foreground mb-2">Henüz reklam kampanyanız bulunmuyor</div>
          <Button>İlk Kampanyanızı Oluşturun</Button>
        </div>
      )}
    </div>
  );
};

export default AdCampaignList;
