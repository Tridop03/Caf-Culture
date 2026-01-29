
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-brand-900 border-t border-brand-200 dark:border-white/10 pt-20 pb-10 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-brand-500">
              <span className="material-symbols-outlined text-4xl">coffee</span>
              <h2 className="text-2xl font-black text-brand-900 dark:text-brand-50 tracking-tight">CaféCulture</h2>
            </div>
            <p className="text-brand-400 dark:text-brand-300 leading-relaxed max-w-xs font-medium">
              Bringing ethically sourced specialty beans and artisan rituals to your daily life since 2015.
            </p>
            <div className="flex gap-4">
              {['brand_family', 'public', 'alternate_email'].map(icon => (
                <button key={icon} className="size-10 rounded-xl bg-brand-100 dark:bg-white/5 flex items-center justify-center text-brand-500 hover:bg-brand-500 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-xl">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400 mb-8">Visit Us</h4>
            <ul className="space-y-6 text-brand-900 dark:text-brand-50 font-bold">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-brand-500">location_on</span>
                <div>
                  <p>123 Brew Street</p>
                  <p className="text-brand-400 font-medium">NY 10001, USA</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-brand-500">schedule</span>
                <div>
                  <p>Open Daily</p>
                  <p className="text-brand-400 font-medium">7:00 AM — 7:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400 mb-8">Navigation</h4>
            <ul className="space-y-4 font-bold text-brand-900 dark:text-brand-50">
              {['Menu', 'Gift Cards', 'Subscriptions', 'Events', 'Careers'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-500 transition-colors flex items-center justify-between group">
                    {link}
                    <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">east</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400 mb-2">Newsletter</h4>
              <p className="text-brand-900 dark:text-brand-50 font-bold">Join the Culture.</p>
            </div>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter email..." 
                className="w-full bg-brand-100 dark:bg-white/5 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-brand-500/20 dark:text-white outline-none" 
              />
              <button className="w-full bg-brand-900 dark:bg-brand-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-transform">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-brand-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-brand-400">
          <p>© 2024 CaféCulture Roasting Co. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
