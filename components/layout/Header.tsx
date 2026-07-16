'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileNav from '@/components/layout/MobileNav';
import SuperMenu from '@/components/layout/SuperMenu';

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-ink-950/10 bg-paper-50/92 backdrop-blur-xl transition-shadow ${
        scrolled ? 'shadow-[0_16px_44px_-34px_rgba(8,17,13,0.45)]' : ''
      }`}
    >
      {/* Top Institutional Utility Strip (Visible on Laptops & Desktops: 1024px+) */}
      <div className="hidden border-b border-ink-950/10 bg-ink-950 text-white lg:block">
        <div className="section-container flex h-9 items-center justify-end text-[0.68rem] font-bold tracking-wide">
          <div className="flex items-center gap-3 xl:gap-4 shrink-0">
            <Link href="/donors" className="safe-focus link-underline text-paper-200 transition-colors hover:text-white">
              Donor &amp; Partner Hub
            </Link>
            <span className="text-ink-700">|</span>
            <Link
              href="/about/accountability"
              className="safe-focus link-underline text-paper-200 transition-colors hover:text-white"
            >
              Safeguarding Desk
            </Link>
            <span className="text-ink-700">|</span>
            <Link
              href="/publications/annual-reports"
              className="safe-focus link-underline text-paper-200 transition-colors hover:text-white"
            >
              Audited Reports
            </Link>
            <span className="text-ink-700">|</span>
            <a
              href="https://erp.fradfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="safe-focus link-underline text-paper-200 transition-colors hover:text-white"
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Main Responsive Header Bar */}
      <div className="section-container flex min-h-[70px] items-center justify-between gap-2 sm:min-h-[88px] sm:gap-6 lg:min-h-[96px] lg:gap-8">
        {/* 1. Logo (Responsive across Phones, Tablets & Desktops) */}
        <Link
          href="/"
          className="safe-focus flex items-center shrink-0 py-1"
          aria-label="FRAD Foundation home"
        >
          <Image
            src="/images/frad-logo.jpg"
            alt="FRAD Foundation Logo"
            width={320}
            height={108}
            priority
            className="h-10 w-auto object-contain sm:h-[76px] lg:h-[84px]"
          />
        </Link>

        {/* 2-5. 4 Core Super Pillars (Visible starting at lg: 1024px+) */}
        <SuperMenu />

        {/* Action Group: Donate CTA + Responsive Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Link
            href="/donate"
            className="safe-focus cta-button cta-primary min-h-10 px-3.5 py-2 text-[0.68rem] sm:min-h-11 sm:px-5 sm:py-3 sm:text-xs"
          >
            <span className="sm:hidden">Donate</span>
            <span className="hidden sm:inline">Donate Now</span>
          </Link>

          {/* Mobile & Tablet Toggle (< 1024px) */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="safe-focus inline-flex min-h-10 items-center justify-center gap-2 rounded-[8px] border border-ink-950/18 bg-white/70 px-3 py-2 text-[0.7rem] font-black uppercase tracking-[0.08em] text-ink-950 transition-colors hover:bg-ink-950 hover:text-white sm:min-h-11 sm:px-4 sm:py-2.5 sm:text-xs lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-navigation"
          >
            <span className="grid gap-1" aria-hidden="true">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
            Menu
          </button>
        </div>

        <MobileNav
          open={mobileNavOpen}
          onClose={closeMobileNav}
        />
      </div>
    </header>
  );
}
