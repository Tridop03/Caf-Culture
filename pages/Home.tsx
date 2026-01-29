
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MenuItem } from '../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { getDrinkRecommendation } from '../services/geminiService';
import Hero from '@/components/Home/Hero';

interface HomeProps {
  user: User;
  onNavigate: (tab: any) => void;
  featuredItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const Home: React.FC<HomeProps> = ({ user, onNavigate, featuredItems, onAddToCart }) => {
  const [aiRec, setAiRec] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [pref, setPref] = useState('');

  const handleAiRec = async () => {
    if (!pref.trim()) return;
    setIsAiLoading(true);
    const rec = await getDrinkRecommendation(pref);
    setAiRec(rec);
    setIsAiLoading(false);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-16 md:space-y-28"
    >
      {/* Hero Section */}
      <Hero/>

      {/* AI Interaction - personal barista feature */}
      <motion.section variants={itemVariants}>
        <Card hover={false} className="bg-brand-900 text-white p-10 md:p-20 border-none overflow-hidden relative group rounded-[40px] md:rounded-[64px]">
          <div className="absolute -top-16 -right-16 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
            <span className="material-symbols-outlined text-[400px] rotate-12">auto_awesome</span>
          </div>
          
          <div className="relative z-10 flex flex-col xl:flex-row gap-16 md:gap-24 items-center">
            <div className="flex-1 space-y-8 text-center xl:text-left">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Meet your digital barista.</h2>
              <p className="text-brand-300 text-xl md:text-2xl max-w-3xl mx-auto xl:mx-0 font-medium leading-relaxed">
                Tell Gemini AI your current vibe or flavor profile, and we'll suggest your perfect ritual.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto xl:mx-0 pt-4">
                <input 
                  type="text"
                  placeholder="e.g. Something warm, floral, and low caffeine..."
                  value={pref}
                  onChange={(e) => setPref(e.target.value)}
                  className="flex-1 bg-white/10 border-white/10 rounded-[28px] px-8 py-6 text-white focus:ring-4 focus:ring-brand-500/30 outline-none transition-all placeholder:text-white/30 text-lg md:text-xl font-medium"
                />
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={handleAiRec}
                  isLoading={isAiLoading}
                  className="whitespace-nowrap px-14 py-6 text-lg"
                >
                  Get Recommendation
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {aiRec && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -40 }}
                  className="xl:w-[450px] bg-white/5 border border-white/15 p-12 rounded-[56px] backdrop-blur-2xl shadow-3xl ring-1 ring-white/20"
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-300 mb-8">Personal Recommendation</p>
                  <p className="text-2xl md:text-3xl italic font-medium leading-relaxed font-serif text-white/95">
                    "{aiRec}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.section>

      {/* Seasonal Grid */}
      <motion.section variants={itemVariants} className="space-y-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-7xl font-black dark:text-brand-50 tracking-tighter">Season's Pick</h2>
            <p className="text-brand-400 dark:text-brand-300 text-xl md:text-2xl font-medium">Curated by our roasters for this week.</p>
          </div>
          <Button variant="ghost" className="self-start sm:self-auto group py-4 px-8 text-lg font-black" onClick={() => onNavigate('menu')}>
            See Full Menu <span className="material-symbols-outlined group-hover:translate-x-3 transition-transform ml-3 text-2xl">east</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {featuredItems.map(item => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="flex flex-col group h-full rounded-[48px] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="h-80 md:h-96 overflow-hidden relative">
                  <img 
                    src={item.imageUrl} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={item.name} 
                  />
                  <div className="absolute top-8 left-8">
                    <Badge variant="brand" className="bg-white/95 text-brand-900 border-none shadow-2xl px-6 py-2.5">Signature</Badge>
                  </div>
                </div>
                <div className="p-10 md:p-12 space-y-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-6">
                    <div>
                      <h4 className="font-bold text-2xl md:text-3xl dark:text-brand-50 group-hover:text-brand-500 transition-colors leading-tight">{item.name}</h4>
                      <p className="text-xs font-black uppercase tracking-widest text-brand-400 mt-3">{item.category}</p>
                    </div>
                    <span className="text-brand-500 font-black text-2xl md:text-3xl">${item.price.toFixed(2)}</span>
                  </div>
                  <Button variant="brand" className="w-full mt-auto py-6 text-xl" onClick={() => onAddToCart(item)}>
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
