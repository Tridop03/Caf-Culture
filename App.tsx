
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, CartItem, User } from './types';
import { MENU_ITEMS, COMMUNITY_POSTS, EVENTS } from './constants';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import { HeroSkeleton, MenuSkeleton } from './components/Skeleton';
import './global.css';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Community = lazy(() => import('./pages/Community'));
const Loyalty = lazy(() => import('./pages/Loyalty'));
const Profile = lazy(() => import('./pages/Profile'));

interface CartInstance extends CartItem {
  instanceId: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'community' | 'loyalty' | 'profile'>('home');
  const [cart, setCart] = useState<CartInstance[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState('ASAP (approx. 10 mins)');
  const [dietaryFilter, setDietaryFilter] = useState<string[]>([]);
  
  const [user, setUser] = useState<User>({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    memberSince: 'March 2023',
    points: 1248,
    favorites: ['1', '6'],
    punchCardCount: 6,
    orderHistory: [
      { id: 'ORD-1234', date: 'Oct 12, 2024', total: 12.50, items: [{ name: 'Lavender Oat Latte', quantity: 1 }, { name: 'Signature Cold Brew', quantity: 1 }], status: 'Completed' },
      { id: 'ORD-1235', date: 'Oct 10, 2024', total: 6.50, items: [{ name: 'Maple Spice Latte', quantity: 1 }], status: 'Completed' },
    ]
  });

  const addToCart = (item: MenuItem, customizations: CartItem['customizations'] = {}) => {
    const existing = cart.find(c => 
      c.id === item.id && 
      JSON.stringify(c.customizations) === JSON.stringify(customizations)
    );

    if (existing) {
      setCart(cart.map(c => c.instanceId === existing.instanceId ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { 
        ...item, 
        quantity: 1, 
        customizations, 
        instanceId: Math.random().toString(36).substr(2, 9) 
      }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (instanceId: string) => {
    setCart(cart.filter(c => c.instanceId !== instanceId));
  };

  const removeMultipleFromCart = (instanceIds: string[]) => {
    setCart(cart.filter(c => !instanceIds.includes(c.instanceId)));
  };

  const updateQuantity = (instanceId: string, delta: number) => {
    setCart(cart.map(item => 
      item.instanceId === instanceId 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: total * 1.08,
      items: cart.map(item => ({ name: item.name, quantity: item.quantity })),
      status: 'Processing' as const
    };

    setUser(prev => ({
      ...prev,
      orderHistory: [newOrder, ...prev.orderHistory],
      points: prev.points + Math.floor(total * 10),
      punchCardCount: (prev.punchCardCount + cart.filter(i => i.category === 'Coffee').length) % 10
    }));

    setCart([]);
    setIsCartOpen(false);
    alert(`Order placed successfully for ${pickupTime}!`);
  };

  const renderContent = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Suspense fallback={activeTab === 'home' ? <HeroSkeleton /> : <MenuSkeleton />}>
          {(() => {
            switch (activeTab) {
              case 'home': return <Home user={user} onNavigate={setActiveTab} featuredItems={MENU_ITEMS.slice(0, 3)} onAddToCart={addToCart} />;
              case 'menu': return <Menu items={MENU_ITEMS} dietaryFilter={dietaryFilter} setDietaryFilter={setDietaryFilter} onAddToCart={addToCart} favorites={user.favorites} />;
              case 'community': return <Community posts={COMMUNITY_POSTS} events={EVENTS} />;
              case 'loyalty': return <Loyalty user={user} />;
              case 'profile': return <Profile user={user} onNavigate={setActiveTab} />;
              default: return null;
            }
          })()}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen flex flex-col bg-brand-50 dark:bg-brand-900 transition-colors duration-500">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Primary scroll area */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderContent()}
      </main>

      <Footer />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        removeFromCart={removeFromCart}
        removeMultipleFromCart={removeMultipleFromCart}
        updateQuantity={updateQuantity}
        total={total}
        pickupTime={pickupTime}
        setPickupTime={setPickupTime}
        onPlaceOrder={handleOrder}
      />
    </div>
  );
};

export default App;
