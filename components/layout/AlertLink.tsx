'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { trackAlertClick } from '@/lib/analytics';

export default function AlertLink({
  href,
  title,
  ctaText,
}: {
  href: string;
  title: string;
  ctaText: string;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackAlertClick(title)}
      className="inline-flex items-center border border-white bg-white px-3 py-1 text-sm font-black text-ink-950 transition-colors hover:bg-ink-950 hover:text-white whitespace-nowrap"
    >
      {ctaText}
      <Icon name="chevron-right" className="ml-1 h-3 w-3" strokeWidth={2} />
    </Link>
  );
}
