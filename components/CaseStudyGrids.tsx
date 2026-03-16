'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, BarChart3, Clock, Rocket, ArrowUpRight } from 'lucide-react';

const caseStudies = [
    {
        industry: "Real Estate",
        title: "From Zero Leads to 127 Qualified Prospects in 90 Days",
        description: "A Dubai-based developer spent AED 30K/month on disconnected campaigns with no tracking. We unified everything under The Lead Engine and built a CRM pipeline from scratch.",
        mainStat: "347%",
        mainLabel: "ROI Increase",
        stats: [
            { label: "Qualified Leads", value: "127", icon: Users },
            { label: "Cost Per Lead", value: "AED 892", icon: DollarSign },
            { label: "Timeframe", value: "90 days", icon: Clock }
        ],
        accent: "orange"
    },
    {
        industry: "E-Commerce",
        title: "Scaling From AED 50K to AED 210K Monthly Revenue",
        description: "An e-commerce brand hit a growth ceiling with fragmented social ads. The Lead Engine integrated paid, organic, and email into one conversion system.",
        mainStat: "4.2x",
        mainLabel: "ROAS Achieved",
        stats: [
            { label: "Revenue Growth", value: "320%", icon: TrendingUp },
            { label: "ROAS", value: "4.2x", icon: BarChart3 },
            { label: "Timeframe", value: "6 months", icon: Clock }
        ],
        accent: "dark"
    },
    {
        industry: "Healthcare",
        title: "Generating 89 Monthly Patient Inquiries for a Medical Clinic",
        description: "A multi-specialty clinic needed predictable patient acquisition. We built an engine driving qualified appointment bookings through search and content.",
        mainStat: "89",
        mainLabel: "Monthly Leads",
        stats: [
            { label: "Booking Rate", value: "62%", icon: BarChart3 },
            { label: "Cost Per Lead", value: "AED 340", icon: DollarSign },
            { label: "Lead Growth", value: "215%", icon: TrendingUp }
        ],
        accent: "orange"
    },
    {
        industry: "Professional Services",
        title: "Tripling Qualified Consultations for a Legal Advisory Firm",
        description: "A business advisory firm relied entirely on referrals. The Lead Engine created a systematic digital pipeline generating more leads than word-of-mouth ever did.",
        mainStat: "215%",
        mainLabel: "Lead Growth",
        stats: [
            { label: "Qualified Leads", value: "52/mo", icon: Users },
            { label: "Current Tier", value: "Growth", icon: Rocket },
            { label: "Outcome", value: "Scalable Pipeline", icon: ArrowUpRight }
        ],
        accent: "dark"
    }
];

export default function CaseStudyGrids() {
    return (
        <section className="py-24 bg-light font-secondary">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 gap-20">
                    {caseStudies.map((study, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="group"
                        >
                            <div className="bg-white rounded-[3rem] overflow-hidden border border-dark/5 shadow-[0_20px_60px_rgba(0,0,0,0.03)] group-hover:shadow-[0_40px_100px_rgba(254,119,0,0.08)] transition-all duration-700 flex flex-col lg:flex-row items-stretch">
                                {/* Visual/Stat Side */}
                                <div className={`lg:w-1/3 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden ${study.accent === 'orange' ? 'bg-orange text-white' : 'bg-dark-deepest text-white'}`}>
                                    {/* Abstract background shape */}
                                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                        <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] border-[40px] border-white rounded-full animate-pulse" />
                                    </div>

                                    <div className="relative z-10">
                                        <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70 font-heading">
                                            {study.industry}
                                        </p>
                                        <h3 className="text-7xl md:text-8xl font-black font-heading mb-2 leading-none">
                                            {study.mainStat}
                                        </h3>
                                        <p className="text-lg font-black uppercase tracking-widest font-heading">
                                            {study.mainLabel}
                                        </p>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="lg:w-2/3 p-12 md:p-16 flex flex-col justify-center">
                                    <div className="max-w-xl">
                                        <h4 className="text-3xl md:text-4xl font-black text-dark-deepest mb-6 leading-tight uppercase font-heading">
                                            {study.title}
                                        </h4>
                                        <p className="text-dark-deepest/50 text-lg leading-relaxed mb-10 font-medium">
                                            {study.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-dark/5">
                                            {study.stats.map((stat, sIdx) => (
                                                <div key={sIdx}>
                                                    <div className="flex items-center gap-2 mb-2 text-orange">
                                                        <stat.icon size={16} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest font-heading">{stat.label}</span>
                                                    </div>
                                                    <p className="text-2xl font-black text-dark-deepest font-heading">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
