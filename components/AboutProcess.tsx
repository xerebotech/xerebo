'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Rocket, BarChart3, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

const steps = [
    {
        number: "1",
        title: "Discovery & Strategy",
        description: "We start with a deep dive into your business, competitors, and market. Together we define what a 'qualified lead' means for you — this definition goes into the contract.",
        time: "Week 1–2",
        icon: Search
    },
    {
        number: "2",
        title: "Infrastructure Build",
        description: "CRM setup, tracking pixels, conversion goals, campaign architecture, landing page or website build, content strategy — your entire marketing engine assembled.",
        time: "Week 2–8",
        icon: PenTool
    },
    {
        number: "3",
        title: "Launch & Optimize",
        description: "Campaigns go live across all channels. Our team continuously calibrates the activity mix based on real-time data signals to maximize qualified leads.",
        time: "Week 8–12",
        icon: Rocket
    },
    {
        number: "4",
        title: "90-Day Proof Review",
        description: "We sit down together and review CRM data. Did we deliver? If yes, your pricing transitions to 20% of your ad budget (or your tier fee, whichever is higher). If not, the contract ends — no lock-in.",
        time: "Day 90",
        icon: BarChart3
    },
    {
        number: "5",
        title: "Growth-Aligned Scaling",
        description: "As your business grows and ad budget increases, our fee scales proportionally. Everything stays aligned — we earn more only when you invest more. No renegotiation needed.",
        time: "Day 90+",
        icon: TrendingUp
    }
];

export default function AboutProcess() {
    const { openModal } = useContactModal();

    return (
        <section className="py-24 md:py-32 bg-dark-deepest relative overflow-hidden text-white font-secondary">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                        Our Process
                    </motion.div>
                    <h2 className="text-4xl md:text-7xl font-black uppercase font-heading leading-[0.85] mb-8">
                        How We Work <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange/50">With You.</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-8 bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.08] hover:border-orange/30 transition-all duration-500">
                                {/* Number and Time column */}
                                <div className="md:w-64 p-10 flex flex-col justify-between bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/10">
                                    <span className="text-3xl font-black text-white/10 group-hover:text-orange/40 transition-colors font-heading">
                                        {step.number}
                                    </span>
                                    <div className="flex items-center gap-2 text-orange text-xs font-bold uppercase tracking-widest mt-4">
                                        <Clock size={14} />
                                        {step.time}
                                    </div>
                                </div>

                                {/* Content column */}
                                <div className="flex-grow p-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center text-orange group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                                        <step.icon size={32} />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-black mb-4 uppercase font-heading group-hover:text-orange transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/50 leading-relaxed font-medium max-w-2xl px-0">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 flex flex-col items-center text-center p-12 rounded-[3rem] bg-orange text-white relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-full h-full bg-white/5 skew-x-[-15deg] transform translate-x-1/2 pointer-events-none" />
                    <h3 className="text-3xl md:text-5xl font-black mb-6 font-heading uppercase leading-tight">Your Engine Is Waiting.</h3>
                    <p className="text-white/80 max-w-2xl mb-10 text-lg font-medium leading-relaxed">
                        We don&apos;t just build campaigns; we build assets that grow with your company.
                        Let&apos;s map out your week 1 discovery today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <CreativeButton
                            onClick={() => openModal('About Process CTA: Discovery')}
                            variant="shimmer"
                            size="lg"
                            className="bg-dark-deepest text-white border-dark-deepest px-10 py-5 text-lg shadow-xl"
                        >
                            Start Your Discovery
                        </CreativeButton>
                        <button
                            onClick={() => window.location.href = '/results'}
                            className="text-white/80 hover:text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-colors"
                        >
                            See Real Results
                            <TrendingUp size={14} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
