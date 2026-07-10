import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';

interface StoryCardProps {
  title: string;
  slug: string;
  location?: string;
  sector?: string;
  summary: string;
  featuredImage?: string;
  date?: string;
}

export default function StoryCard({
  title,
  slug,
  location,
  sector,
  summary,
  featuredImage,
  date,
}: StoryCardProps) {
  return (
    <Link
      href={`/stories/${slug}`}
      className="group card-base flex h-full flex-col overflow-hidden !p-0"
      data-wp-content-type="story"
      data-wp-slug={slug}
      data-wp-fields="title,location,sector,summary,featuredImage,date,consentStatus"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-gradient-to-br from-frad-green-50 via-white to-paper-100">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg className="h-12 w-12 text-frad-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950/58 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-ink-500">
          {sector && <span className="text-frad-green-800 font-extrabold">{sector}</span>}
          {location && (
            <>
              <span className="w-1 h-1 rounded-full bg-ink-400/50" />
              <span>{location}</span>
            </>
          )}
          {date && (
            <>
              <span className="w-1 h-1 rounded-full bg-ink-400/50" />
              <span>{date}</span>
            </>
          )}
        </div>
        <h3 className="mb-3 line-clamp-2 text-2xl font-extrabold leading-snug text-ink-950 transition-colors group-hover:text-frad-green-800">
          {title}
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-7 text-ink-600">
          {summary}
        </p>
        <div className="mt-6 flex items-center gap-2 border-t border-ink-950/10 pt-4 text-sm font-extrabold text-frad-green-800 transition-all group-hover:gap-3">
          Read story
          <Icon name="chevron-right" className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
