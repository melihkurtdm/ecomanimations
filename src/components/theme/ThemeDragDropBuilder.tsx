
import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Grip, Plus, X, Settings, Eye, ArrowRight, Save, MoveVertical } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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

  const addWidget = (widgetType: string) => {
    const widget = availableWidgets.find(w => w.id === widgetType);
    if (widget) {
      const newWidget = {
        ...widget,
        id: `${widgetType}-${Date.now()}`,
      };
      
      setActiveWidgets([...activeWidgets, newWidget]);
      
      toast({
        title: "Bileşen eklendi",
        description: `${widget.title} bileşeni sayfanıza eklendi.`,
      });
    }
  };

  const removeWidget = (widgetId: string) => {
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
    setIsSaved(true);
    
    toast({
      title: "Düzen kaydedildi",
      description: "Sayfa düzeniniz başarıyla kaydedildi.",
    });
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const renderWidgetPreview = (widget: WidgetItem) => {
    switch (widget.type) {
      case 'hero':
        return (
          <div className="bg-gray-100 p-6 rounded-md h-32 flex items-center justify-center">
            <div className="text-center">
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
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded h-12 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Ürün {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'cta':
        return (
          <div className="bg-gray-100 p-4 rounded-md">
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
            <h3 className="font-medium mb-2">Ürün Koleksiyonu</h3>
            <div className="grid grid-cols-3 gap-2">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded h-10 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Ürün {i+1}</span>
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

  return (
    <div className="grid grid-cols-12 gap-6 mt-6">
      {/* Kenar çubuğu */}
      <div className="col-span-12 md:col-span-3">
        <Card className="sticky top-24">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Bileşen Ekle
            </CardTitle>
          </CardHeader>
          <CardContent>
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
            
            <div className="mt-6 pt-4 border-t">
              <Button
                className="w-full"
                onClick={saveLayout}
                style={{ backgroundColor: themeColor }}
              >
                {isSaved ? (
                  <span className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
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
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreviewMode ? 'Düzenleme Moduna Dön' : 'Önizleme'}
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
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => toast({
                title: "Sayfa yayınlandı",
                description: "Değişiklikleriniz canlı sitenizde yayınlandı.",
              })}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Yayınla
              </Button>
            </div>
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
                  className={`border rounded-lg overflow-hidden ${
                    selectedWidget === widget.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => isPreviewMode ? null : setSelectedWidget(widget.id)}
                >
                  {!isPreviewMode && (
                    <div className="bg-gray-100 p-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <Grip className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-medium">{widget.title}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeWidget(widget.id);
                          }}
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
    </div>
  );
};

export default ThemeDragDropBuilder;
