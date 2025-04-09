
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  duration?: number;
  onComplete?: () => void;
}

const LoadingScreen = ({ duration = 2000, onComplete }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onComplete]);
  
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: (duration - 500) / 1000 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-bold gradient-text">E-Paket</h1>
      </motion.div>
      
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: (duration - 500) / 1000, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-brand-purple to-brand-blue"
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-4 text-gray-500"
      >
        Mağazanız yükleniyor...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
