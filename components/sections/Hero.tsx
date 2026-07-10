import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import HeroTransition from '@/components/sections/HeroTransition';
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
  const py = {
    full: 'py-24 lg:py-36',
    medium: 'py-20 lg:py-28',
    small: 'py-16 lg:py-24',
  };
  return (
    <section
      className={`hero-sculpt relative overflow-hidden bg-ink-950 ${py[size]}`}
      data-wp-slot={wordpressKey}
      data-wp-fields="headline,subtext,primaryCta,secondaryCta,tertiaryLink,backgroundImage,backgroundVideo"
    >
      <Image
        src={effectiveBackgroundImage}
        alt=""
        fill
        priority={size === 'full'}
        sizes="100vw"
        className="hero-media object-cover"
        aria-hidden="true"
      />
      {effectiveBackgroundVideo && (
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
          poster={effectiveBackgroundImage}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={effectiveBackgroundVideo} type="video/mp4" />
        </video>
      )}
      {overlay && (
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(8,17,13,0.88),rgba(8,17,13,0.64)_48%,rgba(8,17,13,0.22)),linear-gradient(180deg,rgba(8,17,13,0.12),rgba(8,17,13,0.76))]" />
      )}
      <div className="section-container relative z-10">
        <div className="motion-stagger grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="editorial-kicker text-frad-green-200">FRAD Foundation</p>
          </div>
          <div>
            <h1 className={`${size === 'full' ? 'display-title max-w-5xl' : 'section-title max-w-5xl'} text-white`}>{effectiveHeadline}</h1>
            {effectiveSubtext && <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-white/78">{effectiveSubtext}</p>}
            {(effectivePrimaryCta || secondaryCta || tertiaryLink) && (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {effectivePrimaryCta && <Button href={effectivePrimaryCta.href} variant="primary" size="lg">{effectivePrimaryCta.label}</Button>}
                {secondaryCta && (
                  <Button
                    href={secondaryCta.href}
                    variant="outline"
                    size="lg"
                    className="border-white/35 bg-white/8 text-white hover:bg-white hover:text-ink-950"
                  >
                    {secondaryCta.label}
                  </Button>
                )}
                {tertiaryLink && (
                  <Link
                    href={tertiaryLink.href}
                    className="safe-focus group inline-flex items-center gap-2 px-3 py-4 text-sm font-black uppercase tracking-[0.1em] text-white"
                  >
                    {tertiaryLink.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <HeroTransition />
    </section>
  );
}
