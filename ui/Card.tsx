
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hover = true }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white dark:bg-brand-900 
        rounded-[32px] 
        border border-brand-200 dark:border-white/10 
        shadow-sm 
        transition-all 
        ${hover ? 'hover:shadow-xl hover:border-brand-500' : ''} 
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
