
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-[10px] font-black uppercase tracking-widest text-brand-400">{label}</label>}
      <input 
        className={`w-full bg-brand-50 dark:bg-white/5 border-brand-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-white transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-[10px] font-black uppercase tracking-widest text-brand-400">{label}</label>}
      <div className="relative">
        <select 
          className={`w-full bg-brand-50 dark:bg-white/5 border-brand-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-white appearance-none transition-all ${className}`}
          {...props}
        >
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-400">expand_more</span>
      </div>
    </div>
  );
};
