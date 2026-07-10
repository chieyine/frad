import Link from 'next/link';
import Stamp from '@/components/ui/Stamp';

interface DossierRow {
  label: string;
  value: string;
}

interface EvidenceDossierProps {
  eyebrow?: string;
  title: string;
  summary: string;
  rows: DossierRow[];
  href?: string;
  actionLabel?: string;
}

export default function EvidenceDossier({
  eyebrow = 'Evidence dossier',
  title,
  summary,
  rows,
  href,
  actionLabel = 'Open record',
}: EvidenceDossierProps) {
  return (
    <div className="premium-card overflow-hidden">
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-ink-950 p-7 text-white sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-frad-green-200">{eyebrow}</p>
            <Stamp tone="white">Verified path</Stamp>
          </div>
          <h3 className="mt-6 text-4xl font-black leading-[1.04] text-white">{title}</h3>
          <p className="mt-6 text-base font-semibold leading-8 text-white/74">{summary}</p>
          {href && (
            <Link href={href} className="safe-focus cta-button mt-8 border border-white bg-white text-ink-950 hover:bg-frad-green-100">
              {actionLabel}
            </Link>
          )}
        </div>
        <dl className="grid gap-px bg-ink-950/10 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="bg-white p-5">
              <dt className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-ink-500">{row.label}</dt>
              <dd className="mt-2 text-base font-extrabold leading-7 text-ink-950">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
