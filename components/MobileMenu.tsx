
import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  if (!isOpen) return null;

  const links = [
    { name: 'Home', icon: 'home' },
    { name: 'Menu', icon: 'restaurant_menu' },
    { name: 'Community', icon: 'groups' },
    { name: 'Loyalty', icon: 'loyalty' },
    { name: 'Profile', icon: 'account_circle' },
    { name: 'About', icon: 'info' }
  ];

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeInFast" 
        onClick={onClose} 
      />
      
      <div className="absolute inset-y-0 left-0 w-3/4 max-w-xs bg-white dark:bg-brand-900 shadow-2xl flex flex-col p-6 animate-slideInLeft">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-brand-500">
            <span className="material-symbols-outlined text-3xl">coffee</span>
            <span className="font-black text-xl tracking-tight text-brand-900 dark:text-brand-50">CaféCulture</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl text-brand-900 dark:text-brand-50 hover:bg-brand-100 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {links.map(link => (
            <button
              key={link.name}
              onClick={() => { setActiveTab(link.name.toLowerCase() as any); onClose(); }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left font-bold transition-all ${
                activeTab === link.name.toLowerCase()
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                  : 'text-brand-400 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {link.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-brand-200 dark:border-white/10 space-y-4">
          <div 
            onClick={() => { setActiveTab('profile'); onClose(); }}
            className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-brand-50 dark:hover:bg-white/5 rounded-2xl transition-colors"
          >
            <div className="size-10 rounded-full border-2 border-brand-500/20 overflow-hidden">
               <img src="https://picsum.photos/seed/user/100" className="w-full h-full object-cover" alt="User" />
            </div>
            <div>
              <p className="text-sm font-black text-brand-900 dark:text-brand-50 leading-none">Jane Doe</p>
              <p className="text-[10px] text-brand-400 uppercase font-bold tracking-widest mt-1">Gold Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;