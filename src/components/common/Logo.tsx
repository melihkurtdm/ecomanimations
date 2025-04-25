
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
        initial={{ background: "linear-gradient(90deg, #10B981, #3B82F6)" }}
        whileHover={{
          background: "linear-gradient(180deg, #10B981, #3B82F6)",
          transition: { duration: 0.3 }
        }}
        className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500"
      >
        YIX
      </motion.span>
    </motion.div>
  );
};

export default Logo;
