'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

const comparisonData = [
    {
        label: "The Promise",
        other: "Promise 20 posts, 4 blogs, 8 emails",
        xerebo: "Promise qualified leads — period",
    },
    {
        label: "The Contract",
        other: "12-month lock-in contracts",
        xerebo: "90-day prove-it guarantee",
    },
    {
        label: "The Reporting",
        other: "Report impressions and clicks",
        xerebo: "Report real leads in your CRM",
    },
    {
        label: "The Pricing",
        other: "AED 8–15K/month for one channel",
        xerebo: "All channels from AED 5,699/month",
    },
    {
        label: "The Team",
        other: "Separate vendors, no accountability",
        xerebo: "One team, one dashboard, one outcome",
    }
];

const SolutionSection = () => {
    const { openModal } = useContactModal();

    return (
        <section id="why-us" className="py-24 md:py-40 bg-[#FFFDFB] relative overflow-hidden text-dark-deepest font-sans">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                        The Solution
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark-deepest mb-8 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] text-balance">
                        One System. Every Channel.
                        <span className="bg-gradient-to-r from-orange to-dark-deepest bg-clip-text text-transparent">Qualified Leads —</span>  or You Walk.
                    </h2>
                </div>

                {/* Comparison Table (Desktop) */}
                <div className="hidden lg:block bg-white rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden border border-dark-deepest/[0.03]">
                    {/* Table Head */}
                    <div className="grid grid-cols-12 bg-dark-deepest text-white">
                        <div className="col-span-3 p-8 flex items-center text-white text-[15px] uppercase tracking-[0.2em] opacity-40 border-r border-white/5">
                            Focus Area
                        </div>
                        <div className="col-span-4 p-8 flex flex-col items-center justify-center text-center border-r border-white/5">
                            <span className="text-white/40 text-[10px] uppercase tracking-widest mb-2">The Old Way</span>
                            <span className="text-xl font-black">Typical Agencies</span>
                        </div>
                        <div className="col-span-5 p-8 bg-orange flex flex-col items-center justify-center text-center relative overflow-hidden">
                            {/* Animated Shimmer Overlap */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] animate-[shimmer_3s_infinite]" />
                            <span className="text-white/70 text-[10px] uppercase tracking-widest mb-2 relative z-10">The Performance Way</span>
                            <span className="text-xl font-black relative z-10">Xerebo Lead Engine</span>
                        </div>
                    </div>

                    {/* Table Body */}
                    {comparisonData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="grid grid-cols-12 border-b border-dark-deepest/[0.03] last:border-0 group"
                        >
                            {/* Label */}
                            <div className="col-span-3 p-8 border-r border-dark-deepest/[0.03] bg-dark-deepest/[0.01] flex items-center font-bold text-sm text-dark-deepest/60">
                                {item.label}
                            </div>

                            {/* Other Agencies */}
                            <div className="col-span-4 p-8 border-r border-dark-deepest/[0.03] flex items-center gap-4 text-sm text-dark-deepest/40 italic">
                                <div className="w-4 h-4 rounded-full bg-red-500/5 flex-shrink-0 flex items-center justify-center">
                                    <X size={8} className="text-red-500/40" />
                                </div>
                                {item.other}
                            </div>

                            {/* Xerebo */}
                            <div className="col-span-5 p-8 bg-orange/[0.02] flex items-center gap-5 text-base text-dark-deepest font-bold group-hover:bg-orange/[0.04] transition-colors">
                                <div className="w-4 h-4 rounded-xl bg-orange flex-shrink-0 flex items-center justify-center shadow-lg shadow-orange/20 rotate-3 group-hover:rotate-0 transition-transform">
                                    <Check size={8} className="text-white" strokeWidth={3} />
                                </div>
                                {item.xerebo}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View (Cards) */}
                <div className="lg:hidden space-y-6">
                    {comparisonData.map((item, index) => (
                        <div key={index} className="bg-white rounded-[2rem] p-8 shadow-xl border border-dark-deepest/[0.03]">
                            <h3 className="text-orange font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange" />
                                {item.label}
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 opacity-40">
                                    <X size={18} className="mt-1 flex-shrink-0" />
                                    <p className="text-sm italic">{item.other}</p>
                                </div>
                                <div className="flex items-start gap-4 p-5 bg-orange/5 rounded-2xl border border-orange/10">
                                    <Check size={20} className="text-orange mt-1 flex-shrink-0" strokeWidth={3} />
                                    <p className="text-base font-bold text-dark-deepest">{item.xerebo}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <div className="bg-dark-deepest rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/10 blur-[80px] -mr-32 -mt-32" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                                    Tired of vanity metrics?
                                </h3>
                                <p className="text-white/40 text-sm flex items-center justify-center md:justify-start gap-2">
                                    <ShieldCheck className="text-orange" size={16} />
                                    Join the high-performance lead generation engine.
                                </p>
                            </div>

                            <CreativeButton
                                onClick={() => openModal('Solution Section')}
                                variant="shimmer"
                                className="px-10 py-5 text-lg group whitespace-nowrap"
                            >
                                Build Your Lead Engine
                            </CreativeButton>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-150%) skewX(-15deg); }
                    100% { transform: translateX(150%) skewX(-15deg); }
                }
            `}</style>
        </section>
    );
};

export default SolutionSection;