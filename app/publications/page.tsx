import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ReportCard from '@/components/cards/ReportCard';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import { fetchPublications } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Publications',
  description: 'FRAD Foundation publications, reports, assessments, and learning products library.',
};

const libraryTypes = [
  { label: 'Annual reports', href: '/publications/annual-reports' },
  { label: 'Project reports', href: '/publications/reports' },
  { label: 'Assessments', href: '/publications/reports' },
  { label: 'Research outputs', href: '/publications/research' },
  { label: 'Policy briefs', href: '/publications/policy-briefs' },
  { label: 'Accountability documents', href: '/reports' },
];

export default async function PublicationsPage() {
  const publications = await fetchPublications(18);

  return (
    <div className="bg-paper-100">
      <Hero
        headline="Reports, research, and learning from our programmes."
        subtext="Browse FRAD reports, assessments, policy briefs, research, and institutional publications."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'Publications' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Knowledge and accountability</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Knowledge to improve programmes and accountability.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-700">
              Our publications share programme experience, assessment findings, institutional reporting, and lessons that can inform future action.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {libraryTypes.map((type) => (
              <Link key={type.label} href={type.href} className="evidence-card group p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-frad-green-700">
                  Library category
                </p>
                <h3 className="mt-4 text-2xl font-extrabold">{type.label}</h3>
                <p className="mt-4 text-sm leading-7 text-ink-600">
                  Browse documents by year, programme area, location, publication type, and related project.
                </p>
                <span className="mt-5 inline-flex text-xs font-black uppercase tracking-[0.1em] text-frad-green-800 transition-transform group-hover:translate-x-1">Browse category →</span>
              </Link>
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
                title="FRAD reports, assessments, and learning resources."
                description="Contact our team if you need a publication or programme document that is not listed here."
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
