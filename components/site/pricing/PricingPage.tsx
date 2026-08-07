'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Info, Lock, Maximize2, Minus, Plus } from 'lucide-react';
import { Button, ButtonLink } from '@/components/site/Button';
import { useContactModal } from '@/context/ContactModalContext';
import {
  CLIENT_RESULTS,
  PLAN_SETS,
  PRICING_FAQS,
  RELATED_PRICING,
  type Plan,
  type PlanSet,
} from '@/components/site/pricing/pricing-data';

const CLIENTS = ['Aurora Realty', 'Medcore Clinics', 'Solvent Labs', 'Northbay Retail', 'Vantage Legal', 'Kite Logistics'];

const ANNUAL_DISCOUNT = 0.18;
/** Commitment length → extra discount on service retainers. */
const COMMITMENT_DISCOUNT: Record<number, number> = { 3: 0, 6: 0.05, 12: 0.12 };

const aed = (n: number) => n.toLocaleString('en-AE', { maximumFractionDigits: 0 });

function InfoDot({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span title={text} className="ml-auto shrink-0 cursor-help text-warm-gray-300 transition-colors hover:text-ink">
      <Info size={14} />
    </span>
  );
}

function PriceBlock({
  plan,
  set,
  selectorValue,
  annual,
}: {
  plan: Plan;
  set: PlanSet;
  selectorValue: number;
  annual: boolean;
}) {
  if (plan.price === null) {
    return (
      <div className="mt-4">
        <div className="flex min-h-[52px] items-center">
          <div className="flex h-11 w-14 shrink-0 items-center justify-center rounded-lg bg-surface-alt">
            <span className="h-3 w-6 rounded-sm bg-ink/25" />
          </div>
          <span className="ml-3 text-[0.95rem] leading-tight text-ink">
            {plan.unitTop}
            <br />
            {plan.unitBottom}
          </span>
        </div>
        {plan.blurb && <p className="mt-3 text-[0.88rem] leading-snug text-ink-muted">{plan.blurb}</p>}
        <p className="mt-3 text-[0.88rem] font-bold text-orange-deep">Discounts available</p>
      </div>
    );
  }

  const isSeats = set.selector.kind === 'seats';
  const seats = isSeats ? selectorValue : 1;
  const commitmentOff = isSeats ? 0 : COMMITMENT_DISCOUNT[selectorValue] ?? 0;

  // Free tier: no arithmetic, no billing line.
  if (plan.price === 0) {
    return (
      <div className="mt-4">
        <div className="flex min-h-[52px] flex-wrap items-baseline gap-x-2">
          <span className="font-heading text-[3rem] font-semibold leading-none tracking-tight text-ink">0</span>
          <span className="text-[0.95rem] leading-tight text-ink-muted">
            {plan.unitTop} {plan.unitBottom}
          </span>
        </div>
        {plan.seatNote && <p className="mt-3 text-[0.88rem] font-bold text-ink">{plan.seatNote}</p>}
      </div>
    );
  }

  // One-off engagements ignore both the billing cycle and the commitment discount.
  const perUnitFull = plan.price;
  const perUnit = plan.oneOff
    ? perUnitFull
    : Math.round(perUnitFull * (1 - (annual ? ANNUAL_DISCOUNT : 0)) * (1 - commitmentOff));
  const totalFull = perUnitFull * seats;
  const total = perUnit * seats;
  const discounted = total < totalFull;

  return (
    <div className="mt-4">
      <div className="flex min-h-[52px] flex-wrap items-baseline gap-x-2">
        <span className="font-heading text-[3rem] font-semibold leading-none tracking-tight text-ink">
          <span className="text-base font-medium text-ink-muted">AED </span>
          {aed(perUnit)}
        </span>
        <span className="text-[0.95rem] leading-tight text-ink-muted">
          {plan.unitTop} {plan.unitBottom}
        </span>
      </div>

      {plan.oneOff ? (
        <p className="mt-3 text-[0.88rem] font-bold leading-snug text-ink">Billed once on kickoff</p>
      ) : (
        <p className="mt-3 text-[0.88rem] font-bold leading-snug text-ink">
          Total of{' '}
          {discounted && <span className="mr-1 font-normal text-ink-muted line-through">AED {aed(totalFull)}</span>}
          AED {aed(total)} / month
          {annual ? ', billed annually' : ''}
        </p>
      )}

      {plan.specialOffer && (
        <p className="mt-2 text-[0.88rem] leading-snug text-ink-muted">
          Special offer:
          <br />
          <span className="font-bold text-emerald-700">AED {aed(plan.specialOffer)} off</span> / month
        </p>
      )}

      {plan.seatNote && <p className="mt-3 text-[0.88rem] font-bold text-ink">{plan.seatNote}</p>}
    </div>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check size={17} className="mx-auto text-orange" strokeWidth={2.6} />;
  if (value === false) return <Minus size={17} className="mx-auto text-warm-gray-300" />;
  return <span className="text-[0.88rem] text-ink">{value}</span>;
}

export default function PricingPage() {
  const { openModal } = useContactModal();
  const [setId, setSetId] = useState(PLAN_SETS[0].id);
  const [annual, setAnnual] = useState(true);
  const [tableOpen, setTableOpen] = useState(false);
  const [openRelated, setOpenRelated] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const planSet = useMemo(() => PLAN_SETS.find((s) => s.id === setId) ?? PLAN_SETS[0], [setId]);
  const [selectorValue, setSelectorValue] = useState(planSet.selector.options[2]?.value ?? planSet.selector.options[0].value);

  const switchSet = (id: string) => {
    const next = PLAN_SETS.find((s) => s.id === id) ?? PLAN_SETS[0];
    setSetId(id);
    setSelectorValue(next.selector.options[2]?.value ?? next.selector.options[0].value);
  };

  return (
    <main>
      {/* Hero ------------------------------------------------------------ */}
      <section className="bg-white pt-14 pb-8 md:pt-20">
        <div className="shell text-center">
          <h1 className="display-1 mx-auto max-w-4xl text-ink text-balance">
            Plans for every stage, <span className="text-orange">people and platform</span> included.
          </h1>
          <p className="lede mx-auto mt-5 max-w-xl">Start free, no card needed.</p>
          <Button onClick={() => openModal('Pricing hero: Get started')} size="lg" className="mt-7">
            Get started
            <ArrowRight size={17} />
          </Button>
        </div>
      </section>

      {/* Controls -------------------------------------------------------- */}
      <section className="bg-white">
        <div className="shell flex flex-col gap-4 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="relative">
              <select
                value={setId}
                onChange={(e) => switchSet(e.target.value)}
                aria-label="Choose what to price"
                className="appearance-none rounded-lg border border-[color:var(--hairline)] bg-white py-2.5 pl-4 pr-10 text-[0.92rem] font-semibold text-ink outline-none transition-colors hover:border-ink/40 focus-visible:border-orange"
              >
                {PLAN_SETS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            </span>

            <span className="text-[0.92rem] text-ink-muted">{planSet.selector.label}</span>
            <span className="relative">
              <select
                value={selectorValue}
                onChange={(e) => setSelectorValue(Number(e.target.value))}
                aria-label={planSet.selector.label}
                className="appearance-none rounded-lg border border-[color:var(--hairline)] bg-white py-2.5 pl-4 pr-10 text-[0.92rem] font-semibold text-ink outline-none transition-colors hover:border-ink/40 focus-visible:border-orange"
              >
                {planSet.selector.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            </span>
          </div>

          <div className="flex items-center gap-3 text-[0.92rem]">
            <button
              onClick={() => setAnnual(true)}
              className={`font-bold transition-colors ${annual ? 'text-orange' : 'text-ink-muted hover:text-ink'}`}
            >
              Yearly SAVE 18%
            </button>
            <span className="text-warm-gray-300">|</span>
            <button
              onClick={() => setAnnual(false)}
              className={`font-semibold transition-colors ${!annual ? 'text-orange' : 'text-ink-muted hover:text-ink'}`}
            >
              Monthly
            </button>
          </div>
        </div>
      </section>

      {/* Plan grid ------------------------------------------------------- */}
      <section className="bg-white pb-4">
        <div className="shell">
          <AnimatePresence mode="wait">
            <motion.div
              key={planSet.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid items-stretch gap-3 pt-7 sm:grid-cols-2 lg:grid-cols-5"
            >
              {planSet.plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border bg-white ${
                    plan.popular
                      ? '-mt-7 border-ink shadow-[0_30px_70px_-45px_rgba(26,23,23,0.8)]'
                      : 'border-[color:var(--hairline)]'
                  }`}
                >
                  {plan.popular && (
                    <div className="rounded-t-2xl bg-ink py-2 text-center text-[0.72rem] font-bold uppercase tracking-wide text-white">
                      Most popular
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-heading text-lg font-semibold tracking-tight text-ink">{plan.name}</h2>

                    <PriceBlock plan={plan} set={planSet} selectorValue={selectorValue} annual={annual} />

                    {plan.price === null ? (
                      <ButtonLink href="/contact" variant="secondary" size="sm" className="mt-6 w-full py-3">
                        {plan.ctaLabel}
                      </ButtonLink>
                    ) : (
                      <Button
                        onClick={() => openModal(`Pricing: ${planSet.label} · ${plan.name}`)}
                        size="sm"
                        className="mt-6 w-full py-3"
                      >
                        {plan.ctaLabel}
                      </Button>
                    )}

                    {plan.addon && (
                      <div
                        className={`mt-5 flex items-start gap-2.5 rounded-xl border ${
                          plan.addon.locked ? 'border-[color:var(--hairline)]' : 'border-transparent'
                        } ${plan.addon.tone} p-3.5`}
                      >
                        {plan.addon.locked ? (
                          <Lock size={15} className="mt-0.5 shrink-0 text-ink-muted" />
                        ) : (
                          <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full bg-ink/70" />
                        )}
                        <span className="min-w-0">
                          <span className="block text-[0.85rem] font-bold text-ink">{plan.addon.title}</span>
                          <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink/70">{plan.addon.detail}</span>
                        </span>
                        {!plan.addon.locked && <Maximize2 size={13} className="mt-0.5 shrink-0 text-ink/50" />}
                      </div>
                    )}

                    <div className="mt-5 border-t border-[color:var(--hairline)] pt-4">
                      <p className="mb-3 text-[0.88rem] font-bold text-ink">{plan.featureHeading}</p>
                      <ul className="space-y-2.5">
                        {plan.features.map((f) => (
                          <li key={f.label} className="flex items-start gap-2 text-[0.85rem] leading-snug text-ink-muted">
                            <span>{f.label}</span>
                            <InfoDot text={f.info} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="mt-8 max-w-3xl text-[0.8rem] leading-relaxed text-ink-muted">
            * Prices exclude VAT, which is determined by your billing country. The final amount is shown before payment is
            completed. {planSet.note}
          </p>
        </div>
      </section>

      {/* Complete feature list ------------------------------------------- */}
      <section className="bg-white py-14">
        <div className="shell">
          <button
            onClick={() => setTableOpen((v) => !v)}
            className="mx-auto flex items-center gap-2 font-heading text-2xl font-medium tracking-tight text-ink"
          >
            Complete features list
            <ChevronDown size={22} className={`transition-transform ${tableOpen ? 'rotate-180 text-orange' : ''}`} />
          </button>

          <AnimatePresence initial={false}>
            {tableOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden"
              >
                <div className="mt-10 overflow-x-auto">
                  <table className="w-full min-w-[860px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-[color:var(--hairline)]">
                        <th className="w-[26%] py-4 text-[0.88rem] font-bold text-ink">Feature</th>
                        {planSet.plans.map((p) => (
                          <th key={p.id} className="px-3 py-4 text-center text-[0.88rem] font-bold text-ink">
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {planSet.comparison.map((group) => (
                        <>
                          <tr key={group.group} className="bg-surface-alt">
                            <td
                              colSpan={planSet.plans.length + 1}
                              className="px-3 py-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-muted"
                            >
                              {group.group}
                            </td>
                          </tr>
                          {group.rows.map((row) => (
                            <tr key={`${group.group}-${row.label}`} className="border-b border-[color:var(--hairline)]">
                              <td className="py-3.5 text-[0.88rem] text-ink-muted">
                                <span className="flex items-center gap-2">
                                  {row.label}
                                  {row.info && (
                                    <span title={row.info} className="cursor-help text-warm-gray-300 hover:text-ink">
                                      <Info size={13} />
                                    </span>
                                  )}
                                </span>
                              </td>
                              {row.values.map((v, i) => (
                                <td key={i} className="px-3 py-3.5 text-center">
                                  <Cell value={v} />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Related pricing -------------------------------------------------- */}
      <section className="border-t border-[color:var(--hairline)] bg-white">
        <div className="shell">
          {RELATED_PRICING.map((row) => (
            <div key={row.name} className="border-b border-[color:var(--hairline)]">
              <button
                onClick={() => setOpenRelated(openRelated === row.name ? null : row.name)}
                aria-expanded={openRelated === row.name}
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="flex items-center gap-5">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${row.tone}`}>
                    <span className="h-3 w-3 rounded-full bg-ink" />
                  </span>
                  <span className="font-heading text-xl font-medium tracking-tight text-ink md:text-2xl">{row.name}</span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--hairline)] text-ink">
                  {openRelated === row.name ? <Minus size={17} /> : <Plus size={17} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openRelated === row.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-16 pr-10">
                      <p className="max-w-2xl text-[0.96rem] leading-relaxed text-ink-muted">{row.body}</p>
                      <Link href={row.href} className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-ink">
                        Learn more
                        <ArrowRight size={15} className="text-orange" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof ----------------------------------------------------- */}
      <section className="bg-white py-20">
        <div className="shell text-center">
          <h2 className="display-2 mx-auto max-w-2xl text-ink text-balance">
            <span className="text-orange">120+</span> teams across the UAE and India run on Xerebo
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
            {CLIENTS.map((c) => (
              <span key={c} className="font-heading text-[1.05rem] font-semibold tracking-tight text-ink/45">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Personalised quote ----------------------------------------------- */}
      <section className="bg-white pb-20">
        <div className="shell">
          <div className="grid gap-10 rounded-[2rem] bg-surface-alt p-8 md:p-14 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="display-2 text-ink text-balance">
                Get a personalised quote from the people who will <span className="text-orange">do the work</span>
              </h2>
              <p className="lede mt-5 max-w-md">
                No discovery-call theatre. Send the domain and the goal; a strategist returns scope, team and cost within
                two working days.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 md:p-9">
              <ul className="space-y-3">
                {[
                  'Written scope with named deliverables',
                  'The team who will actually run it',
                  'Commercials and SLA in the same document',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink">
                    <Check size={16} className="mt-0.5 shrink-0 text-orange" strokeWidth={2.6} />
                    {item}
                  </li>
                ))}
              </ul>
              <Button onClick={() => openModal('Pricing: request a quote')} size="lg" className="mt-7 w-full">
                Request a quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Client results ---------------------------------------------------- */}
      <section className="bg-white pb-20">
        <div className="shell">
          <h2 className="display-2 max-w-2xl text-ink text-balance">Our clients achieve more</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CLIENT_RESULTS.map((r) => (
              <div key={r.client} className="rounded-3xl border border-[color:var(--hairline)] p-8">
                <p className="font-heading text-5xl font-semibold tracking-tight text-ink">{r.metric}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{r.label}</p>
                <p className="mt-6 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-orange-deep">{r.client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ --------------------------------------------------------------- */}
      <section className="bg-white pb-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <h2 className="display-2 text-ink lg:col-span-5 text-balance">Frequently asked questions</h2>
          <div className="lg:col-span-7">
            {PRICING_FAQS.map((f, i) => (
              <div key={f.q} className="border-b border-[color:var(--hairline)] first:border-t">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[1.05rem] font-semibold text-ink">{f.q}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-ink-muted transition-transform ${openFaq === i ? 'rotate-180 text-orange' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-8 text-[0.96rem] leading-relaxed text-ink-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
