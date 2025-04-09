
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageView } from '@/types/analytics';
import { ArrowUpRight, BarChart3 } from 'lucide-react';

interface AnalyticsTopPagesTableProps {
  data: PageView[];
  fullWidth?: boolean;
}

const AnalyticsTopPagesTable: React.FC<AnalyticsTopPagesTableProps> = ({ data, fullWidth = false }) => {
  return (
    <Card className={fullWidth ? 'w-full' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
          En Çok Ziyaret Edilen Sayfalar
        </CardTitle>
        <CardDescription>En popüler sayfalarınız ve hemen çıkma oranları</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sayfa</TableHead>
              <TableHead className="text-right">Görüntülenme</TableHead>
              <TableHead className="text-right">Hemen Çıkma</TableHead>
              <TableHead className="text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((page, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{page.page}</TableCell>
                <TableCell className="text-right">{page.count.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <div 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        page.bounceRate > 50 
                          ? 'bg-red-50 text-red-700' 
                          : page.bounceRate > 35 
                          ? 'bg-yellow-50 text-yellow-700' 
                          : 'bg-green-50 text-green-700'
                      }`}
                    >
                      {page.bounceRate}%
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <a 
                    href="#" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.preventDefault();
                      // Sayfa detaylarını gösterme işlemi
                    }}
                  >
                    Görüntüle
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTopPagesTable;
