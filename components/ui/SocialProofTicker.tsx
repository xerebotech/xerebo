'use client';

import React from 'react';
import { motion } from 'framer-motion';

const items = [
    '<strong>Grovoz</strong> — 127 sales-ready leads in 90 days',
    '<strong>Clifton Real Estate</strong> — 89 high-intent bookings',
    '<strong>Best Solution LLC</strong> — 52 qualified consultations',
    '<strong>Google & Meta Partner</strong> certified',
    '<strong>93% client retention</strong> rate',
    '<strong>4.2x average ROAS</strong> across all clients',
    '<strong>50+ UAE businesses</strong> served',
    '<strong>90-day prove-it guarantee</strong> — or you walk'
];

export default function SocialProofTicker() {
    // Triple the items to ensure wide screens don't see gaps during the animation
    const tickerItems = [...items, ...items, ...items];

    return (
        <div className="w-full bg-dark-deepest/40 backdrop-blur-sm border-y border-white/5 py-4 overflow-hidden whitespace-nowrap relative group">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dark-deepest to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dark-deepest to-transparent z-10 pointer-events-none" />

            <motion.div
                className="inline-flex gap-16 items-center"
                animate={{ x: [0, '-33.33%'] }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {tickerItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-3 text-xs md:text-sm tracking-wide text-white/50 uppercase font-medium"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_10px_rgba(254,119,0,0.8)]" />
                        <span
                            className="[&>strong]:text-white [&>strong]:font-black"
                            dangerouslySetInnerHTML={{ __html: item }}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
