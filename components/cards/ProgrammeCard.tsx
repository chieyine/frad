import Link from 'next/link';
import Icon, { type IconName } from '@/components/ui/Icon';

interface ProgrammeCardProps {
  title: string;
  description: string;
  slug: string;
  icon?: IconName;
}

export default function ProgrammeCard({ title, description, slug, icon }: ProgrammeCardProps) {
  return (
    <Link
      href={`/what-we-do/${slug}`}
      className="evidence-card group flex h-full min-h-72 flex-col justify-between p-6"
      data-wp-content-type="sector"
      data-wp-slug={slug}
      data-wp-fields="title,description,icon,featuredImage,keyActivities"
    >
      <div>
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[8px] border border-frad-green-800/20 bg-frad-green-50 text-frad-green-900 transition-colors group-hover:border-frad-green-800/40 group-hover:bg-frad-green-100">
          {icon ? (
            <Icon name={icon} className="h-6 w-6" />
          ) : (
            <span className="text-sm font-extrabold">{title.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <h3 className="text-2xl font-extrabold group-hover:text-frad-green-800">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-ink-600">{description}</p>
      </div>
      <span className="mt-8 inline-flex items-center gap-2 border-t border-ink-950/10 pt-4 text-sm font-extrabold text-frad-green-800 transition-all group-hover:gap-3">
        Learn about this programme
      </span>
    </Link>
  );
}
