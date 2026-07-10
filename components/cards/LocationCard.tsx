import Link from 'next/link';

interface LocationCardProps {
  title: string;
  description: string;
  href: string;
  accent?: 'green' | 'blue' | 'gold';
}

export default function LocationCard({ title, description, href, accent = 'green' }: LocationCardProps) {
  const accentClasses = {
    green: 'border-frad-green-800 bg-frad-green-800 text-white',
    blue: 'border-frad-blue-900 bg-frad-blue-900 text-white',
    gold: 'border-frad-green-800 bg-frad-green-800 text-white',
  };

  return (
    <Link href={href} className="evidence-card group flex h-full min-h-72 flex-col justify-between p-6">
      <div>
        <span className={`inline-flex rounded-[6px] border px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] ${accentClasses[accent]}`}>
          Public location
        </span>
        <h3 className="mt-6 text-2xl font-extrabold group-hover:text-frad-green-800">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-ink-600">{description}</p>
      </div>
      <span className="mt-8 border-t border-ink-950/10 pt-4 text-sm font-extrabold text-frad-green-800 transition-all group-hover:pl-1">
        Learn more
      </span>
    </Link>
  );
}
