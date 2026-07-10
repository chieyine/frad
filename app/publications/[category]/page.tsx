import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const PUB_CATEGORIES: Record<string, { title: string; label: string; description: string }> = {
  reports: {
    title: 'Reports | FRAD Foundation',
    label: 'Reports',
    description: 'Project reports, situation reports, assessments, and accountability documents.',
  },
  research: {
    title: 'Research | FRAD Foundation',
    label: 'Research',
    description: 'Research outputs and learning products from FRAD programmes.',
  },
  'policy-briefs': {
    title: 'Policy Briefs | FRAD Foundation',
    label: 'Policy Briefs',
    description: 'Policy briefs and technical notes from programme evidence and field learning.',
  },
  'annual-reports': {
    title: 'Annual Reports | FRAD Foundation',
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
  return meta ? { title: meta.title, description: meta.description } : { title: 'Publications | FRAD Foundation' };
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
        </div>
      </section>
    </div>
  );
}
