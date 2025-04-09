
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Sparkles, Upload, RefreshCw, Save, Wand2, Video, Play, Film, Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';

const translations = {
  tr: {
    title: 'AI Video Kreatif Oluşturucu',
    description: 'Yapay zeka destekli video oluşturma aracı',
    back: 'Geri Dön',
    videoGenTab: 'Video Oluştur',
    videoEditTab: 'Video Düzenle',
    videoConvertTab: 'Video Dönüştür',
    videoGenTitle: 'Video Oluştur',
    videoGenSubtitle: 'AI ile etkileyici videolar oluşturun',
    prompt: 'Video İçeriği',
    promptPlaceholder: 'Videoda görmek istediğiniz içeriği tanımlayın...',
    duration: 'Süre (saniye)',
    style: 'Stil',
    styleOptions: {
      cinematic: 'Sinematik',
      commercial: 'Reklam',
      documentary: 'Belgesel',
      social: 'Sosyal Medya'
    },
    aspectRatio: 'En-Boy Oranı',
    aspectRatioOptions: {
      landscape: 'Yatay (16:9)',
      portrait: 'Dikey (9:16)',
      square: 'Kare (1:1)'
    },
    includeAudio: 'Ses Ekle',
    includeText: 'Metin Ekle',
    generate: 'Oluştur',
    regenerate: 'Yeniden Oluştur',
    saveVideo: 'Kaydet',
    generatedTitle: 'Oluşturulan Video',
    generating: 'Video oluşturuluyor...',
    videoEditTitle: 'Video Düzenle',
    videoEditSubtitle: 'Mevcut videolarınızı düzenleyin',
    uploadVideo: 'Video Yükle',
    effects: 'Efektler',
    videoConvertTitle: 'Video Dönüştür',
    videoConvertSubtitle: 'Videolarınızı farklı formatlara dönüştürün',
    format: 'Format',
    resolution: 'Çözünürlük',
    saved: 'Video başarıyla kaydedildi!',
    error: 'Bir hata oluştu',
    errorDetail: 'Video oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
  },
  en: {
    title: 'AI Video Creative Generator',
    description: 'AI-powered video creation tool',
    back: 'Go Back',
    videoGenTab: 'Generate Video',
    videoEditTab: 'Edit Video',
    videoConvertTab: 'Convert Video',
    videoGenTitle: 'Generate Video',
    videoGenSubtitle: 'Create compelling videos with AI',
    prompt: 'Video Content',
    promptPlaceholder: 'Describe what you want to see in your video...',
    duration: 'Duration (seconds)',
    style: 'Style',
    styleOptions: {
      cinematic: 'Cinematic',
      commercial: 'Commercial',
      documentary: 'Documentary',
      social: 'Social Media'
    },
    aspectRatio: 'Aspect Ratio',
    aspectRatioOptions: {
      landscape: 'Landscape (16:9)',
      portrait: 'Portrait (9:16)',
      square: 'Square (1:1)'
    },
    includeAudio: 'Include Audio',
    includeText: 'Include Text',
    generate: 'Generate',
    regenerate: 'Regenerate',
    saveVideo: 'Save',
    generatedTitle: 'Generated Video',
    generating: 'Generating video...',
    videoEditTitle: 'Edit Video',
    videoEditSubtitle: 'Edit your existing videos',
    uploadVideo: 'Upload Video',
    effects: 'Effects',
    videoConvertTitle: 'Convert Video',
    videoConvertSubtitle: 'Convert your videos to different formats',
    format: 'Format',
    resolution: 'Resolution',
    saved: 'Video saved successfully!',
    error: 'An error occurred',
    errorDetail: 'There was an error generating your video. Please try again later.'
  }
};

// Mock function to simulate video generation
const mockGenerateVideo = async (prompt: string, options: any): Promise<string> => {
  // This would be replaced with an actual API call to a video generation service
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // For demonstration, return a sample video URL
  return 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
};

const VideoCreator: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [activeTab, setActiveTab] = useState('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');
  
  // Video generation form
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState([15]);
  const [style, setStyle] = useState('cinematic');
  const [aspectRatio, setAspectRatio] = useState('landscape');
  const [includeAudio, setIncludeAudio] = useState(true);
  const [includeText, setIncludeText] = useState(false);
  
  // For video edit tab
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  
  const handleGenerateVideo = async () => {
    if (!prompt) {
      toast({
        title: t.error,
        description: 'Please provide a description of the video you want to generate.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsGenerating(true);
    setGeneratedVideoUrl('');
    
    try {
      const videoUrl = await mockGenerateVideo(prompt, {
        duration: duration[0],
        style,
        aspectRatio,
        includeAudio,
        includeText
      });
      
      setGeneratedVideoUrl(videoUrl);
    } catch (error) {
      console.error('Error generating video:', error);
      toast({
        title: t.error,
        description: t.errorDetail,
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSaveVideo = () => {
    // In a real app, this would save to a database or storage
    toast({
      title: t.saved,
      duration: 2000
    });
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const videoUrl = URL.createObjectURL(file);
    setUploadedVideoUrl(videoUrl);
    
    toast({
      title: 'Video yüklendi',
      description: `${file.name} başarıyla yüklendi.`,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <p className="text-gray-500">{t.description}</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.back}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Film className="h-5 w-5 mr-2 text-purple-500" />
                {activeTab === 'generate' ? t.videoGenTitle : 
                 activeTab === 'edit' ? t.videoEditTitle : 
                 t.videoConvertTitle}
              </CardTitle>
              <CardDescription>
                {activeTab === 'generate' ? t.videoGenSubtitle : 
                 activeTab === 'edit' ? t.videoEditSubtitle : 
                 t.videoConvertSubtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="generate" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="generate" className="flex items-center">
                    <Clapperboard className="h-4 w-4 mr-2" />
                    {t.videoGenTab}
                  </TabsTrigger>
                  <TabsTrigger value="edit" className="flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    {t.videoEditTab}
                  </TabsTrigger>
                  <TabsTrigger value="convert" className="flex items-center">
                    <Film className="h-4 w-4 mr-2" />
                    {t.videoConvertTab}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="generate" className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">{t.prompt}</Label>
                    <Textarea 
                      id="prompt" 
                      value={prompt} 
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={t.promptPlaceholder}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label>{t.duration}: {duration[0]}s</Label>
                    <Slider 
                      value={duration} 
                      onValueChange={setDuration} 
                      max={120} 
                      min={5}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="style">{t.style}</Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={t.styleOptions.cinematic} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cinematic">{t.styleOptions.cinematic}</SelectItem>
                          <SelectItem value="commercial">{t.styleOptions.commercial}</SelectItem>
                          <SelectItem value="documentary">{t.styleOptions.documentary}</SelectItem>
                          <SelectItem value="social">{t.styleOptions.social}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="aspectRatio">{t.aspectRatio}</Label>
                      <Select value={aspectRatio} onValueChange={setAspectRatio}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={t.aspectRatioOptions.landscape} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="landscape">{t.aspectRatioOptions.landscape}</SelectItem>
                          <SelectItem value="portrait">{t.aspectRatioOptions.portrait}</SelectItem>
                          <SelectItem value="square">{t.aspectRatioOptions.square}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="includeAudio" 
                        checked={includeAudio} 
                        onCheckedChange={setIncludeAudio}
                      />
                      <Label htmlFor="includeAudio">{t.includeAudio}</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="includeText" 
                        checked={includeText} 
                        onCheckedChange={setIncludeText}
                      />
                      <Label htmlFor="includeText">{t.includeText}</Label>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="edit" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    {uploadedVideoUrl ? (
                      <div className="space-y-4">
                        <video 
                          src={uploadedVideoUrl} 
                          controls 
                          className="w-full max-h-[300px] rounded-md mx-auto"
                        />
                        <Button variant="outline" onClick={() => setUploadedVideoUrl('')}>
                          Upload Different Video
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">{t.uploadVideo}</h3>
                        <p className="text-sm text-muted-foreground mt-2 mb-4">
                          MP4, MOV veya WEBM (maks. 100MB)
                        </p>
                        <Input
                          type="file"
                          id="video-file"
                          className="hidden"
                          accept="video/*"
                          onChange={handleFileUpload}
                        />
                        <Label htmlFor="video-file" asChild>
                          <Button variant="outline">Dosya Seç</Button>
                        </Label>
                      </div>
                    )}
                  </div>
                  
                  {uploadedVideoUrl && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="effects">{t.effects}</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select effect" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="blur">Blur</SelectItem>
                            <SelectItem value="sepia">Sepia</SelectItem>
                            <SelectItem value="grayscale">Grayscale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button className="w-full">Apply Changes</Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="convert" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">{t.uploadVideo}</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      MP4, MOV veya WEBM (maks. 100MB)
                    </p>
                    <Button variant="outline">Dosya Seç</Button>
                  </div>
                  
                  <div>
                    <Label htmlFor="format">{t.format}</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="MP4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mp4">MP4</SelectItem>
                        <SelectItem value="webm">WEBM</SelectItem>
                        <SelectItem value="mov">MOV</SelectItem>
                        <SelectItem value="gif">GIF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="resolution">{t.resolution}</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="1080p" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="720p">720p</SelectItem>
                        <SelectItem value="1080p">1080p</SelectItem>
                        <SelectItem value="4k">4K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">Convert Video</Button>
                </TabsContent>
              </Tabs>
              
              {activeTab === 'generate' && (
                <div className="mt-6">
                  <Button 
                    onClick={handleGenerateVideo} 
                    disabled={isGenerating || !prompt}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {t.generating}
                      </>
                    ) : generatedVideoUrl ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        {t.regenerate}
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        {t.generate}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t.generatedTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center h-64">
                  <div className="flex flex-col items-center">
                    <RefreshCw className="h-8 w-8 text-purple-500 animate-spin mb-4" />
                    <p>{t.generating}</p>
                  </div>
                </div>
              ) : !generatedVideoUrl ? (
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-200">
                  <div className="flex flex-col items-center text-gray-400">
                    <Clapperboard className="h-10 w-10 mb-4" />
                    <p>AI generated video will appear here</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden">
                    <video 
                      src={generatedVideoUrl} 
                      controls 
                      className="w-full"
                      poster="/placeholder.svg"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveVideo}>
                      <Save className="h-4 w-4 mr-2" />
                      {t.saveVideo}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoCreator;
