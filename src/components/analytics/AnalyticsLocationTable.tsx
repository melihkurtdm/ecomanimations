
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Globe } from 'lucide-react';
import { LocationStats } from '@/types/analytics';

interface AnalyticsLocationTableProps {
  data: LocationStats[];
}

const AnalyticsLocationTable: React.FC<AnalyticsLocationTableProps> = ({ data }) => {
  const getCountryFlag = (country: string) => {
    switch (country) {
      case 'Türkiye':
        return '🇹🇷';
      case 'Almanya':
        return '🇩🇪';
      case 'ABD':
        return '🇺🇸';
      case 'İngiltere':
        return '🇬🇧';
      default:
        return '🌍';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-500" />
          Konum Dağılımı
        </CardTitle>
        <CardDescription>Ziyaretçilerinizin geldiği en popüler ülkeler</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ülke</TableHead>
              <TableHead>Ziyaretçi</TableHead>
              <TableHead className="text-right">Oran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((location, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">{getCountryFlag(location.country)}</span>
                    <span className="font-medium">{location.country}</span>
                  </div>
                </TableCell>
                <TableCell className="flex flex-col">
                  <span>{location.count.toLocaleString()}</span>
                  <Progress value={location.percentage} className="h-1.5 mt-1" />
                </TableCell>
                <TableCell className="text-right font-medium">{location.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AnalyticsLocationTable;
