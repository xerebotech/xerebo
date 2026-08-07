'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const STATS = [
  { value: '120+', label: 'Growth programmes delivered since 2019' },
  { value: '3.4x', label: 'Median organic pipeline lift in 12 months' },
  { value: '48h', label: 'Turnaround on a scoped proposal' },
];

export default function Recognition() {
  return (
    <section className="section-y bg-white">
      <div className="shell">
        <h2 className="display-2 max-w-2xl text-ink text-balance">
          Judged on <span className="text-orange">outcomes</span>, not impressions
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.value} className="rounded-3xl border border-[color:var(--hairline)] p-8">
              <p className="font-heading text-5xl font-semibold tracking-tight text-ink">{s.value}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-8 rounded-3xl bg-orange-light p-8 md:p-10">
            <p className="display-3 text-ink text-balance">
              A Dubai growth partner rated 4.9 out of 5 across client reviews
            </p>
            <Link href="/results" className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
              Read the reviews
              <ArrowRight size={16} className="text-orange" />
            </Link>
          </div>

          <div className="flex flex-col justify-between gap-8 rounded-3xl bg-surface-alt p-8 md:p-10">
            <p className="display-3 text-ink text-balance">
              Building software and running programmes on the same stack since 2019
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
              About Xerebo
              <ArrowRight size={16} className="text-orange" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
