import Image from 'next/image';
import Link from 'next/link';
import Stamp from '@/components/ui/Stamp';
import { FEATURED_MEDIA, FEATURED_VIDEO_FRAMES, MEDIA_STANDARDS } from '@/lib/media';
import { fetchContentSlot, fetchMediaAssets } from '@/lib/wordpress';
import type { MediaAsset } from '@/types/content';

interface MediaShowcaseProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  compact?: boolean;
  wordpressKey?: string;
  assets?: MediaAsset[];
}

export default async function MediaShowcase({
  eyebrow = 'Media Library',
  title = 'Photography and video from our programmes.',
  description = 'Our visual documentation helps people understand FRAD programmes while protecting consent, privacy, and sensitive locations.',
  ctaHref = '/media',
  ctaLabel = 'Open media library',
  compact = false,
  wordpressKey,
  assets,
}: MediaShowcaseProps) {
  const slot = wordpressKey ? await fetchContentSlot(wordpressKey).catch(() => null) : null;
  const fetchedAssets = !assets && wordpressKey ? await fetchMediaAssets(4).catch(() => null) : null;

  const displayEyebrow = slot?.eyebrow ?? eyebrow;
  const displayTitle = slot?.headline ?? title;
  const displayDescription = slot?.subtext ?? description;
  const displayCtaHref = slot?.ctaLink ?? ctaHref;
  const displayCtaLabel = slot?.ctaText ?? ctaLabel;

  const normalizeMedia = (list: MediaAsset[]) =>
    list.map((a) => ({
      title: a.title,
      image: a.image ?? '/images/frad-field-hero.jpg',
      category: a.sector ?? 'Field Photo',
      location: a.location ?? 'Nigeria',
      caption: a.caption ?? a.title,
      alt: a.alt ?? a.title,
      type: a.mediaType === 'video' ? 'Video' : 'Photo',
    }));

  const activeMedia =
    assets && assets.length >= 4
      ? normalizeMedia(assets)
      : fetchedAssets && fetchedAssets.length >= 4
      ? normalizeMedia(fetchedAssets)
      : FEATURED_MEDIA;

  const lead = activeMedia[0];
  const supporting = activeMedia.slice(1);

  return (
    <section
      className={`section-shell ${compact ? 'py-12' : 'section-padding'}`}
      data-wp-slot={wordpressKey}
      data-wp-fields="eyebrow,headline,subtext,ctaLink,ctaText"
    >
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="editorial-kicker">{displayEyebrow}</p>
            <h2 className="section-title mt-6 max-w-4xl">{displayTitle}</h2>
          </div>
          <div>
            <p className="body-lead">{displayDescription}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {MEDIA_STANDARDS.map((standard) => (
                <span
                  key={standard}
                  className="rounded-[6px] border border-ink-950/10 bg-white/80 px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-ink-700"
                >
                  {standard}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.28fr_0.72fr]">
          <article className="cinematic-frame group min-h-[34rem] overflow-hidden bg-ink-950">
            <div className="relative h-full min-h-[34rem]">
              <Image
                src={lead.image}
                alt={lead.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,13,0.04),rgba(8,17,13,0.82)),linear-gradient(90deg,rgba(8,17,13,0.68),rgba(8,17,13,0.08))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-10">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-[6px] border border-white/20 bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-white">
                    {lead.type}
                  </span>
                  <span className="rounded-[6px] border border-white/20 bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-white">
                    {lead.location}
                  </span>
                </div>
                <h3 className="mt-5 max-w-2xl text-4xl font-black leading-[1.04] text-white sm:text-5xl">
                  {lead.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/78">
                  {lead.caption}
                </p>
                <div className="mt-5 flex gap-2">
                  <Stamp tone="white">Consent filed</Stamp>
                  <Stamp tone="white">Public</Stamp>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {supporting.map((item) => (
              <article key={item.title} className="group premium-card overflow-hidden !bg-white">
                <div className="grid min-h-64 sm:grid-cols-[0.92fr_1.08fr] lg:min-h-0 lg:grid-cols-1">
                  <div className="cinematic-frame relative min-h-56 overflow-hidden rounded-none">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/42 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-frad-green-800">
                      {item.type}, {item.location}
                    </p>
                    <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-ink-600">{item.caption}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {FEATURED_VIDEO_FRAMES.map((video) => (
            <Link
              key={video.title}
              href={displayCtaHref}
              className="cinematic-frame group block min-h-80 overflow-hidden"
            >
              <Image
                src={video.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                aria-hidden="true"
              />
              <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(8,17,13,0.08),rgba(8,17,13,0.82)),linear-gradient(90deg,rgba(8,17,13,0.56),rgba(8,17,13,0.1))]" />
              <div className="absolute inset-x-0 top-0 z-[4] flex items-center justify-between p-5">
                <span className="rounded-[6px] border border-white/20 bg-white/12 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.1em] text-white">
                  {video.eyebrow}
                </span>
                <span className="rounded-[6px] border border-white/20 bg-ink-950/42 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.1em] text-white">
                  {video.duration}
                </span>
              </div>
              <div className="absolute inset-0 z-[4] flex items-center justify-center">
                <span className="play-mark transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                  <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-current" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-[4] p-5 text-white">
                <h3 className="text-2xl font-black leading-tight text-white">{video.title}</h3>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-white/68">
                  Field documentation, filmed with consent
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink-950/10 pt-6">
          <p className="max-w-2xl text-sm font-semibold leading-7 text-ink-600">
            Every image and clip in this library is published with informed consent, captions, and location safety in
            mind, so partners and press can use it with confidence.
          </p>
          <Link href={displayCtaHref} className="safe-focus cta-button cta-primary">
            {displayCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
