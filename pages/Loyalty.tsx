
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface LoyaltyProps {
  user: User;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const Loyalty: React.FC<LoyaltyProps> = ({ user }) => {
  const nextTier = 2000;
  const progressToGold = (user.points / nextTier) * 100;

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-12 md:space-y-20"
    >
      {/* Premium Member Card */}
      <motion.section variants={itemVariants}>
        <div className="relative rounded-[48px] md:rounded-[64px] bg-brand-900 p-10 md:p-20 text-white overflow-hidden shadow-3xl">
          {/* Decorative background elements */}
          <div className="absolute -bottom-24 -left-24 size-[500px] bg-brand-500/10 rounded-full blur-[140px]" />
          <div className="absolute -top-32 -right-32 size-[400px] bg-brand-300/10 rounded-full blur-[120px]" />
          <div className="absolute top-12 right-12 opacity-5">
            <span className="material-symbols-outlined text-[200px] rotate-12">loyalty</span>
          </div>

          <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-16">
            <div className="space-y-8 flex-1 w-full text-center xl:text-left">
              <div className="space-y-3">
                <Badge variant="outline" className="text-brand-300 border-brand-300/30 px-6 py-2.5 bg-brand-300/5">
                  Exclusive Gold Member
                </Badge>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                  Welcome back, <br />
                  <span className="text-brand-300">{user.name.split(' ')[0]}</span>
                </h2>
              </div>
              
              <p className="text-white/60 text-lg md:text-2xl font-medium max-w-xl mx-auto xl:mx-0">
                You're just <span className="text-brand-300 font-black">{nextTier - user.points}</span> beans away from Platinum status.
              </p>
              
              <div className="space-y-4 max-w-xl mx-auto xl:mx-0">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-brand-300">
                  <span>Tier Progress</span>
                  <span>{Math.round(progressToGold)}% to Platinum</span>
                </div>
                <div className="h-5 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToGold}%` }}
                    transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                    className="h-full bg-brand-300 rounded-full shadow-[0_0_20px_rgba(212,195,181,0.5)]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center xl:justify-start gap-4 pt-4">
                <Button variant="secondary" size="lg" className="px-10 py-5 rounded-2xl">Redeem Beans</Button>
                <Button variant="outline" size="lg" className="px-10 py-5 rounded-2xl text-white border-white/20 hover:bg-white/10">Member Benefits</Button>
              </div>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[56px] shadow-2xl flex flex-col items-center shrink-0 w-full md:w-[350px] transform rotate-3 hover:rotate-0 transition-all duration-700"
            >
               <div className="size-44 md:size-56 border-[20px] border-brand-300/10 rounded-full flex items-center justify-center text-5xl md:text-7xl font-black mb-8 relative">
                  <span className="relative z-10 text-brand-300">{user.points}</span>
                  <div className="absolute inset-0 bg-brand-500/5 rounded-full animate-pulse" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-300 text-center">Available <br/> Beans Balance</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
        {/* Digital Punch Card */}
        <motion.section variants={itemVariants}>
          <Card className="p-10 md:p-14 h-full border-brand-200 dark:border-white/10" hover={false}>
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-black flex items-center gap-4 dark:text-brand-50 tracking-tight">
                <span className="material-symbols-outlined text-brand-500 text-4xl">confirmation_number</span>
                Punch Rituals
              </h3>
              <Badge variant="neutral">{user.punchCardCount}/10 Punches</Badge>
            </div>
            
            <div className="grid grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 + 0.5 }}
                  className={`aspect-square rounded-[24px] md:rounded-[32px] border-2 border-dashed flex items-center justify-center transition-all duration-500 ${
                    i < user.punchCardCount 
                      ? 'bg-brand-500 border-brand-500 text-white shadow-xl shadow-brand-500/30 scale-105' 
                      : 'border-brand-200 dark:border-white/20 text-brand-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {i < user.punchCardCount ? 'check' : 'coffee'}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 p-8 bg-brand-50 dark:bg-brand-900 rounded-[32px] text-center border border-brand-200 dark:border-white/10">
              <p className="text-base md:text-lg text-brand-400 dark:text-brand-300 font-medium">
                Only <span className="text-brand-500 font-black">{10 - user.punchCardCount}</span> more pour-overs until your next <br className="hidden md:block"/> signature brew is on us.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Barista Squad / Personal Connections */}
        <motion.section variants={itemVariants}>
          <Card className="bg-brand-100 dark:bg-brand-900 border-none p-10 md:p-14 h-full" hover={false}>
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-black flex items-center gap-4 dark:text-brand-50 tracking-tight">
                <span className="material-symbols-outlined text-brand-500 text-4xl">groups</span>
                Your Roasters
              </h3>
              <Badge variant="success">Daily Team</Badge>
            </div>
            
            <div className="space-y-6">
              {[
                { name: 'Sarah', role: 'Latte Art Specialist', img: 'https://picsum.photos/seed/barista1/200', active: true },
                { name: 'Marcus', role: 'Head of Roasting', img: 'https://picsum.photos/seed/barista2/200', active: true },
                { name: 'Elena', role: 'Matcha Master', img: 'https://picsum.photos/seed/barista3/200', active: false }
              ].map((b, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 12 }}
                  className="flex items-center gap-6 bg-white dark:bg-brand-900 p-6 rounded-[32px] border border-brand-100 dark:border-white/5 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img src={b.img} className="size-16 md:size-20 rounded-[24px] border-2 border-brand-500/10 object-cover" alt={b.name} />
                  <div className="flex-1">
                    <h4 className="font-black text-xl md:text-2xl dark:text-brand-50 leading-tight">{b.name}</h4>
                    <p className="text-[10px] text-brand-400 font-bold uppercase tracking-[0.2em] mt-2">{b.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${b.active ? 'bg-green-500/10' : 'bg-brand-200 dark:bg-white/5'}`}>
                      <span className={`size-2 rounded-full ${b.active ? 'bg-green-500 animate-pulse' : 'bg-brand-300'}`} />
                      <p className={`text-[9px] font-black uppercase tracking-widest ${b.active ? 'text-green-500' : 'text-brand-400'}`}>
                        {b.active ? 'On Shift' : 'Away'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <p className="mt-12 text-[10px] text-brand-400 uppercase font-black text-center tracking-[0.3em] opacity-40">
              Artisan Craftsmanship in every cup.
            </p>
          </Card>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Loyalty;
