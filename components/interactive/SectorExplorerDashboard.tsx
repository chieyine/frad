'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { SECTORS, SECTOR_DETAILS } from '@/lib/constants';

export default function SectorExplorerDashboard() {
  const [activeSlug, setActiveSlug] = useState(SECTORS[0].slug);
  const activeSector = SECTORS.find((sector) => sector.slug === activeSlug) ?? SECTORS[0];
  const activeDetails = SECTOR_DETAILS[activeSector.slug] ?? SECTOR_DETAILS['nutrition-health'];

  return (
    <div className="premium-card overflow-hidden">
      <div className="grid lg:grid-cols-[20rem_1fr]">
        <div className="border-b border-ink-950/10 bg-frad-green-950 p-4 lg:border-b-0 lg:border-r">
          <p className="mb-4 px-2 text-xs font-black uppercase tracking-[0.12em] text-white/90">Programme areas</p>
          <div className="grid gap-2">
            {SECTORS.map((sector, index) => {
              const active = activeSector.slug === sector.slug;
              return (
                <button
                  key={sector.slug}
                  type="button"
                  onClick={() => setActiveSlug(sector.slug)}
                  className={`safe-focus grid grid-cols-[2.25rem_1fr] items-center rounded-[8px] border px-3 py-3 text-left text-sm font-black transition-all duration-200 active:scale-[0.98] ${
                    active
                      ? 'border-white bg-white text-frad-green-950 shadow-[0_18px_34px_-28px_rgba(0,0,0,0.55)]'
                      : 'border-white/14 bg-white/7 text-white hover:bg-white hover:text-ink-950'
                  }`}
                >
                  <span className="font-heading text-base">{String(index + 1).padStart(2, '0')}</span>
                  <span>{sector.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-frad-green-800">Selected sector</p>
              <h3 className="mt-5 text-4xl font-black leading-none sm:text-5xl">{activeSector.title}</h3>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] border border-frad-green-800/20 bg-frad-green-50 text-frad-green-900">
              <Icon name={activeSector.icon} className="h-7 w-7" />
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-xl font-bold leading-8 text-ink-700">{activeSector.description}</p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {activeDetails.focus.map((item) => (
              <div key={item} className="rounded-[8px] border border-ink-950/10 bg-paper-50 p-5 shadow-[0_12px_30px_-28px_rgba(8,17,13,0.3)]">
                <p className="text-lg font-black text-ink-950">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="rounded-[8px] border border-frad-green-800/16 bg-frad-green-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-ink-950">How we deliver</p>
              <p className="mt-3 text-base font-bold leading-7 text-ink-800">{activeDetails.note}</p>
            </div>
            <Link
              href={`/what-we-do/${activeSector.slug}`}
              className="safe-focus cta-button cta-primary"
            >
              Open sector
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
