'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Handshake } from 'lucide-react';

const values = [
    {
        title: "Precision",
        description: "Every campaign, every channel, every decision is calibrated by data. We don't guess — we engineer outcomes.",
        icon: Target
    },
    {
        title: "Transparency",
        description: "Your CRM dashboard is live. Every lead is visible. Every number is real. No hidden metrics, no vague reports.",
        icon: Eye
    },
    {
        title: "Commitment",
        description: "90-day prove-it guarantee. Fee tied to your growth. We're partners invested in your outcomes, not vendors billing hours.",
        icon: Handshake
    }
];

export default function AboutValues() {
    return (
        <section className="py-24 md:py-32 bg-[#fefefe] relative overflow-hidden font-secondary">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                        Our Values
                    </motion.div>
                    <h2 className="text-4xl md:text-7xl font-black text-dark-deepest uppercase font-heading leading-[0.85] mb-8">
                        Engineered <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange/50">For Results.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-orange/5 flex items-center justify-center text-orange mx-auto mb-8 group-hover:bg-orange group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                                <value.icon size={36} />
                            </div>
                            <h3 className="text-2xl font-black text-dark-deepest mb-4 uppercase font-heading">
                                {value.title}
                            </h3>
                            <p className="text-dark-deepest/50 leading-relaxed font-bold">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
