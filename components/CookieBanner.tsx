'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';
import Link from 'next/link';

declare global {
    interface Window {
        dataLayer: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
        gtag: (...args: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
}



export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    const updateConsent = (status: 'accepted' | 'declined') => {
        const consentValue = status === 'accepted' ? 'granted' : 'denied';

        // Update Google Consent Mode v2
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'ad_storage': consentValue,
                'ad_user_data': consentValue,
                'ad_personalization': consentValue,
                'analytics_storage': consentValue,
            });
        }

        // Also push custom event for GTM triggers
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'consent_choice',
                consent_status: status,
                timestamp: new Date().toISOString()
            });
        }
    };



    useEffect(() => {
        const consent = localStorage.getItem('xerebo_cookie_consent');

        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            // Re-apply consent on page load (consent init in layout.tsx handles defaults)
            updateConsent(consent as 'accepted' | 'declined');
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('xerebo_cookie_consent', 'accepted');
        setIsVisible(false);
        updateConsent('accepted');
    };

    const handleDecline = () => {
        localStorage.setItem('xerebo_cookie_consent', 'declined');
        setIsVisible(false);
        updateConsent('declined');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-auto md:max-w-md z-[70]"
                >
                    <div className="bg-[#1A1817]/85 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[28px] p-5 md:p-6 shadow-2xl shadow-black/60 relative overflow-hidden group">
                        {/* Decorative Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full blur-3xl -z-10" />

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                <Cookie className="w-5 h-5 md:w-6 md:h-6 text-orange" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-white text-base md:text-lg tracking-tight truncate">Cookie Preferences</h3>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="text-gray-500 hover:text-white transition-colors p-1"
                                    >
                                        <X className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                </div>

                                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                                    We use cookies to optimize your growth experience and provide personalized market intelligence.
                                    By accepting, you help us refine our AI models for your business.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
                                    <button
                                        onClick={handleAccept}
                                        className="w-full sm:flex-1 bg-orange hover:bg-orange-600 text-white font-bold py-2.5 md:py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group/btn shadow-[0_4px_15px_rgba(254,119,0,0.3)] text-sm md:text-base border border-orange"
                                    >
                                        Accept All
                                        <Check className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                    </button>

                                    <button
                                        onClick={handleDecline}
                                        className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-gray-300 py-2.5 md:py-3 px-6 rounded-xl transition-colors font-medium text-xs md:text-sm border border-white/5"
                                    >
                                        Essential Only
                                    </button>
                                </div>

                                <div className="mt-4 text-center sm:text-left">
                                    <Link href="/privacy-policy" className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-orange transition-colors">
                                        View Privacy Policy
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
