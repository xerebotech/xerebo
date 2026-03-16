'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageSquare, Phone, Calendar, ChevronUp } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export default function FloatingCTA() {
    const { openModal } = useContactModal();
    const [isExpanded, setIsExpanded] = useState(false);
    const { scrollYProgress } = useScroll();

    const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const actions = [
        {
            icon: Calendar,
            label: 'Book a Call',
            color: 'from-[#FE7700] to-orange-600',
            onClick: () => { openModal('Floating Action: Book a Call'); setIsExpanded(false); }
        },
        {
            icon: MessageSquare,
            label: 'Live Chat',
            color: 'from-blue-500 to-blue-600',
            onClick: () => { window.open('https://wa.me/971000000000', '_blank'); setIsExpanded(false); }
        },
        {
            icon: Phone,
            label: 'Call Now',
            color: 'from-green-500 to-green-600',
            onClick: () => { window.location.href = 'tel:+971000000000'; setIsExpanded(false); }
        }
    ];

    return (
        <motion.div
            style={{ opacity }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60]"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Expanded Actions */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 space-y-3"
                    >
                        {actions.map((action, index) => {
                            const Icon = action.icon;
                            const isPrimary = action.label === 'Book a Call';
                            return (
                                <motion.button
                                    key={action.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={action.onClick}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-full 
                            bg-gradient-to-r ${action.color} text-white font-semibold
                            shadow-xl hover:shadow-2xl transform hover:scale-105 
                            transition-all duration-300 whitespace-nowrap border border-white/20 relative overflow-hidden`}
                                >
                                    {isPrimary && (
                                        <span className="absolute inset-0 bg-white/20 animate-pulse" />
                                    )}
                                    <Icon className="w-5 h-5 relative z-10" />
                                    <span className="text-sm md:text-base relative z-10">{action.label}</span>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#FE7700] to-orange-600 
                   text-white shadow-2xl flex items-center justify-center relative
                   group overflow-hidden border border-white/20"
            >
                {/* Pulse animation */}
                <span className="absolute inset-0 rounded-full bg-[#FE7700] 
                        animate-ping opacity-20" />

                <div className="relative z-10">
                    <ChevronUp className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-500
                                ${isExpanded ? 'rotate-180' : ''}`} />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </motion.button>
        </motion.div>
    );
}
