
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, PaintBucket, BarChart2, Users, Globe, CreditCard, Megaphone, Sparkles, Film } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  tr: {
    quickAccess: 'Hızlı Erişim',
    store: 'Mağaza',
    themes: 'Temalar',
    analytics: 'Analitik',
    customers: 'Müşteriler',
    domains: 'Alan Adları',
    billing: 'Faturalama',
    advertising: 'Reklam',
    aiContent: 'AI İçerik',
    videoCreator: 'Video Oluşturucu'
  },
  en: {
    quickAccess: 'Quick Access',
    store: 'Store',
    themes: 'Themes',
    analytics: 'Analytics',
    customers: 'Customers',
    domains: 'Domains',
    billing: 'Billing',
    advertising: 'Advertising',
    aiContent: 'AI Content',
    videoCreator: 'Video Creator'
  }
};

const QuickAccessGrid = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="lg:col-span-2 space-y-4">
      <h2 className="text-xl font-semibold">{t.quickAccess}</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Link to="/dashboard/store" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <ShoppingCart className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm">{t.store}</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/theme-selection" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <PaintBucket className="h-6 w-6 mb-2 text-blue-500" />
              <span className="text-sm">{t.themes}</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/analytics" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <BarChart2 className="h-6 w-6 mb-2 text-green-500" />
              <span className="text-sm">{t.analytics}</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/customers" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Users className="h-6 w-6 mb-2 text-amber-500" />
              <span className="text-sm">{t.customers}</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/domain-management" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Globe className="h-6 w-6 mb-2 text-purple-500" />
              <span className="text-sm">{t.domains}</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/purchase" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <CreditCard className="h-6 w-6 mb-2 text-red-500" />
              <span className="text-sm">{t.billing}</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/advertising" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Megaphone className="h-6 w-6 mb-2 text-cyan-500" />
              <span className="text-sm">{t.advertising}</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/ai-content" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Sparkles className="h-6 w-6 mb-2 text-amber-500" />
              <span className="text-sm">{t.aiContent}</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/video-creator" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Film className="h-6 w-6 mb-2 text-pink-500" />
              <span className="text-sm">{t.videoCreator}</span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default QuickAccessGrid;
