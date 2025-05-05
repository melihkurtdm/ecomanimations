
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Store, 
  LayoutGrid, 
  Settings, 
  CheckCircle, 
  Palette, 
  Truck, 
  CreditCard,
  Globe,
  Trash2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Step 1: Basic Store Information Schema
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
  }).optional(),
  customDomain: z.string().min(3, {
    message: "Domain en az 3 karakter olmalıdır.",
  }).optional(),
});

// Step 2: Shipping Settings Schema
const shippingFormSchema = z.object({
  shippingName: z.string().min(3, {
    message: "Kargo adı en az 3 karakter olmalıdır.",
  }).optional(),
  shippingCost: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Geçerli bir kargo ücreti giriniz (örn. 15 veya 15.99).",
  }).optional(),
  freeShippingThreshold: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Geçerli bir ücretsiz kargo limiti giriniz (örn. 100 veya 100.99).",
  }).optional(),
});

// Step 3: Payment Settings Schema
const paymentFormSchema = z.object({
  currency: z.string().min(1, {
    message: "Para birimi seçiniz.",
  }),
  acceptCreditCard: z.boolean().optional(),
  acceptPayAtDoor: z.boolean().optional(),
  acceptBankTransfer: z.boolean().optional(),
});

// Combined type for all form fields
type StoreSetupForm = z.infer<typeof storeFormSchema> & 
                      z.infer<typeof shippingFormSchema> & 
                      z.infer<typeof paymentFormSchema>;

const StoreSetup = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'basic' | 'shipping' | 'payment' | 'complete'>('basic');
  const [formData, setFormData] = useState<Partial<StoreSetupForm>>({});
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [submittingBasicForm, setSubmittingBasicForm] = useState(false);
  
  // Basic Store Info Form
  const basicForm = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeName: formData.storeName || "",
      storeDescription: formData.storeDescription || "",
      domain: formData.domain || "",
      customDomain: formData.customDomain || "",
    },
    mode: "onChange"
  });

  // Shipping Form
  const shippingForm = useForm<z.infer<typeof shippingFormSchema>>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      shippingName: formData.shippingName || "",
      shippingCost: formData.shippingCost || "",
      freeShippingThreshold: formData.freeShippingThreshold || "",
    },
  });

  // Payment Form
  const paymentForm = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      currency: formData.currency || "TRY",
      acceptCreditCard: formData.acceptCreditCard || true,
      acceptPayAtDoor: formData.acceptPayAtDoor || false,
      acceptBankTransfer: formData.acceptBankTransfer || false,
    },
  });

  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Oturum açmanız gerekiyor",
        description: "Mağaza oluşturmak için lütfen giriş yapın.",
        variant: "destructive",
      });
      navigate('/auth');
    } else if (user) {
      // Check if user already has a store
      checkExistingStore();
    }
  }, [user, isLoading, navigate]);

  // Check if the user already has a store
  const checkExistingStore = async () => {
    if (!user) return;

    // Try to load store data from localStorage first
    const storedStore = localStorage.getItem(`store_${user.id}`);
    if (storedStore) {
      const storeData = JSON.parse(storedStore);
      setFormData(storeData);
      
      // Pre-fill the form with stored data
      basicForm.reset({
        storeName: storeData.storeName || "",
        storeDescription: storeData.storeDescription || "",
        domain: storeData.domain || "",
        customDomain: storeData.customDomain || "",
      });
      
      // If the store was completed, navigate to dashboard
      if (storeData.isComplete) {
        navigate('/dashboard');
        toast({
          title: "Mağazanız zaten kurulmuş",
          description: "Mağaza ayarlarınızı dashboard üzerinden değiştirebilirsiniz.",
        });
      }
    }
  };

  // Delete existing store
  const deleteExistingStore = () => {
    if (!user) return;
    
    // Remove from localStorage
    localStorage.removeItem(`store_${user.id}`);
    
    // Reset form and state
    setFormData({});
    basicForm.reset({
      storeName: "",
      storeDescription: "",
      domain: "",
      customDomain: "",
    });
    
    toast({
      title: "Mağaza silindi",
      description: "Mağaza bilgileriniz silindi. Yeni bir mağaza oluşturabilirsiniz.",
    });
  };

  const handleBasicSubmit = async (data: z.infer<typeof storeFormSchema>) => {
    try {
      setSubmittingBasicForm(true);

      // Handle domain selection based on which option was chosen
      let domainData = { ...data };
      
      if (useCustomDomain) {
        // When using custom domain, validate customDomain
        if (!data.customDomain || data.customDomain.length < 3) {
          basicForm.setError('customDomain', {
            type: 'manual',
            message: 'Özel alan adı en az 3 karakter olmalıdır.',
          });
          setSubmittingBasicForm(false);
          return;
        }
        
        // Set domain to undefined and keep customDomain
        domainData = {
          ...data,
          domain: undefined,  // Clear the subdomain field
          customDomain: data.customDomain.trim().toLowerCase()
            .replace(/^(https?:\/\/)?(www\.)?/i, '') // Clean up URL prefixes
        };
      } else {
        // When using subdomain, validate domain
        if (!data.domain || data.domain.length < 3) {
          basicForm.setError('domain', {
            type: 'manual',
            message: 'Alt alan adı en az 3 karakter olmalıdır.',
          });
          setSubmittingBasicForm(false);
          return;
        }
        
        // Set customDomain to undefined and keep domain
        domainData = {
          ...data,
          customDomain: undefined,  // Clear the custom domain field
          domain: data.domain.trim().toLowerCase() // Clean up and normalize input
        };
      }

      // Update form data with domain information
      const updatedFormData = {...formData, ...domainData};
      setFormData(updatedFormData);
      
      // Save progress to localStorage
      if (user) {
        localStorage.setItem(`store_${user.id}`, JSON.stringify(updatedFormData));
      }
      
      toast({
        title: "Temel bilgiler kaydedildi",
        description: "Şimdi kargo ayarlarını yapılandırabilirsiniz.",
      });
      
      setCurrentStep('shipping');
    } catch (error) {
      console.error("Error submitting basic form:", error);
      toast({
        title: "Hata",
        description: "Form kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setSubmittingBasicForm(false);
    }
  };

  const handleShippingSubmit = (data: z.infer<typeof shippingFormSchema>) => {
    setFormData({...formData, ...data});
    setCurrentStep('payment');
    
    // Save progress to localStorage
    if (user) {
      localStorage.setItem(`store_${user.id}`, JSON.stringify({
        ...formData, 
        ...data,
      }));
    }
    
    toast({
      title: "Kargo ayarları kaydedildi",
      description: "Şimdi ödeme ayarlarını yapılandırabilirsiniz.",
    });
  };

  const handlePaymentSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
    setFormData({...formData, ...data});
    setIsSaving(true);
    
    // Combined store data
    const storeData = {
      ...formData,
      ...data,
      isComplete: true,
      userId: user?.id,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    if (user) {
      localStorage.setItem(`store_${user.id}`, JSON.stringify(storeData));
    }
    
    toast({
      title: "Mağaza oluşturuluyor",
      description: "Mağazanız oluşturuluyor, lütfen bekleyin...",
    });
    
    try {
      // Here you would also save to your backend/database
      // For example with Supabase (commented out for now):
      /*
      if (user) {
        await supabase
          .from('stores')
          .upsert({
            user_id: user.id,
            store_name: storeData.storeName,
            store_description: storeData.storeDescription,
            domain: storeData.domain,
            custom_domain: storeData.customDomain,
            shipping_settings: {
              name: storeData.shippingName,
              cost: storeData.shippingCost,
              free_threshold: storeData.freeShippingThreshold
            },
            payment_settings: {
              currency: storeData.currency,
              accept_credit_card: storeData.acceptCreditCard,
              accept_pay_at_door: storeData.acceptPayAtDoor,
              accept_bank_transfer: storeData.acceptBankTransfer
            },
            created_at: new Date()
          });
      }
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentStep('complete');
    } catch (error) {
      console.error("Error saving store data:", error);
      toast({
        title: "Hata",
        description: "Mağaza oluşturulurken bir hata meydana geldi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 'shipping') {
      setCurrentStep('basic');
    } else if (currentStep === 'payment') {
      setCurrentStep('shipping');
    }
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  const goToAddProducts = () => {
    navigate('/dashboard/store');
    toast({
      title: "Ürün Ekle Sayfası",
      description: "Mağazanıza ürün ekleyebilirsiniz.",
    });
  };

  const goToCustomizeTheme = () => {
    navigate('/dashboard/theme-customization');
    toast({
      title: "Tema Özelleştirme",
      description: "Mağazanızın temasını özelleştirebilirsiniz.",
    });
  };

  const goToViewStore = () => {
    navigate('/dashboard/store');
    toast({
      title: "Mağazanızı Görüntüleyin",
      description: "Mağazanızı görüntüleyebilir ve düzenleyebilirsiniz.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 mb-3" />
          <div className="h-4 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mağazanızı Oluşturun</h1>
        <div className="flex space-x-2">
          {localStorage.getItem(`store_${user?.id}`) && (
            <Button variant="outline" className="text-red-600" onClick={deleteExistingStore}>
              <Trash2 className="h-4 w-4 mr-2" />
              Mağazayı Sil
            </Button>
          )}
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Dashboard'a Dön
          </Button>
        </div>
      </div>
      
      {/* Progress Indicator */}
      {currentStep !== 'complete' && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">
              Adım {currentStep === 'basic' ? '1' : currentStep === 'shipping' ? '2' : '3'}/3
            </div>
            <div className="text-sm font-medium text-gray-500">
              {currentStep === 'basic' ? 'Temel Bilgiler' : 
               currentStep === 'shipping' ? 'Kargo Ayarları' : 'Ödeme Ayarları'}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-brand-purple h-2.5 rounded-full transition-all duration-300" 
              style={{ width: currentStep === 'basic' ? '33%' : currentStep === 'shipping' ? '66%' : '100%' }}
            />
          </div>
        </div>
      )}
      
      {/* Step 1: Basic Store Info */}
      {currentStep === 'basic' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Temel Mağaza Bilgileri</CardTitle>
              <CardDescription>
                Mağazanızın temel bilgilerini girin. Tüm bilgiler daha sonra değiştirilebilir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...basicForm}>
                <form onSubmit={basicForm.handleSubmit(handleBasicSubmit)} className="space-y-6">
                  <FormField
                    control={basicForm.control}
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
                    control={basicForm.control}
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
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <input 
                          type="radio" 
                          id="useDefaultDomain" 
                          checked={!useCustomDomain}
                          onChange={() => setUseCustomDomain(false)}
                          className="h-4 w-4"
                        />
                        <label htmlFor="useDefaultDomain" className="text-sm font-medium">
                          Ücretsiz alt alan adı kullan
                        </label>
                      </div>
                      
                      {!useCustomDomain && (
                        <FormField
                          control={basicForm.control}
                          name="domain"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center">
                                  <Input 
                                    placeholder="magazam" 
                                    {...field} 
                                    className="flex-1"
                                  />
                                  <span className="ml-2 text-gray-500">.shopset.net</span>
                                </div>
                              </FormControl>
                              <FormDescription>
                                Mağazanızın internet adresi. Sadece küçük harf, sayı ve tire kullanabilirsiniz.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <input 
                          type="radio" 
                          id="useCustomDomain" 
                          checked={useCustomDomain}
                          onChange={() => setUseCustomDomain(true)}
                          className="h-4 w-4"
                        />
                        <label htmlFor="useCustomDomain" className="text-sm font-medium">
                          Kendi alan adımı kullan
                        </label>
                      </div>
                      
                      {useCustomDomain && (
                        <FormField
                          control={basicForm.control}
                          name="customDomain"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center">
                                  <Globe className="h-4 w-4 mr-2 text-gray-400" />
                                  <Input 
                                    placeholder="magazam.com" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormDescription>
                                Kendi alan adınızı girin (örn: magazam.com, magazam.net). Daha sonra DNS ayarlarını yapmanız gerekecektir.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={submittingBasicForm}
                    >
                      {submittingBasicForm ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          İşleniyor...
                        </>
                      ) : (
                        <>
                          İleri
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Step 2: Shipping Settings */}
      {currentStep === 'shipping' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Kargo Ayarları</CardTitle>
              <CardDescription>
                Mağazanız için kargo ayarlarını yapılandırın. Bu ayarlar daha sonra değiştirilebilir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...shippingForm}>
                <form onSubmit={shippingForm.handleSubmit(handleShippingSubmit)} className="space-y-6">
                  <FormField
                    control={shippingForm.control}
                    name="shippingName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kargo Adı</FormLabel>
                        <FormControl>
                          <Input placeholder="Standart Kargo" {...field} />
                        </FormControl>
                        <FormDescription>
                          Varsayılan kargo seçeneğinizin adı.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={shippingForm.control}
                    name="shippingCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kargo Ücreti</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input placeholder="15" {...field} />
                            <span className="ml-2 text-gray-500">₺</span>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Standart kargo ��creti.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={shippingForm.control}
                    name="freeShippingThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ücretsiz Kargo Limiti</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input placeholder="200" {...field} />
                            <span className="ml-2 text-gray-500">₺</span>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Bu tutarın üzerindeki siparişlerde kargo ücretsiz olacaktır. Boş bırakırsanız, ücretsiz kargo seçeneği olmayacaktır.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Geri
                    </Button>
                    <Button type="submit">
                      İleri
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Step 3: Payment Settings */}
      {currentStep === 'payment' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Ödeme Ayarları</CardTitle>
              <CardDescription>
                Mağazanız için ödeme ayarlarını yapılandırın. Bu ayarlar daha sonra değiştirilebilir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                  <FormField
                    control={paymentForm.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Para Birimi</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="TRY">Türk Lirası (₺)</option>
                            <option value="USD">Amerikan Doları ($)</option>
                            <option value="EUR">Euro (€)</option>
                            <option value="GBP">İngiliz Sterlini (£)</option>
                          </select>
                        </FormControl>
                        <FormDescription>
                          Ürünlerinizin fiyatlandırılacağı para birimi.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Ödeme Yöntemleri</h3>
                    <div className="space-y-2">
                      <FormField
                        control={paymentForm.control}
                        name="acceptCreditCard"
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="acceptCreditCard"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="acceptCreditCard" className="text-sm font-medium">
                              Kredi Kartı / Banka Kartı
                            </label>
                          </div>
                        )}
                      />
                      
                      <FormField
                        control={paymentForm.control}
                        name="acceptPayAtDoor"
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="acceptPayAtDoor"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="acceptPayAtDoor" className="text-sm font-medium">
                              Kapıda Ödeme
                            </label>
                          </div>
                        )}
                      />
                      
                      <FormField
                        control={paymentForm.control}
                        name="acceptBankTransfer"
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="acceptBankTransfer"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="acceptBankTransfer" className="text-sm font-medium">
                              Havale / EFT
                            </label>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Geri
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Oluşturuluyor...
                        </>
                      ) : (
                        <>
                          <Store className="mr-2 h-5 w-5" />
                          Mağazayı Oluştur
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Completion Screen */}
      {currentStep === 'complete' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
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
                  <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={goToAddProducts}>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <LayoutGrid className="h-8 w-8 text-brand-purple mb-2" />
                      <h3 className="font-medium text-center">Ürün Ekle</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={goToCustomizeTheme}>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Palette className="h-8 w-8 text-brand-purple mb-2" />
                      <h3 className="font-medium text-center">Temayı Özelleştir</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={goToViewStore}>
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
        </motion.div>
      )}
    </div>
  );
};

export default StoreSetup;
