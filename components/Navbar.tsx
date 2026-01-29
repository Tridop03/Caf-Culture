
import React, { useState, useRef, useEffect } from 'react';
import { MENU_ITEMS } from '../constants';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, setActiveTab, cartCount, onOpenCart, onOpenMobileMenu 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredMenu = MENU_ITEMS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'community', label: 'Community' },
    { id: 'loyalty', label: 'Loyalty' },
  ];

  return (
    <header className="sticky top-0 z-[60] w-full bg-white/95 dark:bg-brand-900/95 backdrop-blur-xl border-b border-brand-200 dark:border-white/10 px-4 md:px-8 py-3.5 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-12">
        
        {/* Brand/Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 -ml-2 rounded-xl text-brand-900 dark:text-brand-50 hover:bg-brand-100 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div 
            className="flex items-center gap-2.5 text-brand-500 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform duration-500">coffee</span>
            <h1 className="text-xl font-black tracking-tight text-brand-900 dark:text-brand-50 hidden sm:block">CaféCulture</h1>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id as any)}
              className={`text-xs font-black uppercase tracking-widest transition-all relative py-2 ${
                activeTab === link.id
                  ? 'text-brand-500'
                  : 'text-brand-400 hover:text-brand-500 dark:text-brand-300 dark:hover:text-brand-100'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Search Input */}
        <div className="hidden md:flex relative flex-1 max-w-sm" ref={searchRef}>
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400 text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search rituals..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="w-full bg-brand-100/50 dark:bg-white/5 border-transparent rounded-2xl pl-11 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-brand-500/20 focus:bg-white dark:focus:bg-brand-900 dark:text-brand-50 transition-all outline-none"
            />
          </div>

          {showResults && searchQuery.length > 0 && (
            <div className="absolute top-full mt-3 left-0 w-full bg-white dark:bg-brand-900 rounded-[24px] shadow-2xl border border-brand-200 dark:border-white/10 overflow-hidden z-50 animate-fadeInFast">
              <div className="p-2.5 max-h-[400px] overflow-y-auto">
                {filteredMenu.length > 0 ? filteredMenu.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => { setActiveTab('menu'); setSearchQuery(''); setShowResults(false); }}
                    className="flex items-center gap-4 p-2.5 hover:bg-brand-50 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                  >
                    <img src={item.imageUrl} className="size-11 rounded-xl object-cover" alt="" />
                    <div className="flex-1">
                      <p className="text-sm font-bold dark:text-brand-50">{item.name}</p>
                      <p className="text-[10px] text-brand-400 font-black uppercase tracking-widest">{item.category}</p>
                    </div>
                    <span className="text-brand-500 font-black text-xs">${item.price.toFixed(2)}</span>
                  </div>
                )) : (
                  <div className="p-8 text-center text-xs text-brand-400 font-medium italic">No matches for your search.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions (Cart & Profile) */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <button 
            onClick={onOpenCart}
            className="relative flex items-center justify-center rounded-2xl size-11 bg-brand-500 text-white hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">shopping_basket</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-900 dark:bg-brand-300 text-white dark:text-brand-900 text-[10px] font-black size-5 flex items-center justify-center rounded-full border-2 border-white dark:border-brand-900">
                {cartCount}
              </span>
            )}
          </button>
          
          <div 
            onClick={() => setActiveTab('profile')}
            className="w-11 h-11 rounded-2xl border-2 border-brand-200 dark:border-white/10 overflow-hidden cursor-pointer hover:border-brand-500 transition-all shadow-sm"
          >
             <img src="https://picsum.photos/seed/user/100" className="w-full h-full object-cover" alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
