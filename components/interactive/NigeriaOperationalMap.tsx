'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Stamp from '@/components/ui/Stamp';
import { NIGERIA_STATE_PATHS } from './NigeriaStateData';

export type RegionId = 'northeast' | 'northwest' | 'abuja' | 'all';

interface StateDetail {
  name: string;
  regionId: 'northeast' | 'northwest' | 'abuja' | 'monitoring';
  regionName: string;
  statusLabel: string;
  summary: string;
  focus: string;
  href: string;
  securitySensitive: boolean;
}

export const REGION_OVERVIEWS = {
  northeast: {
    title: 'Northeast Nigeria (BAY States)',
    subtitle: 'Borno, Adamawa, Yobe',
    summary: 'Multi-sector humanitarian and development programming across acute conflict and displacement corridors.',
    focus: 'Nutrition screening & OTP/SC, WASH infrastructure rehabilitation, protection, and emergency life-saving response.',
    href: '/where-we-work/northeast',
    securitySensitive: true,
  },
  northwest: {
    title: 'Northwest Nigeria Corridor',
    subtitle: 'Humanitarian response and resilience',
    summary: 'Nutrition, WASH, emergency response, and resilience programmes for communities affected by insecurity and displacement.',
    focus: 'Emergency nutrition surveillance, clean water systems, community resilience, and primary healthcare linkages.',
    href: '/where-we-work/northwest',
    securitySensitive: true,
  },
  abuja: {
    title: 'Abuja National Coordination',
    subtitle: 'Federal Capital Territory',
    summary: 'National coordination, partnerships, compliance, and organisational management.',
    focus: 'Donor alignment, cluster partnerships, policy compliance, and federal humanitarian advocacy.',
    href: '/where-we-work/abuja',
    securitySensitive: false,
  },
  monitoring: {
    title: 'Other states',
    subtitle: 'Partnership and coordination network',
    summary: 'FRAD maintains relationships with civil society and public institutions beyond its principal programme areas.',
    focus: 'Partnerships, information sharing, preparedness, and assessment support.',
    href: '/where-we-work',
    securitySensitive: false,
  },
};

const STATE_DETAILS: Record<string, StateDetail> = {
  // Northeast (BAY States - Core Frontline)
  Borno: {
    name: 'Borno State',
    regionId: 'northeast',
    regionName: 'Northeast Nigeria',
    statusLabel: 'Active programmes',
    summary: 'Nutrition, safe water, protection, and emergency assistance for displaced people and host communities.',
    focus: 'Outpatient Therapeutic Programme (OTP) support, stabilisation centre referrals, solar-powered boreholes, and gender-based violence (GBV) risk mitigation.',
    href: '/where-we-work/northeast',
    securitySensitive: true,
  },
  Adamawa: {
    name: 'Adamawa State',
    regionId: 'northeast',
    regionName: 'Northeast Nigeria',
    statusLabel: 'Active Operations',
    summary: 'Community health linkages, WASH facilities in schools and health centres, and livelihood recovery activities.',
    focus: 'Primary healthcare strengthening, community hygiene clubs, agricultural resilience, and psychosocial support.',
    href: '/where-we-work/northeast',
    securitySensitive: true,
  },
  Yobe: {
    name: 'Yobe State',
    regionId: 'northeast',
    regionName: 'Northeast Nigeria',
    statusLabel: 'Active Operations',
    summary: 'Targeted maternal and child nutrition screening, water infrastructure rehabilitation, and community hygiene promotion across vulnerable LGAs.',
    focus: 'Mid-Upper Arm Circumference (MUAC) surveillance, borehole rehabilitation, cholera prevention, and infant and young child feeding (IYCF).',
    href: '/where-we-work/northeast',
    securitySensitive: true,
  },

  // Northwest Corridor
  Sokoto: {
    name: 'Sokoto State',
    regionId: 'northwest',
    regionName: 'Northwest Nigeria',
    statusLabel: 'Active programmes',
    summary: 'Addressing severe pressure on primary health systems and rising acute malnutrition through practical community interventions.',
    focus: 'Severe Acute Malnutrition (SAM) treatment support, community water point upgrades, and local health facility equipping.',
    href: '/where-we-work/northwest',
    securitySensitive: true,
  },
  Zamfara: {
    name: 'Zamfara State',
    regionId: 'northwest',
    regionName: 'Northwest Nigeria',
    statusLabel: 'Active programmes',
    summary: 'Rapid humanitarian relief, community safeguarding, and protection monitoring for families affected by chronic insecurity and displacement.',
    focus: 'Emergency non-food items (NFIs), child protection committees, hygiene kit distributions, and safe water delivery.',
    href: '/where-we-work/northwest',
    securitySensitive: true,
  },
  Katsina: {
    name: 'Katsina State',
    regionId: 'northwest',
    regionName: 'Northwest Nigeria',
    statusLabel: 'Active programmes',
    summary: 'Community nutrition surveillance, WASH rehabilitation, and resilience building alongside local governance structures.',
    focus: 'Mother-led MUAC training, solar borehole installation, sanitation facility upgrading, and primary care linkages.',
    href: '/where-we-work/northwest',
    securitySensitive: true,
  },
  Kaduna: {
    name: 'Kaduna State',
    regionId: 'northwest',
    regionName: 'Northwest Nigeria',
    statusLabel: 'Active programmes',
    summary: 'Supporting displaced and conflict-affected households through youth livelihoods and community protection activities.',
    focus: 'Social cohesion, WASH facility maintenance, livelihood skill empowerment, and protection referral pathways.',
    href: '/where-we-work/northwest',
    securitySensitive: true,
  },
  Kano: {
    name: 'Kano State',
    regionId: 'northwest',
    regionName: 'Northwest Nigeria',
    statusLabel: 'Programme support',
    summary: 'Health system strengthening and hygiene promotion across urban and peri-urban high-density communities.',
    focus: 'Public health education, cholera preparedness, local partner capacity building, and supply chain coordination.',
    href: '/where-we-work/northwest',
    securitySensitive: false,
  },
  Kebbi: {
    name: 'Kebbi State',
    regionId: 'northwest',
    regionName: 'Northwest Nigeria',
    statusLabel: 'Active programmes',
    summary: 'Food security support, safe water access, and community nutrition counselling across riverine and rural communities.',
    focus: 'Safe water systems, nutrition counselling, community gardening, and hygiene promotion.',
    href: '/where-we-work/northwest',
    securitySensitive: true,
  },
  Jigawa: {
    name: 'Jigawa State',
    regionId: 'northwest',
    regionName: 'Northwest Nigeria',
    statusLabel: 'Emergency response and resilience',
    summary: 'Flood emergency response, environmental sanitation improvements, and disease outbreak prevention.',
    focus: 'Emergency WASH response, water chlorination, community health mobilisation, and flood mitigation.',
    href: '/where-we-work/northwest',
    securitySensitive: false,
  },

  // Abuja Coordination
  'Federal Capital Territory': {
    name: 'Federal Capital Territory (Abuja)',
    regionId: 'abuja',
    regionName: 'Abuja Coordination Hub',
    statusLabel: 'National Headquarters',
    summary: 'National coordination, donor relations, humanitarian coordination, and organisational compliance.',
    focus: 'Inter-agency cluster participation (WASH, Nutrition, Protection), national advocacy, donor reporting, and operational oversight.',
    href: '/where-we-work/abuja',
    securitySensitive: false,
  },
};

// Default fallback for any other state in Nigeria not explicitly detailed above
function getStateDetail(stateName: string): StateDetail {
  if (STATE_DETAILS[stateName]) {
    return STATE_DETAILS[stateName];
  }
  return {
    name: `${stateName} State`,
    regionId: 'monitoring',
    regionName: 'Partnership network',
    statusLabel: 'No programme details published',
    summary: `FRAD maintains relationships with civil society and public institutions in ${stateName} State.`,
    focus: 'Partnerships, information sharing, preparedness, and assessment support.',
    href: '/where-we-work',
    securitySensitive: false,
  };
}

export default function NigeriaOperationalMap() {
  const [selectedStateName, setSelectedStateName] = useState<string>('Borno');
  const [hoveredStateName, setHoveredStateName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'northeast' | 'northwest' | 'abuja' | 'all'>('northeast');
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const selectedState = getStateDetail(selectedStateName);
  const hoveredState = hoveredStateName ? getStateDetail(hoveredStateName) : null;

  const handleTabChange = (tab: 'northeast' | 'northwest' | 'abuja' | 'all') => {
    setActiveTab(tab);
    if (tab === 'northeast') setSelectedStateName('Borno');
    else if (tab === 'northwest') setSelectedStateName('Sokoto');
    else if (tab === 'abuja') setSelectedStateName('Federal Capital Territory');
  };

  const handleStateClick = (stateName: string) => {
    setSelectedStateName(stateName);
    const detail = getStateDetail(stateName);
    if (detail.regionId === 'northeast') setActiveTab('northeast');
    else if (detail.regionId === 'northwest') setActiveTab('northwest');
    else if (detail.regionId === 'abuja') setActiveTab('abuja');
    else setActiveTab('all');
  };

  const handleMouseMove = (e: React.MouseEvent, stateName: string) => {
    setHoveredStateName(stateName);
    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const tooltipHalfWidth = Math.min(152, Math.max(96, (rect.width - 24) / 2));
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;
      setTooltipPos({
        x: Math.min(Math.max(pointerX, tooltipHalfWidth + 12), rect.width - tooltipHalfWidth - 12),
        y: Math.max(pointerY, 142),
      });
    }
  };

  return (
    <div className="premium-card overflow-hidden shadow-2xl bg-white/95 border border-ink-950/10">
      {/* Top Region Filter Bar */}
      <div className="border-b border-ink-950/10 bg-paper-100/60 px-5 py-4 sm:px-8 sm:py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] text-frad-green-800 block mb-1">
            Where we work
          </span>
          <h3 className="text-lg sm:text-xl font-black text-ink-950">
            Select a state or region to learn more
          </h3>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
          {[
            { id: 'northeast', label: 'Northeast (BAY States)', count: '3 states' },
            { id: 'northwest', label: 'Northwest Corridor', count: '7 states' },
            { id: 'abuja', label: 'Abuja Hub', count: 'HQ' },
            { id: 'all', label: 'All Nigeria', count: '36 states + FCT' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id as RegionId)}
                aria-pressed={active}
                className={`safe-focus flex items-center justify-between gap-2 rounded-[8px] border px-3.5 py-2 text-left text-xs font-black uppercase tracking-[0.06em] transition-all duration-200 active:scale-[0.98] ${
                  active
                    ? 'border-frad-green-950 bg-frad-green-950 text-white shadow-md'
                    : 'border-ink-950/14 bg-white/90 text-ink-950 hover:border-frad-green-800/40 hover:bg-frad-green-50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`rounded px-1.5 py-0.5 text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-charcoal-100 text-ink-700'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        {/* Interactive Map Area */}
        <div className="map-grid relative flex flex-col justify-between bg-gradient-to-b from-paper-100/40 to-paper-200/50 p-4 sm:p-6 lg:p-8">
          <div ref={mapContainerRef} className="relative mx-auto my-auto w-full max-w-[44rem]">
            {/* Real SVG Map of Nigeria */}
            <svg
              viewBox="0 0 800 650"
              className="w-full h-auto max-h-[520px] drop-shadow-xl select-none"
              role="group"
              aria-label="Interactive map of Nigeria showing all states and active FRAD operational presence"
            >
              <defs>
                <linearGradient id="bayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0a4d2e" />
                  <stop offset="100%" stopColor="#042617" />
                </linearGradient>
                <linearGradient id="nwGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0d7a48" />
                  <stop offset="100%" stopColor="#0a5c36" />
                </linearGradient>
                <linearGradient id="abujaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#042617" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Draw each state polygon */}
              {NIGERIA_STATE_PATHS.map((state) => {
                const detail = getStateDetail(state.name);
                const isSelected = selectedStateName === state.name;
                const isHovered = hoveredStateName === state.name;
                const isNortheast = detail.regionId === 'northeast';
                const isNorthwest = detail.regionId === 'northwest';
                const isAbuja = detail.regionId === 'abuja';
                const isImplementationState = isNortheast || isNorthwest || isAbuja;

                // Determine styling based on operational tier and active filter
                let fillStyle = '#e8efeB'; // neutral clean base for non-active states
                let strokeStyle = '#bccfc5';
                let strokeWidth = '1.2';
                let opacity = 1;

                if (isNortheast) {
                  fillStyle = isSelected || isHovered ? '#0f6e42' : 'url(#bayGradient)';
                  strokeStyle = '#ffffff';
                  strokeWidth = isSelected ? '2.5' : '1.8';
                } else if (isNorthwest) {
                  fillStyle = isSelected || isHovered ? '#169c5e' : 'url(#nwGradient)';
                  strokeStyle = '#ffffff';
                  strokeWidth = isSelected ? '2.5' : '1.8';
                } else if (isAbuja) {
                  fillStyle = isSelected || isHovered ? '#d97706' : 'url(#abujaGradient)';
                  strokeStyle = '#ffffff';
                  strokeWidth = isSelected ? '2.5' : '1.8';
                }

                if (isSelected) {
                  strokeWidth = '3';
                  strokeStyle = '#ff3838';
                } else if (isHovered && !isImplementationState) {
                  fillStyle = '#d4e2da';
                  strokeStyle = '#0f6e42';
                }

                // If tab filter is applied, dim states not matching the tab
                if (activeTab !== 'all' && detail.regionId !== activeTab && activeTab !== detail.regionId) {
                  opacity = isSelected ? 1 : 0.45;
                }

                return (
                  <g key={state.name} className="cursor-pointer transition-all duration-300">
                    <path
                      d={state.path}
                      role="button"
                      tabIndex={0}
                      aria-label={`${detail.name}: ${detail.statusLabel}`}
                      aria-pressed={isSelected}
                      fill={fillStyle}
                      stroke={strokeStyle}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      opacity={opacity}
                      filter={isSelected || (isHovered && isImplementationState) ? 'url(#glow)' : undefined}
                      onClick={() => handleStateClick(state.name)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          handleStateClick(state.name);
                        }
                      }}
                      onMouseMove={(e) => handleMouseMove(e, state.name)}
                      onMouseLeave={() => {
                        setHoveredStateName(null);
                        setTooltipPos(null);
                      }}
                      className="transition-all duration-200 hover:opacity-100 focus:outline-none focus:stroke-frad-red-600"
                    />
                  </g>
                );
              })}

              {/* Draw active operational centroid markers on top */}
              {NIGERIA_STATE_PATHS.map((state) => {
                const detail = getStateDetail(state.name);
                const isSelected = selectedStateName === state.name;
                const isNortheast = detail.regionId === 'northeast';
                const isNorthwest = detail.regionId === 'northwest';
                const isAbuja = detail.regionId === 'abuja';

                if (!isNortheast && !isNorthwest && !isAbuja && !isSelected) return null;

                let markerColor = '#10b981';
                if (isNortheast) markerColor = '#ef4444'; // Red alert / high priority frontline
                else if (isAbuja) markerColor = '#f59e0b'; // Amber coordination
                else if (isNorthwest) markerColor = '#34d399'; // Emerald corridor

                return (
                  <g
                    key={`marker-${state.name}`}
                    transform={`translate(${state.centroid.x}, ${state.centroid.y})`}
                    onClick={() => handleStateClick(state.name)}
                    className="cursor-pointer pointer-events-none"
                  >
                    {/* Ping animation for selected or high-priority frontline states */}
                    {(isSelected || isNortheast || isAbuja) && (
                      <circle
                        r={isSelected ? '16' : '12'}
                        fill={markerColor}
                        opacity="0.35"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      r={isSelected ? '7' : '5'}
                      fill={markerColor}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="shadow-lg transition-transform duration-200"
                    />
                    {/* State code or short label on major hubs */}
                    {(isSelected || isNortheast || isAbuja || state.name === 'Sokoto') && (
                      <text
                        y="-11"
                        textAnchor="middle"
                        className="fill-ink-950 font-black text-[10px] uppercase tracking-wider drop-shadow-md select-none pointer-events-none"
                        style={{ fontSize: isSelected ? '12px' : '10px', fontWeight: 900 }}
                      >
                        {state.name === 'Federal Capital Territory' ? 'ABUJA' : state.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Floating Tooltip when hovering over a state */}
            {hoveredState && tooltipPos && (
              <div
                className="pointer-events-none absolute z-30 hidden w-72 max-w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-xl border border-white/15 bg-ink-950/95 px-4 py-3.5 text-white shadow-2xl backdrop-blur-md sm:block"
                style={{ left: tooltipPos.x, top: tooltipPos.y }}
              >
                <div className="mb-2 flex items-start justify-between gap-3 border-b border-white/15 pb-2">
                  <span className="text-sm font-black leading-5 text-white">{hoveredState.name}</span>
                  <span className="shrink-0 rounded bg-frad-green-800 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-frad-green-100">
                    {hoveredState.regionId === 'northeast'
                      ? 'Northeast'
                      : hoveredState.regionId === 'northwest'
                        ? 'Northwest'
                        : hoveredState.regionId === 'abuja'
                          ? 'Coordination Hub'
                          : 'Partner network'}
                  </span>
                </div>
                <p className="text-xs font-bold leading-5 text-frad-green-200">{hoveredState.statusLabel}</p>
                <p className="mt-1 text-xs leading-5 text-white/80">{hoveredState.summary}</p>
                <p className="mt-2.5 text-[10px] font-black uppercase tracking-[0.1em] text-amber-300">
                  Select for programme details →
                </p>
              </div>
            )}
          </div>

          {/* Map Legend & Footnote */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-ink-950/10 bg-white/80 p-3.5 sm:px-5 backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold text-ink-800">
              <div className="flex items-center gap-2">
                <span className="block h-3.5 w-3.5 rounded-full bg-[#0a4d2e] border border-white shadow-sm" />
                <span>Northeast (BAY States)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="block h-3.5 w-3.5 rounded-full bg-[#0d7a48] border border-white shadow-sm" />
                <span>Northwest Corridor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="block h-3.5 w-3.5 rounded-full bg-[#b45309] border border-white shadow-sm" />
                <span>Abuja Coordination</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="block h-3.5 w-3.5 rounded-full bg-[#e8efeB] border border-[#bccfc5] shadow-sm" />
                <span>Partner network</span>
              </div>
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink-500">
              State boundaries shown for geographic reference
            </p>
          </div>
        </div>

        {/* Right Operations Side Panel */}
        <aside aria-live="polite" className="flex flex-col justify-between border-t border-ink-950/20 bg-frad-green-950 p-6 text-white sm:p-8 lg:border-l lg:border-t-0">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-frad-green-300">
                  {selectedState.regionName}
                </p>
                <span className="mt-0.5 inline-block text-xs font-black uppercase tracking-wider text-white/90">
                  {selectedState.statusLabel}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Stamp tone="white">{selectedState.regionId === 'monitoring' ? 'Partner network' : 'Active'}</Stamp>
                {selectedState.securitySensitive && (
                  <span className="rounded-full bg-red-600/30 border border-red-400/80 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-red-200">
                    Location protected
                  </span>
                )}
              </div>
            </div>

            <h3 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
              {selectedState.name}
            </h3>

            {/* Quick state selector pills inside region */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Object.values(STATE_DETAILS)
                .filter((s) => s.regionId === selectedState.regionId)
                .map((st) => (
                  <button
                    key={st.name}
                    type="button"
                    onClick={() => setSelectedStateName(st.name.replace(' State', '').replace(' (Abuja)', ''))}
                    className={`rounded px-2.5 py-1 text-[11px] font-black tracking-wide transition-all ${
                      selectedStateName === st.name.replace(' State', '').replace(' (Abuja)', '')
                        ? 'bg-white text-frad-green-950 shadow-md'
                        : 'bg-frad-green-900/80 text-frad-green-100 hover:bg-frad-green-800'
                    }`}
                  >
                    {st.name.replace(' State', '').replace(' (Abuja)', '')}
                  </button>
                ))}
            </div>

            {selectedState.securitySensitive && (
              <div className="mt-5 rounded-xl border border-amber-400/40 bg-amber-500/10 p-3.5 text-xs leading-6 text-amber-200 shadow-inner">
                <strong className="font-extrabold uppercase tracking-wide block mb-0.5 text-amber-300">
                  Location privacy
                </strong>
                Exact programme sites are not published where disclosure could place community members, staff, or services at risk.
              </div>
            )}

            <p className="mt-6 text-base font-bold leading-7 text-white/85">
              {selectedState.summary}
            </p>

            <div className="mt-6 rounded-xl border border-white/15 bg-white/95 p-5 text-ink-950 shadow-lg">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-frad-green-800">
                Programme focus
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-ink-800">
                {selectedState.focus}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Link
              href={selectedState.href}
              className="safe-focus cta-button flex-1 text-center justify-center border border-white bg-white text-ink-950 hover:bg-frad-green-100 font-black tracking-wider uppercase text-xs py-3.5 shadow-xl transition-transform active:scale-[0.99]"
            >
              Learn more about this region &rarr;
            </Link>
            <Link
              href="/where-we-work"
              className="safe-focus rounded-lg border border-white/25 bg-transparent px-4 py-3.5 text-center text-xs font-black uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
            >
              View all locations
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
