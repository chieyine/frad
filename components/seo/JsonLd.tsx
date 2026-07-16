import React from 'react';

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Serialize data for embedding in a <script> tag. JSON.stringify does not
 * escape HTML-significant characters, so a value containing `</script>` (e.g.
 * CMS-authored titles) could break out of the tag. Escape `< > &` plus the JS
 * line/paragraph separators (U+2028/U+2029) to \u sequences. The separators are
 * built with String.fromCharCode so no invisible characters live in source.
 */
const JSON_LD_UNSAFE = new RegExp(
  '[<>&' + String.fromCharCode(0x2028) + String.fromCharCode(0x2029) + ']',
  'g'
);

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    JSON_LD_UNSAFE,
    (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')
  );
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NonprofitOrganization',
    name: 'FRAD Foundation',
    alternateName: 'First Resilience and Development Foundation',
    url: 'https://fradfoundation.org',
    logo: 'https://fradfoundation.org/images/frad-logo.jpg',
    description: 'Locally led, multi-sector humanitarian and development organisation across Northeast and Northwest Nigeria.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abuja',
      addressRegion: 'Federal Capital Territory',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      url: 'https://fradfoundation.org/contact',
      contactType: 'general enquiries and safeguarding feedback',
      areaServed: 'NG',
      availableLanguage: ['English', 'Hausa', 'Kanuri'],
    },
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: description,
    url: url,
    ...(image && { image: [image] }),
    ...(datePublished && { datePublished }),
    publisher: {
      '@type': 'NonprofitOrganization',
      name: 'FRAD Foundation',
    },
  };
}

export function generateProjectSchema({
  title,
  description,
  url,
  location,
}: {
  title: string;
  description: string;
  url: string;
  location?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: title,
    description: description,
    url: url,
    ...(location && {
      location: {
        '@type': 'Place',
        name: location,
      },
    }),
  };
}
