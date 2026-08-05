'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CARDS = [
  {
    title: 'Take the XEO tour',
    sub: 'See the platform on a live domain',
    href: 'https://xeo.xerebo.com',
    external: true,
  },
  { title: 'Read the case studies', sub: 'Programmes, numbers and timelines', href: '/results' },
  { title: 'Pick an engagement', sub: 'Retainers, sprints and builds', href: '/packages' },
];

export default function GetStarted() {
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="shell">
        <div className="rounded-[2rem] bg-surface-alt p-8 md:p-14 lg:p-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="display-2 text-ink text-balance">Start where it hurts most</h2>
              <p className="lede mt-5 max-w-md">
                Tour the platform, read how similar teams got out of the same hole, or scope an engagement with a
                strategist this week.
              </p>
            </div>

            <div className="space-y-4">
              {CARDS.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-6 rounded-2xl bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(26,23,23,0.5)] md:p-8"
                >
                  <span>
                    <span className="block font-heading text-xl font-semibold tracking-tight text-ink md:text-2xl">
                      {card.title}
                    </span>
                    <span className="mt-1 block text-[0.95rem] text-ink-muted">{card.sub}</span>
                  </span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-all group-hover:bg-orange">
                    <ArrowRight size={20} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
