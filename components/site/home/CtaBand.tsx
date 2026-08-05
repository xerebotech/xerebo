'use client';

import { Button, ButtonLink } from '@/components/site/Button';
import { useContactModal } from '@/context/ContactModalContext';

export default function CtaBand({
  title = 'The only growth stack that scales with you',
  body = 'Services when you need a team on it. Products when you need it to run itself. Tell us which problem is loudest right now.',
}: {
  title?: string;
  body?: string;
}) {
  const { openModal } = useContactModal();

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: 'radial-gradient(var(--warm-gray-500) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange/20 blur-3xl" />

      <div className="shell relative flex flex-col items-center text-center">
        <h2 className="display-2 max-w-3xl text-white text-balance">{title}</h2>
        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-warm-gray-300">{body}</p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button onClick={() => openModal('CTA band: Get started')} variant="inverse" size="lg" className="w-full sm:w-auto">
            Get started
          </Button>
          <ButtonLink
            href="/contact"
            size="lg"
            className="w-full border border-white/20 bg-transparent text-white hover:bg-white/10 sm:w-auto"
          >
            Talk to sales
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
