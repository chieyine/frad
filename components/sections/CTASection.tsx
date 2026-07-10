import Button from '@/components/ui/Button';

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'green' | 'blue' | 'neutral';
}

export default function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'green',
}: CTASectionProps) {
  const dark = variant !== 'neutral';
  const styles = {
    green: 'bg-ink-950 text-white',
    blue: 'bg-frad-navy-900 text-white',
    neutral: 'bg-paper-50 text-ink-950',
  };

  return (
    <section className="section-shell border-y border-ink-950/10">
      <div className={`grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14 ${styles[variant]}`}>
        <div>
          <p className={`text-xs font-black uppercase tracking-[0.12em] ${dark ? 'text-frad-green-400' : 'text-frad-green-800'}`}>
            FRAD Foundation
          </p>
          <h2 className={`mt-5 max-w-5xl text-4xl font-black leading-[1.02] sm:text-5xl lg:text-6xl ${dark ? 'text-white' : 'text-ink-950'}`}>
            {title}
          </h2>
          <p className={`mt-6 max-w-3xl text-lg font-bold leading-8 ${dark ? 'text-white/78' : 'text-ink-800'}`}>
            {description}
          </p>
        </div>
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap gap-3">
            {primaryCta && <Button href={primaryCta.href} variant="primary" size="lg">{primaryCta.label}</Button>}
            {secondaryCta && <Button href={secondaryCta.href} variant="outline" size="lg" className={dark ? 'border-white text-white hover:bg-white hover:text-ink-950' : ''}>{secondaryCta.label}</Button>}
          </div>
        )}
      </div>
    </section>
  );
}
