'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import CreativeButton from '@/components/ui/CreativeButton';
import { useContactModal } from '@/context/ContactModalContext';

interface HeaderProps {
  heroDark?: boolean;
}

export default function Header({ heroDark = false }: HeaderProps) {
  const { openModal } = useContactModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.98)"]
  );

  const headerBackdropBlur = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(16px)"]
  );

  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(254, 119, 0, 0)", "rgba(254, 119, 0, 0.15)"]
  );

  const topbarHeight = useTransform(scrollY, [0, 50], ["40px", "0px"]);
  const topbarOpacity = useTransform(scrollY, [0, 20], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // When heroDark=true and not yet scrolled → white text; once scrolled → dark text (normal)
  const navTextColor = heroDark && !isScrolled ? 'text-white hover:text-orange' : 'text-[#323939] hover:text-[#FE7700]';
  const mobileIconColor = heroDark && !isScrolled ? 'text-white hover:text-[#FE7700]' : 'text-[#323939] hover:text-[#FE7700]';
  const logoInvert = heroDark && !isScrolled ? 'brightness-0 invert' : '';

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'PACKAGES', href: '/packages' },
    { name: 'RESULTS', href: '/results' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-hidden ${isScrolled ? 'shadow-2xl shadow-[#323939]/10' : ''}`}
        style={{
          backgroundColor: headerBackground,
          backdropFilter: headerBackdropBlur,
          borderBottom: `1px solid`,
          borderColor: headerBorder as any,
        }}
      >
        {/* Topbar */}
        <motion.div
          style={{ height: topbarHeight, opacity: topbarOpacity, overflow: 'hidden' }}
          className="bg-gradient-to-r from-[#FE7700] via-orange-500 to-[#FE7700] text-white flex items-center justify-center relative px-2 md:px-4"
        >
          <div className="flex items-center gap-1.5 md:gap-4 overflow-hidden whitespace-nowrap">
            <span className="flex items-center gap-1 text-[9px] md:text-xs font-bold tracking-wider uppercase">
              <TrendingUp className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
              Limited Offer:
            </span>
            <span className="text-[9px] md:text-xs font-medium opacity-90 truncate">
              Get 20% off on your first Growth Intelligence Audit
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal('Header Topbar Offer')}
              className="bg-white text-[#FE7700] text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-lg flex items-center gap-1 hover:bg-orange-50 transition-colors"
            >
              Claim Now
              <ArrowRight className="w-2 h-2 md:w-2.5 md:h-2.5" />
            </motion.button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
        </motion.div>

        <div className={`max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-5'}`}>

          {/* Logo */}
          <Link href="/" className="relative z-50 group">
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{
                  opacity: isScrolled ? 0 : 1,
                  scale: isScrolled ? 0.8 : 1,
                  pointerEvents: isScrolled ? "none" : "auto"
                }}
                transition={{ duration: 0.3 }}
                className="relative w-36 md:w-44 h-10 md:h-12"
              >
                <Image
                  src="/Xerebo Wordmark.png"
                  alt="XEREBO"
                  fill
                  className={`object-contain object-left transition-all duration-300 ${logoInvert}`}
                  sizes="(max-width: 768px) 144px, 176px"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isScrolled ? 1 : 0,
                  scale: isScrolled ? 1 : 0.8,
                  pointerEvents: isScrolled ? "auto" : "none",
                  rotate: isScrolled ? 360 : 0
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
                className="absolute inset-0 w-10 md:w-12 h-10 md:h-12 mx-auto"
              >
                <Image
                  src="/Xerebo.png"
                  alt="XEREBO"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 40px, 48px"
                  priority
                />
              </motion.div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`font-semibold transition-all duration-300 text-sm tracking-wide relative group ${navTextColor}`}
                >
                  {link.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#FE7700] to-orange-600 transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                  <span className="absolute -inset-2 bg-[#FE7700]/10 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CreativeButton
              onClick={() => openModal('Header CTA: Book a Call')}
              variant="shimmer"
              className="px-6 md:px-8 py-3 md:py-4 text-sm md:text-base shadow-md shadow-orange-500/20"
            >
              <span className="hidden md:inline">Schedule a Call</span>
              <span className="md:hidden">Contact</span>
            </CreativeButton>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden relative z-50 p-2 transition-colors ${mobileIconColor}`}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <X size={28} strokeWidth={2.5} />
              ) : (
                <Menu size={28} strokeWidth={2.5} />
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#323939]/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-[#F6F4F4] to-white z-40 md:hidden overflow-y-auto shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FE7700]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />

              <div className="relative h-full flex flex-col p-8 pt-24">
                <nav className="flex-1 flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group relative flex items-center justify-between p-4 rounded-2xl hover:bg-[#FE7700]/10 transition-all duration-300"
                      >
                        <span className="text-2xl font-bold text-[#323939] group-hover:text-[#FE7700] transition-colors">
                          {link.name}
                        </span>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          className="text-[#FE7700]"
                        >
                          <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-4"
                >
                  <CreativeButton onClick={() => { setMobileMenuOpen(false); openModal('Header Mobile CTA'); }} variant="shimmer" width="full" icon={Sparkles}>
                    Schedule a Call
                  </CreativeButton>

                  <div className="text-center pt-4 border-t border-[#323939]/10">
                    <p className="text-sm text-[#323939]/60 mb-2">Questions? We&apos;re here 24/7</p>
                    <a
                      href="mailto:hello@xerebo.com"
                      className="text-[#FE7700] font-semibold hover:underline"
                    >
                      hello@xerebo.com
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
