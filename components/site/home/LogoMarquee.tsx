'use client';

import Image from 'next/image';

/**
 * LogoMarquee — an infinite client-logo strip sitting above a gradient band
 * that falls from the accent into the deep ink section below.
 *
 * To use real logo files: drop transparent PNG or SVG files into
 * /public/clients/ and add `{ name, src }` entries below. Any entry without a
 * `src` renders as a wordmark, so the strip works before the assets land.
 */

type Client = { name: string; src?: string; width?: number };

const CLIENTS: Client[] = [
  { name: 'Aurora Realty' },
  { name: 'Medcore Clinics' },
  { name: 'Solvent Labs' },
  { name: 'Northbay Retail' },
  { name: 'Vantage Legal' },
  { name: 'Kite Logistics' },
  { name: 'Harbour Group' },
  { name: 'Meridian Health' },
];

function LogoItem({ client }: { client: Client }) {
  if (client.src) {
    return (
      <div className="relative h-8 w-[132px] shrink-0 opacity-60 transition-opacity duration-300 hover:opacity-100">
        <Image
          src={client.src}
          alt={client.name}
          fill
          sizes="132px"
          className="object-contain object-center grayscale transition-[filter] duration-300 hover:grayscale-0"
        />
      </div>
    );
  }

  return (
    <span className="shrink-0 whitespace-nowrap font-heading text-[1.05rem] font-semibold tracking-tight text-ink/45 transition-colors duration-300 hover:text-ink">
      {client.name}
    </span>
  );
}

/**
 * `toDark` resolves the band into the ink colour, for when a dark section
 * follows. `toLight` returns to white so the band reads as a glow bar between
 * two light sections.
 */
const BANDS = {
  toDark:
    'linear-gradient(180deg, #FFFFFF 0%, rgba(254,119,0,0.55) 26%, var(--orange) 42%, #7A3A00 62%, #2C2727 82%, #1A1717 100%)',
  toLight:
    'linear-gradient(180deg, #FFFFFF 0%, rgba(254,119,0,0.5) 24%, var(--orange) 44%, #C25A00 58%, rgba(254,119,0,0.4) 76%, #FFFFFF 100%)',
} as const;

export default function LogoMarquee({ variant = 'toLight' }: { variant?: keyof typeof BANDS }) {
  // Two identical tracks scrolling in sequence give a seamless loop.
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <section className="relative overflow-hidden bg-white pt-14">
      <p className="shell mb-9 text-center text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ink-muted">
        Partnering with teams building across the UAE and India
      </p>

      <div className="relative">
        {/* Edge fades so logos dissolve rather than clip */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max animate-marquee items-center gap-16 pr-16 hover:[animation-play-state:paused]">
          {track.map((client, i) => (
            <LogoItem key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>

      {/* Gradient band, resolving into whatever section follows */}
      <div className="relative mt-12 h-40 md:h-52">
        <div className="absolute inset-0" style={{ background: BANDS[variant] }} />
        {/* Soft bloom where the accent meets the white, as in the reference */}
        <div
          className="absolute inset-x-0 top-[22%] h-24 blur-2xl"
          style={{
            background: 'radial-gradient(60% 100% at 50% 50%, rgba(255,179,102,0.9) 0%, rgba(254,119,0,0) 70%)',
          }}
        />
      </div>
    </section>
  );
}
