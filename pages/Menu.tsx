
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface MenuProps {
  items: MenuItem[];
  dietaryFilter: string[];
  setDietaryFilter: (f: string[]) => void;
  onAddToCart: (item: MenuItem, cust?: any) => void;
  favorites: string[];
}

const Menu: React.FC<MenuProps> = ({ items, dietaryFilter, setDietaryFilter, onAddToCart, favorites }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [itemDetail, setItemDetail] = useState<MenuItem | null>(null);
  
  // Customization State
  const [milk, setMilk] = useState('Oat');
  const [temp, setTemp] = useState<'Hot' | 'Iced' | 'Extra Hot'>('Hot');
  const [syrup, setSyrup] = useState('None');
  const [sweetness, setSweetness] = useState(50);

  const categories = ['All', 'Coffee', 'Tea', 'Breakfast', 'Bakery', 'Specialty'];

  const filteredItems = items.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const dietaryMatch = dietaryFilter.every(f => item.dietary.includes(f as any));
    return categoryMatch && dietaryMatch;
  });

  const handleOpenDetail = (item: MenuItem) => {
    setItemDetail(item);
    // Reset to defaults or item-specific defaults
    setMilk(item.category === 'Coffee' || item.category === 'Tea' ? 'Oat' : 'Standard');
    setTemp('Hot');
    setSyrup('None');
    setSweetness(50);
  };

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <Badge>Artisan Selection</Badge>
          <h1 className="text-4xl md:text-6xl font-black dark:text-brand-50 tracking-tight">Our Menu</h1>
          <p className="text-brand-400 dark:text-brand-300 text-lg md:text-xl font-medium">Small-batch roasted, poured with precision.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {['Vegan', 'Gluten Free'].map(diet => (
            <button
              key={diet}
              onClick={() => setDietaryFilter(dietaryFilter.includes(diet) ? dietaryFilter.filter(d => d !== diet) : [...dietaryFilter, diet])}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border-2 transition-all ${
                dietaryFilter.includes(diet)
                  ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20'
                  : 'bg-white dark:bg-brand-900 text-brand-400 border-brand-200 dark:border-white/10 hover:border-brand-500'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      {/* Category Nav - Sticky below the main header */}
      <div className="sticky top-[73px] z-40 bg-brand-50/90 dark:bg-brand-900/90 backdrop-blur-xl -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-brand-200 dark:border-white/10">
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-6 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                selectedCategory === cat ? 'text-brand-500' : 'text-brand-400 dark:text-brand-300 hover:text-brand-500'
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div layoutId="menu-cat-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredItems.map(item => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="flex flex-col h-full group">
                <div className="relative h-64 md:h-72 overflow-hidden cursor-pointer" onClick={() => handleOpenDetail(item)}>
                  <img 
                    src={item.imageUrl} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={item.name} 
                  />
                  <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors" />
                  {favorites.includes(item.id) && (
                    <div className="absolute top-4 right-4 bg-brand-500/90 text-white p-2.5 rounded-full shadow-2xl backdrop-blur-md">
                      <span className="material-symbols-outlined text-lg">favorite</span>
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-1 gap-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-bold dark:text-brand-50 group-hover:text-brand-500 transition-colors leading-tight">{item.name}</h3>
                    <span className="text-brand-500 font-black text-xl">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-brand-400 dark:text-brand-300 line-clamp-2 leading-relaxed h-10">{item.description}</p>
                  
                  <div className="mt-auto pt-6 flex gap-3">
                    <Button 
                      className="flex-1" 
                      onClick={() => onAddToCart(item, { milk: 'Standard', temperature: 'Hot' })}
                    >
                      Quick Add
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleOpenDetail(item)}
                    >
                      <span className="material-symbols-outlined text-2xl">tune</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Item Customization Modal */}
      <AnimatePresence>
        {itemDetail && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-900/80 backdrop-blur-xl" 
              onClick={() => setItemDetail(null)} 
            />
            <motion.div 
              layoutId={`item-${itemDetail.id}`}
              className="relative bg-white dark:bg-brand-900 w-full max-w-5xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-[48px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Image Section */}
              <div className="md:w-5/12 h-64 md:h-auto relative shrink-0">
                <img src={itemDetail.imageUrl} className="w-full h-full object-cover" alt={itemDetail.name} />
                <button 
                  onClick={() => setItemDetail(null)}
                  className="absolute top-6 left-6 sm:hidden bg-brand-900/50 backdrop-blur-md p-3 rounded-full text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              {/* Content Section */}
              <div className="flex-1 p-8 md:p-14 overflow-y-auto flex flex-col">
                <div className="flex justify-between items-start mb-10">
                  <div className="space-y-1">
                    <Badge variant="brand">{itemDetail.category}</Badge>
                    <h2 className="text-3xl md:text-5xl font-black dark:text-brand-50 tracking-tight">{itemDetail.name}</h2>
                    <p className="text-brand-500 font-black text-2xl">${itemDetail.price.toFixed(2)}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setItemDetail(null)} 
                    className="hidden sm:flex rounded-full shrink-0"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </Button>
                </div>
                
                <p className="text-brand-400 dark:text-brand-300 leading-relaxed text-lg mb-10 font-medium">
                  {itemDetail.description}
                </p>

                {/* Conditional Customizations */}
                {(['Coffee', 'Tea', 'Specialty'].includes(itemDetail.category)) && (
                  <div className="space-y-10 py-10 border-t border-brand-200 dark:border-white/10">
                    
                    {/* Milk */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400">Milk Alternative</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Whole', 'Oat', 'Almond', 'Coconut'].map(m => (
                          <button 
                            key={m} 
                            onClick={() => setMilk(m)} 
                            className={`py-4 text-[11px] font-black rounded-2xl border-2 transition-all ${
                              milk === m 
                                ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20' 
                                : 'bg-brand-50 dark:bg-white/5 text-brand-400 border-transparent hover:border-brand-200'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Syrup */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400">Add Syrup</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['None', 'Vanilla', 'Hazelnut', 'Lavender'].map(s => (
                          <button 
                            key={s} 
                            onClick={() => setSyrup(s)} 
                            className={`py-4 text-[11px] font-black rounded-2xl border-2 transition-all ${
                              syrup === s 
                                ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20' 
                                : 'bg-brand-50 dark:bg-white/5 text-brand-400 border-transparent hover:border-brand-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Temperature */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400">Temperature</label>
                      <div className="flex gap-3">
                        {(['Hot', 'Iced', 'Extra Hot'] as const).map(t => (
                          <button 
                            key={t} 
                            onClick={() => setTemp(t)} 
                            className={`flex-1 py-4 text-[11px] font-black rounded-2xl border-2 transition-all ${
                              temp === t 
                                ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20' 
                                : 'bg-brand-50 dark:bg-white/5 text-brand-400 border-transparent hover:border-brand-200'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-10 border-t border-brand-200 dark:border-white/10 flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-400 mb-1">Total</p>
                    <p className="text-4xl font-black dark:text-brand-50 tracking-tight">${itemDetail.price.toFixed(2)}</p>
                  </div>
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto px-16 py-6 text-xl"
                    onClick={() => { 
                      onAddToCart(itemDetail, { milk, temperature: temp, syrup, sweetness }); 
                      setItemDetail(null); 
                    }}
                  >
                    Add to Ritual
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
