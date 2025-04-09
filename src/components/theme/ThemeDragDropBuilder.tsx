
import React, { useState, useEffect } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Grip, Plus, X, Settings, Eye, ArrowRight, Save, MoveVertical, Check, RotateCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WidgetItem {
  id: string;
  type: string;
  title: string;
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
    title: 'Ana Görsel',
    settings: {
      title: 'Modern Koleksiyonumuz',
      subtitle: 'En yeni ürünlerimizi keşfedin',
      buttonText: 'Alışverişe Başla',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    }
  },
  {
    id: 'featured-1',
    type: 'featured',
    title: 'Öne Çıkan Ürünler',
    settings: {
      title: 'En Çok Satanlar',
      productCount: 4
    }
  },
  {
    id: 'cta-1',
    type: 'cta',
    title: 'İndirim Duyurusu',
    settings: {
      title: 'Yaz İndirimleri Başladı',
      description: 'Tüm yaz koleksiyonunda %30 indirim',
      buttonText: 'İndirimleri Gör',
      backgroundColor: '#f3f4f6'
    }
  }
];

const availableWidgets: WidgetItem[] = [
  {
    id: 'hero',
    type: 'hero',
    title: 'Ana Görsel'
  },
  {
    id: 'featured',
    type: 'featured',
    title: 'Öne Çıkan Ürünler'
  },
  {
    id: 'cta',
    type: 'cta',
    title: 'Çağrı Bloğu'
  },
  {
    id: 'products',
    type: 'products',
    title: 'Ürün Koleksiyonu'
  },
  {
    id: 'categories',
    type: 'categories',
    title: 'Kategoriler'
  },
  {
    id: 'testimonials',
    type: 'testimonials',
    title: 'Müşteri Yorumları'
  },
  {
    id: 'newsletter',
    type: 'newsletter',
    title: 'Bülten Kaydı'
  },
  {
    id: 'blog',
    type: 'blog',
    title: 'Blog Yazıları'
  }
];

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
        description: `${widget.title} bileşeni sayfanıza eklendi.`,
      });
    }
  };
  
  const getDefaultSettings = (widgetType: string) => {
    switch(widgetType) {
      case 'hero':
        return {
          title: 'Yeni Koleksiyon',
          subtitle: 'Ürünlerimizi keşfedin',
          buttonText: 'Alışverişe Başla',
          imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
        };
      case 'featured':
        return {
          title: 'Öne Çıkan Ürünler',
          productCount: 4
        };
      case 'cta':
        return {
          title: 'Özel Teklif',
          description: 'Sınırlı süre için indirim',
          buttonText: 'Şimdi İncele',
          backgroundColor: '#f3f4f6'
        };
      case 'products':
        return {
          title: 'Ürünlerimiz',
          productCount: 8,
          columnCount: 4
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
      description: "Bileşen sayfanızdan kaldırıldı.",
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
        description: "Sayfa düzeniniz başarıyla kaydedildi.",
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
        title: "Sayfa yayınlandı",
        description: "Değişiklikleriniz canlı sitenizde yayınlandı.",
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
            className="bg-gray-100 p-6 rounded-md h-32 flex items-center justify-center"
            style={{ backgroundImage: widget.settings?.imageUrl ? `url(${widget.settings.imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="text-center bg-white bg-opacity-80 p-2 rounded">
              <h3 className="font-bold text-lg">{widget.settings?.title || "Ana Görsel Başlığı"}</h3>
              <p className="text-sm text-gray-600">{widget.settings?.subtitle || "Alt başlık metni burada"}</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-gray-800 text-white text-xs rounded">
                  {widget.settings?.buttonText || "Buton"}
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
                <div key={i} className="bg-white rounded h-12 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Ürün {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'cta':
        return (
          <div 
            className="p-4 rounded-md"
            style={{ backgroundColor: widget.settings?.backgroundColor || "#f3f4f6" }}
          >
            <div className="text-center">
              <h3 className="font-medium">{widget.settings?.title || "Çağrı Başlığı"}</h3>
              <p className="text-xs text-gray-600 mt-1">{widget.settings?.description || "Çağrı açıklaması"}</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-gray-800 text-white text-xs rounded">
                  {widget.settings?.buttonText || "Buton"}
                </span>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">{widget.settings?.title || "Ürün Koleksiyonu"}</h3>
            <div className={`grid grid-cols-${widget.settings?.columnCount || 3} gap-2`}>
              {Array(widget.settings?.productCount || 6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded h-10 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Ürün {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">Kategoriler</h3>
            <div className="flex flex-wrap gap-2">
              {['Giyim', 'Aksesuar', 'Ayakkabı', 'Çanta'].map((category, i) => (
                <div key={i} className="bg-white rounded px-3 py-2 text-xs">
                  {category}
                </div>
              ))}
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">Müşteri Yorumları</h3>
            <div className="space-y-2">
              {[1, 2].map((_, i) => (
                <div key={i} className="bg-white p-2 rounded text-xs">
                  <div className="flex items-center mb-1">
                    <div className="h-4 w-4 rounded-full bg-gray-300 mr-1"></div>
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
            <h3 className="font-medium mb-1">Bültenimize Abone Olun</h3>
            <p className="text-xs text-gray-500 mb-2">Yeni ürünler ve indirimlerden haberdar olun</p>
            <div className="flex space-x-1">
              <div className="bg-white h-6 flex-1 rounded"></div>
              <div className="bg-gray-800 h-6 w-16 rounded"></div>
            </div>
          </div>
        );
      case 'blog':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">Blog Yazıları</h3>
            <div className="space-y-2">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-10 w-10 bg-gray-300 rounded mr-2"></div>
                  <div>
                    <div className="h-3 w-24 bg-gray-300 rounded mb-1"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
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
          </div>
        );
      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={widgetSettings.title || ''} 
                onChange={(e) => updateSettings('title', e.target.value)}
                placeholder="Çağrı başlığı"
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Input 
                id="description" 
                value={widgetSettings.description || ''} 
                onChange={(e) => updateSettings('description', e.target.value)}
                placeholder="Açıklama metni"
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
              <Label htmlFor="backgroundColor">Arkaplan Rengi</Label>
              <div className="flex space-x-2">
                <Input 
                  id="backgroundColor" 
                  value={widgetSettings.backgroundColor || '#f3f4f6'} 
                  onChange={(e) => updateSettings('backgroundColor', e.target.value)}
                  placeholder="#f3f4f6"
                />
                <Input 
                  type="color" 
                  value={widgetSettings.backgroundColor || '#f3f4f6'} 
                  onChange={(e) => updateSettings('backgroundColor', e.target.value)}
                  className="w-12 p-1 h-10"
                />
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
                placeholder="Ürünler başlığı"
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
          </div>
        );
      default:
        return (
          <div className="py-4 text-center text-gray-500">
            Bu bileşen için özelleştirilebilir ayarlar bulunmuyor.
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 mt-6">
      {/* Kenar çubuğu */}
      <div className="col-span-12 md:col-span-3">
        <Card className="sticky top-24">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="widgets" className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Bileşenler
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Düzen
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TabsContent value="widgets" className="mt-0">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  {availableWidgets.map((widget) => (
                    <div
                      key={widget.id}
                      onClick={() => addWidget(widget.id)}
                      className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <span>{widget.title}</span>
                      <Plus className="h-4 w-4 text-gray-500" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <div className="space-y-4">
                <div className="p-3 border rounded-md bg-gray-50">
                  <h3 className="font-medium mb-2">Sayfa Ayarları</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="page-title">Sayfa Başlığı</Label>
                      <Input id="page-title" placeholder="Ana Sayfa" />
                    </div>
                    <div>
                      <Label htmlFor="page-description">Meta Açıklama</Label>
                      <Input id="page-description" placeholder="Sayfa açıklaması..." />
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border rounded-md bg-gray-50">
                  <h3 className="font-medium mb-2">Genel Stil</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="content-width">İçerik Genişliği</Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <Button variant="outline" size="sm" className="text-xs">Dar</Button>
                        <Button variant="outline" size="sm" className="text-xs bg-gray-100">Normal</Button>
                        <Button variant="outline" size="sm" className="text-xs">Geniş</Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="spacing">Bileşen Aralığı</Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <Button variant="outline" size="sm" className="text-xs">Az</Button>
                        <Button variant="outline" size="sm" className="text-xs bg-gray-100">Normal</Button>
                        <Button variant="outline" size="sm" className="text-xs">Çok</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <div className="mt-6 pt-4 border-t">
              <Button
                className="w-full"
                onClick={saveLayout}
                disabled={isSaving || isPublishing}
                style={{ backgroundColor: themeColor }}
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                    Kaydediliyor...
                  </span>
                ) : isSaved ? (
                  <span className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    Kaydedildi
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Düzeni Kaydet
                  </span>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                disabled={isPublishing}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreviewMode ? 'Düzenleme Moduna Dön' : 'Önizleme'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={publishSite}
                disabled={isPublishing || !isSaved}
              >
                {isPublishing ? (
                  <span className="flex items-center">
                    <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                    Yayınlanıyor...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Yayınla
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Ana içerik */}
      <div className="col-span-12 md:col-span-9">
        <div className="bg-white border rounded-lg p-6 min-h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <MoveVertical className="h-5 w-5 mr-2" style={{ color: themeColor }} />
              {isPreviewMode ? 'Sayfa Önizleme' : 'Sürükle & Bırak Düzenleyici'}
            </h2>
          </div>
          
          {activeWidgets.length === 0 ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <p className="text-gray-500">Soldaki menüden bileşen ekleyerek başlayın</p>
              <Button 
                variant="outline"
                className="mt-4"
                onClick={() => setActiveWidgets(defaultWidgets)}
              >
                Örnek şablonu yükle
              </Button>
            </div>
          ) : (
            <Reorder.Group 
              axis="y" 
              values={activeWidgets} 
              onReorder={setActiveWidgets}
              className="space-y-4"
            >
              {activeWidgets.map((widget) => (
                <Reorder.Item
                  key={widget.id}
                  value={widget}
                  className={`border rounded-lg overflow-hidden transition-shadow ${
                    selectedWidget === widget.id ? 'ring-2 ring-blue-500 shadow-md' : ''
                  } ${isPreviewMode ? '' : 'hover:shadow-md'}`}
                  onClick={() => !isPreviewMode && setSelectedWidget(widget.id)}
                  drag={!isPreviewMode}
                >
                  {!isPreviewMode && (
                    <div className="bg-gray-100 p-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <Grip className="h-4 w-4 mr-2 text-gray-400 cursor-move" />
                        <span className="font-medium">{widget.title}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => openWidgetSettings(widget, e)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={(e) => removeWidget(widget.id, e)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4">
                    {renderWidgetPreview(widget)}
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </div>
      </div>
      
      {/* Widget ayarları diyaloğu */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentEditingWidget?.title} Ayarları</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {renderSettingsForm(currentEditingWidget)}
          </div>
          
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
