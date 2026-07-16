import type { MetadataRoute } from 'next';
import { NAV_ITEMS, SECONDARY_NAV, SECTORS, SITE_URL } from '@/lib/constants';
import { fetchJobs, fetchNews, fetchProjects, fetchStories } from '@/lib/wordpress';

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
  '/donors',
  '/donors/due-diligence',
  '/financial-accountability',
  '/impact',
  '/news',
  '/partners',
  '/privacy',
  '/press',
  '/projects',
  '/publications',
  '/publications/reports',
  '/publications/research',
  '/publications/policy-briefs',
  '/publications/annual-reports',
  '/reports',
  '/media',
  '/stories',
  '/safeguarding',
  '/what-we-do',
  '/where-we-work',
  '/where-we-work/abuja',
  '/where-we-work/northeast',
  '/where-we-work/northwest',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, stories, newsItems, jobs] = await Promise.all([
    fetchProjects(100),
    fetchStories(100),
    fetchNews(100),
    fetchJobs(100),
  ]);
  const navPaths = NAV_ITEMS.flatMap((item) => [item.href, ...(item.children?.map((child) => child.href) ?? [])]);
  const sectorPaths = SECTORS.map((sector) => `/what-we-do/${sector.slug}`);
  const secondaryPaths = SECONDARY_NAV.map((item) => item.href);
  const contentPaths = [
    ...projects.filter((item) => item.slug).map((item) => `/projects/${item.slug}`),
    ...stories.filter((item) => item.slug && item.consentStatus === 'consented').map((item) => `/stories/${item.slug}`),
    ...newsItems.filter((item) => item.slug).map((item) => `/news/${item.slug}`),
    ...jobs.filter((item) => item.slug).map((item) => `/careers/jobs/${item.slug}`),
  ];
  const paths = Array.from(new Set([...staticPaths, ...navPaths, ...sectorPaths, ...secondaryPaths, ...contentPaths]));
  const lastModified = new Date('2026-07-08');

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.split('/').length <= 2 ? 0.8 : 0.65,
  }));
}
