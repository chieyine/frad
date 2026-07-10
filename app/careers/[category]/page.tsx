import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';

const CATEGORY_META: Record<
  string,
  { title: string; label: string; description: string; emptyMessage: string }
> = {
  jobs: {
    title: 'Staff Job Openings | Careers at FRAD Foundation',
    label: 'Jobs & Positions',
    description: 'Explore full-time frontline and technical staff opportunities at FRAD Foundation across Nigeria.',
    emptyMessage:
      'FRAD publishes full-time staff vacancies through official recruitment channels. Applications are always free and merit-based.',
  },
  consultancies: {
    title: 'Consultancies & Technical Rosters | FRAD Foundation',
    label: 'Consultancies',
    description: 'Specialist technical, research, evaluation, and capacity-building consultancy opportunities.',
    emptyMessage:
      'Consultancy Terms of Reference are shared through FRAD official procurement and recruitment channels.',
  },
  internships: {
    title: 'Internships & Graduate Fellowships | FRAD Foundation',
    label: 'Internships',
    description: 'Structured humanitarian career entry pathways and graduate fellowships for Nigerian professionals.',
    emptyMessage:
      'Internship and fellowship pathways are coordinated through FRAD official recruitment channels.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) {
    return { title: 'Careers | FRAD Foundation' };
  }
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function CareerCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = CATEGORY_META[category];

  if (!meta) {
    notFound();
  }

  return (
    <div className="bg-paper-100 min-h-screen">
      <Hero
        headline={meta.label}
        subtext={meta.description}
        size="small"
      />
      <Breadcrumbs
        items={[
          { label: 'Careers', href: '/careers' },
          { label: meta.label },
        ]}
      />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-10">
          <div>
            <span className="eyebrow mb-1">
              Recruitment Desk
            </span>
            <h2 className="text-3xl font-extrabold text-ink-950 mb-4">
              {meta.label}
            </h2>
            <p className="text-sm text-ink-600 leading-relaxed">
              FRAD Foundation enforces an open, merit-based, and transparent recruitment process. All positions are subject to strict Protection from Sexual Exploitation and Abuse (PSEA) vetting.
            </p>
          </div>

          <div className="evidence-card p-8 text-center">
            <p className="text-sm font-semibold text-ink-600">
              {meta.emptyMessage}
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Fraud Alert & Equal Opportunity"
        description="FRAD Foundation never charges any application, processing, or recruitment fees at any stage of our hiring process."
        variant="neutral"
      />
    </div>
  );
}
