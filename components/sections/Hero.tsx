import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { fetchContentSlot } from '@/lib/wordpress';
import { getHeroVideoForImage } from '@/lib/heroMedia';

interface HeroProps {
  headline: string;
  subtext?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryLink?: { label: string; href: string };
  backgroundImage?: string;
  backgroundVideo?: string;
  size?: 'full' | 'medium' | 'small';
  overlay?: boolean;
  wordpressKey?: string;
}

export default async function Hero({
  headline,
  subtext,
  primaryCta,
  secondaryCta,
  tertiaryLink,
  backgroundImage = '/images/frad-field-hero.jpg',
  backgroundVideo,
  size = 'medium',
  overlay = true,
  wordpressKey,
}: HeroProps) {
  const slot = wordpressKey ? await fetchContentSlot(wordpressKey).catch(() => null) : null;
  const effectiveHeadline = slot?.headline ?? headline;
  const effectiveSubtext = slot?.subtext ?? subtext;
  const effectiveBackgroundImage = slot?.image?.sourceUrl ?? backgroundImage;
  const effectiveBackgroundVideo = slot?.videoUrl ?? backgroundVideo ?? getHeroVideoForImage(effectiveBackgroundImage);
  const effectivePrimaryCta = slot?.ctaText && slot.ctaLink ? { label: slot.ctaText, href: slot.ctaLink } : primaryCta;
  const effectiveSecondaryCta = slot?.secondaryCtaText && slot.secondaryCtaLink ? { label: slot.secondaryCtaText, href: slot.secondaryCtaLink } : secondaryCta;
  const effectiveTertiaryLink = slot?.tertiaryLinkText && slot.tertiaryLinkUrl ? { label: slot.tertiaryLinkText, href: slot.tertiaryLinkUrl } : tertiaryLink;
  const py = {
    full: 'py-24 lg:py-36',
    medium: 'py-20 lg:py-28',
    small: 'py-16 lg:py-24',
  };
  return (
    <section
      className={`relative overflow-hidden border-b-4 border-frad-green-700 bg-ink-950 ${py[size]}`}
      data-wp-slot={wordpressKey}
      data-wp-fields="headline,subtext,primaryCta,secondaryCta,tertiaryLink,backgroundImage,backgroundVideo"
    >
      <Image
        src={effectiveBackgroundImage}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="hero-media object-cover"
        aria-hidden="true"
      />
      {effectiveBackgroundVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={effectiveBackgroundImage}
          className="hero-video absolute inset-0 h-full w-full object-cover opacity-35"
          aria-hidden="true"
        >
          <source src={effectiveBackgroundVideo} type="video/mp4" media="(min-width: 768px)" />
        </video>
      )}
      {overlay && <div className="absolute inset-0 z-[2] bg-ink-950/45" aria-hidden="true" />}
      <div className="section-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[13rem_1fr] lg:items-start">
          <div className="border-l border-white/20 pl-4 font-mono text-xs uppercase tracking-[0.16em] text-frad-green-300">
            FRAD Foundation
            <br />
            Northern Nigeria
          </div>
          <div>
            <h1 className={`${size === 'full' ? 'display-title max-w-5xl' : 'section-title max-w-5xl'} text-white`}>{effectiveHeadline}</h1>
            {effectiveSubtext && <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-white/78">{effectiveSubtext}</p>}
            {(effectivePrimaryCta || effectiveSecondaryCta || effectiveTertiaryLink) && (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {effectivePrimaryCta && <Button href={effectivePrimaryCta.href} variant="primary" size="lg">{effectivePrimaryCta.label}</Button>}
                {effectiveSecondaryCta && (
                  <Button
                    href={effectiveSecondaryCta.href}
                    variant="outline"
                    size="lg"
                    className="border-white/35 bg-white/8 text-white hover:bg-white hover:text-ink-950"
                  >
                    {effectiveSecondaryCta.label}
                  </Button>
                )}
                {effectiveTertiaryLink && (
                  <Link
                    href={effectiveTertiaryLink.href}
                    className="safe-focus group inline-flex items-center gap-2 px-3 py-4 text-sm font-black uppercase tracking-[0.1em] text-white"
                  >
                    {effectiveTertiaryLink.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
