'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MEGA_MENU_ITEMS, type MegaMenuItem } from '@/lib/megaMenuData';

export default function SuperMenu() {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setActiveMenuId(null);
    };
    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveMenuId(null);
    };
    document.addEventListener('mousedown', closeOutside);
    document.addEventListener('keydown', closeWithKeyboard);
    return () => {
      document.removeEventListener('mousedown', closeOutside);
      document.removeEventListener('keydown', closeWithKeyboard);
    };
  }, []);

  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    setActiveMenuId(null);
  }

  return (
    <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main navigation">
      {MEGA_MENU_ITEMS.map((item) => {
        const isOpen = activeMenuId === item.id;
        const isActive = isItemActive(item, pathname);

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => setActiveMenuId(item.id)}
            onMouseLeave={() => setActiveMenuId(null)}
          >
            <button
              type="button"
              onClick={() => setActiveMenuId(isOpen ? null : item.id)}
              onFocus={() => setActiveMenuId(item.id)}
              className={`safe-focus flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2.5 text-[0.68rem] font-black uppercase tracking-[0.06em] transition-colors xl:px-3 xl:text-[0.72rem] ${
                isOpen || isActive ? 'bg-frad-green-950 text-white' : 'text-ink-800 hover:bg-white'
              }`}
              aria-label={`${isOpen ? 'Close' : 'Open'} ${item.label} menu`}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-menu`}
            >
              <span>{item.label}</span>
              <span aria-hidden="true" className={`text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
            </button>

            {isOpen && <MegaPanel item={item} pathname={pathname} onClose={() => setActiveMenuId(null)} />}
          </div>
        );
      })}
    </nav>
  );
}

function isItemActive(item: MegaMenuItem, pathname: string) {
  return pathname === item.href || item.sections.some((section) =>
    pathname === section.href || section.items.some((child) => pathname === child.href)
  );
}

function MegaPanel({ item, pathname, onClose }: { item: MegaMenuItem; pathname: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const bounds = panel.getBoundingClientRect();
    if (bounds.right > window.innerWidth - 16) setAlignment('right');
    else if (bounds.left < 16) setAlignment('left');
  }, []);

  const position = alignment === 'right' ? 'right-0' : alignment === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2';

  return (
    <div ref={panelRef} className={`absolute ${position} top-full z-50 pt-3`} style={{ width: 'min(700px, calc(100vw - 2rem))' }}>
      <div id={`${item.id}-menu`} className="menu-panel-in overflow-hidden rounded-xl border border-ink-950/12 bg-white shadow-[0_32px_80px_-38px_rgba(8,17,13,0.48)]">
        <div className="border-b border-ink-950/10 bg-paper-100 px-6 py-5">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-frad-green-800">{item.label}</p>
            <p className="mt-1.5 max-w-md text-sm font-semibold leading-6 text-ink-600">{item.description}</p>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:grid-cols-2">
          {item.sections.map((section) => (
            <section key={`${item.id}-${section.title}`}>
              <Link href={section.href} onClick={onClose} className="safe-focus group flex items-center justify-between border-b border-ink-950/12 pb-3 text-sm font-black text-ink-950 hover:text-frad-green-900">
                <span>{section.title}</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <ul className="mt-3 space-y-1 border-l border-frad-green-800/25 pl-3">
                {section.items.map((child) => {
                  const active = pathname === child.href;
                  return (
                    <li key={`${section.title}-${child.href}`}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className={`safe-focus flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors ${active ? 'bg-frad-green-50 text-frad-green-950' : 'text-ink-700 hover:bg-paper-100 hover:text-ink-950'}`}
                      >
                        <span>{child.label}</span>
                        {child.badge && <span className="shrink-0 rounded-full bg-frad-green-900 px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-wide text-white">{child.badge}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
