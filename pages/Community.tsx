
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommunityPost, Event } from '../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface CommunityProps {
  posts: CommunityPost[];
  events: Event[];
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const Community: React.FC<CommunityProps> = ({ posts, events }) => {
  const [activeEvents, setActiveEvents] = useState<Event[]>(events);
  const [isPosting, setIsPosting] = useState(false);

  const toggleRSVP = (id: string) => {
    setActiveEvents(activeEvents.map(e => e.id === id ? { ...e, isRSVPed: !e.isRSVPed } : e));
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-12 md:space-y-20"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="space-y-4">
        <Badge>The Hub</Badge>
        <h1 className="text-4xl md:text-6xl font-black dark:text-brand-50 tracking-tight">Community Rituals</h1>
        <p className="text-brand-400 dark:text-brand-300 text-lg md:text-xl font-medium max-w-2xl">
          Where coffee meets culture. Join local events, share your experiences, and learn the art of the brew.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Events */}
        <div className="lg:col-span-2 space-y-10">
          <motion.div variants={itemVariants} className="flex justify-between items-end">
            <h2 className="text-2xl md:text-3xl font-black dark:text-brand-50 tracking-tight">Upcoming Gatherings</h2>
          </motion.div>
          
          <div className="space-y-8">
            {activeEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
              >
                <Card className="flex flex-col md:flex-row gap-8 p-6 md:p-8 group overflow-hidden border-brand-200 dark:border-white/10 hover:border-brand-500/50">
                  <div className="md:w-64 h-56 rounded-[32px] overflow-hidden shrink-0 relative shadow-inner bg-brand-100 dark:bg-brand-900">
                    <img 
                      src={event.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={event.title} 
                    />
                    <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  
                  <div className="flex-1 space-y-4 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-brand-500 text-[10px] font-black uppercase tracking-[0.2em]">
                      <span className="material-symbols-outlined text-sm">calendar_month</span>
                      {event.date} • {event.time}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black dark:text-brand-50 group-hover:text-brand-500 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-brand-400 dark:text-brand-300 text-base md:text-lg leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="pt-4 flex gap-4">
                      <Button 
                        onClick={() => toggleRSVP(event.id)}
                        variant={event.isRSVPed ? 'primary' : 'outline'}
                        className={`px-8 ${event.isRSVPed ? 'bg-brand-500 border-brand-500' : ''}`}
                      >
                        {event.isRSVPed ? (
                          <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Going
                          </span>
                        ) : 'Reserve Seat'}
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <span className="material-symbols-outlined">share</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Board & Tutorials */}
        <div className="space-y-12">
          {/* Community Board */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-black dark:text-brand-50 tracking-tight">The Board</h2>
            <Card hover={false} className="bg-brand-900 p-8 md:p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden border-none">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-[60px] rounded-full" />
              <div className="relative z-10 space-y-8">
                <AnimatePresence mode="popLayout">
                  {posts.map((post, idx) => (
                    <motion.div 
                      key={post.id} 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pb-8 border-b border-white/10 last:border-0 last:pb-0"
                    >
                      <p className="text-lg md:text-xl italic text-white/90 mb-4 leading-relaxed font-serif">
                        "{post.content}"
                      </p>
                      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                        <span className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-brand-500/30 flex items-center justify-center border border-white/10">
                            {post.author[0]}
                          </div>
                          {post.author}
                        </span>
                        <span>{post.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                  onClick={() => setIsPosting(true)}
                >
                  Join the Conversation
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Tutorial Highlight */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-black dark:text-brand-50 tracking-tight">Ritual Mastery</h2>
            <Card className="p-8 space-y-6 border-brand-200 dark:border-white/10 hover:border-brand-500/50">
              <div className="aspect-video bg-brand-100 dark:bg-brand-900 rounded-[24px] flex items-center justify-center group cursor-pointer relative overflow-hidden shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 group-hover:scale-110 transition-transform duration-700" 
                  alt="Brew Guide" 
                />
                <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-transparent transition-colors" />
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="size-16 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-2xl relative z-10"
                >
                  <span className="material-symbols-outlined text-4xl">play_arrow</span>
                </motion.div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-brand-400 dark:text-brand-300 uppercase tracking-widest">Guide • 04:32</p>
                <h4 className="text-xl font-bold dark:text-brand-50">Mastering the Hario V60</h4>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Community;
