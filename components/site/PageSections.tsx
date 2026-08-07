'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import Icon, { type IconName } from '@/components/site/Icon';
import { Button, ButtonLink } from '@/components/site/Button';
import { useContactModal } from '@/context/ContactModalContext';

/* ---------------------------------------------------------------- Page hero */

export function PageHero({
  eyebrow,
  title,
  accent,
  body,
  primaryLabel = 'Get started',
  secondary,
  badge,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
  primaryLabel?: string;
  secondary?: { label: string; href: string };
  badge?: string;
}) {
  const { openModal } = useContactModal();

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--hairline)] bg-white">
      <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-orange-light blur-[90px]" />

      <div className="shell relative py-20 md:py-28">
        <div className="flex items-center gap-3">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-muted">{eyebrow}</p>
          {badge && (
            <span className="rounded-full bg-orange/12 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-orange-deep">
              {badge}
            </span>
          )}
        </div>

        <h1 className="display-1 mt-5 max-w-4xl text-ink text-balance">
          {title} {accent && <span className="text-orange">{accent}</span>}
        </h1>
        <p className="lede mt-6 max-w-2xl">{body}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => openModal(`${eyebrow} hero: ${primaryLabel}`)} size="lg">
            {primaryLabel}
          </Button>
          {secondary && (
            <ButtonLink href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Feature grid */

export type Feature = { icon: IconName; title: string; body: string; tone?: string };

export function FeatureGrid({
  id,
  heading,
  accent,
  intro,
  features,
}: {
  id?: string;
  heading: string;
  accent?: string;
  intro?: string;
  features: Feature[];
}) {
  return (
    <section id={id} className="section-y bg-white">
      <div className="shell">
        <h2 className="display-2 max-w-2xl text-ink text-balance">
          {heading} {accent && <span className="text-orange">{accent}</span>}
        </h2>
        {intro && <p className="lede mt-5 max-w-2xl">{intro}</p>}

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-[color:var(--hairline)] p-7 transition-colors hover:border-orange/40"
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-full ${f.tone ?? 'bg-tint-amber'}`}>
                <Icon name={f.icon} size={22} className="text-ink" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight text-ink">{f.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Split block */

export function SplitBlock({
  id,
  eyebrow,
  heading,
  accent,
  body,
  bullets,
  cta,
  reverse,
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  accent?: string;
  body: string;
  bullets: string[];
  cta?: { label: string; href: string };
  reverse?: boolean;
}) {
  return (
    <section id={id} className="section-y bg-surface-alt">
      <div className="shell">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-muted">{eyebrow}</p>
            <h2 className="display-2 mt-4 text-ink text-balance">
              {heading} {accent && <span className="text-orange">{accent}</span>}
            </h2>
            <p className="lede mt-5">{body}</p>
            {cta && (
              <ButtonLink href={cta.href} variant="secondary" className="mt-7">
                {cta.label}
              </ButtonLink>
            )}
          </div>

          <ul className="space-y-3">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 text-[0.95rem] leading-relaxed text-ink"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                  <Check size={14} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Steps / plan */

export function Steps({
  id,
  heading,
  accent,
  steps,
}: {
  id?: string;
  heading: string;
  accent?: string;
  steps: { phase: string; title: string; body: string }[];
}) {
  return (
    <section id={id} className="bg-ink py-20 md:py-28">
      <div className="shell">
        <h2 className="display-2 max-w-2xl text-white text-balance">
          {heading} {accent && <span className="text-orange">{accent}</span>}
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-warm-gray-500">{s.phase}</span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight text-white">{s.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-warm-gray-300">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- FAQ */

export function FaqBlock({ heading, faqs }: { heading: string; faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-y bg-white">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <h2 className="display-2 text-ink lg:col-span-5 text-balance">{heading}</h2>

        <div className="lg:col-span-7">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-[color:var(--hairline)] first:border-t">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[1.05rem] font-semibold text-ink">{f.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-ink-muted transition-transform ${open === i ? 'rotate-180 text-orange' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-8 text-[0.98rem] leading-relaxed text-ink-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Waitlist card */

export function Waitlist({ product, note }: { product: string; note: string }) {
  const { openModal } = useContactModal();

  return (
    <section className="section-y bg-white">
      <div className="shell">
        <div className="grid gap-10 rounded-[2rem] bg-surface-alt p-8 md:p-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="display-2 text-ink text-balance">
              Get early access to <span className="text-orange">{product}</span>
            </h2>
            <p className="lede mt-5 max-w-md">{note}</p>
          </div>

          <div className="rounded-2xl bg-white p-7 md:p-9">
            <p className="font-heading text-xl font-semibold tracking-tight text-ink">Join the waitlist</p>
            <p className="mt-2 text-[0.95rem] text-ink-muted">
              Early access opens in cohorts. Existing Xerebo clients are onboarded first.
            </p>
            <Button onClick={() => openModal(`${product} waitlist`)} size="lg" className="mt-6 w-full">
              Request early access
            </Button>
            <Link
              href="/contact"
              className="mt-4 flex items-center justify-center gap-2 text-[0.9rem] font-semibold text-ink-muted hover:text-ink"
            >
              Or talk to the product team
              <ArrowRight size={15} className="text-orange" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
