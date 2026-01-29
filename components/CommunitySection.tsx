
import React, { useState } from 'react';
import { CommunityPost, Event } from '../types';

interface CommunitySectionProps {
  posts: CommunityPost[];
  events: Event[];
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ posts, events }) => {
  const [activeEvents, setActiveEvents] = useState<Event[]>(events);

  const toggleRSVP = (id: string) => {
    setActiveEvents(activeEvents.map(e => e.id === id ? { ...e, isRSVPed: !e.isRSVPed } : e));
  };

  return (
    <div className="space-y-10 md:space-y-12 animate-fadeInFast">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-3xl font-black dark:text-brand-50">Local Events</h2>
          <div className="space-y-4 md:space-y-6">
            {activeEvents.map(event => (
              <div key={event.id} className="flex flex-col sm:flex-row gap-6 p-4 md:p-6 bg-white dark:bg-brand-900 border border-brand-200 dark:border-white/10 rounded-[32px] hover:shadow-xl transition-all group">
                <div className="sm:w-44 h-40 rounded-2xl overflow-hidden shrink-0">
                  <img src={event.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                </div>
                <div className="flex-1 space-y-2 py-2 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-brand-500 text-[10px] font-black uppercase tracking-widest">
                    <span className="material-symbols-outlined text-xs">calendar_today</span>
                    {event.date} • {event.time}
                  </div>
                  <h3 className="text-xl font-bold dark:text-brand-50">{event.title}</h3>
                  <p className="text-sm text-brand-400 dark:text-brand-300 line-clamp-2 leading-relaxed">{event.description}</p>
                  <div className="pt-2">
                    <button 
                      onClick={() => toggleRSVP(event.id)}
                      className={`px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                        event.isRSVPed ? 'bg-[#3d9970] text-white shadow-lg shadow-[#3d9970]/20' : 'bg-brand-100 dark:bg-white/10 text-brand-900 dark:text-brand-50 hover:bg-brand-500 hover:text-white'
                      }`}
                    >
                      {event.isRSVPed ? 'Going!' : 'RSVP Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-black dark:text-brand-50">Board</h2>
          <div className="bg-brand-900 p-8 rounded-[32px] text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              {posts.map(post => (
                <div key={post.id} className="pb-6 border-b border-white/10 last:border-0 last:pb-0">
                  <p className="text-sm italic text-white/90 mb-3 leading-relaxed">"{post.content}"</p>
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-white/40">
                    <span>— {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/20">Post Message</button>
            </div>
          </div>

          <div className="bg-white dark:bg-brand-900 p-6 rounded-[32px] border border-brand-200 dark:border-white/10 space-y-4">
             <h4 className="font-bold flex items-center gap-2 dark:text-brand-50">
                <span className="material-symbols-outlined text-brand-500">video_library</span>
                Guides
             </h4>
             <div className="aspect-video bg-brand-100 dark:bg-white/5 rounded-2xl flex items-center justify-center group cursor-pointer relative overflow-hidden">
                <img src="https://picsum.photos/seed/coffee/400/225" className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-30" alt="" />
                <span className="material-symbols-outlined text-5xl text-brand-500 relative z-10 group-hover:scale-110 transition-transform">play_circle</span>
             </div>
             <p className="text-[10px] font-black text-brand-400 dark:text-brand-300 uppercase tracking-widest">Mastering the V60</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
