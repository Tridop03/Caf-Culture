
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  dietaryFilter: string[];
  setDietaryFilter: (f: string[]) => void;
  onAddToCart: (item: MenuItem, cust?: any) => void;
  favorites: string[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ items, dietaryFilter, setDietaryFilter, onAddToCart, favorites }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [itemDetail, setItemDetail] = useState<MenuItem | null>(null);
  const [milk, setMilk] = useState('Oat');
  const [temp, setTemp] = useState<'Hot' | 'Iced' | 'Extra Hot'>('Hot');

  const categories = ['All', 'Coffee', 'Tea', 'Breakfast', 'Bakery'];

  const filteredItems = items.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const dietaryMatch = dietaryFilter.every(f => item.dietary.includes(f as any));
    return categoryMatch && dietaryMatch;
  });

  const handleOpenDetail = (item: MenuItem) => {
    setItemDetail(item);
    setMilk(item.category === 'Coffee' || item.category === 'Tea' ? 'Oat' : 'Standard');
    setTemp('Hot');
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeInFast">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black mb-2 dark:text-brand-50">Handcrafted Menu</h1>
          <p className="text-sm md:text-base text-brand-400 dark:text-brand-300">Small-batch roasted, and made by hand daily.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['Vegan', 'Gluten Free'].map(diet => (
            <button
              key={diet}
              onClick={() => setDietaryFilter(dietaryFilter.includes(diet) ? dietaryFilter.filter(d => d !== diet) : [...dietaryFilter, diet])}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-bold border transition-all ${
                dietaryFilter.includes(diet)
                  ? 'bg-[#3d9970] text-white border-[#3d9970]'
                  : 'bg-white dark:bg-brand-900 text-brand-400 border-brand-200 dark:border-white/10 hover:border-brand-500'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-1 hide-scrollbar border-b border-brand-200 dark:border-white/10 sticky top-[64px] bg-brand-50/80 dark:bg-brand-900/80 backdrop-blur-md z-30 -mx-4 px-4 md:static md:mx-0 md:px-0">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-3 md:px-6 text-sm font-bold transition-all ${
              selectedCategory === cat
                ? 'text-brand-500 border-b-2 border-brand-500'
                : 'text-brand-400 dark:text-brand-300 hover:text-brand-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="group bg-white dark:bg-brand-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-brand-200 dark:border-white/10 flex flex-col">
            <div className="relative h-48 md:h-56 overflow-hidden cursor-pointer" onClick={() => handleOpenDetail(item)}>
              <img src={item.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={item.name} />
              {favorites.includes(item.id) && (
                <div className="absolute top-3 right-3 bg-brand-500/80 text-white p-1.5 rounded-full backdrop-blur-sm">
                  <span className="material-symbols-outlined text-sm">favorite</span>
                </div>
              )}
            </div>
            
            <div className="p-5 md:p-6 flex flex-col flex-1 gap-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg md:text-xl font-bold dark:text-brand-50 hover:text-brand-500 cursor-pointer" onClick={() => handleOpenDetail(item)}>{item.name}</h3>
                <span className="text-brand-500 font-black text-sm md:text-base">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-xs md:text-sm text-brand-400 dark:text-brand-300 line-clamp-2 leading-relaxed">{item.description}</p>
              
              <div className="mt-auto pt-4 flex gap-2">
                <button onClick={() => onAddToCart(item)} className="flex-1 bg-brand-500 text-white py-2.5 md:py-3 rounded-xl font-bold text-sm hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/10">Quick Add</button>
                <button onClick={() => handleOpenDetail(item)} className="px-3 md:px-4 border-2 border-brand-200 dark:border-white/10 text-brand-400 dark:text-brand-300 rounded-xl hover:bg-brand-50 dark:hover:bg-white/5 transition-all">
                  <span className="material-symbols-outlined text-lg">tune</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {itemDetail && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setItemDetail(null)} />
          <div className="relative bg-white dark:bg-brand-900 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl animate-fadeInFast flex flex-col md:flex-row max-h-[90vh]">
            <div className="md:w-1/2 h-48 md:h-auto shrink-0">
              <img src={itemDetail.imageUrl} className="w-full h-full object-cover" alt={itemDetail.name} />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-6 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl md:text-2xl font-black dark:text-brand-50">{itemDetail.name}</h2>
                  <p className="text-brand-500 font-bold text-lg">${itemDetail.price.toFixed(2)}</p>
                </div>
                <button onClick={() => setItemDetail(null)} className="p-2 hover:bg-brand-50 dark:hover:bg-white/5 rounded-full dark:text-brand-50">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <p className="text-sm text-brand-400 dark:text-brand-300 leading-relaxed">{itemDetail.description}</p>

              {(itemDetail.category === 'Coffee' || itemDetail.category === 'Tea') && (
                <div className="space-y-4 pt-4 border-t border-brand-200 dark:border-white/10">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-400">Milk Preference</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Whole', 'Oat', 'Almond', 'Coconut'].map(m => (
                      <button key={m} onClick={() => setMilk(m)} className={`py-2 text-[10px] md:text-xs font-bold rounded-xl border transition-all ${milk === m ? 'bg-brand-500 text-white border-brand-500' : 'bg-white dark:bg-transparent text-brand-400 border-brand-200 dark:border-white/20'}`}>{m}</button>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => { onAddToCart(itemDetail, { milk, temperature: temp }); setItemDetail(null); }}
                className="w-full mt-auto bg-brand-500 text-white py-3 md:py-4 rounded-2xl font-black text-sm shadow-xl shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Add to Ritual • ${itemDetail.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSection;
