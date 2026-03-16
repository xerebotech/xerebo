'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';
import { Target, Zap, Cpu, TrendingUp, Monitor, Banknote } from 'lucide-react';

const carouselItems = [
    {
        id: 1,
        icon: Target,
        title: "Wasted Ad Spend",
        description:
            "You’re investing heavily in ads, but there’s no clear attribution, no cost-per-acquisition clarity, and no scalable return. Budget disappears without predictable revenue.",
        action: "The Blueprint"
    },
    {
        id: 2,
        icon: Zap,
        title: "No Visibility",
        description:
            "Data lives across multiple platforms. No unified dashboard. No revenue tracking. Decisions are based on guesswork instead of intelligence.",
        action: "The Engine"
    },
    {
        id: 3,
        icon: Cpu,
        title: "No Conversions",
        description:
            "Traffic is coming in — but users aren’t converting. Weak messaging, poor UX, and no funnel strategy means attention without action.",
        action: "The System"
    },
    {
        id: 4,
        icon: TrendingUp,
        title: "Poor SEO",
        description:
            "You’re invisible when customers search. Competitors dominate page one while your business misses high-intent organic traffic daily.",
        action: "The Growth"
    },
    {
        id: 5,
        icon: Monitor,
        title: "Outdated Website",
        description:
            "Slow load times, poor structure, and no strategic conversion flow. Your website may look fine — but it doesn’t sell.",
        action: "The Rebuild"
    },
    {
        id: 6,
        icon: Banknote,
        title: "Bad User Experience",
        description:
            "Confusing navigation, friction-heavy forms, unclear CTAs. Visitors leave before understanding your real value.",
        action: "The Optimization"
    }
];

export default function ProblemSection() {
    const { openModal } = useContactModal();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Faster auto rotation (7 seconds)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        }, 7000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 md:py-32 bg-light relative overflow-hidden text-dark font-sans">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                        >
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                            Sound Familiar?
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-8 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] text-balance">
                            The Problems Holding <br />
                            <span className="bg-gradient-to-r from-orange to-dark-deepest bg-clip-text text-transparent">
                                Your Business Back.
                            </span>
                        </h2>

                        <p className="text-xl text-dark/70 leading-relaxed mb-8 border-l-4 border-orange pl-6">
                            If any of these sound like you — you&apos;re exactly who we built Xerebo for.
                        </p>

                        <p className="text-dark/80 leading-relaxed mb-10 text-lg">
                            Xerebo replaces the chaos with <strong className="text-dark font-bold">Marketing Intelligence</strong>.
                            We combine high-level strategy, aggressive execution, and deep technology into one
                            integrated system that scales with you.
                        </p>

                        <CreativeButton
                            onClick={openModal}
                            variant="shimmer"
                            size="lg"
                            width="full"
                            className="md:w-auto shadow-xl hover:shadow-2xl px-6 md:px-10 py-4 md:py-5 text-base md:text-lg"
                        >
                            <span className="hidden md:inline">Meet Your Future Team</span>
                            <span className="md:hidden">Meet the Team</span>
                        </CreativeButton>
                    </motion.div>

                    {/* RIGHT CAROUSEL */}
                    <div className="relative h-[500px] w-full max-w-lg mx-auto lg:ml-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 80, scale: 0.96 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -80, scale: 0.96 }}
                                transition={{
                                    duration: 0.35,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="absolute inset-0"
                            >
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(254,119,0,0.15)] transition-shadow duration-500"
                                >
                                    {/* Glass Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50 pointer-events-none" />

                                    {/* Glow */}
                                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange/10 rounded-full blur-[80px] group-hover:bg-orange/20 transition-colors duration-500" />

                                    <div className="relative z-10">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange to-dark-deepest flex items-center justify-center mb-10 shadow-[0_10px_30px_rgba(254,119,0,0.3)] group-hover:scale-110 transition-transform duration-500 text-white">
                                            {React.createElement(carouselItems[currentIndex].icon, { size: 40 })}
                                        </div>

                                        <h3 className="text-4xl font-bold text-dark mb-6 tracking-tight font-heading">
                                            {carouselItems[currentIndex].title}
                                        </h3>

                                        <p className="text-dark/70 text-xl leading-relaxed font-normal">
                                            {carouselItems[currentIndex].description}
                                        </p>
                                    </div>

                                    {/* Bottom Section */}
                                    <div className="relative z-10 flex items-center justify-between mt-auto pt-8 border-t border-dark/10">
                                        <span className="text-sm font-bold tracking-[0.2em] text-orange uppercase font-heading">
                                            {carouselItems[currentIndex].action}
                                        </span>

                                        <div className="flex gap-3">
                                            {carouselItems.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex
                                                        ? 'w-12 bg-orange shadow-[0_0_10px_rgba(254,119,0,0.5)]'
                                                        : 'w-2 bg-dark/20'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
