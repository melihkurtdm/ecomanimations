
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageView } from '@/types/analytics';

interface TopPagesTableProps {
  data: PageView[];
}

const TopPagesTable: React.FC<TopPagesTableProps> = ({ data }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">En Çok Ziyaret Edilen Sayfalar</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sayfa</TableHead>
              <TableHead className="text-right">Görüntülenme</TableHead>
              <TableHead className="text-right">Hemen Çıkma Oranı</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((page, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{page.page}</TableCell>
                <TableCell className="text-right">{page.count.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      page.bounceRate > 40 
                        ? 'bg-red-50 text-red-700' 
                        : page.bounceRate > 30 
                          ? 'bg-amber-50 text-amber-700' 
                          : 'bg-green-50 text-green-700'
                    }`}
                  >
                    {page.bounceRate}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopPagesTable;
