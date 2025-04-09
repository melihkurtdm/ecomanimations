
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface UserProfileProps {
  email: string;
  createdAt: string;
  onSignOut: () => void;
}

const UserProfile = ({ email, createdAt, onSignOut }: UserProfileProps) => {
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
    <motion.div 
      variants={itemVariants}
      className="mt-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Bilgileriniz</CardTitle>
          <CardDescription>Hesap detaylarınız</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 bg-gray-50 rounded-md">
              <div>
                <span className="text-sm font-medium text-gray-500">E-posta:</span> 
                <span className="ml-1">{email}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Üyelik:</span> 
                <span className="ml-1">{new Date(createdAt).toLocaleDateString('tr-TR')} tarihinden beri</span>
              </div>
              <Button 
                variant="outline" 
                onClick={onSignOut}
              >
                Çıkış Yap
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfile;
