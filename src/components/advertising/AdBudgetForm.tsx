
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Info, DollarSign, Calendar } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AdBudgetFormProps {
  onBudgetChange?: (budget: number) => void;
  onSettingsChange?: (settings: {
    duration: string;
    currency: string;
    automaticBidding: boolean;
  }) => void;
}

const AdBudgetForm: React.FC<AdBudgetFormProps> = ({ 
  onBudgetChange, 
  onSettingsChange 
}) => {
  const [dailyBudget, setDailyBudget] = useState<number>(50);
  const [campaign, setCampaign] = useState({
    duration: '30',
    currency: 'TRY',
    automaticBidding: true
  });

  useEffect(() => {
    if (onBudgetChange) {
      onBudgetChange(dailyBudget);
    }
  }, [dailyBudget, onBudgetChange]);

  useEffect(() => {
    if (onSettingsChange) {
      onSettingsChange(campaign);
    }
  }, [campaign, onSettingsChange]);

  const handleDailyBudgetChange = (value: number[]) => {
    setDailyBudget(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 10 && value <= 1000) {
      setDailyBudget(value);
    }
  };

  const handleCampaignChange = (key: string, value: string | boolean) => {
    setCampaign(prev => ({ ...prev, [key]: value }));
  };

  // Calculate total budget
  const totalBudget = dailyBudget * parseInt(campaign.duration);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="daily-budget" className="text-base font-medium flex items-center">
              Günlük Bütçe
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground ml-2 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px]">Reklamlarınız için günlük olarak harcanacak maksimum tutar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
              <Input
                id="daily-budget"
                type="number"
                min={10}
                max={1000}
                value={dailyBudget}
                onChange={handleInputChange}
                className="w-24"
              />
            </div>
          </div>
          
          <Slider
            value={[dailyBudget]}
            min={10}
            max={1000}
            step={5}
            onValueChange={handleDailyBudgetChange}
            className="mt-6"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Min: 10 {campaign.currency}</span>
            <span>Max: 1,000 {campaign.currency}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="currency" className="text-base font-medium">Para Birimi</Label>
            <Select 
              value={campaign.currency} 
              onValueChange={(value) => handleCampaignChange('currency', value)}
            >
              <SelectTrigger id="currency" className="mt-2">
                <SelectValue placeholder="Para birimi seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TRY">Türk Lirası (₺)</SelectItem>
                <SelectItem value="USD">Amerikan Doları ($)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="duration" className="text-base font-medium flex items-center">
              Kampanya Süresi
              <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
            </Label>
            <Select 
              value={campaign.duration} 
              onValueChange={(value) => handleCampaignChange('duration', value)}
            >
              <SelectTrigger id="duration" className="mt-2">
                <SelectValue placeholder="Süre seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 gün</SelectItem>
                <SelectItem value="14">14 gün</SelectItem>
                <SelectItem value="30">30 gün</SelectItem>
                <SelectItem value="60">60 gün</SelectItem>
                <SelectItem value="90">90 gün</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="automatic-bidding"
            checked={campaign.automaticBidding}
            onCheckedChange={(checked) => handleCampaignChange('automaticBidding', checked)}
          />
          <Label htmlFor="automatic-bidding" className="cursor-pointer">
            Otomatik teklif verme
          </Label>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-[200px]">Sistemin otomatik olarak en iyi sonuçları almak için teklif vermesine izin verin</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Card className="p-4 bg-muted/50">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Tahminlenen toplam bütçe:</span>
          <span className="text-lg font-bold">
            {totalBudget} {campaign.currency}
          </span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Günlük bütçe {dailyBudget} {campaign.currency} x {campaign.duration} gün
        </div>
      </Card>
    </div>
  );
};

export default AdBudgetForm;
