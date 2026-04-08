'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, Wallet, TrendingUp, Zap, Target, Scale, ArrowRight, Sparkles } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

const FOR_YOU = [
    { text: "UAE-based business with AED 11K+ monthly ad spend", Icon: Wallet },
    { text: "Frustrated with agencies delivering reports, not revenue", Icon: TrendingUp },
    { text: "Niche: Real Estate, Healthcare, E-com, or Prof. Services", Icon: Target },
    { text: "Team can commit to a 24-hour lead response window", Icon: Zap },
    { text: "Demand transparency through a live CRM dashboard", Icon: Scale },
];

const NOT_FOR_YOU = [
    "You want to micromanage post counts and blog schedules",
    "You need a single-channel service (just SEO or social)",
    "You expect results without a 90-day system build",
    "No designated point of contact for timely approvals",
];

export default function Qualifier() {
    const { openModal } = useContactModal();

    return (
        <section id="qualifier" className="py-24 md:py-32 bg-[#FFFDFB] overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Area */}
                <div className="max-w-4xl mb-20 md:mb-24 text-center mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                        The Mutual Fit Test
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark-deepest mb-8 font-heading leading-[1.1] md:leading-[0.9] text-balance">
                        Is This <span className="bg-gradient-to-r from-orange to-dark-deepest bg-clip-text text-transparent">Right</span> For You?
                    </h2>

                    <div className="flex justify-center">
                        <p className="text-xl text-dark-deepest/50 leading-relaxed max-w-2xl font-medium">
                            We&apos;re not for everyone. <span className="text-dark-deepest font-bold italic">And that&apos;s by design.</span> We only partner with businesses we are 100% confident we can scale.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-20 md:mb-32">

                    {/* THE "IDEAL FIT" CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-dark-deepest rounded-[3rem] p-8 md:p-14 text-white shadow-2xl overflow-hidden group/card border border-orange/20"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/20 blur-[100px] -mr-32 -mt-32 transition-all duration-700 group-hover/card:bg-orange/30" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-3 rounded-2xl bg-orange text-white shadow-[0_0_20px_rgba(254,119,0,0.4)]">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-orange uppercase tracking-[0.3em] mb-1">Elite Partnership</div>
                                    <h3 className="text-2xl md:text-3xl font-black uppercase font-heading">Strong Fit Indicators:</h3>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                {FOR_YOU.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 group/item"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange group-hover/item:bg-orange group-hover/item:text-white transition-all duration-500 border border-orange/20">
                                            <item.Icon size={20} />
                                        </div>
                                        <span className="text-lg text-white/80 font-bold tracking-tight">{item.text}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* THE "NOT A FIT" CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[3rem] p-8 md:p-14 border border-dark-deepest/10 flex flex-col justify-center relative group/card shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 rounded-2xl bg-dark-deepest/5 text-dark-deepest/20 group-hover/card:bg-red-500 group-hover/card:text-white transition-all duration-500">
                                <XCircle size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-dark-deepest/40 uppercase tracking-[0.3em] mb-1">Qualifying Out</div>
                                <h3 className="text-2xl md:text-3xl font-black text-dark-deepest uppercase opacity-20 font-heading group-hover/card:opacity-100 transition-opacity">NOT For You If:</h3>
                            </div>
                        </div>

                        <ul className="space-y-5 mb-12">
                            {NOT_FOR_YOU.map((text, i) => (
                                <li key={i} className="flex items-center gap-4 text-dark-deepest/40 font-bold group/list">
                                    <ChevronRight size={16} className="text-dark-deepest/10 group-hover/list:text-red-500/40 transition-colors" />
                                    <span className="text-base line-through decoration-dark-deepest/10 group-hover/list:decoration-red-500/20 transition-all">{text}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="p-6 rounded-[2rem] bg-orange/5 border border-dashed border-orange/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 text-orange/20">
                                <Sparkles size={20} />
                            </div>
                            <p className="text-base text-dark-deepest/60 leading-relaxed font-bold italic pr-6 italic">
                                &quot;We protect our client results by only taking on partners who are culturally and operationally ready for scale.&quot;
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative mt-20"
                >
                    <div className="absolute inset-0 bg-orange/10 blur-[100px] rounded-full" />
                    <div className="relative bg-dark-deepest rounded-[3rem] p-8 md:p-16 overflow-hidden border border-orange/30">
                        {/* Decorative Grid */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-orange/40 rounded-tl-[3rem] pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-orange/20 rounded-br-[3rem] pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                            <div className="max-w-xl">
                                <div className="text-[10px] font-black text-orange uppercase tracking-[0.4em] mb-4">Final Validation</div>
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 font-heading leading-tight">
                                    If you checked every box,<br />
                                    <span className="text-orange italic">let&apos;s build your engine.</span>
                                </h3>
                                <p className="text-white/40 text-lg font-medium">
                                    One call. No pressure. Just clarity on whether we&apos;re the right fit to scale your revenue.
                                </p>
                            </div>

                            <CreativeButton
                                onClick={() => openModal('Qualifier CTA')}
                                variant="shimmer"
                                size="lg"
                                className="px-12 py-6 text-xl group whitespace-nowrap shadow-[0_20px_50px_rgba(254,119,0,0.3)] hover:scale-105 transition-transform font-bold"
                            >
                                Book Strategy Call
                            </CreativeButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
