
interface AdPerformanceMetrics {
  id: string;
  campaignId: string;
  creativeId: string;
  platform: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cvr: number;
  cost: number;
  revenue: number;
  roi: number;
  audienceSegment: string;
  timestamp: Date;
}

interface AudienceSegment {
  id: string;
  name: string;
  demographics: {
    ageRange?: string;
    gender?: string;
    location?: string;
    interests?: string[];
  };
  performanceScore: number;
}

// Mock performance data - in a real implementation, this would be fetched from ad platforms' APIs
const performanceData: Map<string, AdPerformanceMetrics[]> = new Map();

// Mock audience segments
const audienceSegments: AudienceSegment[] = [
  {
    id: 'segment1',
    name: 'Genç Profesyoneller',
    demographics: {
      ageRange: '25-34',
      gender: 'tümü',
      location: 'büyük şehirler',
      interests: ['teknoloji', 'iş', 'girişimcilik']
    },
    performanceScore: 0.7
  },
  {
    id: 'segment2',
    name: 'Ebeveynler',
    demographics: {
      ageRange: '30-45',
      gender: 'tümü',
      location: 'tüm bölgeler',
      interests: ['aile', 'eğitim', 'ev']
    },
    performanceScore: 0.6
  },
  {
    id: 'segment3',
    name: 'Öğrenciler',
    demographics: {
      ageRange: '18-24',
      gender: 'tümü',
      location: 'üniversite şehirleri',
      interests: ['eğitim', 'eğlence', 'sosyal medya']
    },
    performanceScore: 0.8
  },
  {
    id: 'segment4',
    name: 'Teknoloji Meraklıları',
    demographics: {
      ageRange: '18-45',
      gender: 'tümü',
      location: 'tüm bölgeler',
      interests: ['teknoloji', 'gadget', 'yazılım', 'oyun']
    },
    performanceScore: 0.9
  }
];

// Track performance for a particular creative in a campaign
export const trackCreativePerformance = (
  campaignId: string,
  creativeId: string,
  platform: string,
  metrics: Partial<AdPerformanceMetrics>,
  audienceSegment: string
) => {
  if (!performanceData.has(campaignId)) {
    performanceData.set(campaignId, []);
  }
  
  const campaignMetrics = performanceData.get(campaignId);
  
  // Check if we already have metrics for this creative and audience
  const existingMetricIndex = campaignMetrics?.findIndex(
    m => m.creativeId === creativeId && m.audienceSegment === audienceSegment
  );
  
  if (existingMetricIndex !== undefined && existingMetricIndex >= 0 && campaignMetrics) {
    // Update existing metrics
    campaignMetrics[existingMetricIndex] = {
      ...campaignMetrics[existingMetricIndex],
      ...metrics,
      timestamp: new Date()
    };
  } else if (campaignMetrics) {
    // Add new metrics
    campaignMetrics.push({
      id: `metric-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      campaignId,
      creativeId,
      platform,
      impressions: metrics.impressions || 0,
      clicks: metrics.clicks || 0,
      conversions: metrics.conversions || 0,
      ctr: metrics.ctr || 0,
      cvr: metrics.cvr || 0,
      cost: metrics.cost || 0,
      revenue: metrics.revenue || 0,
      roi: metrics.roi || 0,
      audienceSegment,
      timestamp: new Date()
    });
  }
};

// Get performance data for a campaign
export const getCampaignPerformance = (campaignId: string): AdPerformanceMetrics[] => {
  return performanceData.get(campaignId) || [];
};

// Get all audience segments
export const getAudienceSegments = (): AudienceSegment[] => {
  return audienceSegments;
};

// Generate mock performance data for a campaign
export const generateMockPerformanceData = (
  campaignId: string, 
  creatives: { id: string, type: string }[]
) => {
  if (!performanceData.has(campaignId)) {
    performanceData.set(campaignId, []);
  }
  
  // Generate random performance data for each creative across different audience segments
  creatives.forEach(creative => {
    audienceSegments.forEach(segment => {
      // Create random but somewhat realistic metrics
      const impressions = Math.floor(Math.random() * 10000) + 1000;
      const clicks = Math.floor(impressions * (Math.random() * 0.1 + 0.01)); // CTR between 1% and 11%
      const conversions = Math.floor(clicks * (Math.random() * 0.15 + 0.05)); // CVR between 5% and 20%
      const cost = (impressions / 1000) * (Math.random() * 5 + 2); // CPM between $2 and $7
      const revenue = conversions * (Math.random() * 50 + 20); // Average order value between $20 and $70
      
      // Calculate derived metrics
      const ctr = clicks / impressions;
      const cvr = conversions / clicks || 0;
      const roi = (revenue - cost) / cost;
      
      // Add some bias based on creative type and audience
      let performanceMultiplier = 1.0;
      
      // Image ads perform better with some audiences, video with others
      if (creative.type === 'image' && segment.id === 'segment4') {
        performanceMultiplier = 1.3; // Images perform better with tech enthusiasts
      } else if (creative.type === 'video' && segment.id === 'segment1') {
        performanceMultiplier = 1.4; // Videos perform better with young professionals
      }
      
      // Track this performance data
      trackCreativePerformance(
        campaignId,
        creative.id,
        'all', // Combined platforms
        {
          impressions,
          clicks: Math.floor(clicks * performanceMultiplier),
          conversions: Math.floor(conversions * performanceMultiplier),
          ctr: ctr * performanceMultiplier,
          cvr: cvr * performanceMultiplier,
          cost,
          revenue: revenue * performanceMultiplier,
          roi: roi * performanceMultiplier
        },
        segment.id
      );
    });
  });
  
  // Return the generated data
  return performanceData.get(campaignId) || [];
};

export default {
  trackCreativePerformance,
  getCampaignPerformance,
  getAudienceSegments,
  generateMockPerformanceData
};
