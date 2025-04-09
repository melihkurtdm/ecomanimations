
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChevronLeft, ChevronRight, Store, LayoutGrid, Settings, CheckCircle } from 'lucide-react';

const storeFormSchema = z.object({
  storeName: z.string().min(3, {
    message: "Mağaza adı en az 3 karakter olmalıdır.",
  }),
  storeDescription: z.string().min(10, {
    message: "Mağaza açıklaması en az 10 karakter olmalıdır.",
  }),
  domain: z.string().min(3, {
    message: "Domain en az 3 karakter olmalıdır.",
  }).regex(/^[a-z0-9-]+$/, {
    message: "Domain sadece küçük harf, sayı ve tire içerebilir.",
  }),
});

const StoreSetup = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'basic' | 'complete'>('basic');
  
  const form = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeName: "",
      storeDescription: "",
      domain: "",
    },
  });

  React.useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Oturum açmanız gerekiyor",
        description: "Mağaza oluşturmak için lütfen giriş yapın.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const onSubmit = (data: z.infer<typeof storeFormSchema>) => {
    console.log(data);
    
    // Gerçek uygulamada burada mağaza veritabanına kayıt yapılacak
    toast({
      title: "Mağaza oluşturuluyor",
      description: "Mağazanız oluşturuluyor, lütfen bekleyin...",
    });
    
    // Simüle edilmiş bir bekleme süresi
    setTimeout(() => {
      setCurrentStep('complete');
    }, 1500);
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mağazanızı Oluşturun</h1>
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Dashboard'a Dön
        </Button>
      </div>
      
      {currentStep === 'basic' ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Mağaza Bilgileri</CardTitle>
            <CardDescription>
              Mağazanızın temel bilgilerini girin. Tüm bilgiler daha sonra değiştirilebilir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mağaza Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="Harika Mağazam" {...field} />
                      </FormControl>
                      <FormDescription>
                        Mağazanızın adı. Bu, müşterilerinizin göreceği isimdir.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="storeDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mağaza Açıklaması</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mağazamızda en kaliteli ürünleri bulabilirsiniz..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Mağazanız hakkında kısa bir açıklama.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mağaza Domain Adı</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input placeholder="magazam" {...field} />
                          <span className="ml-2 text-gray-500">.shopplatform.com</span>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Mağazanızın internet adresi. Sadece küçük harf, sayı ve tire kullanabilirsiniz.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button type="submit">
                    <Store className="mr-2 h-5 w-5" />
                    Mağazayı Oluştur
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Mağazanız Hazır!</CardTitle>
            <CardDescription>
              Tebrikler! Mağazanız başarıyla oluşturuldu. Şimdi ürünlerinizi ekleyebilir, mağazanızı özelleştirebilir ve satışa başlayabilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <LayoutGrid className="h-8 w-8 text-brand-purple mb-2" />
                    <h3 className="font-medium text-center">Ürün Ekle</h3>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Settings className="h-8 w-8 text-brand-purple mb-2" />
                    <h3 className="font-medium text-center">Mağazayı Özelleştir</h3>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Store className="h-8 w-8 text-brand-purple mb-2" />
                    <h3 className="font-medium text-center">Mağazayı Görüntüle</h3>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" onClick={handleComplete}>
              Dashboard'a Git
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default StoreSetup;
