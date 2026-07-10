import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ReportCard from '@/components/cards/ReportCard';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import { fetchPublications } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Publications | FRAD Foundation',
  description: 'FRAD Foundation publications, reports, assessments, and learning products library.',
};

const libraryTypes = [
  'Annual reports',
  'Project reports',
  'Assessments',
  'Research outputs',
  'Policy briefs',
  'Accountability documents',
];

export default async function PublicationsPage() {
  const publications = await fetchPublications(18);

  return (
    <div className="bg-paper-100">
      <Hero
        headline="A serious knowledge library for reports, assessments, and learning."
        subtext="A public home for reports, assessments, policy briefs, research outputs, and accountability documents."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'Publications' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Knowledge and accountability</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Reports prove the work, not decorate it.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-700">
              Publications are organized so readers can evaluate context, sector, year, location, citation, and related
              project evidence.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {libraryTypes.map((type) => (
              <div key={type} className="evidence-card p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-frad-green-700">
                  Library category
                </p>
                <h3 className="mt-4 text-2xl font-extrabold">{type}</h3>
                <p className="mt-4 text-sm leading-7 text-ink-600">
                  Documents in this category are presented with summary, sector, year, location, citation, and download
                  context when available.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Publication index</h2>
              <p className="max-w-xl text-sm font-semibold leading-7 text-ink-600">
                Publications are listed with cover images, abstracts, citations, and download links when available.
              </p>
            </div>
            {publications.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {publications.map((publication) => (
                  <ReportCard
                    key={publication.id}
                    title={publication.title}
                    type={publication.publicationType}
                    year={publication.year}
                    sector={publication.sector}
                    summary={publication.abstract}
                    pdfUrl={publication.pdfUrl}
                    coverImage={publication.coverImage}
                  />
                ))}
              </div>
            ) : (
              <ContentEmptyState
                eyebrow="Publication index"
                title="Reports, assessments, and learning products."
                description="FRAD shares annual reports, project reports, assessments, policy briefs, research outputs, citations, abstracts, and PDF downloads through its evidence library."
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
