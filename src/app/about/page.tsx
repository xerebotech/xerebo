'use client';

import Header from '@/components/Header';
import About from '@/components/About';
import AboutPillars from '@/components/AboutPillars';
import AboutProcess from '@/components/AboutProcess';
import AboutValues from '@/components/AboutValues';
import AboutTeam from '@/components/AboutTeam';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CreativeButton from '@/components/ui/CreativeButton';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContactModal } from '@/context/ContactModalContext';

export default function AboutPage() {
    const { openModal } = useContactModal();

    return (
        <main className="bg-[#fefefe]">
            <Header />
            <Breadcrumbs items={[{ label: 'About Xerebo' }]} />

            <About />
            <AboutPillars />
            <AboutProcess />
            <AboutValues />
            <AboutTeam />

            {/* ── Final CTA Section: The High-Impact Close ── */}
            <section className="relative py-32 overflow-hidden bg-white font-secondary">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(254,119,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(254,119,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-xs font-black tracking-widest uppercase mb-8 font-heading"
                            >
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                                Final Step
                            </motion.div>

                            <h2 className="text-5xl md:text-7xl font-black text-dark-deepest mb-8 font-heading tracking-tighter uppercase leading-[0.85]">
                                Ready To <br />
                                <span className="text-orange">Stop The Waste?</span>
                            </h2>

                            <p className="text-xl md:text-2xl mb-12 text-dark-deepest/50 font-medium max-w-xl leading-relaxed">
                                Most agencies charge for effort. We charge for outcomes. In 30 minutes, we&apos;ll show
                                you exactly how your current marketing is leaking leads and how The Lead Engine fixes it.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                                <CreativeButton
                                    onClick={() => openModal('About Footer CTA: Conversation')}
                                    variant="shimmer"
                                    size="lg"
                                    className="w-full sm:w-auto px-10 py-6 text-xl shadow-[0_20px_60px_rgba(254,119,0,0.3)]"
                                >
                                    Book a Call
                                </CreativeButton>

                                <CreativeButton
                                    onClick={() => openModal('About Footer CTA: Audit')}
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto px-10 py-6 text-xl border-dark-deepest/10 text-dark-deepest hover:bg-orange/5"
                                >
                                    Get Analysis
                                </CreativeButton>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center gap-4 text-white/30">
                                <div className="flex -space-x-2">
                                    {[5, 6, 7].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-deepest overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?u=fa${i}`} alt="User" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-dark-deepest uppercase tracking-widest">+12 firms joined this week</span>
                            </div>
                        </div>

                        <div className="relative group">
                            {/* Decorative visual element */}
                            <div className="absolute -inset-4 bg-orange/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 blur-3xl rounded-full" />
                                <h3 className="text-3xl font-black text-dark-deepest mb-6 font-heading tracking-tight uppercase">90-Day <br />Guarantee</h3>
                                <p className="text-dark-deepest/50 font-medium mb-8 leading-relaxed">
                                    If we don&apos;t deliver the agreed volume of qualified leads within 90 days, we stop
                                    charging. No hidden fees. No lengthy cancellations. We perform or we leave.
                                </p>
                                <div className="flex items-center gap-3 py-4 px-6 rounded-2xl bg-orange/10 border border-orange/20 w-fit">
                                    <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
                                    <span className="text-xs font-black text-orange uppercase tracking-widest">Active Guarantee Policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
