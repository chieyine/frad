import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ReportCard from '@/components/cards/ReportCard';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import { fetchPublications, fetchReports } from '@/lib/wordpress';

const PUB_CATEGORIES: Record<string, { title: string; label: string; description: string }> = {
  reports: {
    title: 'Reports',
    label: 'Reports',
    description: 'Project reports, situation reports, assessments, and accountability documents.',
  },
  research: {
    title: 'Research',
    label: 'Research',
    description: 'Research outputs and learning products from FRAD programmes.',
  },
  'policy-briefs': {
    title: 'Policy Briefs',
    label: 'Policy Briefs',
    description: 'Policy briefs and technical notes from programme evidence and field learning.',
  },
  'annual-reports': {
    title: 'Annual Reports',
    label: 'Annual Reports',
    description: 'Annual reports and institutional accountability documents.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = PUB_CATEGORIES[category];
  return meta ? { title: meta.title, description: meta.description } : { title: 'Publications' };
}

export default async function PublicationCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = PUB_CATEGORIES[category];

  if (!meta) {
    notFound();
  }

  const [publications, reports] = await Promise.all([fetchPublications(100), fetchReports(100)]);
  const publicationTypes: Record<string, string[]> = {
    reports: ['report', 'assessment'],
    research: ['research'],
    'policy-briefs': ['policy-brief'],
    'annual-reports': ['annual-report'],
  };
  const filteredPublications = publications.filter((item) =>
    publicationTypes[category]?.includes(item.publicationType)
  );
  const filteredReports = category === 'reports'
    ? reports
    : category === 'annual-reports'
      ? reports.filter((item) => item.reportType === 'annual')
      : [];

  return (
    <div className="bg-paper-100">
      <Hero headline={meta.label} subtext={meta.description} size="small" />
      <Breadcrumbs
        items={[
          { label: 'Publications', href: '/publications' },
          { label: meta.label },
        ]}
      />

      <section className="section-padding">
        <div className="section-container">
          <div className="evidence-card max-w-3xl p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-frad-green-800">
              Document library
            </p>
            <h2 className="mt-4 text-3xl font-extrabold">{meta.label} from FRAD Foundation.</h2>
            <p className="mt-4 text-base leading-7 text-ink-700">
              Documents in this category include clear title, type, year, sector,
              location context, summary, citation, and download details.
            </p>
          </div>

          {(filteredPublications.length > 0 || filteredReports.length > 0) ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPublications.map((item) => (
                <ReportCard
                  key={`publication-${item.id}`}
                  title={item.title}
                  type={item.publicationType}
                  year={item.year}
                  sector={item.sector}
                  summary={item.abstract}
                  pdfUrl={item.pdfUrl}
                  coverImage={item.coverImage}
                />
              ))}
              {filteredReports.map((item) => (
                <ReportCard
                  key={`report-${item.id}`}
                  title={item.title}
                  type={item.reportType}
                  year={item.year}
                  sector={item.sector}
                  summary={item.summary}
                  pdfUrl={item.pdfUrl}
                  coverImage={item.coverImage}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <ContentEmptyState
                eyebrow={meta.label}
                title={`${meta.label} from FRAD Foundation`}
                description="Contact our team to request documents in this category or browse the complete publications library."
                href="/publications"
                actionLabel="View all publications"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
