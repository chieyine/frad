'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MEGA_MENU_ITEMS, MegaMenuItem } from '@/lib/megaMenuData';

export default function SuperMenu() {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close any open panel on navigation, using render-time state adjustment
  // instead of an effect so the closed menu paints in the same pass.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenuId(null);
  }

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3"
      aria-label="Main institutional super navigation"
    >
      {MEGA_MENU_ITEMS.map((item: MegaMenuItem) => {
        const isOpen = activeMenuId === item.id;
        const isActive =
          pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href)) ||
          item.sections?.some((sec) =>
            sec.items.some((sub) => pathname === sub.href)
          );

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => setActiveMenuId(item.id)}
            onMouseLeave={() => setActiveMenuId(null)}
          >
            <Link
              href={item.href}
              onClick={() => setActiveMenuId(null)}
              className={`safe-focus inline-flex items-center gap-1 rounded-[8px] px-2.5 py-2.5 text-[0.68rem] font-black uppercase tracking-[0.06em] transition-all whitespace-nowrap xl:gap-1.5 xl:px-3.5 xl:py-3 xl:text-[0.72rem] xl:tracking-[0.08em] 2xl:px-4 2xl:text-xs ${
                isActive || isOpen
                  ? 'bg-frad-green-950 text-white shadow-[0_14px_28px_-24px_rgba(0,38,17,0.72)]'
                  : 'text-ink-800 hover:bg-white hover:text-frad-green-950'
              }`}
              aria-expanded={isOpen}
              aria-haspopup={Boolean(item.sections)}
            >
              <span>{item.label}</span>
              {item.sections && (
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-white' : 'text-ink-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </Link>

            {/* Mega dropdown panel positioned to stay within viewport */}
            {isOpen && item.sections && (
              <MegaPanel item={item} onClose={() => setActiveMenuId(null)} pathname={pathname} />
            )}
          </div>
        );
      })}
    </nav>
  );
}

/**
 * Mega dropdown panel that auto-adjusts its horizontal position
 * so it never overflows outside the viewport.
 */
function MegaPanel({
  item,
  onClose,
  pathname,
}: {
  item: MegaMenuItem;
  onClose: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<'center' | 'left' | 'right'>('center');

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const pad = 16; // minimum gap from viewport edge

    if (rect.right > vw - pad) {
      setOffset('right');
    } else if (rect.left < pad) {
      setOffset('left');
    } else {
      setOffset('center');
    }
  }, []);

  const positionClasses =
    offset === 'right'
      ? 'right-0'
      : offset === 'left'
      ? 'left-0'
      : 'left-1/2 -translate-x-1/2';

  return (
    <div
      ref={panelRef}
      className={`absolute ${positionClasses} top-full z-50 pt-2.5`}
      style={{ width: 'min(840px, calc(100vw - 2rem))' }}
    >
      <div
        className="menu-panel-in rounded-[8px] border border-ink-950/10 bg-white/98 p-5 shadow-[0_34px_95px_-50px_rgba(8,17,13,0.56)] backdrop-blur-xl xl:p-7"
        role="region"
        aria-label={`${item.label} submenu`}
      >
        <div className={`grid gap-5 xl:gap-7 ${item.featuredCard ? 'lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px]' : 'grid-cols-1'}`}>
          {/* Left Links Column(s) */}
          <div
            className={`grid ${
              item.sections && item.sections.length > 1
                ? 'sm:grid-cols-2 gap-5 xl:gap-7'
                : 'grid-cols-1 gap-4'
            }`}
          >
            {item.sections?.map((section, idx) => (
              <div key={idx} className="space-y-3 min-w-0">
                {section.title && (
                  <div className="flex items-center gap-2 border-b border-ink-950/10 pb-2">
                    <span className="h-2 w-2 rounded-full bg-frad-green-800 shrink-0"></span>
                    <h4 className="text-[0.64rem] xl:text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-ink-600 truncate">
                      {section.title}
                    </h4>
                  </div>
                )}
                <ul className="space-y-1">
                  {section.items.map((sub, sIdx) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <li key={sIdx}>
                        <Link
                          href={sub.href}
                          onClick={onClose}
                          className={`group block rounded-[8px] border p-2.5 transition-all xl:p-3 ${
                            isSubActive
                              ? 'border-frad-green-800 bg-frad-green-800 text-white shadow-xs'
                              : 'border-transparent text-ink-900 hover:border-frad-green-800/18 hover:bg-paper-100/90'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={`truncate text-[0.82rem] font-bold transition-colors ${isSubActive ? 'text-white' : 'group-hover:text-frad-green-900'}`}>
                              {sub.label}
                            </span>
                            {sub.badge && (
                              <span className="inline-flex shrink-0 items-center rounded-full bg-frad-green-800 px-2 py-0.5 text-[0.58rem] font-black uppercase tracking-wider text-white">
                                {sub.badge}
                              </span>
                            )}
                          </div>
                          {sub.description && (
                            <p className={`mt-1 line-clamp-2 text-[0.7rem] leading-snug xl:text-[0.73rem] ${isSubActive ? 'text-white/75' : 'text-ink-600'}`}>
                              {sub.description}
                            </p>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Featured Card Column */}
          {item.featuredCard && (
            <div className="hidden min-w-0 flex-col justify-between rounded-[8px] border border-frad-green-900/18 bg-gradient-to-br from-paper-50 to-white p-4 text-left shadow-[0_16px_34px_-30px_rgba(8,17,13,0.3)] lg:flex xl:p-5">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block rounded bg-frad-green-950 px-2 py-1 text-[0.58rem] xl:text-[0.62rem] font-black uppercase tracking-[0.12em] text-white">
                    {item.featuredCard.eyebrow}
                  </span>
                  <span className="text-[0.62rem] font-bold text-frad-green-800 uppercase tracking-wide shrink-0">
                    Official Desk
                  </span>
                </div>
                <h5 className="mt-4 text-base xl:text-lg font-black leading-snug text-ink-950">
                  {item.featuredCard.title}
                </h5>
                <p className="mt-3 text-xs leading-6 text-ink-700">
                  {item.featuredCard.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-ink-950/10">
                <Link
                  href={item.featuredCard.ctaHref}
                  onClick={onClose}
                  className="group inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-frad-green-900 hover:text-frad-red-600 transition-colors"
                >
                  <span>{item.featuredCard.ctaLabel}</span>
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
