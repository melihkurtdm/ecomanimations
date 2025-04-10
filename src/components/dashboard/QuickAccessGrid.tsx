
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, PaintBucket, BarChart2, Users, Globe, CreditCard, Megaphone, Sparkles, Film } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const translations = {
  tr: {
    quickAccess: 'Hızlı Erişim',
    store: 'Mağaza',
    themes: 'Temalar',
    analytics: 'Analitik',
    customers: 'Müşteriler',
    domains: 'Alan Adları',
    billing: 'Faturalama',
    advertising: 'Reklam',
    aiContent: 'AI İçerik',
    videoCreator: 'Video Oluşturucu'
  },
  en: {
    quickAccess: 'Quick Access',
    store: 'Store',
    themes: 'Themes',
    analytics: 'Analytics',
    customers: 'Customers',
    domains: 'Domains',
    billing: 'Billing',
    advertising: 'Advertising',
    aiContent: 'AI Content',
    videoCreator: 'Video Creator'
  }
};

const QuickAccessGrid = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const accessLinks = [
    { to: "/dashboard/store", icon: <ShoppingCart />, text: t.store, color: "text-primary" },
    { to: "/dashboard/theme-selection", icon: <PaintBucket />, text: t.themes, color: "text-blue-500" },
    { to: "/dashboard/analytics", icon: <BarChart2 />, text: t.analytics, color: "text-green-500" },
    { to: "/dashboard/customers", icon: <Users />, text: t.customers, color: "text-amber-500" },
    { to: "/dashboard/domain-management", icon: <Globe />, text: t.domains, color: "text-purple-500" },
    { to: "/purchase", icon: <CreditCard />, text: t.billing, color: "text-red-500" },
    { to: "/dashboard/advertising", icon: <Megaphone />, text: t.advertising, color: "text-cyan-500" },
    { to: "/dashboard/ai-content", icon: <Sparkles />, text: t.aiContent, color: "text-amber-500" },
    { to: "/dashboard/video-creator", icon: <Film />, text: t.videoCreator, color: "text-pink-500" }
  ];

  return (
    <div className="lg:col-span-2 space-y-4">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold"
      >
        {t.quickAccess}
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {accessLinks.map((link, i) => (
          <Link to={link.to} className="block" key={i}>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="h-full"
            >
              <Card className="hover:bg-muted/50 transition-colors h-full overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 to-gray-100/50 dark:from-gray-900/0 dark:to-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                  <motion.div 
                    variants={iconVariants}
                    whileHover="hover"
                    className={`h-6 w-6 mb-2 ${link.color}`}
                  >
                    {link.icon}
                  </motion.div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="text-sm relative z-10"
                  >
                    {link.text}
                  </motion.span>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default QuickAccessGrid;
