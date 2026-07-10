import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Icon from '@/components/ui/Icon';

interface JobCardProps {
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  deadline: string;
  status: 'open' | 'closed';
}

export default function JobCard({ title, slug, department, location, employmentType, deadline, status }: JobCardProps) {
  return (
    <Link href={`/careers/jobs/${slug}`} className="group card-base flex h-full flex-col gap-5 p-6 sm:flex-row sm:items-center">
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant={status === 'open' ? 'green' : 'muted'} size="sm">{status === 'open' ? 'Open' : 'Closed'}</Badge>
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-500">{employmentType}</span>
        </div>
        <h3 className="text-xl font-extrabold leading-snug text-ink-950 transition-colors group-hover:text-frad-green-700">{title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-ink-500">
          <span className="flex items-center gap-1.5">
            <Icon name="building" className="h-3.5 w-3.5" />
            {department}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="map-pin" className="h-3.5 w-3.5" />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="calendar" className="h-3.5 w-3.5" />
            Deadline: {deadline}
          </span>
        </div>
      </div>
      <div className="shrink-0">
        <span className="flex items-center gap-1 text-sm font-extrabold text-frad-green-800 transition-all group-hover:gap-2">
          View Details <Icon name="chevron-right" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
