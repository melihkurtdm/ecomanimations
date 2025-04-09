
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
import { ArrowLeft, Sparkles, Copy, RefreshCw, Save, Wand2, BookText, MessageSquare, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const translations = {
  tr: {
    title: 'AI İçerik Oluşturucu',
    description: 'Yapay zeka destekli içerik oluşturma aracı',
    back: 'Geri Dön',
    productDescTab: 'Ürün Açıklamaları',
    blogPostTab: 'Blog Yazıları',
    marketingTab: 'Pazarlama Metinleri',
    prodDescTitle: 'Ürün Açıklaması Oluştur',
    prodDescSubtitle: 'AI ile etkileyici ürün açıklamaları oluşturun',
    productName: 'Ürün Adı',
    productFeatures: 'Ürün Özellikleri',
    productCategory: 'Kategori',
    tone: 'Ton',
    toneOptions: {
      professional: 'Profesyonel',
      friendly: 'Samimi',
      enthusiastic: 'Heyecanlı',
      persuasive: 'İkna Edici'
    },
    length: 'Uzunluk',
    includeSpecs: 'Teknik Özellikleri Dahil Et',
    includeSEO: 'SEO Optimizasyonu Yap',
    generate: 'Oluştur',
    regenerate: 'Yeniden Oluştur',
    copyText: 'Kopyala',
    saveText: 'Kaydet',
    generatedTitle: 'Oluşturulan İçerik',
    generating: 'İçerik oluşturuluyor...',
    blogTitle: 'Blog Yazısı Başlığı',
    blogKeywords: 'Anahtar Kelimeler',
    blogTopic: 'Konu',
    marketingChannel: 'Pazarlama Kanalı',
    marketingGoal: 'Pazarlama Hedefi',
    marketingOptions: {
      awareness: 'Farkındalık',
      consideration: 'Değerlendirme',
      conversion: 'Dönüşüm'
    },
    channelOptions: {
      social: 'Sosyal Medya',
      email: 'E-posta',
      ads: 'Reklamlar',
      website: 'Web Sitesi'
    },
    copied: 'Metin panoya kopyalandı!',
    saved: 'İçerik başarıyla kaydedildi!',
    placeholder: {
      productFeatures: 'Her satıra bir özellik ekleyin',
      blogKeywords: 'Virgülle ayırın: örn. moda, yaz, trendler',
    }
  },
  en: {
    title: 'AI Content Generator',
    description: 'AI-powered content creation tool',
    back: 'Go Back',
    productDescTab: 'Product Descriptions',
    blogPostTab: 'Blog Posts',
    marketingTab: 'Marketing Copy',
    prodDescTitle: 'Create Product Description',
    prodDescSubtitle: 'Generate compelling product descriptions with AI',
    productName: 'Product Name',
    productFeatures: 'Product Features',
    productCategory: 'Category',
    tone: 'Tone',
    toneOptions: {
      professional: 'Professional',
      friendly: 'Friendly',
      enthusiastic: 'Enthusiastic',
      persuasive: 'Persuasive'
    },
    length: 'Length',
    includeSpecs: 'Include Technical Specs',
    includeSEO: 'Optimize for SEO',
    generate: 'Generate',
    regenerate: 'Regenerate',
    copyText: 'Copy',
    saveText: 'Save',
    generatedTitle: 'Generated Content',
    generating: 'Generating content...',
    blogTitle: 'Blog Post Title',
    blogKeywords: 'Keywords',
    blogTopic: 'Topic',
    marketingChannel: 'Marketing Channel',
    marketingGoal: 'Marketing Goal',
    marketingOptions: {
      awareness: 'Awareness',
      consideration: 'Consideration',
      conversion: 'Conversion'
    },
    channelOptions: {
      social: 'Social Media',
      email: 'Email',
      ads: 'Advertisements',
      website: 'Website'
    },
    copied: 'Text copied to clipboard!',
    saved: 'Content saved successfully!',
    placeholder: {
      productFeatures: 'Add one feature per line',
      blogKeywords: 'Separate with commas: e.g. fashion, summer, trends',
    }
  }
};

const mockGenerateContent = async (type: string, data: any): Promise<string> => {
  // This simulates an API call to a real AI content generator
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  if (type === 'product') {
    return `# ${data.productName}\n\nAre you looking for a product that combines style, functionality, and durability? Look no further than the ${data.productName}!\n\n## Key Features\n\n${data.productFeatures.split('\n').map(f => `- ${f}`).join('\n')}\n\n## Why Choose ${data.productName}?\n\nWith its sleek design and exceptional performance, the ${data.productName} stands out in the ${data.category} market. Whether you're a professional or a hobbyist, this product delivers consistent results every time.\n\n## Get Yours Today\n\nDon't miss out on this amazing product that will transform your experience. Order now and see the difference!`;
  } else if (type === 'blog') {
    return `# ${data.blogTitle}\n\n## Introduction\n\nIn today's fast-paced world, staying updated with the latest trends in ${data.blogTopic} is essential. This blog post will explore the most significant developments and provide actionable insights for our readers.\n\n## Why ${data.blogTopic} Matters\n\nThe importance of ${data.blogTopic} cannot be overstated in the current market landscape. As competition increases, understanding these concepts becomes crucial for success.\n\n## Key Takeaways\n\n1. The evolution of ${data.blogTopic} in recent years\n2. How industry leaders are leveraging new techniques\n3. Practical steps you can take to implement these strategies\n\n## Conclusion\n\nStaying ahead in ${data.blogTopic} requires continuous learning and adaptation. By following the guidelines outlined in this post, you'll be well-positioned to excel in your endeavors.`;
  } else {
    return `**${data.channel} Campaign: ${data.goal}**\n\nIntroducing our latest offering designed to exceed your expectations!\n\nWhy settle for ordinary when you can experience extraordinary?\n\nOur solution addresses your specific needs with precision and care.\n\n**Limited Time Offer!**\n\nAct now to secure your exclusive benefits.\n\nVisit our website or contact our team today to learn more!`;
  }
};

const AIContentGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [activeTab, setActiveTab] = useState('product');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  
  // Product description form
  const [productName, setProductName] = useState('');
  const [productFeatures, setProductFeatures] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productTone, setProductTone] = useState('professional');
  const [productLength, setProductLength] = useState([50]);
  const [includeSpecs, setIncludeSpecs] = useState(true);
  const [includeSEO, setIncludeSEO] = useState(true);
  
  // Blog post form
  const [blogTitle, setBlogTitle] = useState('');
  const [blogKeywords, setBlogKeywords] = useState('');
  const [blogTopic, setBlogTopic] = useState('');
  
  // Marketing copy form
  const [marketingChannel, setMarketingChannel] = useState('social');
  const [marketingGoal, setMarketingGoal] = useState('awareness');
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedContent('');
    
    try {
      let content = '';
      
      if (activeTab === 'product') {
        content = await mockGenerateContent('product', {
          productName,
          productFeatures,
          category: productCategory,
          tone: productTone,
          length: productLength[0],
          includeSpecs,
          includeSEO
        });
      } else if (activeTab === 'blog') {
        content = await mockGenerateContent('blog', {
          blogTitle,
          blogKeywords,
          blogTopic
        });
      } else {
        content = await mockGenerateContent('marketing', {
          channel: marketingChannel,
          goal: marketingGoal
        });
      }
      
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate content. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: t.copied,
      duration: 2000
    });
  };
  
  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: t.saved,
      duration: 2000
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
                <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                {activeTab === 'product' ? t.prodDescTitle : 
                 activeTab === 'blog' ? t.blogPostTab : 
                 t.marketingTab}
              </CardTitle>
              <CardDescription>
                {activeTab === 'product' ? t.prodDescSubtitle : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="product" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="product" className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {t.productDescTab}
                  </TabsTrigger>
                  <TabsTrigger value="blog" className="flex items-center">
                    <BookText className="h-4 w-4 mr-2" />
                    {t.blogPostTab}
                  </TabsTrigger>
                  <TabsTrigger value="marketing" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {t.marketingTab}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="product" className="space-y-4">
                  <div>
                    <Label htmlFor="productName">{t.productName}</Label>
                    <Input 
                      id="productName" 
                      value={productName} 
                      onChange={(e) => setProductName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="productFeatures">{t.productFeatures}</Label>
                    <Textarea 
                      id="productFeatures" 
                      value={productFeatures} 
                      onChange={(e) => setProductFeatures(e.target.value)}
                      placeholder={t.placeholder.productFeatures}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="productCategory">{t.productCategory}</Label>
                    <Input 
                      id="productCategory" 
                      value={productCategory} 
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="productTone">{t.tone}</Label>
                    <Select value={productTone} onValueChange={setProductTone}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t.toneOptions.professional} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">{t.toneOptions.professional}</SelectItem>
                        <SelectItem value="friendly">{t.toneOptions.friendly}</SelectItem>
                        <SelectItem value="enthusiastic">{t.toneOptions.enthusiastic}</SelectItem>
                        <SelectItem value="persuasive">{t.toneOptions.persuasive}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>{t.length}: {productLength[0]}%</Label>
                    <Slider 
                      value={productLength} 
                      onValueChange={setProductLength} 
                      max={100} 
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="includeSpecs" 
                        checked={includeSpecs} 
                        onCheckedChange={setIncludeSpecs}
                      />
                      <Label htmlFor="includeSpecs">{t.includeSpecs}</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="includeSEO" 
                        checked={includeSEO} 
                        onCheckedChange={setIncludeSEO}
                      />
                      <Label htmlFor="includeSEO">{t.includeSEO}</Label>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="blog" className="space-y-4">
                  <div>
                    <Label htmlFor="blogTitle">{t.blogTitle}</Label>
                    <Input 
                      id="blogTitle" 
                      value={blogTitle} 
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="blogKeywords">{t.blogKeywords}</Label>
                    <Input 
                      id="blogKeywords" 
                      value={blogKeywords} 
                      onChange={(e) => setBlogKeywords(e.target.value)}
                      placeholder={t.placeholder.blogKeywords}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="blogTopic">{t.blogTopic}</Label>
                    <Input 
                      id="blogTopic" 
                      value={blogTopic} 
                      onChange={(e) => setBlogTopic(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="blogTone">{t.tone}</Label>
                    <Select value={productTone} onValueChange={setProductTone}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t.toneOptions.professional} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">{t.toneOptions.professional}</SelectItem>
                        <SelectItem value="friendly">{t.toneOptions.friendly}</SelectItem>
                        <SelectItem value="enthusiastic">{t.toneOptions.enthusiastic}</SelectItem>
                        <SelectItem value="persuasive">{t.toneOptions.persuasive}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                
                <TabsContent value="marketing" className="space-y-4">
                  <div>
                    <Label htmlFor="marketingChannel">{t.marketingChannel}</Label>
                    <Select value={marketingChannel} onValueChange={setMarketingChannel}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t.channelOptions.social} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social">{t.channelOptions.social}</SelectItem>
                        <SelectItem value="email">{t.channelOptions.email}</SelectItem>
                        <SelectItem value="ads">{t.channelOptions.ads}</SelectItem>
                        <SelectItem value="website">{t.channelOptions.website}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="marketingGoal">{t.marketingGoal}</Label>
                    <Select value={marketingGoal} onValueChange={setMarketingGoal}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t.marketingOptions.awareness} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="awareness">{t.marketingOptions.awareness}</SelectItem>
                        <SelectItem value="consideration">{t.marketingOptions.consideration}</SelectItem>
                        <SelectItem value="conversion">{t.marketingOptions.conversion}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="marketingTone">{t.tone}</Label>
                    <Select value={productTone} onValueChange={setProductTone}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t.toneOptions.professional} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">{t.toneOptions.professional}</SelectItem>
                        <SelectItem value="friendly">{t.toneOptions.friendly}</SelectItem>
                        <SelectItem value="enthusiastic">{t.toneOptions.enthusiastic}</SelectItem>
                        <SelectItem value="persuasive">{t.toneOptions.persuasive}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      {t.generating}
                    </>
                  ) : generatedContent ? (
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
              ) : !generatedContent ? (
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-200">
                  <div className="flex flex-col items-center text-gray-400">
                    <Sparkles className="h-10 w-10 mb-4" />
                    <p>AI generated content will appear here</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="prose max-w-full border rounded-lg p-4 min-h-[18rem] bg-gray-50">
                    {generatedContent.split('\n').map((line, i) => (
                      <div key={i} className="mb-2">
                        {line.startsWith('# ') ? (
                          <h1 className="text-xl font-bold">{line.substring(2)}</h1>
                        ) : line.startsWith('## ') ? (
                          <h2 className="text-lg font-semibold">{line.substring(3)}</h2>
                        ) : line.startsWith('- ') ? (
                          <li className="ml-4">{line.substring(2)}</li>
                        ) : line.startsWith('**') && line.endsWith('**') ? (
                          <p className="font-bold">{line.substring(2, line.length - 2)}</p>
                        ) : (
                          <p>{line}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleCopy}>
                      <Copy className="h-4 w-4 mr-2" />
                      {t.copyText}
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      {t.saveText}
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

export default AIContentGenerator;
