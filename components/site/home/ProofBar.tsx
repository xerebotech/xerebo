'use client';

const CLIENTS = ['Aurora Realty', 'Medcore Clinics', 'Solvent Labs', 'Northbay Retail', 'Vantage Legal', 'Kite Logistics'];

export default function ProofBar() {
  return (
    <section className="border-y border-[color:var(--hairline)] bg-white py-8">
      <div className="shell flex flex-col items-center gap-8 lg:flex-row lg:gap-14">
        <p className="max-w-xs shrink-0 text-center text-[1.05rem] font-semibold leading-snug text-ink lg:text-left">
          Trusted by <span className="text-orange">120+</span> teams across the UAE and India
        </p>
        <div className="no-scrollbar flex w-full items-center gap-10 overflow-x-auto lg:justify-end">
          {CLIENTS.map((c) => (
            <span
              key={c}
              className="shrink-0 font-heading text-[1.05rem] font-semibold tracking-tight text-ink-muted/70 transition-colors hover:text-ink"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
