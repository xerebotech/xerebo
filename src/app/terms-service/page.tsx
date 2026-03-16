'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Scale, FileCheck, AlertCircle, Gavel, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: <FileCheck className="w-6 h-6" />,
            content: "By accessing and using Xerebo&apos;s services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services."
        },
        {
            title: "2. Scope of Services",
            icon: <Scale className="w-6 h-6" />,
            content: "Xerebo provides marketing growth intelligence, CRM automation, and performance marketing services. The specific scope of your project will be defined in a separate Statement of Work (SOW)."
        },
        {
            title: "3. Intellectual Property",
            icon: <Gavel className="w-6 h-6" />,
            content: "Unless otherwise agreed in writing, all systems, websites, and custom CRM architectures built by Xerebo for the Client shall become the property of the Client upon full payment."
        },
        {
            title: "4. Limitation of Liability",
            icon: <AlertCircle className="w-6 h-6" />,
            content: "Xerebo shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly."
        },
        {
            title: "5. Governing Law",
            icon: <Scale className="w-6 h-6" />,
            content: "These terms shall be governed by and construed in accordance with the laws of the United Arab Emirates as applied in the Emirate of Dubai. Any disputes shall be subject to the exclusive jurisdiction of the Dubai Courts."
        }
    ];

    return (
        <main className="min-h-screen bg-light">
            <Header />

            {/* Hero Header */}
            <section className="pt-40 pb-20 bg-dark-deepest relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange/10 to-transparent opacity-50" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-orange text-sm font-bold tracking-widest uppercase mb-8 hover:gap-3 transition-all">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
                        Terms of <span className="text-orange">Service</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Last updated: February 13, 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-dark/5 border border-dark/5">
                        <div className="space-y-12">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-orange/10 rounded-2xl flex items-center justify-center text-orange">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-2xl font-bold text-dark font-heading">
                                            {section.title}
                                        </h2>
                                    </div>
                                    <p className="text-dark/70 leading-relaxed text-lg pl-16">
                                        {section.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-20 pt-12 border-t border-dark/10">
                            <h2 className="text-2xl font-bold text-dark font-heading mb-6">Agreement</h2>
                            <p className="text-dark/70 text-lg mb-4 italic">
                                By continuing to use our platform or services, you acknowledge that you have read, understood, and agreed to be bound by these terms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
