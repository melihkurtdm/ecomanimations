
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Customer } from '@/types/customer';
import { toast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageSquareText, ClipboardList } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  type: z.enum(['email', 'phone', 'note', 'other'], {
    required_error: "İletişim tipi seçmelisiniz",
  }),
  content: z.string().min(5, {
    message: "İçerik en az 5 karakter olmalıdır",
  }),
  status: z.enum(['pending', 'sent', 'completed', 'failed'], {
    required_error: "Durum seçmelisiniz",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface CommunicationHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  onSubmit: (customerId: string, data: Omit<Customer['communicationHistory'][0], 'id' | 'date'>) => void;
}

const CommunicationHistoryDialog = ({
  open,
  onOpenChange,
  customerId,
  onSubmit
}: CommunicationHistoryDialogProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'note',
      content: '',
      status: 'completed',
    },
  });

  const handleSubmit = (values: FormData) => {
    try {
      onSubmit(customerId, {
        type: values.type,
        content: values.content,
        status: values.status,
      });
      
      form.reset();
      
      toast({
        title: "İletişim kaydı eklendi",
        description: "İletişim kaydı başarıyla eklendi."
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İletişim kaydı eklenirken bir hata oluştu.",
        variant: "destructive"
      });
      console.error("Error adding communication history:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Yeni İletişim Kaydı Ekle</DialogTitle>
          <DialogDescription>
            Müşteri ile olan iletişimi kaydetmek için aşağıdaki formu doldurun.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İletişim Tipi</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="İletişim tipini seçin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email" className="flex items-center">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-blue-500" />
                          <span>E-posta</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="phone" className="flex items-center">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-green-500" />
                          <span>Telefon</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="note" className="flex items-center">
                        <div className="flex items-center">
                          <MessageSquareText className="h-4 w-4 mr-2 text-amber-500" />
                          <span>Not</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="other" className="flex items-center">
                        <div className="flex items-center">
                          <ClipboardList className="h-4 w-4 mr-2 text-purple-500" />
                          <span>Diğer</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İçerik</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="İletişim içeriğini girin"
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durum</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="İletişim durumunu seçin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Beklemede</SelectItem>
                      <SelectItem value="sent">Gönderildi</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                      <SelectItem value="failed">Başarısız</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline">İptal</Button>
              </DialogClose>
              <Button type="submit">Ekle</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CommunicationHistoryDialog;
