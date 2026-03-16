'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, BarChart3 } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

export default function ResultsHero() {
    const { openModal } = useContactModal();

    return (
        <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-[#fefefe] relative overflow-hidden font-secondary">
            {/* Background elements */}
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-dark-deepest/[0.02] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                >
                    <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                    Our Track Record
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-8xl lg:text-9xl font-black text-dark-deepest tracking-tighter uppercase font-heading leading-[0.85] mb-12"
                >
                    Lead Generation <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-muted">Case Studies.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-dark-deepest/60 leading-relaxed font-medium max-w-4xl mx-auto mb-12"
                >
                    Real businesses across real estate, healthcare, e-commerce, and professional services in Dubai and the UAE. Real pipeline-ready leads tracked in our CRM. Measurable marketing ROI. Every case started with a 30-minute strategy call.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <CreativeButton
                        onClick={() => openModal('Results Hero Strategy Call')}
                        variant="shimmer"
                        size="lg"
                        className="px-10 py-6 text-lg shadow-[0_20px_50px_rgba(254,119,0,0.2)] w-full sm:w-auto font-heading"
                    >
                        <Calendar className="mr-2 w-5 h-5" />
                        Book Your Strategy Call
                    </CreativeButton>

                    <CreativeButton
                        onClick={() => openModal('Results Hero Analysis')}
                        variant="outline"
                        size="lg"
                        className="px-10 py-6 text-lg border-dark-deepest text-dark-deepest hover:bg-dark-deepest hover:text-white transition-all w-full sm:w-auto font-heading"
                    >
                        <BarChart3 className="mr-2 w-5 h-5" />
                        Get Free Audit & Analysis
                    </CreativeButton>
                </motion.div>
            </div>
        </section>
    );
}
