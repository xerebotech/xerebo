'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { MENUS } from '@/components/site/nav-data';
import { ButtonLink, Button } from '@/components/site/Button';
import { useCursor, useCursorTarget } from '@/components/site/cursor/CursorProvider';
import { useContactModal } from '@/context/ContactModalContext';

/** Pill text shown by the custom cursor for each top-level nav trigger. */
const CURSOR_LABELS: Record<string, string> = {
  Products: 'Our products',
  Services: 'Our services',
  Resources: 'Resources',
};

function NavTrigger({
  label,
  isOpen,
  onOpen,
  onToggle,
}: {
  label: string;
  isOpen: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const cursor = useCursorTarget(CURSOR_LABELS[label] ?? label);

  return (
    <button
      {...cursor}
      onMouseEnter={(e) => {
        cursor.onMouseEnter();
        onOpen();
        void e;
      }}
      onFocus={() => {
        cursor.onFocus();
        onOpen();
      }}
      onClick={onToggle}
      aria-expanded={isOpen}
      className={`flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
        isOpen ? 'bg-ink/5 text-ink' : 'text-ink hover:bg-ink/5'
      }`}
    >
      {label}
      <ChevronDown size={15} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}

export default function SiteHeader() {
  const { openModal } = useContactModal();
  const logoCursor = useCursorTarget('Xerebo home');
  const pricingCursor = useCursorTarget('Pricing');
  const { setLabel, resetLabel } = useCursor();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled || openMenu ? 'border-b border-[color:var(--hairline)]' : 'border-b border-transparent'
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-6">
        <Link
          href="/"
          {...logoCursor}
          className="relative h-8 w-[132px] shrink-0"
          aria-label="Xerebo home"
        >
          <Image src="/Xerebo Wordmark.png" alt="Xerebo" fill className="object-contain object-left" sizes="132px" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {MENUS.map((menu) => (
            <NavTrigger
              key={menu.label}
              label={menu.label}
              isOpen={openMenu === menu.label}
              onOpen={() => setOpenMenu(menu.label)}
              onToggle={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
            />
          ))}
          <Link
            href="/packages"
            {...pricingCursor}
            className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink hover:bg-ink/5"
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://xeo.xerebo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-2 text-[0.95rem] font-medium text-ink hover:bg-ink/5"
          >
            Log in
          </a>
          <ButtonLink href="/contact" variant="secondary" size="sm" className="px-5 py-2.5">
            Talk to sales
          </ButtonLink>
          <Button onClick={() => openModal('Header CTA: Get started')} size="sm" className="px-5 py-2.5">
            Get started
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-full p-2 text-ink hover:bg-ink/5 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full hidden border-b border-[color:var(--hairline)] bg-white shadow-[0_24px_48px_-24px_rgba(26,23,23,0.25)] lg:block"
            onMouseEnter={() => setOpenMenu(openMenu)}
          >
            {MENUS.filter((m) => m.label === openMenu).map((menu) => (
              <div key={menu.label} className="shell grid grid-cols-12 gap-10 py-10">
                <div className={`col-span-12 grid gap-10 ${menu.featured ? 'lg:col-span-9' : ''} sm:grid-cols-2 lg:grid-cols-3`}>
                  {menu.columns.map((col) => (
                    <div key={col.heading}>
                      <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
                        {col.heading}
                      </p>
                      <ul className="space-y-1">
                        {col.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              target={item.external ? '_blank' : undefined}
                              rel={item.external ? 'noopener noreferrer' : undefined}
                              onClick={() => setOpenMenu(null)}
                              onMouseEnter={() => setLabel(item.name)}
                              onMouseLeave={resetLabel}
                              className="group -mx-3 block rounded-xl px-3 py-2.5 transition-colors hover:bg-orange-light"
                            >
                              <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
                                {item.name}
                                {item.badge && (
                                  <span className="rounded-full bg-orange/12 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-orange-deep">
                                    {item.badge}
                                  </span>
                                )}
                                <ArrowRight
                                  size={14}
                                  className="-translate-x-1 text-orange opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                                />
                              </span>
                              {item.blurb && <span className="mt-0.5 block text-sm text-ink-muted">{item.blurb}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {menu.featured && (
                  <div className="col-span-12 space-y-3 lg:col-span-3">
                    {menu.featured.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        onClick={() => setOpenMenu(null)}
                        onMouseEnter={() => setLabel(item.name)}
                        onMouseLeave={resetLabel}
                        className="group flex items-center justify-between gap-4 rounded-2xl bg-surface-alt p-5 transition-colors hover:bg-orange-light"
                      >
                        <span>
                          <span className="block text-[0.95rem] font-semibold text-ink">{item.name}</span>
                          <span className="block text-sm text-ink-muted">{item.blurb}</span>
                        </span>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:scale-105">
                          <ArrowRight size={16} />
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
          >
            <div className="flex h-[68px] shrink-0 items-center justify-between px-5">
              <Link href="/" onClick={() => setMobileOpen(false)} className="relative h-8 w-[132px]">
                <Image src="/Xerebo Wordmark.png" alt="Xerebo" fill className="object-contain object-left" sizes="132px" />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-ink/5" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-8">
              {MENUS.map((menu) => (
                <div key={menu.label} className="border-b border-[color:var(--hairline)]">
                  <button
                    onClick={() => setMobileSection(mobileSection === menu.label ? null : menu.label)}
                    className="flex w-full items-center justify-between py-4 text-lg font-semibold text-ink"
                  >
                    {menu.label}
                    <ChevronDown
                      size={20}
                      className={`text-ink-muted transition-transform ${mobileSection === menu.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileSection === menu.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-5 pb-5">
                          {menu.columns.map((col) => (
                            <div key={col.heading}>
                              <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
                                {col.heading}
                              </p>
                              <ul className="space-y-2">
                                {col.items.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      target={item.external ? '_blank' : undefined}
                                      rel={item.external ? 'noopener noreferrer' : undefined}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-2 text-[0.95rem] text-ink"
                                    >
                                      {item.name}
                                      {item.badge && (
                                        <span className="rounded-full bg-orange/12 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-orange-deep">
                                          {item.badge}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                href="/packages"
                onClick={() => setMobileOpen(false)}
                className="block border-b border-[color:var(--hairline)] py-4 text-lg font-semibold text-ink"
              >
                Pricing
              </Link>

              <div className="mt-8 space-y-3">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    openModal('Mobile nav: Get started');
                  }}
                  size="lg"
                  className="w-full"
                >
                  Get started
                </Button>
                <ButtonLink href="/contact" variant="secondary" size="lg" className="w-full">
                  Talk to sales
                </ButtonLink>
                <a
                  href="https://xeo.xerebo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-center text-[0.95rem] font-medium text-ink-muted"
                >
                  Log in to XEO
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
