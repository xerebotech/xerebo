'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Target, TrendingUp, ArrowRight } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

const pillars = [
    {
        id: "01",
        title: "System Over Channels",
        description: "Marketing is one interconnected engine, never isolated services. SEO feeds content, content feeds social, social feeds retargeting, ads capture intent. We build the whole machine.",
        icon: Zap
    },
    {
        id: "02",
        title: "Accountability Architecture",
        description: "90-day and 180-day checkpoints create mutual skin in the game. CRM data is the judge. If we don't deliver qualified leads, you walk. No penalties.",
        icon: ShieldCheck
    },
    {
        id: "03",
        title: "Lead Quality As Currency",
        description: "The only metric that matters is high-intent, sales-ready leads in the CRM. No vanity metrics. No channel-specific ROI debates. Just real business outcomes that grow your revenue.",
        icon: Target
    },
    {
        id: "04",
        title: "Growth Partnership",
        description: "Our revenue scales with your success. We exit underperformers proactively — we only retain clients who are on an active growth trajectory.",
        icon: TrendingUp
    }
];

export default function AboutPillars() {
    const { openModal } = useContactModal();

    return (
        <section className="py-24 md:py-32 bg-[#fefefe] relative overflow-hidden font-secondary">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                        Our Pillars
                    </motion.div>
                    <h2 className="text-4xl md:text-7xl font-black text-dark-deepest tracking-tighter uppercase font-heading leading-[0.85]">
                        What We <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange/50">Stand For.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-10 bg-white border border-dark/5 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:border-orange/20 hover:shadow-[0_20px_50px_rgba(254,119,0,0.08)] transition-all duration-500 overflow-hidden"
                        >
                            {/* Watermark ID */}
                            <span className="absolute -top-6 -right-4 text-9xl font-black text-dark/[0.02] group-hover:text-orange/[0.05] transition-colors font-heading pointer-events-none">
                                {pillar.id}
                            </span>

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-orange/5 flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-all duration-500">
                                    <pillar.icon size={28} />
                                </div>

                                <h3 className="text-2xl font-black text-dark-deepest mb-4 tracking-tight font-heading group-hover:text-orange transition-colors uppercase leading-tight">
                                    {pillar.title}
                                </h3>

                                <p className="text-dark-deepest/50 leading-relaxed font-medium">
                                    {pillar.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center p-12 bg-white border border-dark/5 rounded-[3rem] shadow-xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                    <h3 className="text-3xl font-black text-dark-deepest mb-6 font-heading tracking-tight uppercase">Align Your Business With Growth.</h3>
                    <p className="text-dark-deepest/50 max-w-2xl mb-10 font-medium leading-relaxed">
                        These pillars aren&apos;t just inspiration — they are the performance boundaries we set for every campaign.
                        Ready to see how they apply to your specific industry?
                    </p>
                    <CreativeButton
                        onClick={() => openModal('About Pillars CTA')}
                        variant="shimmer"
                        size="lg"
                        className="px-10 py-5 text-lg shadow-[0_15px_40px_rgba(254,119,0,0.2)]"
                    >
                        Book a Pillar Strategy Session
                        <ArrowRight className="ml-2" />
                    </CreativeButton>
                </motion.div>
            </div>
        </section>
    );
}
