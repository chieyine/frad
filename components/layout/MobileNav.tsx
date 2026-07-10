'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, SECONDARY_NAV } from '@/lib/constants';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Impact', href: '/impact' },
  { label: 'Projects', href: '/projects' },
  { label: 'Donate', href: '/donate' },
];

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] h-dvh lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className="overlay-in absolute inset-0 h-full w-full bg-ink-950/82 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close menu overlay"
      />

      <nav className="drawer-in absolute inset-y-0 right-0 flex h-dvh w-full max-w-[30rem] flex-col border-l border-ink-950/10 bg-paper-50 shadow-2xl">
        <div className="shrink-0 border-b border-ink-950/12 bg-white px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" onClick={onClose} className="safe-focus flex items-center">
              <Image
                src="/images/frad-logo.jpg"
                alt="FRAD Foundation Logo"
                width={150}
                height={52}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="safe-focus inline-flex min-h-[44px] w-11 items-center justify-center rounded-[8px] border border-ink-950/20 text-sm font-black text-ink-950 transition-colors hover:bg-ink-950 hover:text-white"
              aria-label="Close menu"
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>

          <div className="mt-3 grid grid-cols-4 overflow-hidden rounded-[8px] border border-ink-950/12 bg-ink-950/8">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`safe-focus flex min-h-[42px] items-center justify-center border-r border-ink-950/10 px-2 text-center text-[0.64rem] font-black uppercase tracking-[0.06em] last:border-r-0 ${
                  isActive(item.href)
                    ? 'bg-frad-green-800 text-white'
                    : 'bg-white text-ink-950 hover:bg-paper-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-frad-green-800">Menu</p>
              <p className="mt-1 text-sm font-semibold text-ink-600">Explore FRAD&apos;s programmes, evidence, locations, and contact routes.</p>
            </div>
            <Link
              href="/contact"
              onClick={onClose}
              className="safe-focus rounded-[8px] border border-ink-950/15 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-ink-950"
            >
              Contact
            </Link>
          </div>

          <div className="space-y-2.5">
            {NAV_ITEMS.map((item) => {
              const activeGroup = isActive(item.href) || item.children?.some((child) => isActive(child.href));

              if (!item.children?.length) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`safe-focus flex min-h-[48px] items-center justify-between rounded-[8px] border px-4 py-3 text-sm font-black uppercase tracking-[0.08em] ${
                      isActive(item.href)
                        ? 'border-frad-green-800 bg-frad-green-800 text-white'
                        : 'border-ink-950/10 bg-white text-ink-950 hover:border-frad-green-800/35'
                    }`}
                  >
                    {item.label}
                    <span className="text-[0.66rem] opacity-70">Open</span>
                  </Link>
                );
              }

              return (
                <section
                  key={item.href}
                  className={`rounded-[8px] border bg-white p-2.5 ${
                    activeGroup ? 'border-frad-green-800/35 shadow-[0_16px_34px_-30px_rgba(8,17,13,0.55)]' : 'border-ink-950/10'
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="safe-focus flex min-h-[42px] items-center justify-between rounded-[8px] px-2 text-sm font-black uppercase tracking-[0.08em] text-ink-950 hover:text-frad-green-900"
                  >
                    <span>{item.label}</span>
                    <span className="text-[0.66rem] font-black text-frad-green-800">Overview</span>
                  </Link>

                  <div className="mt-2 grid gap-1.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        aria-current={isActive(child.href) ? 'page' : undefined}
                        className={`safe-focus rounded-[8px] px-3 py-2 text-sm font-semibold leading-snug ${
                          isActive(child.href)
                            ? 'bg-frad-green-50 text-frad-green-950'
                            : 'text-ink-700 hover:bg-paper-100 hover:text-ink-950'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-5 rounded-[8px] bg-ink-950 p-4 text-white">
            <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-white/60">More</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {SECONDARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`safe-focus rounded-[8px] border border-white/10 px-3 py-3 text-sm font-bold ${
                    isActive(item.href)
                      ? 'bg-white text-ink-950'
                      : 'bg-white/6 text-white hover:bg-white hover:text-ink-950'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-2 border-t border-ink-950/20 bg-white">
          <Link
            href="/partners"
            onClick={onClose}
            className="safe-focus flex min-h-[56px] items-center justify-center border-r border-ink-950/20 px-3 py-3.5 text-center text-xs font-extrabold uppercase tracking-[0.08em] text-ink-950 hover:bg-paper-100"
          >
            Partner With Us
          </Link>
          <Link
            href="/donate"
            onClick={onClose}
            className="safe-focus flex min-h-[56px] items-center justify-center bg-frad-green-800 px-3 py-3.5 text-center text-xs font-black uppercase tracking-[0.08em] text-white transition-colors hover:bg-frad-green-900"
          >
            Donate
          </Link>
        </div>
      </nav>
    </div>,
    document.body
  );
}
