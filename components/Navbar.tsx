'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/packages', label: 'Packages' },
    { href: '/results', label: 'Results' },
    { href: '/contact', label: 'Contact' },
  ];

  const toggle = () => {
    setMenuOpen(o => !o);
    document.body.style.overflow = menuOpen ? '' : 'hidden';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Xerebo Technologies Home">
            <div className="logo-icon" aria-hidden="true">X</div>
            Xerebo
          </Link>
          <div className="nav-links">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? 'active' : ''}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary" style={{ padding: '10px 22px', fontSize: '14px' }}>
              Book a Strategy Call
            </Link>
          </div>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={toggle}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
        {links.map(l => (
          <Link key={l.href} href={l.href} onClick={closeMenu}>{l.label}</Link>
        ))}
        <div style={{ marginTop: '24px' }}>
          <Link href="/contact" onClick={closeMenu} className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </>
  );
}
