'use client';

import { useState } from 'react';
import Link from 'next/link';
import Stamp from '@/components/ui/Stamp';

interface RegionData {
  id: string;
  name: string;
  label: string;
  summary: string;
  focus: string;
  href: string;
  coordinates: { x: number; y: number };
}

const REGIONS: RegionData[] = [
  {
    id: 'northeast',
    name: 'Northeast Nigeria',
    label: 'Borno, Adamawa, Yobe',
    summary: 'Multi-sector humanitarian and development programming across crisis-affected communities.',
    focus: 'Nutrition, WASH, protection, education, and emergency response delivered through frontline teams.',
    href: '/where-we-work/northeast',
    coordinates: { x: 74, y: 22 },
  },
  {
    id: 'northwest',
    name: 'Northwest Nigeria',
    label: 'Expanding response corridor',
    summary: 'Community support and response activities in an expanding operational corridor.',
    focus: 'Emergency response, livelihoods, and community resilience alongside local structures.',
    href: '/where-we-work/northwest',
    coordinates: { x: 32, y: 21 },
  },
  {
    id: 'abuja',
    name: 'Abuja Coordination',
    label: 'Federal Capital Territory',
    summary: 'National coordination, partnerships, compliance, and representation.',
    focus: 'Donor engagement, coordination structures, and institutional accountability.',
    href: '/where-we-work/abuja',
    coordinates: { x: 47, y: 45 },
  },
];

/* Simplified public-safe outline of Nigeria: regional presence only,
   deliberately without state boundaries or site-level detail. */
const NIGERIA_OUTLINE =
  'M15 34 L17 22 L24 13 L37 9 L52 7 L66 8 L78 10 L80 16 L84 24 L82 33 L86 43 L80 52 L72 60 L64 65 L56 64 L50 70 L43 66 L34 62 L24 58 L18 48 Z';

export default function NigeriaOperationalMap() {
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(REGIONS[0]);

  return (
    <div className="premium-card overflow-hidden">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="map-grid p-5 sm:p-8">
          <div className="mb-7 flex flex-wrap gap-2">
            {REGIONS.map((region) => {
              const active = selectedRegion.id === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`safe-focus rounded-[8px] border px-4 py-2.5 text-xs font-black uppercase tracking-[0.08em] transition-all duration-200 active:scale-[0.98] ${
                    active
                      ? 'border-frad-green-950 bg-frad-green-950 text-white shadow-[0_16px_30px_-24px_rgba(0,38,17,0.85)]'
                      : 'border-ink-950/12 bg-white/92 text-ink-950 hover:border-frad-green-800/45 hover:bg-frad-green-50'
                  }`}
                >
                  {region.name}
                </button>
              );
            })}
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-[38rem]">
            <svg viewBox="0 0 100 76" className="h-full w-full" role="img" aria-label="Simplified public map of Nigeria showing regional presence">
              <path
                d={NIGERIA_OUTLINE}
                fill="#ffffff"
                stroke="rgba(8, 17, 13, 0.5)"
                strokeWidth="0.9"
                strokeLinejoin="round"
              />
              {/* Rivers Niger and Benue, drawn as quiet context lines */}
              <path
                d="M20 30 C32 38 40 44 47 46 M80 27 C68 36 55 43 47 46 M47 46 C46 54 47 61 50 69"
                fill="none"
                stroke="rgba(0, 89, 40, 0.24)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            {REGIONS.map((region) => {
              const active = selectedRegion.id === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  style={{ left: `${region.coordinates.x}%`, top: `${region.coordinates.y}%` }}
                  className="safe-focus absolute -translate-x-1/2 -translate-y-1/2"
                  aria-label={`Select ${region.name}`}
                  aria-pressed={active}
                >
                  <span className={`block h-7 w-7 rounded-full border-2 border-white shadow-lg transition-transform ${active ? 'scale-110 bg-frad-red-600 ring-4 ring-white' : 'bg-frad-green-800 hover:scale-110'}`} />
                </button>
              );
            })}
            <p className="absolute bottom-0 left-0 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink-500">
              Regional presence only. No site-level detail.
            </p>
          </div>
        </div>

        <aside className="bg-frad-green-950 p-7 text-white sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-white/90">Selected region</p>
            <Stamp tone="white">Active</Stamp>
          </div>
          <h3 className="mt-5 text-4xl font-black leading-none text-white sm:text-5xl">{selectedRegion.name}</h3>
          <p className="mt-4 text-lg font-black text-frad-green-200">{selectedRegion.label}</p>
          <p className="mt-7 text-lg font-bold leading-8 text-white/78">{selectedRegion.summary}</p>
          <div className="mt-8 rounded-[8px] border border-white/14 bg-white/95 p-5 text-ink-950">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-frad-green-800">Programme focus</p>
            <p className="mt-3 text-base font-bold leading-7 text-ink-800">{selectedRegion.focus}</p>
          </div>
          <Link href={selectedRegion.href} className="safe-focus cta-button mt-8 border border-white bg-white text-ink-950 hover:bg-frad-green-100">
            Open region
          </Link>
        </aside>
      </div>
    </div>
  );
}
