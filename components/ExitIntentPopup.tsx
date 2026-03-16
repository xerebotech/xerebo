'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import CreativeButton from '@/components/ui/CreativeButton';

export default function ExitIntentPopup() {
    const { openModal } = useContactModal();
    const [isVisible, setIsVisible] = useState(false);
    const [canShow, setCanShow] = useState(false);

    useEffect(() => {
        // Only allow showing after 30 seconds
        const timer = setTimeout(() => {
            setCanShow(true);
        }, 30000);

        const handleMouseOut = (e: MouseEvent) => {
            if (!canShow) return;

            // Mouse leaves the top of the viewport
            if (e.clientY <= 0) {
                const shown = localStorage.getItem('xerebo_exit_popup_shown');
                const converted = localStorage.getItem('xerebo_converted');

                if (!shown && !converted) {
                    setIsVisible(true);
                }
            }
        };

        document.addEventListener('mouseleave', handleMouseOut);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseOut);
        };
    }, [canShow]);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('xerebo_exit_popup_shown', 'true');
    };

    const handleAction = () => {
        handleClose();
        openModal('Exit Intent Blueprint');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-dark-deepest/90 backdrop-blur-md z-[150]"
                    />

                    {/* Popup Container */}
                    <div className="fixed inset-0 z-[151] flex items-center justify-center p-6 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-gradient-to-br from-[#1A1817] to-[#202727] rounded-[32px] w-full max-w-xl shadow-[0_0_50px_rgba(254,119,0,0.15)] overflow-hidden pointer-events-auto border border-white/10 relative"
                        >
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange/10 rounded-full blur-[100px] -z-10" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] -z-10" />

                            <div className="p-8 md:p-12 text-center relative">
                                {/* Close Button */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Icon */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="w-20 h-20 bg-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(254,119,0,0.2)]"
                                >
                                    <Zap className="w-10 h-10 text-orange fill-orange" />
                                </motion.div>

                                {/* Content */}
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight font-heading leading-tight">
                                    Wait! Don&apos;t Leave Your <br />
                                    <span className="text-orange italic">Growth to Chance.</span>
                                </h1>

                                <p className="text-lg text-gray-400 mb-10 max-w-sm mx-auto">
                                    Before you go, get our exclusive <strong>2024 Growth Intelligence Blueprint</strong> for free.
                                </p>

                                <div className="space-y-4">
                                    <CreativeButton
                                        onClick={handleAction}
                                        variant="shimmer"
                                        size="lg"
                                        width="full"
                                        className="text-lg py-6"
                                    >
                                        Claim My Free Blueprint
                                    </CreativeButton>

                                    <button
                                        onClick={handleClose}
                                        className="text-sm text-gray-500 hover:text-white transition-colors"
                                    >
                                        No thanks, I&apos;ll pass on the growth.
                                    </button>
                                </div>

                                {/* Trust Indicator */}
                                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1A1817] bg-dark-deepest flex items-center justify-center text-[10px] font-bold text-white">
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        <span className="text-orange font-bold">500+</span> UAE businesses scaled this year.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
