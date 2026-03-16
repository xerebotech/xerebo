'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Settings, Rocket, ShieldCheck, ArrowRight, Clock, Sparkles } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

const steps = [
  {
    phase: "Day 1–3",
    title: "Kickoff & Access",
    description: "You meet your dedicated Account Manager. We collect brand assets, platform access, and CRM credentials. You get a shared project board so you see every task in real time.",
    tag: "No setup fees",
    icon: Users,
  },
  {
    phase: "Day 4–14",
    title: "Audit, Strategy & Build",
    description: "Full brand audit, competitor analysis, keyword research. We define 'qualified lead' together and document it in the contract. CRM built or integrated. Campaign architecture created.",
    tag: "Full infrastructure",
    icon: Settings,
  },
  {
    phase: "Day 15–30",
    title: "Launch & First Leads",
    description: "Landing pages live. Tracking installed. Campaigns go live across all channels. First high-intent leads start appearing in your CRM. You get your first strategy call with real data.",
    tag: "First leads",
    icon: Rocket,
  },
  {
    phase: "Day 30–90",
    title: "Optimize & Prove",
    description: "Continuous optimization based on live data. Your tier runs at a fixed monthly rate. At day 90, we review CRM data together — if we didn't deliver pipeline-ready prospects, the contract ends. No lock-in.",
    tag: "90-day guarantee",
    icon: ShieldCheck,
  }
];

export default function HowItWorks() {
  const { openModal } = useContactModal();

  return (
    <section className="relative px-4 sm:px-6 py-24 md:py-32 bg-light overflow-hidden font-sans">

      {/* Abstract Background Art */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-dark-deepest/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Stylish Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
          >
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
            Performance Roadmap
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark-deepest mb-8 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] text-balance">
            Zero to <span className="bg-gradient-to-r from-orange to-dark-deepest bg-clip-text text-transparent">Qualified Leads</span><br />
            in 30 Days.
          </h2>

          <p className="text-xl text-dark-deepest/50 leading-relaxed max-w-2xl mx-auto font-medium">
            A high-velocity timeline designed for UAE businesses that demand
            transparency over fluff and revenue over reports.
          </p>
        </div>

        {/* Roadmap Visualization */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col ${index % 2 === 0 ? '' : 'lg:mt-8'} group/card`}
              >
                <div className={`flex flex-col`}>
                  <div className="bg-white p-8 rounded-3xl border border-dark-deepest/[0.03] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_-20px_rgba(254,119,0,0.12)] hover:border-orange/20 transition-all duration-500 relative overflow-hidden">

                    {/* Background Shine Effect */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange/5 rounded-full blur-3xl group-hover/card:bg-orange/10 transition-colors" />

                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 rounded-2xl bg-orange/5 text-orange group-hover/card:bg-orange group-hover/card:text-white transition-all duration-500">
                        <step.icon size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-dark-deepest/20">{step.phase}</span>
                    </div>

                    <h3 className="text-xl font-black text-dark-deepest mb-4 group-hover/card:text-orange transition-colors uppercase tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-sm text-dark-deepest/50 leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-green-600 bg-green-500/5 w-fit px-3 py-1 rounded-full border border-green-500/10">
                      <Sparkles size={10} />
                      {step.tag}
                    </div>
                  </div>
                </div>

                {/* Connecting Bar for Mobile */}
                <div className="lg:hidden w-px h-12 bg-orange/20 mx-auto my-4" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* High-End Bottom CTA Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 relative"
        >
          <div className="absolute inset-0 bg-orange/10 blur-[100px] rounded-full" />
          <div className="relative bg-dark-deepest rounded-[3rem] p-8 md:p-16 overflow-hidden">

            {/* Decorative Grid for the CTA */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                  After 90 days?
                </h3>
                <p className="text-white/40 text-lg">
                  Your fee becomes 20% of ad budget or tier fee — whichever is higher. We only earn more when you invest more.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <CreativeButton
                  onClick={openModal}
                  variant="shimmer"
                  className="px-8 py-4 text-base md:text-lg shadow-[0_20px_50px_rgba(254,119,0,0.3)] hover:scale-105 transition-transform"
                >
                  See Full Pricing
                </CreativeButton>
                <div className="flex items-center gap-2 text-orange text-[10px] font-black uppercase tracking-widest opacity-60">
                  <Clock size={12} />
                  Current Lead Time: 4-6 Days
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}