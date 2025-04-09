
import React, { useState, useEffect } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Grip, Plus, X, Settings, Eye, ArrowRight, Save, MoveVertical, Check, RotateCw, ShoppingBag, Image, Tag, MessageSquare, Users, Mail, Clock, Truck, Layers } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface WidgetItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
  settings?: Record<string, any>;
}

interface ThemeDragDropBuilderProps {
  themeId: string;
  themeColor: string;
}

const defaultWidgets: WidgetItem[] = [
  {
    id: 'hero-1',
    type: 'hero',
    title: 'Ana Görsel Alanı',
    description: 'Dikkat çekici ana görsel ve çağrı metni ile ziyaretçilerinizi karşılayın',
    settings: {
      title: 'Yeni Koleksiyonumuzu Keşfedin',
      subtitle: 'Sezonun en trend ürünleri sizleri bekliyor',
      buttonText: 'Alışverişe Başla',
      imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    }
  },
  {
    id: 'featured-1',
    type: 'featured',
    title: 'Öne Çıkan Ürünler',
    description: 'En çok satan veya öne çıkarmak istediğiniz ürünleri gösterin',
    settings: {
      title: 'En Çok Satanlar',
      productCount: 4,
      showPrices: true,
      showRatings: true
    }
  },
  {
    id: 'categories-1',
    type: 'categories',
    title: 'Kategori Vitrini',
    description: 'Ürün kategorilerinizi görsel olarak sergileyin',
    settings: {
      title: 'Kategoriler',
      layout: 'grid',
      columnCount: 3
    }
  }
];

const availableWidgets: WidgetItem[] = [
  {
    id: 'hero',
    type: 'hero',
    title: 'Ana Görsel Alanı',
    description: 'Dikkat çekici ana görsel ve çağrı metni'
  },
  {
    id: 'featured',
    type: 'featured',
    title: 'Öne Çıkan Ürünler',
    description: 'En çok satan veya indirimli ürünler'
  },
  {
    id: 'categories',
    type: 'categories',
    title: 'Kategori Vitrini',
    description: 'Ürün kategorileriniz'
  },
  {
    id: 'products',
    type: 'products',
    title: 'Ürün Koleksiyonu',
    description: 'Ürün listesi veya grid görünümü'
  },
  {
    id: 'banner',
    type: 'banner',
    title: 'Kampanya Bannerı',
    description: 'İndirim veya kampanya duyurusu'
  },
  {
    id: 'testimonials',
    type: 'testimonials',
    title: 'Müşteri Yorumları',
    description: 'Güven artırıcı müşteri değerlendirmeleri'
  },
  {
    id: 'newsletter',
    type: 'newsletter',
    title: 'E-Bülten Kaydı',
    description: 'Ziyaretçilerinizden e-posta toplayın'
  },
  {
    id: 'benefits',
    type: 'benefits',
    title: 'Alışveriş Avantajları',
    description: 'Ücretsiz kargo, iade garantisi vb.'
  },
  {
    id: 'instagram',
    type: 'instagram',
    title: 'Instagram Galerisi',
    description: 'Sosyal medya içeriklerinizi gösterin'
  },
  {
    id: 'countdown',
    type: 'countdown',
    title: 'Geri Sayım',
    description: 'Sınırlı süreli kampanyalar için'
  }
];

const eCommerceIcons: Record<string, React.ElementType> = {
  'hero': Image,
  'featured': ShoppingBag,
  'categories': Tag,
  'products': ShoppingBag,
  'banner': Image,
  'testimonials': MessageSquare,
  'newsletter': Mail,
  'benefits': Truck,
  'instagram': Image,
  'countdown': Clock
};

const ThemeDragDropBuilder: React.FC<ThemeDragDropBuilderProps> = ({ themeId, themeColor }) => {
  const [activeWidgets, setActiveWidgets] = useState<WidgetItem[]>(defaultWidgets);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [currentEditingWidget, setCurrentEditingWidget] = useState<WidgetItem | null>(null);
  const [currentTab, setCurrentTab] = useState("widgets");
  
  // Widget ayarlarını içerecek state
  const [widgetSettings, setWidgetSettings] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Kullanıcı widget eklediğinde ya da düzenlediğinde isSaved'i false yap
    setIsSaved(false);
  }, [activeWidgets]);

  const addWidget = (widgetType: string) => {
    const widget = availableWidgets.find(w => w.id === widgetType);
    if (widget) {
      const newWidget = {
        ...widget,
        id: `${widgetType}-${Date.now()}`,
        settings: getDefaultSettings(widgetType)
      };
      
      setActiveWidgets([...activeWidgets, newWidget]);
      
      toast({
        title: "Bileşen eklendi",
        description: `${widget.title} bileşeni mağazanıza eklendi.`,
      });
    }
  };
  
  const getDefaultSettings = (widgetType: string) => {
    switch(widgetType) {
      case 'hero':
        return {
          title: 'Yeni Koleksiyonumuzu Keşfedin',
          subtitle: 'Sezonun en trend ürünleri sizleri bekliyor',
          buttonText: 'Alışverişe Başla',
          imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
          textColor: '#ffffff',
          buttonColor: themeColor
        };
      case 'featured':
        return {
          title: 'Öne Çıkan Ürünler',
          productCount: 4,
          showPrices: true,
          showRatings: true
        };
      case 'categories':
        return {
          title: 'Kategoriler',
          layout: 'grid',
          columnCount: 3
        };
      case 'products':
        return {
          title: 'Ürünlerimiz',
          productCount: 8,
          columnCount: 4,
          showFilters: true
        };
      case 'banner':
        return {
          title: 'Özel Kampanya',
          description: 'Tüm siparişlerde %20 indirim',
          buttonText: 'Detaylar',
          backgroundColor: '#f9f9f9',
          imageUrl: ''
        };
      case 'testimonials':
        return {
          title: 'Müşterilerimiz Ne Diyor?',
          testimonialCount: 3,
          showAvatar: true
        };
      case 'newsletter':
        return {
          title: 'Yeni Ürünler ve İndirimlerden Haberdar Olun',
          description: 'E-bültenimize üye olarak kampanyalardan ilk siz haberdar olun',
          buttonText: 'Abone Ol',
          placeholderText: 'E-posta adresiniz'
        };
      case 'benefits':
        return {
          benefits: [
            { title: 'Ücretsiz Kargo', description: '150 TL üzeri siparişlerde' },
            { title: '30 Gün İade', description: 'Koşulsuz iade garantisi' }, 
            { title: 'Güvenli Ödeme', description: '256-bit SSL güvenliği' }
          ]
        };
      case 'countdown':
        return {
          title: 'Kampanya Bitimine Kalan Süre',
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          showDays: true,
          showHours: true
        };
      default:
        return {};
    }
  };

  const removeWidget = (widgetId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    setActiveWidgets(activeWidgets.filter(w => w.id !== widgetId));
    if (selectedWidget === widgetId) {
      setSelectedWidget(null);
    }
    
    toast({
      title: "Bileşen kaldırıldı",
      description: "Bileşen mağazanızdan kaldırıldı.",
    });
  };

  const saveLayout = () => {
    setIsSaving(true);
    
    // Kaydetme animasyonu için gecikme
    setTimeout(() => {
      setIsSaved(true);
      setIsSaving(false);
      
      toast({
        title: "Düzen kaydedildi",
        description: "Mağaza düzeniniz başarıyla kaydedildi.",
      });
    }, 1500);
  };
  
  const publishSite = () => {
    if (!isSaved) {
      toast({
        title: "Önce değişiklikleri kaydedin",
        description: "Yayınlamadan önce düzeni kaydetmelisiniz.",
        variant: "destructive",
      });
      return;
    }
    
    setIsPublishing(true);
    
    // Yayınlama animasyonu için gecikme
    setTimeout(() => {
      setIsPublishing(false);
      
      toast({
        title: "Mağaza yayınlandı",
        description: "Değişiklikleriniz canlı mağazanızda yayınlandı.",
      });
    }, 2000);
  };
  
  const openWidgetSettings = (widget: WidgetItem, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    setCurrentEditingWidget(widget);
    setWidgetSettings(widget.settings || {});
    setShowSettingsDialog(true);
  };
  
  const saveWidgetSettings = () => {
    if (!currentEditingWidget) return;
    
    const updatedWidgets = activeWidgets.map(widget => {
      if (widget.id === currentEditingWidget.id) {
        return {
          ...widget,
          settings: widgetSettings
        };
      }
      return widget;
    });
    
    setActiveWidgets(updatedWidgets);
    setShowSettingsDialog(false);
    setCurrentEditingWidget(null);
    
    toast({
      title: "Ayarlar kaydedildi",
      description: "Bileşen ayarları başarıyla güncellendi.",
    });
  };

  const renderWidgetPreview = (widget: WidgetItem) => {
    
    
    switch (widget.type) {
      case 'hero':
        return (
          <div 
            className="bg-gray-100 p-6 rounded-md h-32 flex items-center justify-center relative overflow-hidden"
            style={{ 
              backgroundImage: widget.settings?.imageUrl ? `url(${widget.settings.imageUrl})` : undefined, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="text-center relative z-10 bg-white bg-opacity-80 p-2 rounded">
              <h3 className="font-bold text-lg">{widget.settings?.title || "Ana Görsel Başlığı"}</h3>
              <p className="text-sm text-gray-600">{widget.settings?.subtitle || "Alt başlık metni burada"}</p>
              <div className="mt-2">
                <span 
                  className="inline-block px-3 py-1 text-white text-xs rounded"
                  style={{ backgroundColor: widget.settings?.buttonColor || themeColor }}
                >
                  {widget.settings?.buttonText || "Alışverişe Başla"}
                </span>
              </div>
            </div>
          </div>
        );
      case 'featured':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">{widget.settings?.title || "Öne Çıkan Ürünler"}</h3>
            <div className="grid grid-cols-2 gap-2">
              {Array(widget.settings?.productCount || 4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded overflow-hidden">
                  <div className="h-10 bg-gray-200"></div>
                  <div className="p-2">
                    <div className="h-3 w-full bg-gray-300 rounded-sm"></div>
                    {widget.settings?.showPrices && (
                      <div className="h-3 w-1/2 bg-gray-400 rounded-sm mt-1"></div>
                    )}
                    {widget.settings?.showRatings && (
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-2 w-2 rounded-full bg-yellow-400 mr-0.5"></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">{widget.settings?.title || "Kategoriler"}</h3>
            <div className={`grid grid-cols-${widget.settings?.columnCount || 3} gap-2`}>
              {['Giyim', 'Aksesuar', 'Ayakkabı', 'Çanta', 'Elektronik', 'Ev'].slice(0, widget.settings?.columnCount || 3).map((category, i) => (
                <div key={i} className="bg-white rounded h-12 flex items-center justify-center">
                  <span className="text-xs text-gray-700">{category}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{widget.settings?.title || "Ürün Koleksiyonu"}</h3>
              {widget.settings?.showFilters && (
                <div className="flex gap-1">
                  <div className="h-5 w-12 bg-white rounded-sm"></div>
                  <div className="h-5 w-12 bg-white rounded-sm"></div>
                </div>
              )}
            </div>
            <div className={`grid grid-cols-${widget.settings?.columnCount || 4} gap-2`}>
              {Array(Math.min(widget.settings?.productCount || 8, 8)).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded h-10 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Ürün {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'banner':
        return (
          <div 
            className="p-4 rounded-md"
            style={{ backgroundColor: widget.settings?.backgroundColor || "#f9f9f9" }}
          >
            <div className="text-center">
              <h3 className="font-medium">{widget.settings?.title || "Özel Kampanya"}</h3>
              <p className="text-xs text-gray-600 mt-1">{widget.settings?.description || "Tüm siparişlerde %20 indirim"}</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-gray-800 text-white text-xs rounded">
                  {widget.settings?.buttonText || "Detaylar"}
                </span>
              </div>
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">{widget.settings?.title || "Müşterilerimiz Ne Diyor?"}</h3>
            <div className="space-y-2">
              {Array(widget.settings?.testimonialCount || 3).fill(0).map((_, i) => (
                <div key={i} className="bg-white p-2 rounded text-xs">
                  <div className="flex items-center mb-1">
                    {widget.settings?.showAvatar && (
                      <div className="h-4 w-4 rounded-full bg-gray-300 mr-1"></div>
                    )}
                    <span className="font-medium">Müşteri {i+1}</span>
                  </div>
                  <p className="text-gray-500">Harika ürünler ve hızlı teslimat!</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'newsletter':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-1">{widget.settings?.title || "Bültenimize Abone Olun"}</h3>
            <p className="text-xs text-gray-500 mb-2">{widget.settings?.description || "Yeni ürünler ve indirimlerden haberdar olun"}</p>
            <div className="flex space-x-1">
              <div className="bg-white h-6 flex-1 rounded"></div>
              <div className="bg-gray-800 h-6 w-16 rounded"></div>
            </div>
          </div>
        );
      case 'benefits':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="grid grid-cols-3 gap-2">
              {(widget.settings?.benefits || [
                { title: 'Ücretsiz Kargo', description: '150 TL üzeri siparişlerde' },
                { title: '30 Gün İade', description: 'Koşulsuz iade garantisi' }, 
                { title: 'Güvenli Ödeme', description: '256-bit SSL güvenliği' }
              ]).map((benefit, i) => (
                <div key={i} className="bg-white p-2 rounded text-center">
                  <div className="h-4 w-4 mx-auto mb-1 bg-gray-300 rounded-full"></div>
                  <h4 className="text-xs font-medium">{benefit.title}</h4>
                  <p className="text-xs text-gray-500">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'countdown':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">{widget.settings?.title || "Kampanya Bitimine Kalan Süre"}</h3>
            <div className="flex justify-center space-x-2">
              {widget.settings?.showDays && (
                <div className="bg-white p-2 rounded">
                  <div className="text-center">
                    <span className="text-xs font-bold">00</span>
                    <p className="text-xs text-gray-500">Gün</p>
                  </div>
                </div>
              )}
              {widget.settings?.showHours && (
                <>
                  <div className="bg-white p-2 rounded">
                    <div className="text-center">
                      <span className="text-xs font-bold">00</span>
                      <p className="text-xs text-gray-500">Saat</p>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded">
                    <div className="text-center">
                      <span className="text-xs font-bold">00</span>
                      <p className="text-xs text-gray-500">Dakika</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-4 rounded-md h-20 flex items-center justify-center">
            <span className="text-gray-500">{widget.title} içeriği</span>
          </div>
        );
    }
  };
  
  // Ayarlar diyaloğunda gösterilecek form
  const renderSettingsForm = (widget: WidgetItem | null) => {
    if (!widget) return null;
    
    const updateSettings = (key: string, value: any) => {
      setWidgetSettings(prev => ({
        ...prev,
        [key]: value
      }));
    };
    
    switch (widget.type) {
      
      
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={widgetSettings.title || ''} 
                onChange={(e) => updateSettings('title', e.target.value)}
                placeholder="Ana başlık"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Alt Başlık</Label>
              <Input 
                id="subtitle" 
                value={widgetSettings.subtitle || ''} 
                onChange={(e) => updateSettings('subtitle', e.target.value)}
                placeholder="Alt başlık"
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Buton Metni</Label>
              <Input 
                id="buttonText" 
                value={widgetSettings.buttonText || ''} 
                onChange={(e) => updateSettings('buttonText', e.target.value)}
                placeholder="Buton metni"
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">Görsel URL</Label>
              <Input 
                id="imageUrl" 
                value={widgetSettings.imageUrl || ''} 
                onChange={(e) => updateSettings('imageUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="buttonColor">Buton Rengi</Label>
              <div className="flex space-x-2">
                <Input 
                  id="buttonColor" 
                  value={widgetSettings.buttonColor || themeColor} 
                  onChange={(e) => updateSettings('buttonColor', e.target.value)}
                  placeholder="#8B5CF6"
                />
                <Input 
                  type="color" 
                  value={widgetSettings.buttonColor || themeColor} 
                  onChange={(e) => updateSettings('buttonColor', e.target.value)}
                  className="w-12 p-1 h-10"
                />
              </div>
            </div>
          </div>
        );
      case 'featured':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={widgetSettings.title || ''} 
                onChange={(e) => updateSettings('title', e.target.value)}
                placeholder="Bölüm başlığı"
              />
            </div>
            <div>
              <Label htmlFor="productCount">Ürün Sayısı</Label>
              <Input 
                id="productCount" 
                type="number"
                value={widgetSettings.productCount || 4} 
                onChange={(e) => updateSettings('productCount', parseInt(e.target.value))}
                min={1}
                max={12}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showPrices"
                checked={widgetSettings.showPrices || false}
                onCheckedChange={(checked) => updateSettings('showPrices', checked)}
              />
              <Label htmlFor="showPrices">Fiyatları göster</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showRatings"
                checked={widgetSettings.showRatings || false}
                onCheckedChange={(checked) => updateSettings('showRatings', checked)}
              />
              <Label htmlFor="showRatings">Değerlendirmeleri göster</Label>
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={widgetSettings.title || ''} 
                onChange={(e) => updateSettings('title', e.target.value)}
                placeholder="Kategoriler"
              />
            </div>
            <div>
              <Label htmlFor="columnCount">Sütun Sayısı</Label>
              <Input 
                id="columnCount" 
                type="number"
                value={widgetSettings.columnCount || 3} 
                onChange={(e) => updateSettings('columnCount', parseInt(e.target.value))}
                min={1}
                max={6}
              />
            </div>
            <div>
              <Label htmlFor="layout">Görünüm</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Button 
                  type="button" 
                  variant={widgetSettings.layout === 'grid' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => updateSettings('layout', 'grid')}
                >
                  Grid
                </Button>
                <Button 
                  type="button" 
                  variant={widgetSettings.layout === 'list' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => updateSettings('layout', 'list')}
                >
                  Liste
                </Button>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={widgetSettings.title || ''} 
                onChange={(e) => updateSettings('title', e.target.value)}
                placeholder="Ürünlerimiz"
              />
            </div>
            <div>
              <Label htmlFor="productCount">Ürün Sayısı</Label>
              <Input 
                id="productCount" 
                type="number"
                value={widgetSettings.productCount || 8} 
                onChange={(e) => updateSettings('productCount', parseInt(e.target.value))}
                min={1}
                max={24}
              />
            </div>
            <div>
              <Label htmlFor="columnCount">Sütun Sayısı</Label>
              <Input 
                id="columnCount" 
                type="number"
                value={widgetSettings.columnCount || 4} 
                onChange={(e) => updateSettings('columnCount', parseInt(e.target.value))}
                min={1}
                max={6}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showFilters"
                checked={widgetSettings.showFilters || false}
                onCheckedChange={(checked) => updateSettings('showFilters', checked)}
              />
              <Label htmlFor="showFilters">Filtreler göster</Label>
            </div>
          </div>
        );
      case 'banner':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={widgetSettings.title || ''} 
                onChange={(e) => updateSettings('title', e.target.value)}
                placeholder="Özel Kampanya"
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea 
                id="description" 
                value={widgetSettings.description || ''} 
                onChange={(e) => updateSettings('description', e.target.value)}
                placeholder="Kampanya açıklaması"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Buton Metni</Label>
              <Input 
                id="buttonText" 
                value={widgetSettings.buttonText || ''} 
                onChange={(e) => updateSettings('buttonText', e.target.value)}
                placeholder="Detaylar"
              />
            </div>
            <div>
              <Label htmlFor="backgroundColor">Arkaplan Rengi</Label>
              <div className="flex space-x-2">
                <Input 
                  id="backgroundColor" 
                  value={widgetSettings.backgroundColor || '#f9f9f9'} 
                  onChange={(e) => updateSettings('backgroundColor', e.target.value)}
                  placeholder="#f9f9f9"
                />
                <Input 
                  type="color" 
                  value={widgetSettings.backgroundColor || '#f9f9f9'} 
                  onChange={(e) => updateSettings('backgroundColor', e.target.value)}
                  className="w-12 p-1 h-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="imageUrl">Görsel URL (opsiyonel)</Label>
              <Input 
                id="imageUrl" 
                value={widgetSettings.imageUrl || ''} 
                onChange={(e) => updateSettings('imageUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={widgetSettings.title || ''} 
                onChange={(e) => updateSettings('title', e.target.value)}
                placeholder="Müşterilerimiz Ne Diyor?"
              />
            </div>
            <div>
              <Label htmlFor="testimonialCount">Yorum Sayısı</Label>
              <Input 
                id="testimonialCount" 
                type="number"
                value={widgetSettings.testimonialCount || 3} 
                onChange={(e) => updateSettings('testimonialCount', parseInt(e.target.value))}
                min={1}
                max={10}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showAvatar"
                checked={widgetSettings.showAvatar || false}
                onCheckedChange={(checked) => updateSettings('showAvatar', checked)}
              />
              <Label htmlFor="showAvatar">Profil resimlerini göster</Label>
            </div>
          </div>
        );
      case 'newsletter':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={widgetSettings.title || ''} 
                onChange={(e) => updateSettings('title', e.target.value)}
                placeholder="Bültenimize Abone Olun"
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea 
                id="description" 
                value={widgetSettings.description || ''} 
                onChange={(e) => updateSettings('description', e.target.value)}
                placeholder="E-bülten açıklaması"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Buton Metni</Label>
              <Input 
                id="buttonText" 
                value={widgetSettings.buttonText || ''} 
                onChange={(e) => updateSettings('buttonText', e.target.value)}
                placeholder="Abone Ol"
              />
            </div>
            <div>
              <Label htmlFor="placeholderText">Form Placeholder Metni</Label>
              <Input 
                id="placeholderText" 
                value={widgetSettings.placeholderText || ''} 
                onChange={(e) => updateSettings('placeholderText', e.target.value)}
                placeholder="E-posta adresiniz"
              />
            </div>
          </div>
        );
      case 'countdown':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={widgetSettings.title || ''} 
                onChange={(e) => updateSettings('title', e.target.value)}
                placeholder="Kampanya Bitimine Kalan Süre"
              />
            </div>
            <div>
              <Label htmlFor="endDate">Bitiş Tarihi</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={widgetSettings.endDate ? new Date(widgetSettings.endDate).toISOString().slice(0, 16) : ''}
                onChange={(e) => updateSettings('endDate', new Date(e.target.value).toISOString())}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showDays"
                checked={widgetSettings.showDays || false}
                onCheckedChange={(checked) => updateSettings('showDays', checked)}
              />
              <Label htmlFor="showDays">Günleri göster</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showHours"
                checked={widgetSettings.showHours || false}
                onCheckedChange={(checked) => updateSettings('showHours', checked)}
              />
              <Label htmlFor="showHours">Saatleri göster</Label>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Bu bileşen için ayar bulunmamaktadır.
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sol panel - Sürükle bırak bileşenler */}
      <div className="lg:col-span-1">
        <Tabs defaultValue="widgets" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="w-full">
            <TabsTrigger value="widgets" className="flex-1">Bileşenler</TabsTrigger>
            <TabsTrigger value="design" className="flex-1">Tasarım</TabsTrigger>
          </TabsList>
          
          <TabsContent value="widgets" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">E-Ticaret Bileşenleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {availableWidgets.map((widget) => {
                    const IconComponent = eCommerceIcons[widget.type] || ShoppingBag;
                    
                    return (
                      <Button
                        key={widget.id}
                        variant="outline"
                        className="h-auto py-3 px-3 flex flex-col items-center justify-center text-center"
                        onClick={() => addWidget(widget.id)}
                      >
                        <IconComponent className="h-5 w-5 mb-1" />
                        <span className="text-sm font-medium">{widget.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="design" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tasarım Ayarları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Ana Renk</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input 
                        type="color" 
                        value={themeColor} 
                        className="w-12 p-1 h-10"
                        readOnly
                      />
                      <Input 
                        value={themeColor} 
                        className="flex-1"
                        readOnly
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Tema özelleştirme sayfasından ana rengi değiştirebilirsiniz.</p>
                  </div>
                  
                  <div>
                    <Label>Mobil Görünüm</Label>
                    <div className="mt-2">
                      <Button variant="outline" className="w-full flex items-center">
                        <MoveVertical className="h-4 w-4 mr-2" />
                        Sıralamayı Değiştir
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Mobil görünümde bileşenlerin sıralamasını değiştirebilirsiniz.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sağ panel - Önizleme */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Sayfa Düzeni</CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center gap-1"
              >
                <Eye className="h-4 w-4" />
                {isPreviewMode ? "Düzenleme Modu" : "Önizleme"}
              </Button>
              
              <Button 
                variant={isSaved ? "outline" : "default"} 
                size="sm"
                onClick={saveLayout}
                disabled={isSaving}
                className="flex items-center gap-1"
              >
                {isSaving ? (
                  <RotateCw className="h-4 w-4 animate-spin" />
                ) : isSaved ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? "Kaydediliyor..." : isSaved ? "Kaydedildi" : "Kaydet"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={publishSite}
                disabled={isPublishing || !isSaved}
                className="flex items-center gap-1 text-green-600 border-green-600 hover:bg-green-50"
              >
                {isPublishing ? (
                  <RotateCw className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                {isPublishing ? "Yayınlanıyor..." : "Yayınla"}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-[600px] rounded-md">
              <div className={`space-y-3 p-1 ${isPreviewMode ? 'pointer-events-none' : ''}`}>
                {/* Aktif bileşenlerin sürükle bırak alanı */}
                {activeWidgets.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      <Layers className="h-10 w-10 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium text-gray-700 mb-1">Sayfanız boş görünüyor</h3>
                      <p className="text-gray-500 mb-4">Soldaki bileşenlerden ekleyerek mağaza sayfanızı oluşturun</p>
                      <Button 
                        variant="default" 
                        className="flex items-center gap-2"
                        onClick={() => setCurrentTab("widgets")}
                      >
                        <Plus className="h-4 w-4" />
                        Bileşen Ekle
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Reorder.Group 
                    axis="y" 
                    values={activeWidgets} 
                    onReorder={setActiveWidgets}
                    className="space-y-3"
                  >
                    {activeWidgets.map((widget) => {
                      const dragControls = useDragControls();
                      
                      return (
                        <Reorder.Item
                          key={widget.id}
                          value={widget}
                          dragControls={dragControls}
                          dragListener={!isPreviewMode}
                        >
                          <motion.div 
                            className={`relative border rounded-lg overflow-hidden ${selectedWidget === widget.id ? 'ring-2 ring-primary' : 'border-gray-200'}`}
                            onClick={() => setSelectedWidget(widget.id)}
                            whileTap={{ scale: !isPreviewMode ? 0.98 : 1 }}
                          >
                            {!isPreviewMode && (
                              <div className="absolute top-2 right-2 z-10 flex space-x-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 bg-white"
                                  onClick={(e) => openWidgetSettings(widget, e)}
                                >
                                  <Settings className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 bg-white text-red-500 hover:text-red-700"
                                  onClick={(e) => removeWidget(widget.id, e)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                            
                            {!isPreviewMode && (
                              <div 
                                className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing p-1.5 rounded-md bg-white border"
                                onPointerDown={(e) => dragControls.start(e)}
                              >
                                <Grip className="h-3 w-3 text-gray-400" />
                              </div>
                            )}
                            
                            <div className="p-2">
                              {renderWidgetPreview(widget)}
                            </div>
                            
                            {!isPreviewMode && (
                              <div className="bg-gray-50 px-3 py-2 text-xs text-gray-500 flex items-center justify-between border-t">
                                <span>{widget.title}</span>
                                <span className="text-gray-400">#{widget.type}</span>
                              </div>
                            )}
                          </motion.div>
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      {/* Ayarlar diyaloğu */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bileşen Ayarları</DialogTitle>
          </DialogHeader>
          
          {renderSettingsForm(currentEditingWidget)}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
              İptal
            </Button>
            <Button onClick={saveWidgetSettings}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThemeDragDropBuilder;
