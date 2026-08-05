'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type Item = {
  title: string;
  body: string;
  visual: { label: string; value: string; tone: string }[];
};

const ITEMS: Item[] = [
  {
    title: 'One data layer',
    body:
      'Crawl data, rank movement, backlinks, analytics and CRM sit in a single model. Every recommendation traces back to a number you can open, not a slide you have to trust.',
    visual: [
      { label: 'Pages crawled', value: '48,210', tone: 'bg-tint-amber' },
      { label: 'Keywords tracked', value: '12,940', tone: 'bg-tint-sky' },
      { label: 'Referring domains', value: '3,118', tone: 'bg-tint-mint' },
      { label: 'Leads attributed', value: '862', tone: 'bg-tint-violet' },
    ],
  },
  {
    title: 'Services and software in one loop',
    body:
      'Our strategists work inside the same platform we sell. What the team learns on a client programme becomes a feature, and what ships as a feature makes the next programme faster.',
    visual: [
      { label: 'Audit findings', value: 'auto-triaged', tone: 'bg-tint-sky' },
      { label: 'Fix tickets', value: 'pushed to dev', tone: 'bg-tint-amber' },
      { label: 'Content briefs', value: 'generated', tone: 'bg-tint-mint' },
      { label: 'Reporting', value: 'always live', tone: 'bg-tint-sand' },
    ],
  },
  {
    title: 'Built for AI search, not just blue links',
    body:
      'Rankings are only half the surface now. We track how your brand is cited inside AI answers and assistants, then structure entities, schema and content so the citation keeps happening.',
    visual: [
      { label: 'AI answer mentions', value: '+218%', tone: 'bg-tint-violet' },
      { label: 'Entity coverage', value: '94%', tone: 'bg-tint-mint' },
      { label: 'Schema health', value: 'passing', tone: 'bg-tint-sky' },
      { label: 'Share of voice', value: '31%', tone: 'bg-tint-amber' },
    ],
  },
  {
    title: 'Governance your finance team accepts',
    body:
      'Scoped access, audit trails, documented deliverables and cost caps per workstream. You always know what was done, by whom, and what it returned.',
    visual: [
      { label: 'Access scopes', value: 'per role', tone: 'bg-tint-sand' },
      { label: 'Change log', value: 'complete', tone: 'bg-tint-sky' },
      { label: 'Spend caps', value: 'enforced', tone: 'bg-tint-amber' },
      { label: 'Exports', value: 'CSV / API', tone: 'bg-tint-mint' },
    ],
  },
];

export default function Capabilities() {
  const [open, setOpen] = useState(0);
  const active = ITEMS[open];

  return (
    <section className="section-y bg-white">
      <div className="shell">
        <h2 className="display-2 max-w-2xl text-ink text-balance">
          Search that works the way your <span className="text-orange">business</span> works
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual panel */}
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-ink p-8 lg:min-h-[520px]">
            <div
              className="absolute inset-0 opacity-[0.28]"
              style={{
                backgroundImage: 'radial-gradient(var(--warm-gray-500) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />

            <div className="relative">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-warm-gray-500">
                Xerebo growth graph
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="mt-6 grid gap-3 sm:grid-cols-2"
                >
                  {active.visual.map((v) => (
                    <div key={v.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <span className={`mb-4 flex h-8 w-8 items-center justify-center rounded-full ${v.tone}`}>
                        <span className="h-2.5 w-2.5 rounded-full bg-ink" />
                      </span>
                      <p className="font-heading text-2xl font-semibold text-white">{v.value}</p>
                      <p className="mt-1 text-sm text-warm-gray-300">{v.label}</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between text-sm text-warm-gray-300">
                  <span>Programme health</span>
                  <span className="text-orange">On track</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    key={active.title}
                    initial={{ width: '18%' }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="h-full rounded-full bg-orange"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="flex flex-col justify-center">
            {ITEMS.map((item, i) => (
              <div key={item.title} className="border-b border-[color:var(--hairline)] first:border-t">
                <button
                  onClick={() => setOpen(i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`display-3 ${open === i ? 'text-ink' : 'text-ink-muted'} transition-colors`}>
                    {item.title}
                  </span>
                  <ChevronDown
                    size={22}
                    className={`shrink-0 text-ink-muted transition-transform ${open === i ? 'rotate-180 text-orange' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-10 text-[1.05rem] leading-relaxed text-ink-muted">{item.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
