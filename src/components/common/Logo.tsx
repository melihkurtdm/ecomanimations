
import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex items-center font-bold ${sizeClasses[size]} ${className}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative rounded-lg px-4 py-2 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.02, 0.98, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.span
          className="relative z-10 text-white font-black"
          animate={{
            textShadow: [
              "0 0 8px rgba(255,255,255,0.4)",
              "0 0 16px rgba(255,255,255,0.6)",
              "0 0 8px rgba(255,255,255,0.4)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          YIX
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Logo;
