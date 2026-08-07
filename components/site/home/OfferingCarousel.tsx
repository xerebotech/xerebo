'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BarChart3, Bot, Code2, Layers, Search, Share2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ButtonLink } from '@/components/site/Button';

type Card = {
  name: string;
  kind: 'Service' | 'Product';
  icon: LucideIcon;
  tone: string;
  body: string;
  chips: string[];
  href: string;
  external?: boolean;
  badge?: string;
};

const CARDS: Card[] = [
  {
    name: 'Search engine optimisation',
    kind: 'Service',
    icon: Search,
    tone: 'bg-tint-amber',
    body: 'Technical fixes, topical authority and digital PR run as one programme against a single revenue target.',
    chips: ['Technical audit', 'Topic clusters', 'Digital PR', 'Local SEO'],
    href: '/services/seo',
  },
  {
    name: 'Web development',
    kind: 'Service',
    icon: Code2,
    tone: 'bg-tint-sky',
    body: 'Next.js sites, storefronts and internal tools built to load fast, rank well and convert without a rebuild.',
    chips: ['Next.js', 'Headless CMS', 'Ecommerce', 'Migrations'],
    href: '/services/web-development',
  },
  {
    name: 'XEO',
    kind: 'Product',
    icon: Bot,
    tone: 'bg-tint-violet',
    body: 'The platform our own strategists run on: crawling, rank tracking, AI visibility and reporting in one place.',
    chips: ['Site audits', 'Rank tracking', 'AI visibility', 'Reporting'],
    href: 'https://xeo.xerebo.com',
    external: true,
  },
  {
    name: 'Xpace',
    kind: 'Product',
    icon: Layers,
    tone: 'bg-tint-mint',
    body: 'An ERP shaped around how service businesses actually run: projects, people, invoices and margin in one view.',
    chips: ['Projects', 'Invoicing', 'Resourcing', 'Margin'],
    href: '/products/xpace',
    badge: 'Coming soon',
  },
  {
    name: 'Xocials',
    kind: 'Product',
    icon: Share2,
    tone: 'bg-tint-sand',
    body: 'Plan, publish and measure social across every channel, with the same reporting spine as the rest of the stack.',
    chips: ['Scheduling', 'Listening', 'Approvals', 'Analytics'],
    href: '/products/xocials',
    badge: 'Coming soon',
  },
  {
    name: 'Analytics and CRO',
    kind: 'Service',
    icon: BarChart3,
    tone: 'bg-tint-sky',
    body: 'Clean tracking, honest attribution and a testing programme that keeps improving what the traffic does next.',
    chips: ['GA4 and GTM', 'Attribution', 'A/B testing', 'Dashboards'],
    href: '/services/web-development#analytics',
  },
];

export default function OfferingCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="section-y bg-white">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display-2 text-ink text-balance">
              Everything we build, <span className="text-orange">in one stack</span>
            </h2>
            <p className="lede mt-5">
              Start with a service when you need people on the problem. Move to a product when you need the work to keep
              running without them.
            </p>
            <ButtonLink href="/packages" variant="secondary" className="mt-7">
              Compare engagements
            </ButtonLink>
          </div>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <button
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--hairline)] text-ink transition-colors disabled:opacity-35 enabled:hover:bg-ink enabled:hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-transform disabled:opacity-35 enabled:hover:scale-105"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          onScroll={onScroll}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {CARDS.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noopener noreferrer' : undefined}
              className="group flex w-[290px] shrink-0 snap-start flex-col rounded-3xl border border-[color:var(--hairline)] bg-white p-7 transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-[0_24px_44px_-30px_rgba(26,23,23,0.55)] sm:w-[330px]"
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-full ${card.tone}`}>
                <card.icon size={24} className="text-ink" strokeWidth={1.8} />
              </span>

              <div className="mt-6 flex items-center gap-2">
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">{card.kind}</span>
                {card.badge && (
                  <span className="rounded-full bg-orange/12 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-orange-deep">
                    {card.badge}
                  </span>
                )}
              </div>

              <h3 className="mt-2 font-heading text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                {card.name}
              </h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-muted">{card.body}</p>

              <div className="mt-6 border-t border-[color:var(--hairline)] pt-5">
                <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">Includes</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.chips.map((chip) => (
                    <span key={chip} className="rounded-md bg-surface-alt px-2 py-1 text-[0.7rem] font-medium text-ink">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-ink">
                Learn more
                <ArrowRight size={15} className="text-orange transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
