import CountUp from '@/components/interactive/CountUp';
import SourceMark from '@/components/ui/SourceMark';

interface ImpactStatCardProps {
  number: string;
  label: string;
  period?: string;
  /* Count the numeral up on first view; keep off for years and codes. */
  countUp?: boolean;
  /* Evidence footnote linking the figure to what substantiates it. */
  source?: { index: number; href: string; label: string };
}

export default function ImpactStatCard({ number, label, period, countUp = false, source }: ImpactStatCardProps) {
  return (
    <div
      className="group relative min-h-48 bg-white p-6 transition-colors hover:bg-frad-green-50/70"
      data-wp-content-type="impactStat"
      data-wp-fields="number,label,period,sector,location,source,approved"
    >
      <div className="absolute right-5 top-5 h-2 w-2 rounded-full bg-frad-red-600 opacity-80" />
      <div className="font-heading text-5xl font-extrabold tabular-nums tracking-tight text-frad-green-900 sm:text-6xl">
        {countUp ? <CountUp value={number} /> : number}
        {source && <SourceMark index={source.index} href={source.href} label={source.label} />}
      </div>
      <div className="mt-5 border-t border-ink-950/10 pt-4 text-base font-extrabold text-ink-950">{label}</div>
      {period && (
        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-500">
          {period}
        </div>
      )}
    </div>
  );
}
