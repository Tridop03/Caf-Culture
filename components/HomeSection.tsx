
import React from 'react';
import { User, MenuItem } from '../types';

interface HomeSectionProps {
  user: User;
  onNavigate: (tab: any) => void;
  featuredItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ user, onNavigate, featuredItems, onAddToCart }) => {
  return (
    <div className="space-y-10 md:space-y-16 animate-fadeInFast px-2 sm:px-0">
      {/* Hero Section */}
      <section className="relative rounded-[32px] md:rounded-[40px] overflow-hidden bg-brand-900 text-white min-h-[400px] md:min-h-[500px] flex items-center p-6 md:p-16">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1497933321188-941f9ad36b12?auto=format&fit=crop&w=1600&q=80" 
            className="w-full h-full object-cover"
            alt="Hero Coffee"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-xs md:text-sm text-brand-300">stars</span>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Open daily 7am — 7pm</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tight">
            Your Daily Ritual, <br />
            <span className="text-brand-300">Elevated.</span>
          </h1>
          
          <p className="text-base md:text-lg text-white/70 font-medium leading-relaxed max-w-md">
            From ethically sourced single-origins to house-made syrups, 
            every cup is a celebration of the craft.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button 
              onClick={() => onNavigate('menu')}
              className="bg-brand-300 text-brand-900 px-8 py-3.5 md:py-4 rounded-2xl font-black text-base md:text-lg hover:scale-105 transition-all shadow-xl shadow-brand-300/10 text-center"
            >
              Order Online
            </button>
            <button 
              onClick={() => onNavigate('community')}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 md:py-4 rounded-2xl font-black text-base md:text-lg hover:bg-white/20 transition-all text-center"
            >
              The Community
            </button>
          </div>
        </div>
      </section>

      {/* User Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div className="md:col-span-2 bg-brand-100 dark:bg-white/5 p-6 md:p-8 rounded-[32px] border border-brand-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl md:text-2xl font-black dark:text-brand-50">Morning, {user.name.split(' ')[0]}!</h3>
            <p className="text-brand-400 dark:text-brand-300 font-medium text-sm md:text-base">You're close to a free upgrade.</p>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-black text-brand-500">{user.points}</p>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-400">Beans</p>
            </div>
            <div className="h-10 w-[1px] bg-brand-200 dark:bg-white/10" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-black text-brand-500">{user.punchCardCount}/10</p>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-400">Punch</p>
            </div>
            <button 
              onClick={() => onNavigate('loyalty')}
              className="size-10 md:size-12 rounded-full bg-brand-500 text-white flex items-center justify-center hover:scale-110 transition-all"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-brand-900 p-6 md:p-8 rounded-[32px] border border-brand-200 dark:border-white/10 shadow-sm flex items-center gap-6">
          <div className="size-14 md:size-16 rounded-2xl bg-brand-50 dark:bg-white/5 border border-brand-100 dark:border-white/10 flex items-center justify-center text-brand-500 shrink-0">
            <span className="material-symbols-outlined text-2xl md:text-3xl">local_fire_department</span>
          </div>
          <div>
            <h4 className="font-black text-lg dark:text-brand-50">Daily Special</h4>
            <p className="text-sm text-brand-400 dark:text-brand-300">Maple Spice Latte — $5.00</p>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="space-y-6 md:space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-black dark:text-brand-50">Season's Favorites</h2>
            <p className="text-sm md:text-base text-brand-400 dark:text-brand-300">Our most-loved picks this week.</p>
          </div>
          <button onClick={() => onNavigate('menu')} className="text-brand-500 font-black flex items-center gap-2 hover:underline text-sm md:text-base">
            Full Menu <span className="material-symbols-outlined">east</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredItems.map(item => (
            <div key={item.id} className="group bg-white dark:bg-brand-900 rounded-3xl overflow-hidden border border-brand-200 dark:border-white/10 hover:shadow-xl transition-all">
              <div className="h-40 md:h-48 overflow-hidden relative">
                <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt={item.name} />
                <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-brand-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-brand-500 uppercase tracking-wider">
                  Featured
                </div>
              </div>
              <div className="p-5 md:p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg dark:text-brand-50">{item.name}</h4>
                  <span className="text-brand-500 font-black text-sm md:text-base">${item.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => onAddToCart(item)}
                  className="w-full py-2.5 md:py-3 rounded-2xl border-2 border-brand-500 text-brand-500 font-black text-sm hover:bg-brand-500 hover:text-white transition-all"
                >
                  Quick Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
