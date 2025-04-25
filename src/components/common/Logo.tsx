
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
      className={`font-bold ${sizeClasses[size]} ${className}`}
    >
      <motion.span
        className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent font-black"
        whileHover={{ scale: 1.05 }}
        animate={{
          backgroundSize: ["100%", "200%", "100%"],
          backgroundPosition: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        YIX
      </motion.span>
    </motion.div>
  );
};

export default Logo;
