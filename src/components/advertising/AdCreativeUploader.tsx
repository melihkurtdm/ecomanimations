
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UploadCloud, X, Image, FileVideo, Smartphone, Monitor, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AdCreative {
  id: string;
  type: 'image' | 'video';
  file: File | null;
  preview: string;
  title: string;
  description: string;
}

interface AdCreativeUploaderProps {
  onCreativesChange?: (creatives: AdCreative[]) => void;
}

const AdCreativeUploader: React.FC<AdCreativeUploaderProps> = ({ onCreativesChange }) => {
  const [activeTab, setActiveTab] = useState('images');
  const [creatives, setCreatives] = useState<AdCreative[]>([
    {
      id: '1',
      type: 'image',
      file: null,
      preview: '',
      title: '',
      description: ''
    }
  ]);
  const [currentCreativeIndex, setCurrentCreativeIndex] = useState(0);

  useEffect(() => {
    if (onCreativesChange) {
      onCreativesChange(creatives);
    }
  }, [creatives, onCreativesChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const updatedCreatives = [...creatives];
    const fileType = file.type.startsWith('image/') ? 'image' : 'video';
    
    updatedCreatives[currentCreativeIndex] = {
      ...updatedCreatives[currentCreativeIndex],
      file,
      type: fileType,
      preview: URL.createObjectURL(file)
    };
    
    setCreatives(updatedCreatives);
    
    toast({
      title: "Dosya yüklendi",
      description: `${file.name} başarıyla yüklendi.`,
    });
  };

  const handleAddCreative = () => {
    setCreatives([
      ...creatives,
      {
        id: `${Date.now()}`,
        type: 'image',
        file: null,
        preview: '',
        title: '',
        description: ''
      }
    ]);
    setCurrentCreativeIndex(creatives.length);
  };

  const handleRemoveCreative = (index: number) => {
    const updatedCreatives = creatives.filter((_, i) => i !== index);
    setCreatives(updatedCreatives);
    
    if (currentCreativeIndex >= updatedCreatives.length) {
      setCurrentCreativeIndex(Math.max(0, updatedCreatives.length - 1));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedCreatives = [...creatives];
    updatedCreatives[currentCreativeIndex] = {
      ...updatedCreatives[currentCreativeIndex],
      [name]: value
    };
    setCreatives(updatedCreatives);
  };

  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          Yüklediğiniz görseller ve videolar reklam politikalarına uygun olmalıdır.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4 col-span-1">
          <div className="font-medium">Reklam Görselleri</div>
          
          <div className="space-y-2">
            {creatives.map((creative, index) => (
              <div 
                key={creative.id}
                className={`flex items-center p-2 rounded-md cursor-pointer ${
                  index === currentCreativeIndex ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted'
                }`}
                onClick={() => setCurrentCreativeIndex(index)}
              >
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                  {creative.preview ? (
                    <img src={creative.preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Image className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-sm font-medium truncate">
                    {creative.title || `Görsel ${index + 1}`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {creative.file ? creative.file.name : 'Dosya yüklenmedi'}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCreative(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleAddCreative}>
            Yeni Görsel Ekle
          </Button>
        </div>
        
        <div className="col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="images">Görseller</TabsTrigger>
              <TabsTrigger value="preview">Önizleme</TabsTrigger>
            </TabsList>
            
            <TabsContent value="images" className="space-y-4">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  creatives[currentCreativeIndex]?.preview ? 'border-transparent' : 'border-muted-foreground/25'
                }`}
              >
                {creatives[currentCreativeIndex]?.preview ? (
                  <div className="relative">
                    <img 
                      src={creatives[currentCreativeIndex].preview} 
                      alt="Preview" 
                      className="mx-auto max-h-[300px] object-contain rounded-md" 
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={() => {
                        const updatedCreatives = [...creatives];
                        if (updatedCreatives[currentCreativeIndex].preview) {
                          URL.revokeObjectURL(updatedCreatives[currentCreativeIndex].preview);
                        }
                        updatedCreatives[currentCreativeIndex] = {
                          ...updatedCreatives[currentCreativeIndex],
                          file: null,
                          preview: ''
                        };
                        setCreatives(updatedCreatives);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Görsel veya Video Yükleyin</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      PNG, JPG, GIF veya MP4 (maks. 10MB)
                    </p>
                    <Input
                      type="file"
                      id="creative-file"
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                    <Label htmlFor="creative-file" asChild>
                      <Button variant="outline">Dosya Seç</Button>
                    </Label>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Başlık</Label>
                  <Input 
                    id="title"
                    name="title"
                    placeholder="Reklam başlığı"
                    value={creatives[currentCreativeIndex]?.title || ''}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Reklam açıklaması"
                    value={creatives[currentCreativeIndex]?.description || ''}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium mb-2">Reklam Önizlemesi</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Reklamınızın farklı platformlarda nasıl görüneceğini inceleyin
                </p>
                
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                      <Smartphone className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <span className="text-xs">Mobil</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <Monitor className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium">Masaüstü</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <div className="font-medium">Mağaza Adı</div>
                    <div className="text-xs text-muted-foreground">Reklam · Sponsorlu</div>
                  </div>
                </div>
                
                {creatives[currentCreativeIndex]?.preview ? (
                  <div className="rounded-md overflow-hidden mb-3 bg-muted">
                    <img 
                      src={creatives[currentCreativeIndex].preview} 
                      alt="Ad preview" 
                      className="w-full h-auto object-contain max-h-[300px]" 
                    />
                  </div>
                ) : (
                  <div className="rounded-md bg-muted h-[200px] flex items-center justify-center mb-3">
                    <Image className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                )}
                
                <h3 className="font-medium">
                  {creatives[currentCreativeIndex]?.title || "Reklam Başlığı"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {creatives[currentCreativeIndex]?.description || "Reklam açıklaması burada görünecek. Hedef kitlenizi etkileyecek bir metin yazın."}
                </p>
                
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Şimdi Satın Al
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdCreativeUploader;
