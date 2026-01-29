
import React from 'react';
import { User } from '../types';
import { MENU_ITEMS } from '../constants';

interface ProfileSectionProps {
  user: User;
  onNavigate: (tab: any) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user, onNavigate }) => {
  const favoriteItems = MENU_ITEMS.filter(item => user.favorites.includes(item.id));

  return (
    <div className="max-w-4xl mx-auto space-y-10 md:space-y-12 animate-fadeInFast">
      {/* Profile Header */}
      <section className="bg-white dark:bg-brand-900 p-8 md:p-12 rounded-[32px] md:rounded-[40px] border border-brand-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className="size-32 md:size-40 rounded-full border-4 border-brand-500/20 overflow-hidden shadow-xl">
            <img src="https://picsum.photos/seed/user/200" className="w-full h-full object-cover" alt="Profile" />
          </div>
          <button className="absolute bottom-2 right-2 size-10 bg-brand-500 text-white rounded-full flex items-center justify-center border-4 border-white dark:border-brand-900 shadow-lg hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1 className="text-3xl md:text-4xl font-black dark:text-brand-50">{user.name}</h1>
            <span className="inline-flex items-center self-center md:self-auto px-3 py-1 bg-brand-500/10 text-brand-500 text-[10px] font-black uppercase tracking-widest rounded-full">
              Gold Status
            </span>
          </div>
          <p className="text-brand-400 dark:text-brand-300 font-medium">{user.email}</p>
          <p className="text-xs text-brand-300 dark:text-brand-400 italic">Member since {user.memberSince}</p>
        </div>

        <div className="flex gap-4">
           <div className="text-center p-4 bg-brand-50 dark:bg-white/5 rounded-2xl border border-brand-100 dark:border-white/10">
              <p className="text-2xl font-black text-brand-500">{user.orderHistory.length}</p>
              <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Orders</p>
           </div>
           <div className="text-center p-4 bg-brand-50 dark:bg-white/5 rounded-2xl border border-brand-100 dark:border-white/10">
              <p className="text-2xl font-black text-brand-500">{user.points}</p>
              <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Beans</p>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: History and Favorites */}
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            <h2 className="text-2xl font-black dark:text-brand-50">Recent Rituals</h2>
            <div className="space-y-4">
              {user.orderHistory.map(order => (
                <div key={order.id} className="bg-white dark:bg-brand-900 p-5 rounded-2xl border border-brand-200 dark:border-white/10 flex justify-between items-center group hover:border-brand-500 transition-colors">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-brand-400 uppercase tracking-widest">{order.date} • {order.id}</p>
                    <p className="font-bold dark:text-brand-50 line-clamp-1">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-lg font-black text-brand-500">${order.total.toFixed(2)}</p>
                      <span className={`text-[10px] font-black uppercase ${order.status === 'Completed' ? 'text-[#3d9970]' : 'text-brand-300'}`}>
                        {order.status}
                      </span>
                    </div>
                    <button className="p-2 bg-brand-50 dark:bg-white/5 rounded-xl text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <span className="material-symbols-outlined text-sm">receipt_long</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black dark:text-brand-50">Your Favorites</h2>
              <button onClick={() => onNavigate('menu')} className="text-brand-500 text-sm font-bold hover:underline">Browse Menu</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteItems.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-brand-900 rounded-2xl border border-brand-200 dark:border-white/10 group cursor-pointer hover:shadow-lg transition-all" onClick={() => onNavigate('menu')}>
                  <img src={item.imageUrl} className="size-16 rounded-xl object-cover" alt="" />
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold dark:text-brand-50 group-hover:text-brand-500 transition-colors">{item.name}</h4>
                    <p className="text-xs text-brand-400">{item.category}</p>
                  </div>
                  <div className="flex items-center text-brand-500">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Settings & Preferences */}
        <div className="space-y-8">
          <section className="bg-brand-100 dark:bg-white/5 p-6 rounded-[32px] border border-brand-200 dark:border-white/10 space-y-6">
            <h3 className="font-bold text-lg dark:text-brand-50">Account Settings</h3>
            
            <div className="space-y-4">
              {[
                { label: 'Push Notifications', active: true, icon: 'notifications' },
                { label: 'Email Newsletters', active: false, icon: 'mail' },
                { label: 'Location Services', active: true, icon: 'location_on' }
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-400 text-sm">{setting.icon}</span>
                    <span className="text-sm font-medium dark:text-brand-300">{setting.label}</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative ${setting.active ? 'bg-[#3d9970]' : 'bg-brand-200 dark:bg-white/20'}`}>
                    <div className={`absolute top-0.5 size-3 bg-white rounded-full transition-all ${setting.active ? 'left-[18px]' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-200 dark:border-white/10 space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-brand-900 rounded-xl text-sm font-bold dark:text-brand-50 hover:bg-brand-50 transition-colors">
                <span>Payment Methods</span>
                <span className="material-symbols-outlined text-sm">credit_card</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-brand-900 rounded-xl text-sm font-bold dark:text-brand-50 hover:bg-brand-50 transition-colors">
                <span>Contact Support</span>
                <span className="material-symbols-outlined text-sm">help</span>
              </button>
            </div>
          </section>

          <section className="bg-brand-900 dark:bg-brand-500 p-8 rounded-[32px] text-white space-y-4 text-center">
            <h4 className="font-black text-xl">Refer a Friend</h4>
            <p className="text-xs text-white/70 leading-relaxed">Give $5, Get $5. Share the CaféCulture ritual with your squad.</p>
            <button className="w-full bg-white text-brand-900 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
              Copy Invite Link
            </button>
          </section>

          <button className="w-full py-4 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-colors">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
