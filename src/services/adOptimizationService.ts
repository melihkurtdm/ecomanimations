
import { toast } from "@/components/ui/use-toast";
import adPerformanceService, { generateMockPerformanceData } from "./adPerformanceService";

interface OptimizationResult {
  campaignId: string;
  optimizedAllocations: {
    creativeId: string;
    audienceSegmentId: string;
    allocationPercentage: number;
    reason: string;
  }[];
  expectedImprovement: {
    impressionsIncrease: number;
    clicksIncrease: number;
    conversionsIncrease: number;
    roiIncrease: number;
  };
}

interface CreativePerformance {
  creativeId: string;
  audienceSegmentId: string;
  ctr: number;
  cvr: number;
  roi: number;
  performanceScore: number;
}

// Main optimization function
export const optimizeCampaign = async (
  campaignId: string,
  creatives: { id: string, type: string, title: string }[]
): Promise<OptimizationResult> => {
  try {
    // First, check if we have performance data, if not generate mock data
    let performanceData = adPerformanceService.getCampaignPerformance(campaignId);
    
    if (performanceData.length === 0) {
      console.log("No existing performance data, generating mock data for optimization");
      performanceData = generateMockPerformanceData(campaignId, creatives);
    }
    
    // Get all audience segments
    const audienceSegments = adPerformanceService.getAudienceSegments();
    
    // Calculate performance scores for each creative-audience combination
    const performanceScores: CreativePerformance[] = [];
    
    creatives.forEach(creative => {
      audienceSegments.forEach(segment => {
        // Find all metrics for this creative and audience
        const metrics = performanceData.filter(
          m => m.creativeId === creative.id && m.audienceSegment === segment.id
        );
        
        if (metrics.length > 0) {
          // Calculate average metrics
          const avgCTR = metrics.reduce((sum, m) => sum + m.ctr, 0) / metrics.length;
          const avgCVR = metrics.reduce((sum, m) => sum + m.cvr, 0) / metrics.length;
          const avgROI = metrics.reduce((sum, m) => sum + m.roi, 0) / metrics.length;
          
          // Create a composite performance score (weighted average)
          // We weight ROI highest, then CVR, then CTR
          const performanceScore = (avgROI * 0.5) + (avgCVR * 0.3) + (avgCTR * 0.2);
          
          performanceScores.push({
            creativeId: creative.id,
            audienceSegmentId: segment.id,
            ctr: avgCTR,
            cvr: avgCVR,
            roi: avgROI,
            performanceScore
          });
        }
      });
    });
    
    // Sort by performance score (highest first)
    performanceScores.sort((a, b) => b.performanceScore - a.performanceScore);
    
    // Calculate optimal allocations for each audience segment
    const optimizedAllocations: OptimizationResult['optimizedAllocations'] = [];
    
    // Group by audience segment
    const audienceGroups = new Map<string, CreativePerformance[]>();
    
    performanceScores.forEach(score => {
      if (!audienceGroups.has(score.audienceSegmentId)) {
        audienceGroups.set(score.audienceSegmentId, []);
      }
      audienceGroups.get(score.audienceSegmentId)?.push(score);
    });
    
    // For each audience, allocate budget based on performance
    audienceGroups.forEach((creatives, audienceId) => {
      // Sort creatives by performance (highest first)
      creatives.sort((a, b) => b.performanceScore - a.performanceScore);
      
      // Calculate total score for normalization
      const totalScore = creatives.reduce((sum, c) => sum + c.performanceScore, 0);
      
      // Allocate budget proportionally to performance, with a minimum threshold
      creatives.forEach((creative, index) => {
        // The best performer gets more budget, decreasing for worse performers
        let allocationPercentage = (creative.performanceScore / totalScore) * 100;
        
        // Give even more weight to the top performers
        if (index === 0) {
          allocationPercentage = Math.min(allocationPercentage * 1.5, 70); // Cap at 70%
        } else if (index === 1) {
          allocationPercentage = Math.min(allocationPercentage * 1.2, 50); // Cap at 50%
        }
        
        // Only include creatives with at least 5% allocation
        if (allocationPercentage >= 5) {
          // Find the audience segment name
          const segment = audienceSegments.find(s => s.id === audienceId);
          
          // Generate reason for the allocation
          let reason = '';
          if (creative.roi > 1.5) {
            reason = `Yüksek ROI (${(creative.roi * 100).toFixed(0)}%)`;
          } else if (creative.cvr > 0.1) {
            reason = `Yüksek dönüşüm oranı (${(creative.cvr * 100).toFixed(1)}%)`;
          } else if (creative.ctr > 0.05) {
            reason = `Yüksek tıklama oranı (${(creative.ctr * 100).toFixed(1)}%)`;
          } else {
            reason = 'Genel performans';
          }
          
          optimizedAllocations.push({
            creativeId: creative.creativeId,
            audienceSegmentId: audienceId,
            allocationPercentage: Math.round(allocationPercentage),
            reason: `${segment?.name || 'Bilinmeyen Segment'} için ${reason}`
          });
        }
      });
    });
    
    // Calculate expected improvement
    // This is just an estimate based on historical performance
    const baseCTR = performanceData.reduce((sum, m) => sum + m.ctr, 0) / performanceData.length;
    const baseCVR = performanceData.reduce((sum, m) => sum + m.cvr, 0) / performanceData.length;
    const baseROI = performanceData.reduce((sum, m) => sum + m.roi, 0) / performanceData.length;
    
    // Assume top performers can outperform average by 20-40%
    const expectedImprovement = {
      impressionsIncrease: 15, // 15% more impressions with better targeting
      clicksIncrease: Math.round((baseCTR * 1.3 - baseCTR) / baseCTR * 100), // 30% CTR improvement
      conversionsIncrease: Math.round((baseCVR * 1.35 - baseCVR) / baseCVR * 100), // 35% CVR improvement
      roiIncrease: Math.round((baseROI * 1.4 - baseROI) / baseROI * 100) // 40% ROI improvement
    };
    
    // Return the optimization result
    return {
      campaignId,
      optimizedAllocations,
      expectedImprovement
    };
  } catch (error) {
    console.error("Error optimizing campaign:", error);
    toast({
      title: "Optimizasyon hatası",
      description: "Kampanya optimizasyonu sırasında bir hata oluştu.",
      variant: "destructive"
    });
    
    // Return empty result in case of error
    return {
      campaignId,
      optimizedAllocations: [],
      expectedImprovement: {
        impressionsIncrease: 0,
        clicksIncrease: 0,
        conversionsIncrease: 0,
        roiIncrease: 0
      }
    };
  }
};

// Function to apply optimizations to a campaign
export const applyOptimizations = async (
  campaignId: string,
  optimizations: OptimizationResult['optimizedAllocations']
): Promise<boolean> => {
  try {
    console.log("Applying optimizations to campaign:", campaignId, optimizations);
    
    // In a real implementation, this would update campaign settings in the ad platforms
    // Here we just simulate a successful update
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Optimizasyonlar uygulandı",
      description: "Kampanya optimizasyonları başarıyla uygulandı.",
    });
    
    return true;
  } catch (error) {
    console.error("Error applying optimizations:", error);
    toast({
      title: "Optimizasyon hatası",
      description: "Kampanya optimizasyonları uygulanırken bir hata oluştu.",
      variant: "destructive"
    });
    
    return false;
  }
};

export default {
  optimizeCampaign,
  applyOptimizations
};
