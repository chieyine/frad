import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ImpactStatCard from '@/components/cards/ImpactStatCard';
import CTASection from '@/components/sections/CTASection';
import { fetchImpactStats } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Impact',
  description: 'Results and programme reach from FRAD Foundation humanitarian and development work in Nigeria.',
};

export default async function ImpactPage() {
  const stats = (await fetchImpactStats()).filter((stat) => stat.approved && stat.showOnImpactPage);
  return (
    <div className="bg-paper-100">
      <Hero
        headline="Our impact in communities across Northern Nigeria."
        subtext="We report programme results with the period, location, and source information needed to understand what each figure represents."
        size="small"
        backgroundImage="/images/frad-field-hero.jpg"
        wordpressKey="impact.hero"
      />
      <Breadcrumbs items={[{ label: 'Impact' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Impact data</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Clear results, reported with context.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-700">
              Our published figures include the reporting period, programme area, location, and available source information.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[8px] border border-ink-950/12 bg-white sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <ImpactStatCard
                key={stat.id}
                number={stat.number}
                label={stat.label}
                period={[stat.period, stat.location, stat.sector].filter(Boolean).join(' / ')}
                countUp={/^\d+[+%]?$/.test(stat.number) && stat.number !== '2019'}
                source={stat.source ? { index: index + 1, href: stat.source, label: `Source for ${stat.label}` } : undefined}
              />
            ))}
          </div>

          <div className="mt-8 evidence-card max-w-3xl p-6">
            <h3 className="text-xl font-extrabold">How we report programme results</h3>
            <p className="mt-3 text-sm leading-7 text-ink-600">
              Results are reviewed by programme and monitoring teams before publication. Where supporting reports are
              available for public release, they are linked alongside the relevant project or result.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              ['Define', 'Each metric needs a written definition, unit, reporting period, geography, and inclusion or exclusion rules.'],
              ['Verify', 'Programme and MEAL owners confirm the source record before the figure receives public approval.'],
              ['Publish', 'Approved figures are published with enough context for readers to understand their scope and reporting period.'],
            ].map(([title, copy], index) => (
              <article key={title} className="card-base"><p className="index-numeral text-3xl">{String(index + 1).padStart(2, '0')}</p><h3 className="mt-4 text-2xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-ink-600">{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Help us extend this work to more communities."
        description="Your support strengthens essential services, community resilience, and locally led humanitarian action."
        primaryCta={{ label: 'Donate', href: '/donate' }}
        secondaryCta={{ label: 'Reports', href: '/reports' }}
        variant="green"
      />
    </div>
  );
}
