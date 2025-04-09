
import { toast } from "@/components/ui/use-toast";
import adOptimizationService from "./adOptimizationService";

interface AdCreative {
  id: string;
  type: 'image' | 'video';
  file: File | null;
  preview: string;
  title: string;
  description: string;
}

interface AdCampaignRequest {
  platforms: string[];
  budget: {
    daily: number;
    total: number;
    currency: string;
    duration: number;
    automaticBidding: boolean;
  };
  creatives: AdCreative[];
  targetUrl: string;
  useAiOptimization?: boolean;
}

interface AdCampaignResponse {
  id: string;
  status: 'pending' | 'active' | 'rejected';
  platformResponses: {
    platform: string;
    campaignId?: string;
    status: string;
    message?: string;
  }[];
  optimizationApplied?: boolean;
  optimizationRecommendations?: {
    creativeId: string;
    audienceSegmentId: string;
    allocationPercentage: number;
    reason: string;
  }[];
}

// In a real implementation, these would be environment variables
const API_CONNECTED = {
  google: false,
  facebook: false,
  instagram: false
};

export const publishAdCampaign = async (campaignData: AdCampaignRequest): Promise<AdCampaignResponse> => {
  try {
    // Check if platforms are connected first
    const disconnectedPlatforms = campaignData.platforms.filter(p => !API_CONNECTED[p as keyof typeof API_CONNECTED]);
    
    if (disconnectedPlatforms.length > 0) {
      throw new Error(`Bazı platformlarla (${disconnectedPlatforms.join(', ')}) bağlantı kurulamadı`);
    }
    
    console.log("Publishing campaign with data:", campaignData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create response without optimization first
    const response: AdCampaignResponse = {
      id: `campaign-${Date.now()}`,
      status: 'pending',
      platformResponses: campaignData.platforms.map(platform => ({
        platform,
        campaignId: `${platform}-${Math.floor(Math.random() * 1000000)}`,
        status: 'pending',
        message: `Your ad campaign is being reviewed by ${platform === 'google' ? 'Google Ads' : 'Meta'}`
      }))
    };
    
    // If AI optimization is requested, apply it
    if (campaignData.useAiOptimization) {
      try {
        const creatives = campaignData.creatives.map(c => ({
          id: c.id,
          type: c.type,
          title: c.title
        }));
        
        // Get optimization recommendations
        const optimizationResult = await adOptimizationService.optimizeCampaign(
          response.id,
          creatives
        );
        
        // Apply the optimizations
        await adOptimizationService.applyOptimizations(
          response.id,
          optimizationResult.optimizedAllocations
        );
        
        // Update response with optimization info
        response.optimizationApplied = true;
        response.optimizationRecommendations = optimizationResult.optimizedAllocations;
        
        toast({
          title: "AI Optimizasyonu Uygulandı",
          description: `Kampanyanız için ${optimizationResult.optimizedAllocations.length} adet optimizasyon uygulandı.`,
        });
      } catch (error) {
        console.error("Error applying AI optimization:", error);
        toast({
          title: "AI Optimizasyonu Hatası",
          description: "Optimizasyon uygulanırken bir hata oluştu, ancak kampanya yine de yayınlandı.",
        });
      }
    }
    
    return response;
  } catch (error) {
    console.error("Error publishing ad campaign:", error);
    throw new Error("Reklam kampanyası yayınlanırken bir hata oluştu");
  }
};

// Function to get ad account information
export const getAdAccounts = async (platform: 'google' | 'facebook' | 'instagram'): Promise<{id: string, name: string}[]> => {
  // This would make an API call to get the user's ad accounts
  // For now, return mock data
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (platform === 'google') {
    return [
      { id: 'g-123456', name: 'Google Ads Hesabı 1' },
      { id: 'g-789012', name: 'Google Ads Hesabı 2' }
    ];
  } else {
    return [
      { id: 'fb-123456', name: 'Meta Business Suite 1' },
      { id: 'fb-789012', name: 'Meta Business Suite 2' }
    ];
  }
};

// Function to validate API connection
export const validateApiConnection = async (platform: string): Promise<boolean> => {
  // Check if we're already connected (in a real app, this would check session/localStorage)
  if (API_CONNECTED[platform as keyof typeof API_CONNECTED]) {
    return true;
  }
  
  // This would make an API call to validate the connection
  // For now, return mock result after delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Always return false initially to show the connect button
  return false;
};

// Function to update connection status (called after OAuth flow)
export const updateApiConnectionStatus = (platform: string, status: boolean): void => {
  if (platform in API_CONNECTED) {
    API_CONNECTED[platform as keyof typeof API_CONNECTED] = status;
  }
};

// Get performance data for a campaign
export const getCampaignPerformance = async (campaignId: string) => {
  const adPerformanceService = await import('./adPerformanceService');
  return adPerformanceService.getCampaignPerformance(campaignId);
};

// Get audience segments
export const getAudienceSegments = async () => {
  const adPerformanceService = await import('./adPerformanceService');
  return adPerformanceService.getAudienceSegments();
};

// Generate mock performance data for testing
export const generatePerformanceData = async (campaignId: string, creatives: any[]) => {
  const adPerformanceService = await import('./adPerformanceService');
  return adPerformanceService.generateMockPerformanceData(campaignId, creatives);
};

export default {
  publishAdCampaign,
  getAdAccounts,
  validateApiConnection,
  updateApiConnectionStatus,
  getCampaignPerformance,
  getAudienceSegments,
  generatePerformanceData
};
