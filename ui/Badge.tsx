
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'success' | 'neutral' | 'outline';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'brand', className = '' }) => {
  const variants = {
    brand: "bg-brand-500/10 text-brand-500",
    success: "bg-[#3d9970]/10 text-[#3d9970]",
    neutral: "bg-brand-100 dark:bg-white/5 text-brand-400 dark:text-brand-300",
    outline: "border border-brand-200 dark:border-white/10 text-brand-400"
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
