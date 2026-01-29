
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'brand';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2";
  
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20",
    brand: "bg-brand-900 text-white hover:bg-black",
    secondary: "bg-brand-300 text-brand-900 hover:bg-brand-400",
    outline: "border-2 border-brand-200 dark:border-white/10 text-brand-400 dark:text-brand-300 hover:border-brand-500 hover:text-brand-500 bg-transparent",
    ghost: "text-brand-400 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-white/5 hover:text-brand-500",
    danger: "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "p-2 size-10 md:size-12"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
      ) : children}
    </button>
  );
};

export default Button;
