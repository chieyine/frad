import type { MetadataRoute } from 'next';
import { NAV_ITEMS, SECONDARY_NAV, SECTORS, SITE_URL } from '@/lib/constants';

const staticPaths = [
  '',
  '/about',
  '/about/accountability',
  '/about/governance',
  '/about/mission-vision-values',
  '/about/our-approach',
  '/careers',
  '/careers/jobs',
  '/careers/consultancies',
  '/careers/internships',
  '/contact',
  '/donate',
  '/impact',
  '/news',
  '/partners',
  '/privacy',
  '/projects',
  '/publications',
  '/publications/reports',
  '/publications/research',
  '/publications/policy-briefs',
  '/publications/annual-reports',
  '/reports',
  '/media',
  '/stories',
  '/what-we-do',
  '/where-we-work',
  '/where-we-work/abuja',
  '/where-we-work/northeast',
  '/where-we-work/northwest',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const navPaths = NAV_ITEMS.flatMap((item) => [item.href, ...(item.children?.map((child) => child.href) ?? [])]);
  const sectorPaths = SECTORS.map((sector) => `/what-we-do/${sector.slug}`);
  const secondaryPaths = SECONDARY_NAV.map((item) => item.href);
  const paths = Array.from(new Set([...staticPaths, ...navPaths, ...sectorPaths, ...secondaryPaths]));
  const lastModified = new Date('2026-07-08');

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.split('/').length <= 2 ? 0.8 : 0.65,
  }));
}
