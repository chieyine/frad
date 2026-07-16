import Link from 'next/link';
import { fetchContentSlot } from '@/lib/wordpress';

const DEFAULT_ITEMS = [
  ['Safeguarding and PSEA', 'Zero tolerance for exploitation and abuse, with confidential reporting channels open to communities and staff.'],
  ['Complaints and feedback', 'Every community we work with can reach us directly. Feedback is confidential, free, and acted on.'],
  ['Results and reporting', 'Published programme figures include a reporting period, location, and available source information.'],
];

interface AccountabilityMeterProps {
  wordpressKey?: string;
  eyebrow?: string;
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  items?: Array<{ title: string; description: string }>;
}

export default async function AccountabilityTransparencyMeter({
  wordpressKey = 'home.accountability_meter',
  eyebrow,
  headline,
  subtext,
  ctaText,
  ctaLink,
  items,
}: AccountabilityMeterProps = {}) {
  const slot = wordpressKey ? await fetchContentSlot(wordpressKey).catch(() => null) : null;

  const displayEyebrow = eyebrow ?? slot?.eyebrow ?? 'Accountability';
  const displayHeadline = headline ?? slot?.headline ?? 'Accountability guides how we work.';
  const displaySubtext =
    subtext ??
    slot?.subtext ??
    'Safeguarding, community feedback, complaints handling, and transparent reporting are part of programme design and delivery across FRAD.';
  const displayCtaText = ctaText ?? slot?.ctaText ?? 'View accountability';
  const displayCtaLink = ctaLink ?? slot?.ctaLink ?? '/about/accountability';

  const displayItems =
    items && items.length > 0
      ? items.map((item) => [item.title, item.description])
      : slot?.slotItems && slot.slotItems.length > 0
      ? slot.slotItems.map((item) => [item.title ?? '', item.description ?? ''])
      : DEFAULT_ITEMS;

  return (
    <div className="premium-card overflow-hidden" data-wp-slot={wordpressKey}>
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-frad-green-950 p-7 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-white/90">{displayEyebrow}</p>
          <h2 className="mt-6 text-4xl font-black leading-[1.02] text-white sm:text-6xl">
            {displayHeadline}
          </h2>
          <p className="mt-8 text-lg font-bold leading-8 text-white/78">
            {displaySubtext}
          </p>
          <Link
            href={displayCtaLink}
            className="safe-focus cta-button mt-10 border border-white bg-white text-ink-950 hover:bg-frad-green-100"
          >
            {displayCtaText}
          </Link>
        </div>
        <div className="grid gap-4 bg-paper-100 p-5 sm:p-7">
          {displayItems.map(([title, copy], index) => (
            <div key={title} className="rounded-[8px] border border-ink-950/10 bg-white p-6 shadow-[0_16px_34px_-30px_rgba(8,17,13,0.28)]">
              <p className="font-heading text-4xl font-black text-frad-green-800">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-2xl font-black">{title}</h3>
              <p className="mt-3 text-base font-bold leading-7 text-ink-700">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
