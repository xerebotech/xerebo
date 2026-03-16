'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Zap, Clock, ArrowUpRight, Activity, Users, Target } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

const BOTTOM_STATS = [
  { value: '127', label: 'Sales-Ready Leads (Tech/Grovoz)' },
  { value: 'AED 8M+', label: 'Ad Budget Managed' },
  { value: '4.2x', label: 'Average Client ROAS' },
  { value: '50+', label: 'Qualified Consultations (Prof. Services)' },
];

const BAR_DATA = [28, 42, 33, 58, 44, 62, 48, 71, 66, 88, 82, 100];
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const CHANNEL_ROWS = [
  { label: 'Paid Search', value: 89, color: 'bg-orange' },
  { label: 'Meta Ads', value: 74, color: 'bg-orange/70' },
  { label: 'SEO', value: 61, color: 'bg-orange/50' },
  { label: 'Email', value: 43, color: 'bg-orange/30' },
];

export default function Hero() {
  const { openModal } = useContactModal();

  return (
    <section className="relative min-h-screen flex flex-col pt-40 pb-16 md:pt-40 md:pb-24 bg-[#FFF4E6] overflow-hidden text-dark-deepest font-sans font-heading">

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex-grow flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 lg:items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-[1.1] md:leading-[1] mb-8 font-heading tracking-tighter text-balance">
              Dubai's Lead Generation Agency   That         {' '}
              <span className="relative inline-block text-orange">
                <span className="relative z-10">Guarantees </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-orange/20 -rotate-1 origin-left z-0"
                />
              </span>{' '}
              Results
            </h1>



            <p className="text-base md:text-lg text-dark/70 leading-relaxed mb-8 max-w-lg font-medium">
              Xerebo Technologies is a full-service digital marketing agency in Dubai. Our flagship system — The Lead Engine — replaces fragmented agencies with one unified platform that delivers sales-ready leads to your CRM. Built for real estate, healthcare, e-commerce, and professional services across the UAE.


            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 mb-10 w-fit"
            >
              <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
              <p className="text-xs font-bold text-green-700">
                90-Day Prove-It Guarantee — <span className="text-green-600/60 uppercase tracking-tight font-black">if we don't deliver, the contract ends. No lock-in.</span>
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 w-full">
              <CreativeButton
                onClick={() => openModal('Hero CTA: Strategy Call')}
                variant="shimmer"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg shadow-[0_20px_50px_rgba(254,119,0,0.2)]"
              >
                Book a Free Strategy Call
              </CreativeButton>
              <CreativeButton
                href="#pricing"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg border-dark/10 text-dark hover:bg-dark/5"
              >
                See How it Works
              </CreativeButton>
            </div>

          </motion.div>

          {/* RIGHT — DASHBOARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative scale-[0.8] xs:scale-90 sm:scale-100 origin-center lg:origin-right mt-12 lg:mt-0"
          >
            {/* Outer glow */}
            <div className="absolute -inset-6 bg-orange/10 blur-[60px] rounded-full pointer-events-none" />

            {/* Main dashboard card */}
            <div className="relative rounded-[2rem] overflow-hidden border border-white bg-white/60 backdrop-blur-xl shadow-[0_40px_80px_rgba(0,0,0,0.08)]">

              {/* Glass reflection strip */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-dark/[0.05]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-dark/30">Lead Engine Dashboard</span>
                </div>
                <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-600">Live Status</span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4">

                {/* KPI Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { icon: <Target size={12} />, val: '247', label: 'LEADS', delta: '+18%' },
                    { icon: <Activity size={12} />, val: '12%', label: 'CONV.', delta: '+3.2%' },
                    { icon: <TrendingUp size={12} />, val: '4.2x', label: 'ROAS', delta: '+42%' },
                  ].map((kpi, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="relative bg-white/40 border border-white rounded-2xl p-3 sm:p-4 overflow-hidden group hover:shadow-lg transition-all duration-500 cursor-default"
                    >
                      <div className="flex items-center gap-1.5 text-dark/20 mb-2 sm:mb-3 group-hover:text-orange/40 transition-colors">
                        {kpi.icon}
                        <span className="text-[7px] sm:text-[8px] font-black tracking-widest leading-none">{kpi.label}</span>
                      </div>
                      <p className="text-xl sm:text-2xl font-black text-dark-deepest mb-1 group-hover:text-orange transition-colors">{kpi.val}</p>
                      <div className="flex items-center gap-1 text-green-600 text-[8px] sm:text-[9px] font-black">
                        <ArrowUpRight size={9} strokeWidth={3} />
                        {kpi.delta}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart */}
                <div className="bg-white/40 border border-white rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all duration-500">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Zap size={12} className="text-orange fill-orange" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-dark/30">Growth Stream</span>
                    </div>
                    <span className="hidden xs:inline-block text-[8px] font-black text-green-600 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full uppercase">↑ 247% YoY</span>
                  </div>
                  <div className="flex items-end gap-1 h-20 sm:h-24">
                    {BAR_DATA.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.8 + i * 0.05, duration: 0.6, ease: 'easeOut' }}
                          className="w-full origin-bottom"
                          style={{ height: `${h}%` }}
                        >
                          <div
                            className={`w-full h-full rounded-t-[4px] transition-all duration-500 ${i >= 9
                              ? 'bg-orange shadow-[0_0_15px_rgba(254,119,0,0.3)]'
                              : i >= 6
                                ? 'bg-dark/15'
                                : 'bg-dark/5'
                              }`}
                          />
                        </motion.div>
                        <span className="text-[7px] text-dark/20 font-black">{MONTHS[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Channel Performance */}
                <div className="bg-white/40 border border-white rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={12} className="text-dark/20" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-dark/30">Efficiency</span>
                  </div>
                  <div className="space-y-3">
                    {CHANNEL_ROWS.map((ch, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-[8px] sm:text-[9px] font-black text-dark/40 w-16 sm:w-20 flex-shrink-0">{ch.label}</span>
                        <div className="flex-1 h-1.5 bg-dark/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${ch.value}%` }}
                            transition={{ delay: 1.3 + i * 0.08, duration: 1, ease: "circOut" }}
                            className={`h-full rounded-full ${ch.color}`}
                          />
                        </div>
                        <span className="text-[8px] sm:text-[9px] font-black text-dark/40 w-6 text-right">{ch.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Notification — top right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
              transition={{
                opacity: { delay: 2, duration: 0.4 },
                x: { delay: 2, duration: 0.4 },
                y: { delay: 2.5, duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="absolute -right-4 sm:-right-10 top-2 lg:top-14 bg-dark-deepest border border-white/10 rounded-2xl px-3 sm:px-5 py-3 sm:py-4 shadow-2xl flex items-center gap-3 sm:gap-4 z-20 scale-[0.65] xs:scale-75 sm:scale-100"
            >
              <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-orange/20 border border-orange/30 flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-orange" />
              </div>
              <div className="pr-2 sm:pr-4">
                <p className="text-[9px] sm:text-[10px] font-black text-white leading-none mb-1 uppercase tracking-widest">New Lead</p>
                <p className="text-[8px] sm:text-[9px] text-white/40 font-bold leading-none uppercase tracking-tighter">Qualified</p>
              </div>
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Revenue badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="absolute -left-4 sm:-left-12 -bottom-6 sm:bottom-24 bg-white border border-dark/[0.05] rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-xl z-20 hover:-rotate-2 transition-transform duration-500 cursor-default scale-[0.65] xs:scale-75 sm:scale-100"
            >
              <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-dark/30 mb-1 sm:mb-2 leading-none">Monthly Rev</p>
              <p className="text-xl sm:text-2xl font-black text-orange leading-none tracking-tight">AED 847,000</p>
              <p className="text-[8px] sm:text-[9px] text-green-600 font-bold mt-1.5 sm:mt-2 flex items-center gap-1.5">
                <ArrowUpRight size={10} strokeWidth={3} /> <span className="uppercase tracking-widest whitespace-nowrap">+34% Growth Velocity</span>
              </p>
            </motion.div>
          </motion.div>

        </div>

        {/* BOTTOM STATS */}
        <div className="mt-auto pt-12 md:pt-20 border-t border-dark/[0.06]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {BOTTOM_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-center md:text-left group cursor-default"
              >
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-orange mb-2 group-hover:text-dark-deepest transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  {stat.value}
                </p>
                <div className="flex flex-col">
                  <p className="text-[10px] sm:text-[11px] text-dark/30 uppercase tracking-[0.2em] sm:tracking-[0.25em] font-black leading-tight max-w-[140px] sm:max-w-[160px] mx-auto md:mx-0">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
