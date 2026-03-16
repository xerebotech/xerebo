'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Database, Globe, Sparkles, Target, ChevronRight } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

const services = [
    {
        id: 1,
        title: "Xerebo Performance Marketing",
        description:
            "Full-funnel paid acquisition across Google, Meta, LinkedIn & TikTok. Every campaign engineered for measurable ROI and predictable revenue growth.",
        icon: Zap,
        cta: "Get a Free Consultation",
        gradient: "from-orange-500 to-red-600",
    },
    {
        id: 2,
        title: "Xerebo SEO & Organic Growth",
        description:
            "Search strategies that compound. Authority building, technical SEO, and high-intent rankings that generate sustainable traffic.",
        icon: TrendingUp,
        cta: "Request a Free SEO Audit",
        gradient: "from-[#FE7700] to-orange-600",
    },
    {
        id: 3,
        title: "Xerebo CRM & Automation",
        description:
            "Custom-built CRM & automation systems tailored to your workflow. No licensing traps. You own the infrastructure.",
        icon: Database,
        cta: "Talk to Our Team",
        gradient: "from-orange-600 to-[#FE7700]",
    },
    {
        id: 4,
        title: "Xerebo Website Development",
        description:
            "Conversion-driven websites built for speed, clarity, and performance. Designed to turn traffic into qualified leads.",
        icon: Globe,
        cta: "Get a Free Quote",
        gradient: "from-[#FE7700] to-orange-500",
    }
];

export default function ServicesShowcase() {
    const { openModal } = useContactModal();

    return (
        <section className="py-24 md:py-36 bg-[#F6F4F4] relative overflow-hidden">

            {/* Premium Soft Background Glow */}
            <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#FE7700]/10 rounded-full blur-[180px]" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[160px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                        Services
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#323939] mb-8 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] text-balance">
                        Need Something <span className="bg-gradient-to-r from-[#FE7700] to-orange-600 bg-clip-text text-transparent">Specific?</span>
                    </h2>

                    <p className="text-xl text-[#323939]/70 max-w-3xl mx-auto leading-relaxed">
                        Every service available individually — or combined into
                        <span className="text-[#FE7700] font-semibold"> Marketing Intelligence</span>
                        {" "}for maximum impact.
                    </p>
                </motion.div>

                {/* SERVICES GRID */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            whileHover={{
                                y: -8,
                                rotateX: 2,
                                rotateY: -2
                            }}
                            className="relative group perspective-1000"
                        >
                            {/* Outer Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FE7700]/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative bg-white/80 backdrop-blur-xl border border-[#323939]/10 hover:border-[#FE7700]/30 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">

                                {/* Subtle Shimmer */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                                />

                                <div className="relative z-10">

                                    {/* Icon */}
                                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                        <service.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#323939] mb-4 group-hover:text-[#FE7700] transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#323939]/70 leading-relaxed mb-6 text-lg">
                                        {service.description}
                                    </p>

                                    {/* CTA */}
                                    <motion.button
                                        whileHover={{ x: 6 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => openModal(service.title)}
                                        className="flex items-center gap-2 text-[#FE7700] font-semibold text-lg"
                                    >
                                        {service.cta}
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FE7700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* PREMIUM BOTTOM CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-[#FE7700]/20 rounded-3xl blur-3xl" />

                    <div className="relative bg-gradient-to-br from-[#323939] to-[#1f2626] rounded-3xl p-12 border border-[#FE7700]/20 shadow-2xl">

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">

                            <div className="text-center md:text-left">
                                <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                                    <Sparkles className="w-6 md:w-7 h-6 md:h-7 text-[#FE7700]" />
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                                        Want Everything?
                                    </h3>
                                </div>
                                <p className="text-white/70 text-base md:text-lg">
                                    Get the complete growth system with Marketing Intelligence.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openModal('Marketing Intelligence')}
                                className="w-full md:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#FE7700] to-orange-600 text-white font-bold text-base md:text-lg rounded-full shadow-xl shadow-[#FE7700]/40 flex items-center justify-center gap-3"
                            >
                                <span className="hidden md:inline">Explore Marketing Intelligence</span>
                                <span className="md:hidden">Get Full System</span>
                                <ChevronRight className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
