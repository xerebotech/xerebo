'use client';

import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import Link from 'next/link';

const testimonials = [
    {
        name: "Mr. Vipin Kumar",
        role: "General Manager",
        company: "Best Solution LLC",
        content: "We were generating noise, not business. Xerebo shifted us from volume to quality. Now, leads arrive pre-informed and ready to buy, so our team spends less time filtering and more time closing. That's the kind of change that truly stays.",
        icon: "VK",
        result: "Lead Quality Improved"
    },
    {
        name: "Mr. Akhil Saja Vijay",
        role: "Owner",
        company: "Clifton Real Estate",
        content: "Three agencies in two years — beautiful decks, vague results, endless excuses. Xerebo was different from the first call. No fluff, just a clear strategy tied to property enquiries. Our cost per serious buyer dropped by 60%. I finally know exactly where every dirham goes.",
        icon: "ASV",
        result: "60% Cost Reduction"
    },
    {
        name: "Ms.Aswani Krishnan",
        role: "Managing Director",
        company: "Grovoz",
        content: "I've sat in rooms with marketing consultants who talk for an hour and say nothing actionable. Xerebo audited our entire funnel in week one and handed us a 90-day growth plan we could execute immediately. They think like a CMO but operate like a specialist — that combination is rare.",
        icon: "AK",
        result: "90-Day Growth Plan"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 md:py-32 bg-[#FFFDFB] relative overflow-hidden font-sans">
            {/* Background Art */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dark-deepest/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                        Client Success
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark-deepest mb-8 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] text-balance">
                        What Our <span className="bg-gradient-to-r from-orange to-dark-deepest bg-clip-text text-transparent">Clients Actually Say</span>.
                    </h2>
                    <p className="text-xl text-dark-deepest/50 leading-relaxed border-l-2 border-orange/20 pl-6">
                        No fluffy reports. Just real people getting real pipeline growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white rounded-[3rem] p-10 border border-dark-deepest/[0.03] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_-20px_rgba(254,119,0,0.12)] hover:border-orange/20 transition-all duration-500 flex flex-col h-full group relative overflow-hidden"
                        >
                            {/* Decorative Sparkle */}
                            <div className="absolute top-8 right-8 text-orange/10 group-hover:text-orange/30 transition-colors">
                                <Sparkles size={24} />
                            </div>

                            <div className="flex items-center gap-1 mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-orange text-orange" strokeWidth={0} />
                                ))}
                            </div>

                            <p className="text-dark-deepest/80 text-xl font-bold leading-relaxed mb-10 flex-grow italic tracking-tight">
                                &quot;{t.content}&quot;
                            </p>

                            <div className="pt-8 border-t border-dark-deepest/5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-dark-deepest text-white flex items-center justify-center font-black text-xl shadow-lg shadow-dark-deepest/20">
                                        {t.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-dark-deepest text-lg tracking-tight">{t.name}</h4>
                                        <p className="text-xs font-bold text-dark-deepest/40 uppercase tracking-widest">{t.role} @ {t.company}</p>
                                    </div>
                                </div>

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/5 text-orange text-[10px] font-black uppercase tracking-widest border border-orange/10">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    {t.result}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 text-center"
                >
                    <Link href="/results">
                        <CreativeButton
                            variant="shimmer"
                            size="lg"
                            className="px-10 py-6 text-lg shadow-[0_20px_50px_rgba(254,119,0,0.15)] group"
                        >
                            See all case studies with full numbers
                            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </CreativeButton>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
