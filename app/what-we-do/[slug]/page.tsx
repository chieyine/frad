import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';
import Icon from '@/components/ui/Icon';
import { SECTORS, SECTOR_DETAILS } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);
  if (!sector) return { title: 'Programme Not Found' };
  return {
    title: `${sector.title} | FRAD Foundation`,
    description: sector.description,
  };
}

export default async function SectorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);

  if (!sector) {
    notFound();
  }

  const details = SECTOR_DETAILS[sector.slug] ?? { focus: [], note: '' };

  return (
    <>
      <Hero
        headline={sector.title}
        subtext={sector.description}
        size="small"
      />
      <Breadcrumbs
        items={[
          { label: 'What We Do', href: '/what-we-do' },
          { label: sector.title },
        ]}
      />

      <section className="section-padding">
        <div className="section-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[8px] border border-frad-green-800/20 bg-frad-green-50 text-frad-green-900">
              <Icon name={sector.icon} className="h-7 w-7" />
            </div>
            <p className="eyebrow">Programme overview</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{sector.title}</h2>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              FRAD implements dignity-centered, practical interventions under this sector, working directly with
              community structures, health committees, and local partners so assistance reaches the most vulnerable
              households.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {details.focus.map((item) => (
                <div key={item} className="border-l-2 border-frad-green-700 bg-white px-4 py-3">
                  <p className="text-sm font-extrabold text-ink-850">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 evidence-card p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-frad-green-800">How we deliver</p>
              <p className="mt-3 text-base leading-7 text-ink-700">{details.note}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-ink-950/10 pt-6 text-sm font-extrabold">
              <Link href="/projects" className="safe-focus link-underline text-frad-green-800">Related projects</Link>
              <Link href="/publications" className="safe-focus link-underline text-frad-green-800">Related publications</Link>
              <Link href="/stories" className="safe-focus link-underline text-frad-green-800">Field stories</Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Support Our ${sector.title} Interventions`}
        description="Join FRAD in strengthening community-level service delivery."
        primaryCta={{ label: 'Partner With Us', href: '/partners' }}
        variant="neutral"
      />
    </>
  );
}
