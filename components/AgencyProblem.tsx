'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, TrendingDown, Clock, ShieldAlert, ArrowRight, X, Check, Flame, Zap, Users } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

const problems = [
    {
        id: "01",
        icon: TrendingDown,
        title: "Vanity Metrics Instead of Revenue",
        description: "Your agency sends a beautiful PDF every month. Impressions up 40%. Reach up 25%. But your phone isn't ringing. Your pipeline is empty. You're paying for reports, not results.",
        burn: "AED 120K+ Yearly Loss",
        impact: "Zero Pipeline Growth"
    },
    {
        id: "02",
        icon: Clock,
        title: "Counting Posts Instead of Prospects",
        description: "They promised 20 social posts, 4 blogs, and 8 emails. They delivered every single one. But your lead count? Zero. Because they optimized for task completion, not for your business growth.",
        burn: "1,200+ Hours Wasted",
        impact: "Stagnant Market Share"
    },
    {
        id: "03",
        icon: ShieldAlert,
        title: "Trapped in 12-Month Contracts",
        description: "You knew it wasn't working by month three. But the contract says 12 months. So you keep paying AED 10K, 15K, 20K a month — watching your budget drain into a system that produces nothing.",
        burn: "Legalized Budget Drainage",
        impact: "Inability to Pivot"
    },
    {
        id: "04",
        icon: Users,
        title: "Nobody Owns the Outcome",
        description: "Your PPC management team doesn't talk to your content team. Your social media agency has never seen your CRM. You're paying three vendors and none of them are accountable for the one thing that matters: revenue.",
        burn: "Fragmented Strategy",
        impact: "Wasted Agency Overhead"
    }
];

const AgencyProblem = () => {
    const { openModal } = useContactModal();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-24 md:py-32 bg-dark-deepest relative overflow-hidden text-white font-sans">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading w-fit"
                        >
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                            The Hard Truth
                        </motion.div>
                        <h2 className="text-4xl md:text-7xl font-black leading-[0.85] tracking-tighter uppercase font-heading">
                            Why Most Marketing Agencies in Dubai <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-orange/50 to-white/20">
                                Fail Their Clients.
                            </span>
                        </h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-xs text-white/40 text-sm border-l border-white/10 pl-6"
                    >
                        Most Dubai agencies optimize for their own retention. We optimize for your bank statement.
                    </motion.p>
                </div>

                {/* Problem Grid with "Scanner" Effect */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-24 bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative p-10 group transition-all duration-500 hover:bg-orange/5"
                        >
                            <div className="relative z-10">
                                <span className="text-orange/30 font-mono text-xs mb-8 block">ERROR_CODE: {problem.id}</span>
                                <problem.icon size={32} className={`mb-6 transition-colors duration-500 ${hoveredIndex === index ? 'text-orange' : 'text-white/40'}`} />
                                <h3 className="text-2xl font-bold mb-4 tracking-tight font-heading group-hover:text-orange transition-colors">{problem.title}</h3>
                                <p className="text-white/60 leading-relaxed mb-8 min-h-[80px]">
                                    {problem.description}
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
                                        <Flame size={14} /> {problem.burn}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30">
                                        <X size={14} /> {problem.impact}
                                    </div>
                                </div>
                            </div>

                            {/* Hover Decorative Line */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-orange"
                                initial={{ width: 0 }}
                                animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                            />
                        </div>
                    ))}
                </div>

                {/* Comparison "Versus" UI */}
                <div className="relative mb-24">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-deepest border border-white/10 flex items-center justify-center z-20 hidden md:flex">
                        <Zap size={20} className="text-orange" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                        <div className="space-y-8 opacity-50 italic">
                            <h4 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-12 font-heading">Other Agencies
                            </h4>
                            {["Promise 20 posts, 4 blogs, 8 emails", "12-month lock-in contracts", "Report impressions and clicks", "Charge the same when underperforming", "Separate channel packages", "Optimize for task completion"].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-lg">
                                    <X className="text-red-500" size={20} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-orange uppercase tracking-widest text-xs font-bold mb-12 font-heading">The Xerebo Engine</h4>
                            {["Promise qualified leads — period", "90-day prove-it guarante", "Report real leads in your CRM", "Fee scales to 20% of ad budget", "One integrated system", "Optimize for your revenue"].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileInView={{ x: [20, 0], opacity: [0, 1] }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 text-lg font-bold"
                                >
                                    <Check className="text-orange" size={20} />
                                    <span>{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Block */}
                <div className="bg-gradient-to-b from-white/5 to-transparent p-12 rounded-[40px] border border-white/10 text-center">
                    <h3 className="text-3xl md:text-4xl font-black mb-8 font-heading text-balance">Ready for a strategy that actually scales?</h3>
                    <CreativeButton
                        onClick={() => openModal('Agency Problem Audit')}
                        variant="shimmer"
                        size="lg"
                        className="group px-12 py-6 md:py-8 text-xl md:text-2xl shadow-[0_20px_50px_rgba(254,119,0,0.3)]"
                    >
                        Get Your Free Revenue Audit
                    </CreativeButton>
                    <p className="mt-8 text-white/40 flex items-center justify-center gap-2 text-sm italic">
                        <ShieldAlert size={14} /> No fluff. No sales pitch. Just your data, audited.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AgencyProblem;