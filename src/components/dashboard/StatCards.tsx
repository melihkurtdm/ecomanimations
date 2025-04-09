
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Users, Box } from 'lucide-react';
import { motion } from 'framer-motion';

interface StoreStats {
  orders: number;
  customers: number;
  products: number;
  revenue: string;
}

interface StatCardsProps {
  stats: StoreStats;
}

const StatCards = ({ stats }: StatCardsProps) => {
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

  const cardHoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover="hover"
          variants={cardHoverVariants}
        >
          <Card className="h-full border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>Siparişler</span>
                <ShoppingBag className="h-5 w-5 text-blue-500" />
              </CardTitle>
              <CardDescription>Son 30 gün</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.orders}</div>
              <div className="text-sm text-green-500 mt-1">↑ 12% artış</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover="hover"
          variants={cardHoverVariants}
        >
          <Card className="h-full border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>Müşteriler</span>
                <Users className="h-5 w-5 text-purple-500" />
              </CardTitle>
              <CardDescription>Toplam</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.customers}</div>
              <div className="text-sm text-green-500 mt-1">↑ 8% artış</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover="hover"
          variants={cardHoverVariants}
        >
          <Card className="h-full border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>Ürünler</span>
                <Box className="h-5 w-5 text-green-500" />
              </CardTitle>
              <CardDescription>Aktif listelenen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.products}</div>
              <div className="text-sm text-green-500 mt-1">↑ 15% artış</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StatCards;
