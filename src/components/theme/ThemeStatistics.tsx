
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CircleDollarSign, Users, ShoppingCart, LineChart, ArrowUpRight, ArrowDownRight, History, BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

const ThemeStatistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [activeChart, setActiveChart] = useState<'area' | 'bar' | 'pie'>('area');
  
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

  // Grafik verileri - Daily
  const dailyData = {
    area: [
      { name: '1 Nis', ziyaretci: 800, gelir: 4400 },
      { name: '2 Nis', ziyaretci: 900, gelir: 5000 },
      { name: '3 Nis', ziyaretci: 1000, gelir: 6000 },
      { name: '4 Nis', ziyaretci: 1200, gelir: 7000 },
      { name: '5 Nis', ziyaretci: 1100, gelir: 6500 },
      { name: '6 Nis', ziyaretci: 1300, gelir: 8000 },
      { name: '7 Nis', ziyaretci: 1400, gelir: 9200 },
    ],
    bar: [
      { name: 'Pazartesi', siparisler: 12 },
      { name: 'Salı', siparisler: 15 },
      { name: 'Çarşamba', siparisler: 18 },
      { name: 'Perşembe', siparisler: 22 },
      { name: 'Cuma', siparisler: 26 },
      { name: 'Cumartesi', siparisler: 30 },
      { name: 'Pazar', siparisler: 25 },
    ],
    pie: [
      { name: 'Mobil', value: 70 },
      { name: 'Tablet', value: 10 },
      { name: 'Masaüstü', value: 20 },
    ]
  };

  // Grafik verileri - Weekly
  const weeklyData = {
    area: [
      { name: 'Hafta 1', ziyaretci: 3800, gelir: 21400 },
      { name: 'Hafta 2', ziyaretci: 4200, gelir: 25000 },
      { name: 'Hafta 3', ziyaretci: 5000, gelir: 29000 },
      { name: 'Hafta 4', ziyaretci: 5500, gelir: 32000 },
    ],
    bar: [
      { name: 'Hafta 1', siparisler: 48 },
      { name: 'Hafta 2', siparisler: 65 },
      { name: 'Hafta 3', siparisler: 82 },
      { name: 'Hafta 4', siparisler: 95 },
    ],
    pie: [
      { name: 'Direkt Trafik', value: 40 },
      { name: 'Organik Arama', value: 25 },
      { name: 'Sosyal Medya', value: 20 },
      { name: 'Referans', value: 15 },
    ]
  };

  // Grafik verileri - Monthly
  const monthlyData = {
    area: [
      { name: 'Ocak', ziyaretci: 15800, gelir: 98400 },
      { name: 'Şubat', ziyaretci: 14200, gelir: 92000 },
      { name: 'Mart', ziyaretci: 18000, gelir: 115000 },
      { name: 'Nisan', ziyaretci: 21500, gelir: 142000 },
    ],
    bar: [
      { name: 'Ocak', siparisler: 210 },
      { name: 'Şubat', siparisler: 185 },
      { name: 'Mart', siparisler: 240 },
      { name: 'Nisan', siparisler: 280 },
    ],
    pie: [
      { name: 'Yeni Müşteriler', value: 65 },
      { name: 'Tekrarlayan', value: 35 },
    ]
  };

  // Renk paletleri
  const COLORS = {
    area: ['#8B5CF6', '#F97316'],
    bar: ['#A78BFA'],
    pie: ['#8B5CF6', '#3B82F6', '#10B981', '#F97316', '#EF4444']
  };

  // Aktif veri setini seç
  const getActiveDataset = () => {
    switch(activeTab) {
      case 'weekly': return weeklyData;
      case 'monthly': return monthlyData;
      default: return dailyData;
    }
  };

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const chartControls = [
    { id: 'area', icon: <TrendingUp className="h-4 w-4" />, label: 'Çizgi' },
    { id: 'bar', icon: <BarChart3 className="h-4 w-4" />, label: 'Sütun' },
    { id: 'pie', icon: <PieChartIcon className="h-4 w-4" />, label: 'Pasta' }
  ];

  // Veriye göre grafikleri render et
  const renderChart = () => {
    const data = getActiveDataset();
    
    if (activeChart === 'area') {
      return (
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.area}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }} 
              />
              <Legend />
              <Area 
                type="monotone" 
                name="Ziyaretçi" 
                dataKey="ziyaretci" 
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorZiyaretci)" 
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                name="Gelir (₺)" 
                dataKey="gelir" 
                stroke="#F97316" 
                fillOpacity={1} 
                fill="url(#colorGelir)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (activeChart === 'bar') {
      return (
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data.bar}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }} 
              />
              <Legend />
              <Bar 
                dataKey="siparisler" 
                name="Siparişler" 
                fill="#A78BFA" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    } else {
      return (
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.pie}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                animationDuration={1500}
              >
                {data.pie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.pie[index % COLORS.pie.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Oran']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="shadow-md border-0 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-lg">Tema Performansı</CardTitle>
              <CardDescription>Temanızın kullanıcı davranışına etkisi</CardDescription>
            </div>
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-auto"
            >
              <TabsList className="grid w-full sm:w-[300px] grid-cols-3">
                <TabsTrigger value="daily">Günlük</TabsTrigger>
                <TabsTrigger value="weekly">Haftalık</TabsTrigger>
                <TabsTrigger value="monthly">Aylık</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-medium text-sm text-gray-700">
                  {activeTab === "daily" ? "Günlük Performans Analizi" : 
                  activeTab === "weekly" ? "Haftalık Performans Analizi" : 
                  "Aylık Performans Analizi"}
                </h3>
                
                <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                  {chartControls.map((control) => (
                    <button
                      key={control.id}
                      onClick={() => setActiveChart(control.id as 'area' | 'bar' | 'pie')}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        activeChart === control.id 
                          ? 'bg-white shadow-sm text-purple-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {control.icon}
                      <span className="hidden sm:inline">{control.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {renderChart()}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <motion.div 
                  className="bg-white p-4 rounded-lg border shadow-sm"
                  variants={itemVariants}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium text-sm text-gray-700">En Popüler Sayfalar</h3>
                    <History className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { page: 'Ana Sayfa', views: '835', ratio: '32%' },
                      { page: 'Ürünler', views: '642', ratio: '24%' },
                      { page: 'Hakkımızda', views: '394', ratio: '15%' },
                      { page: 'İletişim', views: '257', ratio: '10%' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          <span className="text-sm">{item.page}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-gray-500">{item.views} görüntülenme</span>
                          <span className="text-xs font-semibold">{item.ratio}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white p-4 rounded-lg border shadow-sm"
                  variants={itemVariants}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium text-sm text-gray-700">Performans Özeti</h3>
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Ortalama Ziyaret Süresi', value: '3:24 dk' },
                      { label: 'Sayfa Yüklenme Hızı', value: '0.8 sn' },
                      { label: 'Hemen Çıkma Oranı', value: '24%' },
                      { label: 'Tekrar Ziyaret Oranı', value: '42%' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ThemeStatistics;
