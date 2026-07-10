import Image from 'next/image';
import Link from 'next/link';
import Stamp from '@/components/ui/Stamp';
import { fetchContentSlot } from '@/lib/wordpress';

interface ExhibitMeta {
  location: string;
  subject: string;
  handling?: string;
  stamps?: Array<{ label: string; tone?: 'green' | 'red' }>;
}

interface VisualFeatureProps {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  caption: string;
  href?: string;
  actionLabel?: string;
  isVideo?: boolean;
  duration?: string;
  wordpressKey?: string;
  priority?: boolean;
  /* Filed-metadata panel below the frame: treats the photo as an exhibit
     with location, subject, handling note, and status stamps. */
  exhibit?: ExhibitMeta;
}

export default async function VisualFeature({
  image,
  alt,
  eyebrow,
  title,
  caption,
  href,
  actionLabel = 'View more',
  isVideo = false,
  duration,
  wordpressKey,
  priority = false,
  exhibit,
}: VisualFeatureProps) {
  const slot = wordpressKey ? await fetchContentSlot(wordpressKey).catch(() => null) : null;
  const effectiveImage = slot?.image?.sourceUrl ?? image;
  const effectiveAlt = slot?.image?.altText ?? alt;
  const effectiveEyebrow = slot?.eyebrow ?? eyebrow;
  const effectiveTitle = slot?.headline ?? title;
  const effectiveCaption = slot?.caption ?? slot?.subtext ?? caption;
  const effectiveHref = slot?.ctaLink ?? href;
  const effectiveActionLabel = slot?.ctaText ?? actionLabel;

  const frame = (
    <article
      className={`cinematic-frame group min-h-[26rem] overflow-hidden ${exhibit ? 'rounded-b-none' : ''}`}
      data-wp-slot={wordpressKey}
      data-wp-fields="image,alt,eyebrow,title,caption,href,videoUrl,duration"
    >
      <Image
        src={effectiveImage}
        alt={effectiveAlt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(8,17,13,0.04),rgba(8,17,13,0.82)),linear-gradient(90deg,rgba(8,17,13,0.62),rgba(8,17,13,0.12))]" />
      <div className="absolute inset-x-0 top-0 z-[4] flex items-center justify-between p-5">
        <span className="rounded-[6px] border border-white/20 bg-white/12 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.1em] text-white">
          {effectiveEyebrow}
        </span>
        {duration && (
          <span className="rounded-[6px] border border-white/20 bg-ink-950/42 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.1em] text-white">
            {duration}
          </span>
        )}
      </div>
      {isVideo && (
        <div className="absolute inset-0 z-[4] flex items-center justify-center">
          <span className="play-mark transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
            <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-current" />
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 z-[4] p-6 text-white sm:p-8">
        <h3 className="max-w-2xl text-3xl font-black leading-[1.04] text-white sm:text-4xl">{effectiveTitle}</h3>
        <p className="mt-4 max-w-xl text-sm font-semibold leading-7 text-white/76 sm:text-base">{effectiveCaption}</p>
        {effectiveHref && (
          <span className="mt-6 inline-flex text-sm font-black uppercase tracking-[0.1em] text-frad-green-200">
            {effectiveActionLabel}
          </span>
        )}
      </div>
    </article>
  );

  const content = exhibit ? (
    <div>
      {frame}
      <div className="rounded-b-[8px] border border-t-0 border-ink-950/15 bg-white px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <dl className="grid flex-1 gap-x-8 gap-y-2 font-mono text-xs leading-5 sm:grid-cols-2">
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-ink-500">Location</dt>
              <dd className="mt-0.5 font-bold text-ink-900">{exhibit.location}</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-ink-500">Subject</dt>
              <dd className="mt-0.5 font-bold text-ink-900">{exhibit.subject}</dd>
            </div>
            {exhibit.handling && (
              <div className="sm:col-span-2">
                <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-ink-500">Handling</dt>
                <dd className="mt-0.5 text-ink-700">{exhibit.handling}</dd>
              </div>
            )}
          </dl>
          {exhibit.stamps && exhibit.stamps.length > 0 && (
            <div className="flex shrink-0 gap-2">
              {exhibit.stamps.map((stamp) => (
                <Stamp key={stamp.label} tone={stamp.tone ?? 'green'}>
                  {stamp.label}
                </Stamp>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    frame
  );

  if (!effectiveHref) {
    return content;
  }

  return (
    <Link href={effectiveHref} className="safe-focus block">
      {content}
    </Link>
  );
}
