
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DownloadCloud, Users, ShoppingBag, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const Stats = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('30');

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const salesData = [
    { name: 'Oca', sales: 3500 },
    { name: 'Şub', sales: 4200 },
    { name: 'Mar', sales: 3800 },
    { name: 'Nis', sales: 4000 },
    { name: 'May', sales: 5000 },
    { name: 'Haz', sales: 4800 },
    { name: 'Tem', sales: 5500 },
  ];

  const visitorData = [
    { name: 'Oca', visitors: 1200 },
    { name: 'Şub', visitors: 1400 },
    { name: 'Mar', visitors: 1300 },
    { name: 'Nis', visitors: 1500 },
    { name: 'May', visitors: 1800 },
    { name: 'Haz', visitors: 2100 },
    { name: 'Tem', visitors: 2400 },
  ];

  const handleExport = () => {
    toast({
      title: "Rapor İndiriliyor",
      description: "İstatistik raporu indirilmeye başlandı.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold">Mağaza İstatistikleri</h1>
          <p className="text-gray-500 mt-1">Satış ve ziyaretçi verilerinizin analizi</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2 flex">
          <select
            className="border rounded-md px-3 py-2 bg-white"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7">Son 7 gün</option>
            <option value="30">Son 30 gün</option>
            <option value="90">Son 90 gün</option>
            <option value="365">Son 1 yıl</option>
          </select>
          <Button variant="outline" onClick={handleExport}>
            <DownloadCloud className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>Toplam Satış</span>
                <ShoppingBag className="h-5 w-5 text-blue-500" />
              </CardTitle>
              <CardDescription>Son {dateRange} gün</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₺12,450</div>
              <div className="text-sm text-green-500 mt-1">↑ 15% artış</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>Ziyaretçiler</span>
                <Users className="h-5 w-5 text-purple-500" />
              </CardTitle>
              <CardDescription>Son {dateRange} gün</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,245</div>
              <div className="text-sm text-green-500 mt-1">↑ 12% artış</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>Dönüşüm Oranı</span>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </CardTitle>
              <CardDescription>Son {dateRange} gün</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.2%</div>
              <div className="text-sm text-green-500 mt-1">↑ 0.5% artış</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Satış İstatistikleri</CardTitle>
            <CardDescription>Aylık satış verileri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₺${value}`, 'Satış']}
                    labelFormatter={(label) => `${label} Ayı`}
                  />
                  <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Ziyaretçi İstatistikleri</CardTitle>
            <CardDescription>Aylık ziyaretçi verileri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}`, 'Ziyaretçi']}
                    labelFormatter={(label) => `${label} Ayı`}
                  />
                  <Line type="monotone" dataKey="visitors" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Stats;
