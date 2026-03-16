'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, LineChart, FileText, Database, MapPin, Languages, ArrowRight, Sparkles } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

const roles = [
    {
        title: "Dedicated Account Manager",
        description: "Your single point of contact. Owns your strategy, leads your calls, and is accountable for your lead numbers. Not shared across 20 clients.",
        icon: User
    },
    {
        title: "Performance Media Team",
        description: "Google Ads, Meta Ads, LinkedIn Ads specialists who manage your budget daily. Google Partner and Meta Partner certified.",
        icon: LineChart
    },
    {
        title: "Content & SEO Specialists",
        description: "Writers, designers, and SEO strategists who create the assets that feed your campaigns. Content is driven by lead data, not content calendars.",
        icon: FileText
    },
    {
        title: "CRM & Tech Infrastructure",
        description: "The team that builds and maintains your lead tracking, CRM automations, conversion pixels, and the reporting dashboard you see every day.",
        icon: Database
    }
];

export default function AboutTeam() {
    const { openModal } = useContactModal();

    return (
        <section className="py-24 md:py-32 bg-dark-deepest relative overflow-hidden text-white font-secondary">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                        >
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                            Our Team
                        </motion.div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase font-heading leading-[0.85] mb-8">
                            Who's Behind <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange/50">The Engine.</span>
                        </h2>
                        <p className="text-xl text-white/50 leading-relaxed font-medium max-w-xl">
                            Every client is served by a dedicated pod — not a rotating cast of freelancers. Your team knows your business, your market, and your numbers.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {roles.map((role, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-orange/30 transition-all duration-500 group"
                            >
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white transition-all duration-500">
                                        <role.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black mb-2 tracking-tight uppercase font-heading group-hover:text-orange transition-colors">
                                            {role.title}
                                        </h3>
                                        <p className="text-white/40 leading-relaxed text-sm font-bold">
                                            {role.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="pt-16 border-t border-white/10 grid md:grid-cols-2 gap-12 mb-20">
                    <div className="flex items-center gap-6 group">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:text-orange transition-colors">
                            <MapPin size={24} />
                        </div>
                        <p className="text-lg text-white/60 font-medium">
                            Based in <span className="text-white font-bold">Business Bay, Dubai</span>. Operating across the UAE, KSA, and broader GCC market.
                        </p>
                    </div>
                    <div className="flex items-center gap-6 group">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:text-orange transition-colors">
                            <Languages size={24} />
                        </div>
                        <p className="text-lg text-white/60 font-medium">
                            Our team speaks <span className="text-white font-bold">Arabic, English, Hindi, and Urdu</span>.
                        </p>
                    </div>
                </div>

                {/* Team CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
                >
                    <div className="absolute top-0 left-0 w-64 h-64 bg-orange/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="max-w-xl">
                        <h3 className="text-3xl font-black text-white mb-4 font-heading tracking-tight uppercase">Ready to Meet Your Growth Pod?</h3>
                        <p className="text-white/40 font-medium leading-relaxed">
                            Every Xerebo client gets a dedicated team of 4 specialists.
                            Start a conversation today to see which pod fits your business goals.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <CreativeButton
                            onClick={() => openModal('About Team CTA: Meet Pods')}
                            variant="shimmer"
                            size="lg"
                            className="px-10 py-5 text-lg shadow-2xl"
                            icon={Sparkles}
                        >
                            Meet Your Pod
                            <ArrowRight className="ml-2" />
                        </CreativeButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
