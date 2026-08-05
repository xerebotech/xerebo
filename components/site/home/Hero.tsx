'use client';

import { motion } from 'framer-motion';
import { BarChart3, Bot, Code2, Search, Sparkles } from 'lucide-react';
import { ButtonLink, Button } from '@/components/site/Button';
import ReactiveLines from '@/components/site/hero/ReactiveLines';
import { useContactModal } from '@/context/ContactModalContext';

const NODES = [
  { label: 'Keyword clusters mapped', icon: Search, x: 'left-[2%] top-[8%]', tint: 'bg-tint-amber' },
  { label: 'Site rebuilt in Next.js', icon: Code2, x: 'left-[4%] bottom-[10%]', tint: 'bg-tint-sky' },
  { label: 'AI answer visibility', icon: Bot, x: 'right-[3%] top-[14%]', tint: 'bg-tint-violet' },
  { label: 'Pipeline up 3.4x', icon: BarChart3, x: 'right-[5%] bottom-[14%]', tint: 'bg-tint-mint' },
];

export default function Hero() {
  const { openModal } = useContactModal();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Pointer-reactive line field — the hero background */}
      <ReactiveLines className="pointer-events-none" />

      {/* Scrim so the headline keeps its contrast over the line field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 44% at 50% 46%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.6) 48%, rgba(255,255,255,0) 74%)',
        }}
      />

      {/* Floating context chips */}
      {NODES.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
          className={`absolute ${node.x} hidden items-center gap-2.5 rounded-2xl border border-[color:var(--hairline)] bg-white px-4 py-3 shadow-[0_12px_28px_-18px_rgba(26,23,23,0.5)] xl:flex`}
        >
          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${node.tint}`}>
            <node.icon size={16} className="text-ink" />
          </span>
          <span className="text-sm font-medium text-ink">{node.label}</span>
        </motion.div>
      ))}

      <div className="shell relative z-10 flex flex-col items-center py-20 text-center md:py-28 lg:py-36">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[color:var(--hairline)] bg-white px-4 py-1.5 text-[0.8rem] font-semibold text-ink"
        >
          <Sparkles size={14} className="text-orange" />
          XEO is live · Xpace and Xocials in build
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="display-1 max-w-5xl text-ink text-balance"
        >
          The growth stack for <span className="text-orange">search-first</span> companies
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lede mt-6 max-w-2xl"
        >
          Two arms, one team. Services that execute your SEO and web build, products that keep the work running long
          after the project ships.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button onClick={() => openModal('Hero: Get started')} size="lg" className="w-full sm:w-auto">
            Get started
          </Button>
          <ButtonLink href="/results" variant="secondary" size="lg" className="w-full sm:w-auto">
            See the work
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
