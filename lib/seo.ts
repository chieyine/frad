import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: SEOProps): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

export function generateArticleMetadata({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  section,
}: SEOProps & { publishedTime?: string; modifiedTime?: string; section?: string }): Metadata {
  const base = generatePageMetadata({ title, description, path });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },
  };
}
