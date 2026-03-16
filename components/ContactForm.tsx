'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import ContactFormFields from '@/components/ContactFormFields';

export default function ContactForm() {
  return (
    <section id="contact" className="px-6 pt-12 md:pt-20 pb-0 bg-dark-deepest text-white relative overflow-hidden">
      {/* Background Accents */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Row 1: Audit Benefits & Form */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
              Contact Us
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter font-heading leading-[0.9]">
              Let's Build <br />
              <span className="bg-gradient-to-r from-orange to-white bg-clip-text text-transparent">Your Engine.</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/50 font-medium leading-relaxed max-w-xl mb-12">
              Book a free 30-minute digital marketing strategy call. No pitch deck, no pressure. Just an honest conversation about your business and whether The Lead Engine is the right fit.
            </p>

            <div className="mb-6 text-white/50 font-medium uppercase tracking-widest text-sm font-heading">What happens on the call:</div>
            <div className="space-y-6 mb-12">
              {[
                { step: "1", text: "We ask about your business, audience, and current marketing" },
                { step: "2", text: "We identify which tier fits your goals and budget" },
                { step: "3", text: "We walk through the 90-day plan specific to your industry" },
                { step: "4", text: "You decide — no same-day pressure, no follow-up spam" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-orange font-bold font-mono">
                    {item.step}
                  </div>
                  <span className="text-white/70 text-lg font-medium pt-1 leading-snug">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-2 font-bold font-heading">Email</h4>
                <a href="mailto:Hello@xerebo.com" className="text-white hover:text-orange transition-colors font-medium">Hello@xerebo.com</a>
              </div>
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-2 font-bold font-heading">Phone</h4>
                <a href="tel:+971501722314" className="text-white hover:text-orange transition-colors font-medium">+971 50 172 2314</a>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-2 font-bold font-heading">Office</h4>
                <p className="text-white/80 font-medium leading-relaxed">905, Capital Golden Tower<br />Business Bay, Dubai, UAE</p>
              </div>
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-2 font-bold font-heading">WhatsApp</h4>
                <a href="https://wa.me/971501722314" className="text-white hover:text-orange transition-colors font-medium">Message us directly</a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-full bg-white/5 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl relative">
              <ContactFormFields />
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
