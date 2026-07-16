import Link from 'next/link';
import Stamp from '@/components/ui/Stamp';
import { fetchContentSlot } from '@/lib/wordpress';

interface DossierRow {
  label: string;
  value: string;
}

interface EvidenceDossierProps {
  wordpressKey?: string;
  eyebrow?: string;
  title: string;
  summary: string;
  rows: DossierRow[];
  href?: string;
  actionLabel?: string;
}

export default async function EvidenceDossier({
  wordpressKey,
  eyebrow = 'Programme information',
  title,
  summary,
  rows,
  href,
  actionLabel = 'Open record',
}: EvidenceDossierProps) {
  const slot = wordpressKey ? await fetchContentSlot(wordpressKey).catch(() => null) : null;

  const displayEyebrow = slot?.eyebrow ?? eyebrow;
  const displayTitle = slot?.headline ?? title;
  const displaySummary = slot?.subtext ?? summary;
  const displayHref = slot?.ctaLink ?? href;
  const displayActionLabel = slot?.ctaText ?? actionLabel;

  const displayRows =
    slot?.slotItems && slot.slotItems.length > 0
      ? slot.slotItems.map((item) => ({
          label: item.label ?? item.title ?? '',
          value: item.value ?? item.description ?? '',
        }))
      : rows;

  return (
    <div className="premium-card overflow-hidden" data-wp-slot={wordpressKey}>
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-ink-950 p-7 text-white sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-frad-green-200">{displayEyebrow}</p>
            <Stamp tone="white">FRAD Foundation</Stamp>
          </div>
          <h3 className="mt-6 text-4xl font-black leading-[1.04] text-white">{displayTitle}</h3>
          <p className="mt-6 text-base font-semibold leading-8 text-white/74">{displaySummary}</p>
          {displayHref && (
            <Link href={displayHref} className="safe-focus cta-button mt-8 border border-white bg-white text-ink-950 hover:bg-frad-green-100">
              {displayActionLabel}
            </Link>
          )}
        </div>
        <dl className="grid gap-px bg-ink-950/10 sm:grid-cols-2">
          {displayRows.map((row) => (
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
