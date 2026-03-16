'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function CaseStudy() {
  return (
    <section id="results" className="px-6 py-20 md:py-28 bg-dark-deepest text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
          >
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
            Case Study
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] text-balance">
            Real Results, <span className="bg-gradient-to-r from-orange to-white bg-clip-text text-transparent">Real Growth</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            How we helped a Dubai-based recruitment firm grow from startup to 8-figure revenue in under 3 years.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-dark to-dark-deepest rounded-3xl p-8 md:p-12 border border-warmGray-500/20"
        >
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Recruitment Industry Client</h3>
              <p className="text-gray-400">Dubai, UAE • B2B Services</p>
            </div>
            <div className="px-4 py-2 bg-orange/10 border border-orange rounded-full">
              <span className="text-orange font-semibold">Flagship Client</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="bg-dark-deepest/50 rounded-2xl p-6 border border-warmGray-500/10">
              <TrendingUp className="w-8 h-8 text-orange mb-4" />
              <div className="text-4xl font-bold text-orange mb-2">1,050%</div>
              <div className="text-gray-400 text-sm">Revenue Growth</div>
            </div>

            <div className="bg-dark-deepest/50 rounded-2xl p-6 border border-warmGray-500/10">
              <Users className="w-8 h-8 text-orange mb-4" />
              <div className="text-4xl font-bold text-orange mb-2">412%</div>
              <div className="text-gray-400 text-sm">Lead Volume Increase</div>
            </div>

            <div className="bg-dark-deepest/50 rounded-2xl p-6 border border-warmGray-500/10">
              <DollarSign className="w-8 h-8 text-orange mb-4" />
              <div className="text-4xl font-bold text-orange mb-2">$8.2M</div>
              <div className="text-gray-400 text-sm">Annual Ad Spend Managed</div>
            </div>
          </div>

          <div className="border-t border-warmGray-500/20 pt-8">
            <h4 className="text-xl font-bold mb-6">What We Did</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Built Custom CRM & Automation</h5>
                  <p className="text-gray-400 text-sm">Replaced 4 disconnected tools with one unified system. Automated lead tracking, nurturing, and reporting.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Multi-Channel Performance Marketing</h5>
                  <p className="text-gray-400 text-sm">Scaled Google Ads, LinkedIn, and Meta campaigns from $5k/month to $680k/month profitably.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <h5 className="font-semibold mb-2">SEO & Content Strategy</h5>
                  <p className="text-gray-400 text-sm">Dominated organic search for high-value keywords. Now generating 2,400+ qualified leads per month.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Real-Time Analytics Dashboard</h5>
                  <p className="text-gray-400 text-sm">Full visibility into marketing performance, pipeline health, and revenue attribution.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
