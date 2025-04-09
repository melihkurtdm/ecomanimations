
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CircleDollarSign, Users, ShoppingCart, LineChart, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

const ThemeStatistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("daily");
  
  const stats: StatItem[] = [
    {
      title: "Ziyaretçi",
      value: "1,234",
      change: "+12.5%",
      icon: <Users className="h-4 w-4 text-blue-500" />,
      trend: "up"
    },
    {
      title: "Dönüşüm Oranı",
      value: "3.2%",
      change: "+0.8%",
      icon: <LineChart className="h-4 w-4 text-green-500" />,
      trend: "up"
    },
    {
      title: "Sipariş",
      value: "48",
      change: "+24%",
      icon: <ShoppingCart className="h-4 w-4 text-purple-500" />,
      trend: "up"
    },
    {
      title: "Gelir",
      value: "₺12,450",
      change: "+18.2%",
      icon: <CircleDollarSign className="h-4 w-4 text-orange-500" />,
      trend: "up"
    }
  ];

  // Grafik verileri
  const areaChartData = [
    { name: '1 Nis', ziyaretci: 800, gelir: 4400 },
    { name: '2 Nis', ziyaretci: 900, gelir: 5000 },
    { name: '3 Nis', ziyaretci: 1000, gelir: 6000 },
    { name: '4 Nis', ziyaretci: 1200, gelir: 7000 },
    { name: '5 Nis', ziyaretci: 1100, gelir: 6500 },
    { name: '6 Nis', ziyaretci: 1300, gelir: 8000 },
    { name: '7 Nis', ziyaretci: 1400, gelir: 9200 },
  ];

  const barChartData = [
    { name: 'Pazartesi', siparisler: 12 },
    { name: 'Salı', siparisler: 15 },
    { name: 'Çarşamba', siparisler: 18 },
    { name: 'Perşembe', siparisler: 22 },
    { name: 'Cuma', siparisler: 26 },
    { name: 'Cumartesi', siparisler: 30 },
    { name: 'Pazar', siparisler: 25 },
  ];

  const pieChartData = [
    { name: 'Mobil', value: 70 },
    { name: 'Tablet', value: 10 },
    { name: 'Masaüstü', value: 20 },
  ];

  const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F97316'];

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="shadow-md border-0 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Tema Performansı</CardTitle>
              <CardDescription>Temanızın kullanıcı davranışına etkisi</CardDescription>
            </div>
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-auto"
            >
              <TabsList className="grid w-[300px] grid-cols-3">
                <TabsTrigger value="daily">Günlük</TabsTrigger>
                <TabsTrigger value="weekly">Haftalık</TabsTrigger>
                <TabsTrigger value="monthly">Aylık</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="space-y-1 bg-gray-50 p-4 rounded-lg"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-full bg-gray-100">
                    {stat.icon}
                  </div>
                  <span className="text-sm text-gray-500">{stat.title}</span>
                </div>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className={`text-xs flex items-center ${
                  stat.trend === 'up' 
                    ? 'text-green-600' 
                    : stat.trend === 'down' 
                      ? 'text-red-600' 
                      : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 mr-1" />}
                  {stat.trend === 'down' && <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>

          <TabsContent value="daily" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white p-4 rounded-lg border shadow-sm"
                variants={itemVariants}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium text-sm text-gray-700">Ziyaretçi ve Gelir Grafiği</h3>
                  <History className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={areaChartData}
                      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorZiyaretci" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Area type="monotone" dataKey="ziyaretci" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorZiyaretci)" />
                      <Area type="monotone" dataKey="gelir" stroke="#F97316" fillOpacity={1} fill="url(#colorGelir)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between mt-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                    <span>Ziyaretçi</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                    <span>Gelir (₺)</span>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-rows-2 gap-4">
                <motion.div 
                  className="bg-white p-4 rounded-lg border shadow-sm"
                  variants={itemVariants}
                >
                  <div className="mb-2">
                    <h3 className="font-medium text-sm text-gray-700">Günlük Siparişler</h3>
                  </div>
                  <div className="h-28">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" fontSize={9} />
                        <YAxis fontSize={9} />
                        <Tooltip />
                        <Bar dataKey="siparisler" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white p-4 rounded-lg border shadow-sm"
                  variants={itemVariants}
                >
                  <div className="mb-2">
                    <h3 className="font-medium text-sm text-gray-700">Cihaz Dağılımı</h3>
                  </div>
                  <div className="h-28 flex">
                    <div className="h-full w-1/2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={40}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center space-y-2 w-1/2">
                      {pieChartData.map((entry, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span>{entry.name}: %{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="h-[400px] flex items-center justify-center text-gray-500">
            <p>Haftalık analiz verileri burada gösterilecek</p>
          </TabsContent>

          <TabsContent value="monthly" className="h-[400px] flex items-center justify-center text-gray-500">
            <p>Aylık analiz verileri burada gösterilecek</p>
          </TabsContent>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ThemeStatistics;
