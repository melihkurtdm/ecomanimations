
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Store, Palette, Users, ShoppingBag, BarChart3, Globe, MegaphoneIcon } from 'lucide-react';

const QuickAccessCard = ({ icon, title, description, linkPath }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  linkPath: string
}) => {
  return (
    <Card className="p-5 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 flex-1 mb-4">{description}</p>
      <Button asChild variant="outline" className="w-full justify-start">
        <Link to={linkPath}>
          <span>Yönet</span>
        </Link>
      </Button>
    </Card>
  );
};

const QuickAccessGrid = () => {
  return (
    <div className="col-span-2 lg:col-span-2">
      <h2 className="text-xl font-bold mb-4">Hızlı Erişim</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuickAccessCard 
          icon={<Store className="h-5 w-5 text-primary" />}
          title="Mağazam"
          description="Ürünleri yönetin, stok durumunu güncelleyin"
          linkPath="/dashboard/store"
        />
        <QuickAccessCard 
          icon={<Palette className="h-5 w-5 text-primary" />}
          title="Tema Düzenle"
          description="Mağazanızın görünümünü özelleştirin"
          linkPath="/dashboard/theme-customization"
        />
        <QuickAccessCard 
          icon={<Users className="h-5 w-5 text-primary" />}
          title="Müşteriler"
          description="Müşteri listesi ve iletişim geçmişi"
          linkPath="/dashboard/customers"
        />
        <QuickAccessCard 
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
          title="İstatistikler"
          description="Satış ve ziyaretçi istatistiklerini görüntüleyin"
          linkPath="/dashboard/stats"
        />
        <QuickAccessCard 
          icon={<Globe className="h-5 w-5 text-primary" />}
          title="Alan Adı"
          description="Alan adı yönetimi ve SSL ayarları"
          linkPath="/dashboard/domain-management"
        />
        <QuickAccessCard 
          icon={<MegaphoneIcon className="h-5 w-5 text-primary" />}
          title="Reklam Yönetimi"
          description="Google ve Meta üzerinde kolayca reklam oluşturun"
          linkPath="/dashboard/advertising"
        />
      </div>
    </div>
  );
};

export default QuickAccessGrid;
