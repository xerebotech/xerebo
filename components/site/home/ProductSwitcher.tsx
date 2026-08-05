'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Bot, Code2, Layers, Search, Share2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Panel = {
  id: string;
  tab: string;
  arm: 'Services' | 'Products';
  icon: LucideIcon;
  badge?: string;
  headline: string;
  body: string;
  href: string;
  external?: boolean;
  rows: { label: string; value: string; state: 'live' | 'progress' | 'planned' }[];
};

const PANELS: Panel[] = [
  {
    id: 'seo',
    tab: 'SEO',
    arm: 'Services',
    icon: Search,
    headline: 'Search engine optimisation',
    body: 'A senior strategist, a technical lead and a content team working one roadmap. Audits get fixed, not filed.',
    href: '/services/seo',
    rows: [
      { label: 'Technical audit and fix queue', value: 'Week 1–3', state: 'live' },
      { label: 'Topical map and content plan', value: 'Week 2–5', state: 'live' },
      { label: 'Digital PR and link acquisition', value: 'Month 2+', state: 'progress' },
      { label: 'AI answer visibility tuning', value: 'Month 2+', state: 'progress' },
    ],
  },
  {
    id: 'web',
    tab: 'Web development',
    arm: 'Services',
    icon: Code2,
    headline: 'Web development',
    body: 'Next.js builds with the SEO baked in from the first commit: fast, crawlable, measurable, easy to edit.',
    href: '/services/web-development',
    rows: [
      { label: 'Design system and component library', value: 'Sprint 1', state: 'live' },
      { label: 'Build on Next.js App Router', value: 'Sprint 2–4', state: 'live' },
      { label: 'Migration with redirect mapping', value: 'Launch', state: 'progress' },
      { label: 'Analytics, CRO and handover', value: 'Post-launch', state: 'planned' },
    ],
  },
  {
    id: 'xeo',
    tab: 'XEO',
    arm: 'Products',
    icon: Bot,
    headline: 'XEO',
    body: 'Our SEO intelligence platform. Crawl, track, monitor AI citations and report, without stitching five tools together.',
    href: 'https://xeo.xerebo.com',
    external: true,
    rows: [
      { label: 'Site audit engine', value: 'Available', state: 'live' },
      { label: 'Rank and SERP tracking', value: 'Available', state: 'live' },
      { label: 'AI visibility monitor', value: 'Available', state: 'live' },
      { label: 'Client reporting workspace', value: 'Available', state: 'live' },
    ],
  },
  {
    id: 'xpace',
    tab: 'Xpace',
    arm: 'Products',
    icon: Layers,
    badge: 'Coming soon',
    headline: 'Xpace',
    body: 'The ERP for service businesses. Projects, resourcing, invoicing and margin in one place instead of four spreadsheets.',
    href: '/products/xpace',
    rows: [
      { label: 'Project and task management', value: 'In build', state: 'progress' },
      { label: 'Resourcing and timesheets', value: 'In build', state: 'progress' },
      { label: 'Quotes, invoices and payments', value: 'Planned', state: 'planned' },
      { label: 'Margin and profitability view', value: 'Planned', state: 'planned' },
    ],
  },
  {
    id: 'xocials',
    tab: 'Xocials',
    arm: 'Products',
    icon: Share2,
    badge: 'Coming soon',
    headline: 'Xocials',
    body: 'Social publishing and listening that reports into the same growth graph as your search and web performance.',
    href: '/products/xocials',
    rows: [
      { label: 'Multi-channel scheduling', value: 'In build', state: 'progress' },
      { label: 'Approvals and brand controls', value: 'In build', state: 'progress' },
      { label: 'Social listening', value: 'Planned', state: 'planned' },
      { label: 'Unified performance reporting', value: 'Planned', state: 'planned' },
    ],
  },
];

const STATE_STYLE: Record<Panel['rows'][number]['state'], string> = {
  live: 'bg-orange text-white',
  progress: 'bg-white/12 text-white',
  planned: 'bg-white/[0.06] text-warm-gray-300',
};

export default function ProductSwitcher() {
  const [active, setActive] = useState(PANELS[0].id);
  const panel = PANELS.find((p) => p.id === active)!;

  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="shell">
        <h2 className="display-2 max-w-3xl text-white text-balance">
          Two arms of Xerebo, <span className="text-orange">one operating system</span>
        </h2>

        {/* Pill tab bar */}
        <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
          {PANELS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              aria-pressed={active === p.id}
              className={`shrink-0 rounded-full px-5 py-3 text-[0.95rem] font-semibold transition-colors ${
                active === p.id
                  ? 'bg-orange-light text-ink'
                  : 'bg-white/[0.06] text-warm-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {p.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
          >
            <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-light">
                    <panel.icon size={26} className="text-ink" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-warm-gray-500">
                      {panel.arm}
                    </p>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-2xl font-semibold tracking-tight text-white">{panel.headline}</h3>
                      {panel.badge && (
                        <span className="rounded-full bg-orange/20 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-orange">
                          {panel.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-warm-gray-300">{panel.body}</p>

                <Link
                  href={panel.href}
                  target={panel.external ? '_blank' : undefined}
                  rel={panel.external ? 'noopener noreferrer' : undefined}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[0.95rem] font-semibold text-ink transition-transform hover:-translate-y-px"
                >
                  {panel.external ? 'Open XEO' : 'Learn more'}
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-ink-soft/70 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-2 text-sm text-warm-gray-500">{panel.headline} · delivery view</span>
                </div>

                <ul className="divide-y divide-white/10">
                  {panel.rows.map((row) => (
                    <li key={row.label} className="flex items-center justify-between gap-4 py-4">
                      <span className="text-[0.95rem] text-white">{row.label}</span>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-[0.72rem] font-semibold ${STATE_STYLE[row.state]}`}
                      >
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
