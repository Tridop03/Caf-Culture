
import React from 'react';
import { User } from '../types';

interface LoyaltySectionProps {
  user: User;
}

const LoyaltySection: React.FC<LoyaltySectionProps> = ({ user }) => {
  return (
    <div className="space-y-8 md:space-y-12 animate-fadeInFast">
      <div className="relative rounded-[32px] md:rounded-[40px] bg-brand-500 p-8 md:p-12 text-white overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Welcome, {user.name.split(' ')[0]}</h2>
            <p className="text-white/80 max-w-sm text-sm md:text-lg">You're on your way to becoming a Legend member.</p>
            <div className="inline-flex items-center gap-4 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20">
              <span className="text-3xl md:text-4xl font-black">{user.points}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Beans Earned</span>
            </div>
          </div>
          
          <div className="bg-white text-brand-900 p-6 md:p-8 rounded-[32px] shadow-2xl flex flex-col items-center shrink-0 w-full md:w-auto">
             <div className="size-28 md:size-32 border-[12px] border-brand-500/10 rounded-full flex items-center justify-center text-3xl md:text-4xl font-black mb-4">
                {user.points / 50}%
             </div>
             <p className="text-xs font-black uppercase tracking-widest text-brand-400">Next Free Brew</p>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 size-80 bg-white/10 rounded-full blur-[100px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white dark:bg-brand-900 p-6 md:p-8 rounded-[32px] border border-brand-200 dark:border-white/10 shadow-sm">
          <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2 dark:text-brand-50">
            <span className="material-symbols-outlined text-brand-500">loyalty</span>
            Digital Punch Card
          </h3>
          <div className="grid grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-full border-2 border-dashed flex items-center justify-center transition-all ${
                  i < user.punchCardCount 
                    ? 'bg-brand-500 border-brand-500 text-white' 
                    : 'border-brand-200 dark:border-white/10 text-brand-200'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {i < user.punchCardCount ? 'check' : 'coffee'}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs md:text-sm text-brand-400 dark:text-brand-300 text-center">Buy 10 coffees, get 1 free! Almost there.</p>
        </div>

        <div className="bg-brand-100 dark:bg-white/5 p-6 md:p-8 rounded-[32px] border border-brand-200 dark:border-white/10">
          <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2 dark:text-brand-50">
            <span className="material-symbols-outlined text-brand-500">person</span>
            Barista Squad
          </h3>
          <div className="space-y-3 md:space-y-4">
            {[
              { name: 'Sarah', role: 'Art Expert', img: 'https://picsum.photos/seed/barista1/100' },
              { name: 'Marcus', role: 'Roast Master', img: 'https://picsum.photos/seed/barista2/100' }
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-4 bg-white dark:bg-brand-900 p-4 rounded-2xl border border-brand-100 dark:border-white/5">
                <img src={b.img} className="size-10 md:size-12 rounded-full border-2 border-white dark:border-brand-900" alt="" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm dark:text-brand-50">{b.name}</h4>
                  <p className="text-[10px] text-brand-400 uppercase font-black">{b.role}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-[#3d9970]">ON SHIFT</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltySection;
