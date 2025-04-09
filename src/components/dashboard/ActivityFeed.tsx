
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ActivityItem {
  id: number;
  activity: string;
  time: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
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
    <motion.div variants={itemVariants}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Son Etkinlikler</CardTitle>
          <CardDescription>Hesabınızdaki son işlemler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="w-2 h-2 rounded-full bg-brand-purple mt-2 mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.activity}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full">
            Tüm etkinlikleri görüntüle
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ActivityFeed;
