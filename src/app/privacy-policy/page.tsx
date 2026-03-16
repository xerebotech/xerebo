'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
    const sections = [
        {
            title: "1. Introduction",
            icon: <Shield className="w-6 h-6" />,
            content: "Welcome to Xerebo. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you in the United Arab Emirates (UAE)."
        },
        {
            title: "2. Data We Collect",
            icon: <Eye className="w-6 h-6" />,
            content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data (name), Contact Data (email, phone), Technical Data (IP address, browser type), and Usage Data (how you use our website)."
        },
        {
            title: "3. How We Use Your Data",
            icon: <FileText className="w-6 h-6" />,
            content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: To provide you with market intelligence, to contact you regarding your inquiries, and to improve our website through analytics."
        },
        {
            title: "4. Cookie Policy",
            icon: <Lock className="w-6 h-6" />,
            content: "Our website uses cookies to distinguish you from other users. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies."
        },
        {
            title: "5. UAE PDPL Compliance",
            icon: <Shield className="w-6 h-6" />,
            content: "In accordance with the UAE Federal Decree-Law No. 45 of 2021 regarding the Protection of Personal Data (PDPL), we ensure that your data is processed transparently and securely. You have the right to access, correct, or request deletion of your data at any time."
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
                        Privacy <span className="text-orange">Policy</span>
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
                            <h2 className="text-2xl font-bold text-dark font-heading mb-6">Contact Us</h2>
                            <p className="text-dark/70 text-lg mb-4">
                                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                            </p>
                            <div className="bg-light p-6 rounded-2xl border border-dark/5">
                                <p className="font-bold text-dark">Email: hello@xerebo.com</p>
                                <p className="text-dark/70">Address: Business Bay, Dubai, UAE</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
