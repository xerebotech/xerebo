'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const COLUMNS: { heading: string; links: { name: string; href: string; external?: boolean }[] }[] = [
  {
    heading: 'Products',
    links: [
      { name: 'XEO platform', href: 'https://xeo.xerebo.com', external: true },
      { name: 'Xpace ERP', href: '/products/xpace' },
      { name: 'Xocials', href: '/products/xocials' },
      { name: 'Product pricing', href: '/packages' },
      { name: 'Book a walkthrough', href: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { name: 'Search engine optimisation', href: '/services/seo' },
      { name: 'Web development', href: '/services/web-development' },
      { name: 'Technical SEO sprint', href: '/services/seo#sprint' },
      { name: 'Site migration', href: '/services/web-development#migration' },
      { name: 'CRO and analytics', href: '/services/web-development#analytics' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { name: 'About us', href: '/about' },
      { name: 'How we work', href: '/about#process' },
      { name: 'Client results', href: '/results' },
      { name: 'Packages', href: '/packages' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { name: 'Privacy policy', href: '/privacy-policy' },
      { name: 'Terms of service', href: '/terms-service' },
      { name: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
];

const SOCIALS = [
  { icon: Linkedin, href: 'https://linkedin.com/company/teamxerebo', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/teamxerebo', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/share/1BcH1VkvrW/', label: 'Facebook' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--hairline)] bg-white">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="relative block h-9 w-[148px]">
              <Image src="/Xerebo Wordmark.png" alt="Xerebo" fill className="object-contain object-left" sizes="148px" />
            </Link>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ink-muted">
              Xerebo builds the search, web and software layer that growing companies run on. Two arms, one team:
              services that execute, products that scale.
            </p>

            <ul className="mt-7 space-y-3 text-[0.95rem] text-ink-muted">
              <li className="flex items-center gap-3">
                <Mail size={17} className="text-orange" />
                <a href="mailto:hello@xerebo.com" className="hover:text-ink">
                  hello@xerebo.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={17} className="text-orange" />
                <a href="tel:+971509876543" className="hover:text-ink">
                  +971 50 987 6543
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={17} className="text-orange" />
                Dubai, United Arab Emirates
              </li>
            </ul>

            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--hairline)] text-ink-muted transition-colors hover:border-orange hover:bg-orange-light hover:text-orange-deep"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink">{col.heading}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-[0.95rem] text-ink-muted transition-colors hover:text-ink"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[color:var(--hairline)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">© {new Date().getFullYear()} Xerebo Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-ink-muted">
            <Link href="/privacy-policy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms-service" className="hover:text-ink">
              Terms
            </Link>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange" />
              Dubai · Kochi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
