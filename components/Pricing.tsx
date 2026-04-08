'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, ArrowRight, Info } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

const PACKAGES = [
    {
        name: "Foundation",
        price: "5,699",
        minAd: "11,000",
        description: "Perfect for specialized services looking to stabilize lead flow.",
        features: [
            "Paid ads, content, social & email",
            "Landing page & CRM",
            "Bi-weekly optimization",
            "48-hour response",
            "SEO not included"
        ],
        highlight: false,
        buttonText: "Start My Foundation"
    },
    {
        name: "Growth",
        price: "11,699",
        minAd: "25,000",
        description: "Our most popular engine for rapid UAE market capture.",
        features: [
            "Everything in Foundation",
            "Basic SEO + full website",
            "Weekly optimization",
            "24-hour response",
            "Full CRM Automation"
        ],
        highlight: true,
        buttonText: "Start My Growth Engine"
    },
    {
        name: "Dominance",
        price: "21,699",
        minAd: "45,000",
        description: "Aggressive multi-channel scaling for market leaders.",
        features: [
            "Everything in Growth",
            "Full SEO, funnels & A/B",
            "Daily optimization",
            "Same-day priority",
            "Dedicated Creative Studio Access"
        ],
        highlight: false,
        buttonText: "Claim Market Dominance"
    }
];

export default function Pricing() {
    const { openModal } = useContactModal();

    return (
        <section id="pricing" className="py-24 md:py-32 bg-[#FFF4E6] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                        The Packages
                    </motion.div>



                    <h2 className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-dark-deepest mb-8 font-heading leading-[1.1] text-balance">
                        Digital Marketing Packages for<br />
                        <span className="bg-gradient-to-r from-orange to-dark-deepest bg-clip-text text-transparent"> UAE Businesses</span>
                    </h2>

                    <div className="flex flex-col items-center gap-8">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-dark-deepest/70 max-w-4xl leading-relaxed"
                        >
                            Most agencies sell you <span className="text-dark-deepest font-bold">&quot;activities&quot;</span> because they can&apos;t guarantee outcomes.
                            We focus on the <span className="text-orange font-bold italic underline decoration-orange/30 underline-offset-4">metrics that actually hit your bank account.</span>
                            Fixed tier fee for the first 90 days. After that, 20% of ad budget or tier fee — whichever is higher.

                        </motion.p>

                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {PACKAGES.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-8 md:p-10 rounded-[3rem] border transition-all duration-500 group/card ${pkg.highlight
                                ? 'bg-dark-deepest text-white border-orange shadow-[0_40px_80px_-15px_rgba(254,119,0,0.15)] scale-105 z-20 ring-1 ring-orange/20'
                                : 'bg-white text-dark-deepest border-dark-deepest/5 shadow-xl hover:border-orange/20 z-10'
                                }`}
                        >
                            {pkg.highlight && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg shadow-orange/30">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-2xl font-black uppercase mb-2 ${pkg.highlight ? 'text-orange' : 'text-dark-deepest'}`}>
                                    {pkg.name}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-4xl md:text-5xl font-black">{pkg.price}</span>
                                    <span className={`text-sm font-bold opacity-60 uppercase tracking-widest`}>AED</span>
                                </div>
                                <div className="text-xs font-bold opacity-40 uppercase tracking-widest mb-4">per month</div>
                                <div className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 ${pkg.highlight ? 'bg-white/10 text-orange' : 'bg-orange/10 text-orange'}`}>
                                    FIRST 90 DAYS
                                </div>
                            </div>

                            {/* Total Calculation Box */}
                            {/* <div className={`p-6 rounded-2xl mb-8 border ${pkg.highlight ? 'bg-white/5 border-white/10' : 'bg-orange/5 border-orange/10'
                                }`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Min. Ad Budget</span>
                                    <span className="text-sm font-bold">AED {pkg.minAd}/mo</span>
                                </div>

                            </div> */}

                            {/* Features */}
                            <ul className="space-y-4 mb-10">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                                        <Check size={16} className={pkg.highlight ? 'text-orange' : 'text-green-500'} strokeWidth={3} />
                                        <span className={pkg.highlight ? 'text-white/80' : 'text-dark-deepest/70'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <CreativeButton
                                onClick={() => openModal(`${pkg.name} Package - ${pkg.buttonText}`)}
                                variant={pkg.highlight ? 'shimmer' : 'pulse'}
                                className={`w-full py-4 rounded-xl text-base transition-all duration-300 ${pkg.highlight ? 'hover:shadow-[0_20px_40px_-10px_rgba(254,119,0,0.3)]' : 'hover:border-orange/40'}`}
                            >
                                {pkg.buttonText}
                            </CreativeButton>
                        </motion.div>
                    ))}
                </div>

                {/* Post-90 Day Disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 p-8 rounded-[2.5rem] bg-dark-deepest/[0.02] border border-dashed border-dark-deepest/10 max-w-4xl mx-auto text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-4 text-orange">
                        <Info size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Performance Shift</span>
                    </div>
                    <p className="text-dark-deepest/50 text-sm leading-relaxed">
                        After 90 days: <span className="text-dark-deepest font-bold">20% of ad budget</span> or your tier fee — whichever is higher.
                        Ad budgets are paid <span className="italic">directly</span> to the platforms (Google, Meta, LinkedIn).
                    </p>
                </motion.div>

            </div>
        </section >
    );
}
