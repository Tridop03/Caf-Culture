
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';
import Button from '../ui/Button';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: (CartItem & { instanceId: string })[];
  removeFromCart: (instanceId: string) => void;
  removeMultipleFromCart: (instanceIds: string[]) => void;
  updateQuantity: (instanceId: string, delta: number) => void;
  total: number;
  pickupTime: string;
  setPickupTime: (t: string) => void;
  onPlaceOrder: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, onClose, cart, removeFromCart, removeMultipleFromCart, updateQuantity, total, pickupTime, setPickupTime, onPlaceOrder 
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (instanceId: string) => {
    setSelectedIds(prev => 
      prev.includes(instanceId) 
        ? prev.filter(id => id !== instanceId) 
        : [...prev, instanceId]
    );
  };

  const handleBulkDelete = () => {
    removeMultipleFromCart(selectedIds);
    setSelectedIds([]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === cart.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cart.map(item => item.instanceId));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-900/60 backdrop-blur-md transition-opacity" 
            onClick={onClose} 
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white dark:bg-brand-900 shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-brand-200 dark:border-white/10 flex items-center justify-between">
                <h2 className="text-3xl font-black dark:text-brand-50 tracking-tight">Your Order</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <span className="material-symbols-outlined">close</span>
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-brand-400 text-center space-y-4">
                    <span className="material-symbols-outlined text-8xl opacity-10">shopping_basket</span>
                    <p className="text-xl font-bold">Your basket is empty.</p>
                    <Button variant="outline" onClick={onClose}>Browse Menu</Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={handleSelectAll}
                        className="text-[10px] font-black uppercase tracking-widest text-brand-500 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {selectedIds.length === cart.length && cart.length > 0 ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        {selectedIds.length === cart.length ? 'Deselect All' : 'Select All'}
                      </button>
                      {selectedIds.length > 0 && (
                        <button 
                          onClick={handleBulkDelete}
                          className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1 hover:opacity-80 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          Delete ({selectedIds.length})
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-8">
                      {cart.map((item) => (
                        <motion.div 
                          layout
                          key={item.instanceId} 
                          className="flex gap-6 group items-center"
                        >
                          <button 
                            onClick={() => toggleSelection(item.instanceId)}
                            className={`size-6 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${
                              selectedIds.includes(item.instanceId) 
                                ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20' 
                                : 'border-brand-200 dark:border-white/10 text-transparent'
                            }`}
                          >
                            <span className="material-symbols-outlined text-xs">check</span>
                          </button>
                          
                          <img src={item.imageUrl} className="size-24 rounded-2xl object-cover shadow-sm" alt="" />
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="font-bold dark:text-brand-50 text-base leading-tight">{item.name}</h4>
                              <p className="text-brand-500 font-black whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-400">
                              {item.customizations.milk || 'Standard'} • {item.customizations.temperature || 'Hot'}
                            </p>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center bg-brand-50 dark:bg-white/5 rounded-xl p-1 border border-brand-100 dark:border-white/10">
                                <button 
                                  onClick={() => updateQuantity(item.instanceId, -1)}
                                  className="size-8 flex items-center justify-center text-brand-400 hover:text-brand-900 dark:hover:text-brand-50 transition-colors"
                                >
                                  <span className="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span className="w-10 text-center text-xs font-black dark:text-brand-50">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.instanceId, 1)}
                                  className="size-8 flex items-center justify-center text-brand-400 hover:text-brand-900 dark:hover:text-brand-50 transition-colors"
                                >
                                  <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-8 bg-brand-50 dark:bg-white/5 border-t border-brand-200 dark:border-white/10 space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-400">Pickup Details</label>
                  <div className="relative">
                    <select 
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full rounded-2xl border-none bg-white dark:bg-brand-900 p-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-brand-500/20 dark:text-brand-50 appearance-none outline-none"
                    >
                      <option>ASAP (approx. 10 mins)</option>
                      <option>In 30 minutes</option>
                      <option>In 1 hour</option>
                      <option>Scheduled Pickup</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-400">keyboard_arrow_down</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-dashed border-brand-200 dark:border-white/20">
                  <div className="flex justify-between text-brand-400 text-sm font-medium">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-400 text-sm font-medium">
                    <span>Taxes & Fees</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-4 dark:text-brand-50 tracking-tight">
                    <span>Total</span>
                    <span className="text-brand-500">${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  disabled={cart.length === 0}
                  onClick={onPlaceOrder}
                  size="lg"
                  className="w-full py-5 text-lg"
                >
                  Checkout Now
                </Button>
                <p className="text-[10px] text-brand-400 text-center font-bold uppercase tracking-widest opacity-40">
                  Secure Payment Powered by CaféPay
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
