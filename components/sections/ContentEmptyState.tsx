import Link from 'next/link';

interface ContentEmptyStateProps {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
}

export default function ContentEmptyState({
  eyebrow,
  title,
  description,
  href,
  actionLabel = 'Learn more',
}: ContentEmptyStateProps) {
  const body = (
    <div className="premium-card relative overflow-hidden p-7 sm:p-8">
      <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-frad-red-600" />
      <p className="text-xs font-black uppercase tracking-[0.14em] text-frad-green-800">{eyebrow}</p>
      <h3 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-ink-950">{title}</h3>
      <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-ink-600">{description}</p>
      {href && (
        <span className="mt-7 inline-flex border-t border-ink-950/10 pt-4 text-sm font-black uppercase tracking-[0.1em] text-frad-green-800">
          {actionLabel}
        </span>
      )}
    </div>
  );

  if (!href) return body;

  return (
    <Link href={href} className="safe-focus block">
      {body}
    </Link>
  );
}
