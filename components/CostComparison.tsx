'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight, ShieldAlert, Coins, Layout, Zap, ArrowUpRight } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import Link from 'next/link';

export default function CostComparison() {
    return (
        <section className="py-24 md:py-32 bg-dark-deepest relative overflow-hidden text-white font-secondary">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                        The Math of Marketing
                    </motion.div>
                    <h2 className="text-4xl md:text-7xl font-black leading-[0.85] tracking-tighter uppercase font-heading mb-8">
                        The Real <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-orange/50 to-white/20">
                            Cost Comparison.
                        </span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* Traditional Agency Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-14 relative overflow-hidden group hover:border-white/20 transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <X className="text-white/20 w-12 h-12" />
                        </div>

                        <h3 className="text-2xl font-black mb-2 uppercase tracking-tight font-heading text-white/40">Other Agencies</h3>
                        <p className="text-4xl font-black mb-8 text-white/20 tracking-tight font-heading">AED 8K – 15K<span className="text-sm font-bold ml-1">/Month</span></p>

                        <div className="space-y-6 mb-12">
                            {[
                                "Single channel only (e.g. Meta or Google)",
                                "12-month lock-in contracts",
                                "No lead generation guarantee",
                                "No CRM transparency",
                                "Standard monthly PDF reports",
                                "No exit clause if failing"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 text-white/40">
                                    <X size={18} className="text-white/20 mt-1 flex-shrink-0" />
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-10 border-t border-white/5 mt-auto">
                            <p className="text-white/30 font-black uppercase tracking-widest text-[10px] mb-2 font-heading">Total Yearly Burn</p>
                            <p className="text-3xl font-black text-white/10 tracking-tighter font-heading">AED 96K – 180K / YEAR</p>
                        </div>
                    </motion.div>

                    {/* Xerebo Lead Engine Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-b from-orange/10 to-transparent border border-orange/30 rounded-[3rem] p-10 md:p-14 relative overflow-hidden group shadow-[0_30px_100px_rgba(254,119,0,0.1)]"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <Zap className="text-orange w-12 h-12 animate-pulse" />
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange text-white text-[10px] font-black uppercase tracking-widest mb-4 font-heading">
                            Integrated Value
                        </div>

                        <h3 className="text-2xl font-black mb-2 uppercase tracking-tight font-heading text-white">The Lead Engine</h3>
                        <p className="text-4xl font-black mb-8 text-orange tracking-tight font-heading italic">Performance Tier<span className="text-sm font-bold text-white/60 ml-2 font-secondary not-italic">Fix Rate + Scale</span></p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {[
                                "Integrated PPC (Meta & Google)",
                                "Social Media Marketing",
                                "Content & Copywriting",
                                "Email Campaigns",
                                "Conv. Rate Optimization",
                                "90-Day Exit Guarantee",
                                "Real-Time CRM Visibility",
                                "Revenue Attribution"
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="flex items-start gap-3"
                                >
                                    <Check size={18} className="text-orange mt-1 flex-shrink-0" />
                                    <span className="font-bold text-lg leading-tight tracking-tight">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-10 border-t border-orange/20 mt-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div>
                                <p className="text-orange font-black uppercase tracking-widest text-[10px] mb-2 font-heading">The Result</p>
                                <p className="text-1xl font-black text-white tracking-tighter font-heading uppercase">No Waste. High Growth.</p>
                            </div>
                            <Link href="/packages">
                                <CreativeButton
                                    variant="shimmer"
                                    size="lg"
                                    className="px-8 py-4 shadow-[0_15px_30px_rgba(254,119,0,0.4)] group"
                                >
                                    Compare Packages
                                </CreativeButton>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-20 text-center max-w-2xl mx-auto">
                    <p className="text-white/40 text-sm leading-relaxed font-medium">
                        Stop paying for fragmented channels and start investing in a unified system.
                        The Lead Engine consolidates your entire digital footprint into one accountable revenue machine.
                    </p>
                </div>
            </div>
        </section>
    );
}
