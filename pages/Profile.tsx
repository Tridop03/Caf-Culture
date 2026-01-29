
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { MENU_ITEMS } from '../constants';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface ProfileProps {
  user: User;
  onNavigate: (tab: any) => void;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const Profile: React.FC<ProfileProps> = ({ user, onNavigate }) => {
  const favoriteItems = MENU_ITEMS.filter(item => user.favorites.includes(item.id));

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-6xl mx-auto space-y-12 md:space-y-20"
    >
      {/* Profile Header */}
      <motion.section variants={itemVariants}>
        <Card hover={false} className="p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16 border-brand-200 dark:border-white/10 relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[80px] rounded-full" />
          
          <div className="relative group shrink-0">
            <div className="size-40 md:size-48 rounded-full border-4 border-brand-500/10 p-1.5 shadow-2xl overflow-hidden bg-brand-50 dark:bg-brand-900 transition-transform duration-700 group-hover:scale-105">
              <img 
                src="https://picsum.photos/seed/user/300" 
                className="w-full h-full object-cover rounded-full" 
                alt="Profile" 
              />
            </div>
            <button className="absolute bottom-2 right-2 size-12 bg-brand-500 text-white rounded-2xl flex items-center justify-center border-4 border-white dark:border-brand-900 shadow-xl hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h1 className="text-4xl md:text-5xl font-black dark:text-brand-50 tracking-tight">{user.name}</h1>
                <Badge variant="brand" className="px-6 py-2">Gold Member</Badge>
              </div>
              <p className="text-brand-400 dark:text-brand-300 text-lg font-medium">{user.email}</p>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-brand-300 dark:text-brand-400">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              Member since {user.memberSince}
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 shrink-0">
             <div className="text-center p-6 bg-brand-50 dark:bg-white/5 rounded-[32px] border border-brand-100 dark:border-white/10 min-w-[100px] shadow-sm">
                <p className="text-3xl font-black text-brand-500">{user.orderHistory.length}</p>
                <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest mt-2">Orders</p>
             </div>
             <div className="text-center p-6 bg-brand-50 dark:bg-white/5 rounded-[32px] border border-brand-100 dark:border-white/10 min-w-[100px] shadow-sm">
                <p className="text-3xl font-black text-brand-500">{user.points}</p>
                <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest mt-2">Beans</p>
             </div>
          </div>
        </Card>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
        {/* Left Column: Ritual History and Favorites */}
        <div className="lg:col-span-2 space-y-16">
          <motion.section variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-black dark:text-brand-50 tracking-tight">Recent Rituals</h2>
            <div className="space-y-5">
              {user.orderHistory.map(order => (
                <Card key={order.id} className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center group border-brand-200 dark:border-white/10 hover:border-brand-500/50">
                  <div className="space-y-2 text-center sm:text-left mb-6 sm:mb-0">
                    <p className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em]">{order.date} • {order.id}</p>
                    <p className="font-bold text-xl md:text-2xl dark:text-brand-50 leading-tight">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-right">
                      <p className="text-2xl font-black text-brand-500">${order.total.toFixed(2)}</p>
                      <Badge variant={order.status === 'Completed' ? 'success' : 'neutral'} className="mt-1">
                        {order.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="icon" className="size-14 rounded-2xl group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <span className="material-symbols-outlined">receipt_long</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="text-3xl font-black dark:text-brand-50 tracking-tight">Your Favorites</h2>
              <Button variant="ghost" className="text-brand-500 font-black px-0" onClick={() => onNavigate('menu')}>
                Full Menu <span className="material-symbols-outlined ml-2 text-sm">east</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favoriteItems.map(item => (
                <Card 
                  key={item.id} 
                  className="flex gap-6 p-6 group cursor-pointer border-brand-200 dark:border-white/10" 
                  onClick={() => onNavigate('menu')}
                >
                  <div className="size-20 md:size-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-xl dark:text-brand-50 group-hover:text-brand-500 transition-colors">{item.name}</h4>
                    <p className="text-xs text-brand-400 font-black uppercase tracking-widest mt-1">{item.category}</p>
                  </div>
                  <div className="flex items-center text-brand-500 shrink-0">
                    <span className="material-symbols-outlined text-2xl">favorite</span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right Column: Experience Settings */}
        <div className="space-y-12">
          <motion.section variants={itemVariants}>
            <Card className="bg-brand-50 dark:bg-brand-900 border-none p-8 md:p-10 space-y-10 shadow-inner" hover={false}>
              <h3 className="font-black text-2xl dark:text-brand-50 tracking-tight">App Experience</h3>
              
              <div className="space-y-6">
                {[
                  { label: 'Push Notifications', active: true, icon: 'notifications' },
                  { label: 'Early Access Offers', active: true, icon: 'local_offer' },
                  { label: 'Location Services', active: true, icon: 'my_location' }
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-brand-500 shadow-sm">
                        <span className="material-symbols-outlined text-xl">{setting.icon}</span>
                      </div>
                      <span className="text-sm font-bold dark:text-brand-300">{setting.label}</span>
                    </div>
                    <button 
                      className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${setting.active ? 'bg-brand-500' : 'bg-brand-200 dark:bg-white/10'}`}
                    >
                      <motion.div 
                        initial={false}
                        animate={{ x: setting.active ? 22 : 4 }}
                        className="absolute top-1 size-4 bg-white rounded-full shadow-sm" 
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-brand-200 dark:border-white/10 space-y-4">
                <Button variant="ghost" className="w-full justify-between px-6 py-4 bg-white dark:bg-white/5 rounded-2xl border border-transparent hover:border-brand-500/30">
                  <span className="font-bold">Payment Methods</span>
                  <span className="material-symbols-outlined text-xl">credit_card</span>
                </Button>
                <Button variant="ghost" className="w-full justify-between px-6 py-4 bg-white dark:bg-white/5 rounded-2xl border border-transparent hover:border-brand-500/30">
                  <span className="font-bold">Order Preferences</span>
                  <span className="material-symbols-outlined text-xl">settings_account_box</span>
                </Button>
              </div>
            </Card>
          </motion.section>

          <motion.section variants={itemVariants}>
            <Card className="bg-brand-900 dark:bg-brand-500 border-none p-10 text-white space-y-6 text-center relative overflow-hidden" hover={false}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-300 via-white to-brand-300" />
              <h4 className="font-black text-2xl tracking-tight">Gift the Ritual</h4>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                Refer a coffee lover. You both get <span className="text-brand-300 font-black">$10 credit</span> for your next visit.
              </p>
              <Button variant="secondary" className="w-full py-4 text-lg font-black shadow-2xl">
                Share Invite Link
              </Button>
            </Card>
          </motion.section>

          <motion.div variants={itemVariants}>
            <Button variant="danger" className="w-full py-5 text-base font-black border-2 border-red-500/20 hover:border-red-500/50">
              Sign Out Account
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
