import Link from 'next/link';

interface LocationCardProps {
  title: string;
  description: string;
  href: string;
  accent?: 'green' | 'blue' | 'gold';
  securitySensitive?: boolean;
}

export default function LocationCard({ title, description, href, accent = 'green', securitySensitive = false }: LocationCardProps) {
  const accentClasses = {
    green: 'border-frad-green-800 bg-frad-green-800 text-white',
    blue: 'border-frad-blue-900 bg-frad-blue-900 text-white',
    gold: 'border-frad-green-800 bg-frad-green-800 text-white',
  };

  return (
    <Link href={href} className="evidence-card group flex h-full min-h-72 flex-col justify-between p-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex rounded-[6px] border px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] ${accentClasses[accent]}`}>
            {securitySensitive ? 'Restricted zone' : 'Public location'}
          </span>
          {securitySensitive && (
            <span className="inline-flex rounded-[6px] border border-red-700/30 bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-800">
              Safehouse Obfuscated
            </span>
          )}
        </div>
        <h3 className="mt-6 text-2xl font-extrabold group-hover:text-frad-green-800">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-ink-600">
          {securitySensitive
            ? `${description} (Exact field coordinates obfuscated to regional centroid under safeguarding protocol).`
            : description}
        </p>
      </div>
      <span className="mt-8 border-t border-ink-950/10 pt-4 text-sm font-extrabold text-frad-green-800 transition-all group-hover:pl-1">
        Learn more
      </span>
    </Link>
  );
}
