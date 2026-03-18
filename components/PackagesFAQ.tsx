'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import CreativeButton from '@/components/ui/CreativeButton';

const faqs = [
    {
        question: "You don't promise a specific number of posts or blogs?",
        answer: "Correct. We promise qualified leads. Our team creates content, runs ads, optimizes SEO — but we decide the mix based on data, not a checklist. Every action is focused on generating leads, not hitting an arbitrary post count."
    },
    {
        question: "What if the leads aren't good enough?",
        answer: "We define what a \"qualified lead\" means together before onboarding — demographic fit, intent signals, and channel attribution. At the 90-day review, we measure against that definition using CRM data. If we didn't deliver, you walk."
    },
    {
        question: "What's the difference between Foundation and Growth?",
        answer: "The key differences are SEO and web asset scope. Foundation covers paid ads, content, social, and email with a landing page — but does not include SEO. Growth adds basic SEO (on-page optimization, keyword targeting, technical audit) plus full website management, faster optimization cycles, and more frequent strategy calls. Dominance unlocks full SEO including link building, content strategy, local SEO, and ongoing authority growth."
    },
    {
        question: "Why is the minimum ad budget AED 11,000?",
        answer: "Our system needs sufficient data to optimize effectively. Below AED 11,000/month, the data signals are too weak to identify what's working and scale it. Think of it as the minimum fuel the engine needs to perform."
    },
    {
        question: "Is the ad budget included in the package price?",
        answer: "No. The package fee covers our team, strategy, content creation, management, and tools. Ad budget is paid directly to platforms (Google, Meta, LinkedIn, etc.) and is completely separate from our fee."
    },
    {
        question: "Why can't I just buy one channel like ads or SEO separately?",
        answer: "Because isolated channels underperform. Ads generate clicks, but without landing pages and CRM tracking, those clicks go nowhere. Content drives awareness, but without retargeting, awareness doesn't convert. Our system is designed so each channel feeds the next. SEO is tiered by complexity — basic SEO starts at Growth, full SEO at Dominance — but the core paid, content, social, and email channels always work together from day one."
    },
    {
        question: "What happens after the first 90 days?",
        answer: "If we've delivered qualified leads, your pricing switches to 20% of your monthly ad budget — or your existing tier fee, whichever is higher. So if you're on Foundation (AED 5,699) and 20% of your ad budget is AED 4,000, you'd still pay AED 5,699. But if your budget grows and 20% becomes AED 8,000, your fee moves to AED 8,000. This keeps everything aligned — we earn more only when you invest more."
    },
    {
        question: "Is there a setup or onboarding fee?",
        answer: "No. There are zero setup fees, zero onboarding fees. Your tier fee covers everything from day one — brand audit, CRM setup, tracking infrastructure, campaign architecture, and launch. We invest upfront because we're confident the system will prove itself in 90 days."
    }
];

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-dark-deepest/10 last:border-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-start justify-between py-6 text-left group"
            >
                <span className={`text-lg md:text-xl font-bold pr-8 transition-colors ${isOpen ? 'text-orange' : 'text-dark-deepest group-hover:text-orange'}`}>
                    {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-orange text-white' : 'bg-dark-deepest/5 text-dark-deepest group-hover:bg-orange/10 group-hover:text-orange'}`}>
                    {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-dark-deepest/70 leading-relaxed text-base pr-12">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function PackagesFAQ() {
    const { openModal } = useContactModal();

    return (
        <section className="bg-white relative overflow-hidden py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* FAQ Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm font-heading"
                    >
                        FAQ
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black text-dark-deepest font-heading leading-tight mb-8"
                    >
                        Questions? <span className="bg-gradient-to-r from-orange to-dark-deepest bg-clip-text text-transparent">Answered.</span>
                    </motion.h2>
                </div>

                {/* FAQ Items */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-dark-deepest/5 mb-24">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-dark-deepest rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden"
                >
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 font-heading">
                            Not Sure Which Tier?
                        </h3>
                        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            That&apos;s exactly what the strategy call is for. We&apos;ll look at your budget, goals, and market — then recommend the right starting point.
                        </p>

                        <CreativeButton
                            onClick={() => openModal('Pricing Tier Strategy Call')}
                            variant="shimmer"
                            className="px-8 py-5 rounded-full text-lg w-full md:w-auto shadow-[0_20px_40px_-10px_rgba(254,119,0,0.3)] transition-all"
                        >
                            Let&apos;s Figure It Out Together
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </CreativeButton>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
