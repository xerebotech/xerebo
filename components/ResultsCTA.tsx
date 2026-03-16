'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

export default function ResultsCTA() {
    const { openModal } = useContactModal();

    return (
        <section className="py-24 bg-orange text-white font-secondary relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-[500px] h-full bg-white/5 skew-x-[-15deg] transform translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Next Step
                </motion.div>

                <h2 className="text-4xl md:text-7xl font-black mb-8 font-heading uppercase leading-[0.85]">
                    Your Results <br />
                    <span className="text-dark-deepest">Are Next.</span>
                </h2>

                <p className="text-xl md:text-2xl mb-12 text-white/90 font-medium max-w-2xl mx-auto">
                    Every case study above started with a 30-minute call. Yours can too.
                </p>

                <CreativeButton
                    onClick={() => openModal('Results Bottom CTA')}
                    variant="shimmer"
                    size="lg"
                    className="bg-dark-deepest text-white border-dark-deepest px-12 py-6 text-xl shadow-2xl group"
                >
                    <Calendar className="mr-3 w-6 h-6" />
                    Book Your Strategy Call
                </CreativeButton>

                <p className="mt-8 text-white/60 text-sm font-bold uppercase tracking-widest">
                    No obligation · No pressure · Just strategy
                </p>
            </div>
        </section>
    );
}
