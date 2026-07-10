import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { SITE_URL } from '@/lib/constants';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      ...items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.label,
        ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="section-container py-4">
        <ol className="flex items-center gap-1.5 text-sm font-bold text-ink-600 flex-wrap">
          <li>
            <Link href="/" className="safe-focus hover:text-frad-green-700 transition-colors">
              Home
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <Icon name="chevron-right" className="h-3 w-3 text-ink-400/60" />
              {item.href ? (
                <Link href={item.href} className="safe-focus hover:text-frad-green-700 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-ink-800">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
