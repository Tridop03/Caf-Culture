import React from 'react'
import { motion } from 'framer-motion';
import Badge from '@/ui/Badge';
import Button from '@/ui/Button';

export default function Hero(onNavigate) {

    interface HomeProps {
      onNavigate: (tab: any) => void;
    }

    const containerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    };
    return (
        <>
            <motion.section
                variants={itemVariants}
                className="relative rounded-[40px] md:rounded-[64px] overflow-hidden bg-brand-900 text-white min-h-[500px] md:min-h-[650px] flex items-center p-8 md:p-24 shadow-2xl"
            >
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        src="https://i.pinimg.com/736x/4d/af/8f/4daf8f98bfa22fc8aa6f7a671a4ca0e4.jpg"
                        className="w-full h-full object-cover opacity-60"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/50 to-transparent lg:bg-gradient-to-r" />
                </div>

                <div className="relative z-10 max-w-5xl space-y-10 md:space-y-14">
                    <motion.div variants={itemVariants}>
                        <Badge variant="outline" className="text-white border-white/40 bg-white/10 backdrop-blur-xl px-6 py-3 text-xs">
                            Sourced Ethically • Roasted Daily
                        </Badge>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black leading-[0.9] tracking-tighter"
                    >
                        Your Daily <br className="hidden md:block" />
                        Ritual, <span className="text-brand-300">Elevated.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-3xl text-white/80 font-medium leading-relaxed max-w-2xl"
                    >
                        Artisan excellence in every pour. Experience the pinnacle of specialty coffee culture.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 pt-6">
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto text-xl py-7 px-12" onClick={() => onNavigate('menu')}>Start Your Order</Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 text-xl py-7 px-12" onClick={() => onNavigate('community')}>The Community</Button>
                    </motion.div>
                </div>
            </motion.section>
        </>
    )
}
