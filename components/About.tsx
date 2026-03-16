'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';
import { ArrowRight, Activity, Zap, Target, TrendingUp, DollarSign } from 'lucide-react';

// Animated ring component
const PulseRing = ({ delay = 0, size = 80 }: { delay?: number; size?: number }) => (
    <motion.div
        className="absolute rounded-full border border-orange/20"
        style={{ width: size, height: size, left: '50%', top: '50%', marginLeft: -size / 2, marginTop: -size / 2 }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
);

const About = () => {
    const { openModal } = useContactModal();
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ['12deg', '-12deg']), { stiffness: 80, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ['-12deg', '12deg']), { stiffness: 80, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section id="about" className="relative min-h-screen flex flex-col pt-32 pb-16 overflow-hidden font-secondary bg-dark-deepest">

            {/* ── Full-bleed background elements ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, var(--deepest) 55%, var(--light) 55%)',
                }}
            />

            {/* Grid texture for "full page" feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(254,119,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(254,119,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Ambient glow behind the card */}
            <div className="absolute right-[10%] top-[20%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-50"
                style={{ background: 'radial-gradient(circle, rgba(254,119,0,0.15) 0%, transparent 70%)' }}
            />

            <div className="relative max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center">
                <div className="grid lg:grid-cols-2 gap-16 items-center flex-grow">

                    {/* ── LEFT: Copy ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange/25 bg-orange/10 text-orange text-[11px] font-black tracking-[0.2em] uppercase mb-10 font-heading"
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full bg-orange pulse-animation"
                                style={{
                                    boxShadow: '0 0 8px rgba(254,119,0,0.8)',
                                }}
                            />
                            About Xerebo
                        </motion.div>

                        {/* Headline — light on dark */}
                        <h1
                            className="font-heading font-black uppercase tracking-tighter leading-[0.92] mb-10 text-light"
                            style={{
                                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                            }}
                        >
                            A Dubai Agency<br />
                            <span className="block text-transparent" style={{
                                WebkitTextStroke: '1.5px rgba(254,119,0,0.7)',
                            }}>
                                Built On<br />Accountability.
                            </span>
                        </h1>

                        {/* Body */}
                        <p
                            className="text-xl md:text-2xl leading-relaxed mb-12 font-medium max-w-[550px] text-light/50"
                        >
                            Xerebo was founded on a simple frustration: why do agencies get paid the same whether
                            they deliver pipeline-ready prospects or not? The Lead Engine ties our revenue to your
                            growth — CRM-transparent, 90-day guaranteed, or we walk.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                            <CreativeButton
                                onClick={() => openModal('About Intro CTA: Conversation')}
                                variant="shimmer"
                                size="lg"
                                className="w-full sm:w-auto px-10 py-6 text-lg shadow-[0_20px_60px_rgba(254,119,0,0.25)]"
                            >
                                Book a Conversation
                            </CreativeButton>

                            <CreativeButton
                                onClick={() => openModal('About Intro CTA: Audit')}
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto px-10 py-6 text-lg border-light/20 text-light hover:bg-light/5"
                            >
                                Get Free Analysis
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </CreativeButton>
                        </div>

                        {/* Social Proof / Lead Count */}
                        <div className="flex items-center gap-5">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-deepest overflow-hidden shadow-lg">
                                        <img src={`https://i.pravatar.cc/100?u=sa${i}`} alt="Client" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-dark-deepest bg-orange flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                                    +
                                </div>
                            </div>
                            <div className="text-light/40 font-heading">
                                <p className="text-[10px] uppercase font-black tracking-widest leading-none mb-1">Lead Velocity</p>
                                <p className="text-sm font-bold text-light/70 tracking-tight">500+ Sales-Ready Leads This Month</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: 3D Card Stack ── */}
                    <div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative h-[650px] flex items-center justify-center"
                        style={{ perspective: '1100px' }}
                    >
                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                            className="relative w-full max-w-[450px] h-[420px]"
                        >

                            {/* ── Main Card ── */}
                            <motion.div
                                style={{ translateZ: 40 }}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 rounded-[3rem] overflow-hidden bg-dark-deepest/95 border border-orange/15 shadow-[0_60px_120px_rgba(0,0,0,0.6)] backdrop-blur-[24px]"
                            >
                                {/* Grid texture */}
                                <div
                                    className="absolute inset-0 opacity-[0.06]"
                                    style={{
                                        backgroundImage: 'linear-gradient(rgba(254,119,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,119,0,1) 1px, transparent 1px)',
                                        backgroundSize: '32px 32px',
                                    }}
                                />

                                {/* Giant ghost icon */}
                                <div className="absolute bottom-0 right-0 opacity-[0.05] translate-x-12 translate-y-12">
                                    <Zap size={280} className="text-orange" />
                                </div>

                                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                                    {/* Status row */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange/15 text-orange shadow-inner">
                                                <Activity size={28} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] font-heading text-light/40">System Status</p>
                                                <p className="text-base font-black font-heading text-light tracking-tight">Lead Engine Active</p>
                                            </div>
                                        </div>
                                        <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] bg-green-500/10 border border-green-500/25 text-green-400">
                                            <PulseRing delay={0} size={28} />
                                            <span className="w-2 h-2 rounded-full bg-green-400 relative z-10 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                                            <span className="relative z-10">Live</span>
                                        </div>
                                    </div>

                                    {/* Pipeline value */}
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.4em] mb-3 font-heading text-orange">
                                            Live Pipeline
                                        </p>
                                        <h3 className="font-black tracking-tighter font-heading text-light leading-none mb-6" style={{ fontSize: '4.5rem' }}>
                                            AED 2.4M
                                        </h3>

                                        {/* Sparkline bar */}
                                        <div className="flex gap-1.5 items-end h-16 mb-8">
                                            {[40, 60, 45, 70, 55, 80, 65, 90, 75, 100].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scaleY: 0 }}
                                                    whileInView={{ scaleY: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.4 + i * 0.05, duration: 0.8 }}
                                                    className="flex-1 rounded-sm origin-bottom"
                                                    style={{
                                                        height: `${h}%`,
                                                        background: i === 9
                                                            ? '#FE7700'
                                                            : `rgba(254,119,0,${0.1 + (i / 9) * 0.4})`,
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-3">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i}
                                                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-dark-deepest shadow-xl">
                                                        <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-[11px] font-black uppercase tracking-[0.2em] font-heading text-light/40">
                                                +12 Active Prospects <span className="text-orange/50 ml-1">Today</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* ── ROAS Chip ── */}
                            <motion.div
                                style={{ translateZ: 110 }}
                                initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute -top-16 -right-12 w-48 rounded-[2rem] p-7 bg-orange shadow-[0_30px_70px_rgba(254,119,0,0.5)] border border-white/20"
                            >
                                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 bg-black/20 shadow-inner">
                                    <TrendingUp size={22} color="white" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.25em] font-heading text-white/70 mb-1">Avg ROAS</p>
                                <p className="text-4xl font-black font-heading text-white tracking-tighter">4.2×</p>
                            </motion.div>

                            {/* ── Conversion Meter ── */}
                            <motion.div
                                style={{ translateZ: 130 }}
                                initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute -bottom-12 -left-12 w-56 rounded-[2rem] p-7 bg-light shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-orange/20"
                            >
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-orange/10 text-orange shadow-sm">
                                        <Target size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.25em] font-heading text-dark/40">Conv. Rate</p>
                                        <p className="text-xl font-black font-heading text-dark-deepest tracking-tight">8.4%</p>
                                    </div>
                                </div>
                                <div className="h-2 w-full rounded-full overflow-hidden bg-dark/5 shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '84%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                        className="h-full rounded-full bg-gradient-to-r from-orange to-[#FF9940] shadow-[0_0_15px_rgba(254,119,0,0.4)]"
                                    />
                                </div>
                            </motion.div>

                            {/* ── Revenue Pill ── */}
                            <motion.div
                                style={{ translateZ: 160 }}
                                initial={{ opacity: 0, scale: 0.8, x: 30 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute bottom-6 -right-20 rounded-2xl px-6 py-5 flex items-center gap-4 bg-dark-deepest/90 backdrop-blur-[20px] border border-orange/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-500/15 text-green-400">
                                    <DollarSign size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] font-heading text-light/40">Rev. Growth</p>
                                    <p className="text-2xl font-black font-heading text-green-400 tracking-tighter">+240%</p>
                                </div>
                            </motion.div>

                            {/* ── Dynamic Floating Icons ── */}
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [0, -25, 0],
                                        rotate: [0, 10 * i, 0],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{
                                        duration: 4 + i,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: i * 0.5
                                    }}
                                    className="absolute rounded-full bg-orange blur-[1.5px] shadow-[0_0_20px_rgba(254,119,0,0.8)]"
                                    style={{
                                        width: 6 + i,
                                        height: 6 + i,
                                        top: `${20 + (i * 20)}%`,
                                        left: `${10 + (i * 25)}%`,
                                        translateZ: 80 + (i * 40),
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>

                </div>

                {/* BOTTOM STATS — Match with Home page full-page impact */}
                <div className="mt-auto pt-16 border-t border-light/10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { value: '90-Day', label: 'Exit Guarantee' },
                            { value: '100%', label: 'CRM Visibility' },
                            { value: 'Dedicated', label: 'Growth Pods' },
                            { value: 'AED 180M+', label: 'Managed Data' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 + (i * 0.1) }}
                                className="text-center md:text-left group"
                            >
                                <p className="text-2xl md:text-3xl font-black text-orange mb-1 font-heading group-hover:text-dark transition-colors tracking-tighter uppercase">
                                    {stat.value}
                                </p>
                                <p className="text-[9px] md:text-[10px] text-dark/30 uppercase font-black tracking-[0.3em] font-heading">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;