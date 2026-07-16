import Button from '@/components/ui/Button';
import { fetchContentSlot } from '@/lib/wordpress';

interface CTASectionProps {
  wordpressKey?: string;
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'green' | 'blue' | 'neutral';
}

export default async function CTASection({
  wordpressKey,
  title = 'Support Nigerian-led humanitarian action.',
  description = 'Partner with FRAD to support community-led humanitarian and development programmes across Northeast and Northwest Nigeria.',
  primaryCta,
  secondaryCta,
  variant = 'green',
}: CTASectionProps = {}) {
  const slot = wordpressKey ? await fetchContentSlot(wordpressKey).catch(() => null) : null;

  const displayTitle = slot?.headline ?? title;
  const displayDescription = slot?.subtext ?? description;
  const displayPrimaryCta =
    slot?.ctaText && slot?.ctaLink
      ? { label: slot.ctaText, href: slot.ctaLink }
      : primaryCta;
  const displaySecondaryCta =
    slot?.secondaryCtaText && slot?.secondaryCtaLink
      ? { label: slot.secondaryCtaText, href: slot.secondaryCtaLink }
      : secondaryCta;

  const dark = variant !== 'neutral';
  const styles = {
    green: 'bg-ink-950 text-white',
    blue: 'bg-frad-navy-900 text-white',
    neutral: 'bg-paper-50 text-ink-950',
  };

  return (
    <section className="section-shell border-y border-ink-950/10" data-wp-slot={wordpressKey}>
      <div className="section-container py-6 sm:py-8">
        <div className={`grid overflow-hidden rounded-xl gap-8 p-7 shadow-[0_30px_90px_-55px_rgba(8,17,13,0.62)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14 ${styles[variant]}`}>
          <div>
            <p className={`text-xs font-black uppercase tracking-[0.12em] ${dark ? 'text-frad-green-400' : 'text-frad-green-800'}`}>
              FRAD Foundation
            </p>
            <h2 className={`mt-5 max-w-5xl text-4xl font-black leading-[1.02] sm:text-5xl lg:text-6xl ${dark ? 'text-white' : 'text-ink-950'}`}>
              {displayTitle}
            </h2>
            <p className={`mt-6 max-w-3xl text-lg font-bold leading-8 ${dark ? 'text-white/78' : 'text-ink-800'}`}>
              {displayDescription}
            </p>
          </div>
          {(displayPrimaryCta || displaySecondaryCta) && (
            <div className="flex flex-wrap gap-3">
              {displayPrimaryCta && <Button href={displayPrimaryCta.href} variant="primary" size="lg">{displayPrimaryCta.label}</Button>}
              {displaySecondaryCta && <Button href={displaySecondaryCta.href} variant="outline" size="lg" className={dark ? 'border-white text-white hover:bg-white hover:text-ink-950' : ''}>{displaySecondaryCta.label}</Button>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
