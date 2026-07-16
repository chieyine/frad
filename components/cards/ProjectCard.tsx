import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import Icon from '@/components/ui/Icon';

interface ProjectCardProps {
  title: string;
  slug: string;
  location: string;
  status: 'active' | 'completed' | 'planned';
  sectors: string[];
  donor?: string;
  summary: string;
  featuredImage?: string;
}

export default function ProjectCard({
  title,
  slug,
  location,
  status,
  sectors,
  donor,
  summary,
  featuredImage,
}: ProjectCardProps) {
  const statusVariant = status === 'active' ? 'green' : status === 'completed' ? 'muted' : 'blue';

  return (
    <div
      className="group card-base flex h-full flex-col overflow-hidden !p-0"
      data-wp-content-type="project"
      data-wp-slug={slug}
      data-wp-fields="title,location,status,sectors,donor,summary,featuredImage"
    >
      {/* Image */}
      <Link href={`/projects/${slug}`} className="relative block h-52 overflow-hidden bg-gradient-to-br from-frad-green-50 via-white to-frad-navy-50">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/62 to-transparent" />
        <div className="absolute left-4 top-4">
          <Badge variant={statusVariant} size="sm">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-ink-500">
            <Icon name="map-pin" className="h-3.5 w-3.5" />
            {location}
          </span>
        </div>
        <Link href={`/projects/${slug}`}>
          <h3 className="mb-3 line-clamp-2 text-xl font-extrabold leading-snug text-ink-950 transition-colors group-hover:text-frad-green-800">
            {title}
          </h3>
        </Link>
        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-7 text-ink-600">
          {summary}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {sectors.slice(0, 3).map((sector) => (
            <Badge key={sector} variant="green" size="sm">{sector}</Badge>
          ))}
        </div>
        {donor && (
          <p className="mt-4 border-t border-ink-950/10 pt-4 text-xs font-semibold text-ink-500">Supported by {donor}</p>
        )}
        <div className="mt-5 flex items-center justify-between border-t border-ink-950/10 pt-4 gap-2">
          <Link
            href={`/projects/${slug}`}
            className="safe-focus text-xs font-extrabold text-frad-green-800 transition hover:text-frad-green-900"
          >
            View Details →
          </Link>
          <Link
            href={`/donate?project=${slug}&sector=${sectors[0] || 'multi-sector'}`}
            className="safe-focus rounded-[6px] border border-frad-green-800 bg-frad-green-800 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white transition hover:bg-frad-green-900"
          >
            Fund Intervention
          </Link>
        </div>
      </div>
    </div>
  );
}
