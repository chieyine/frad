import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ImpactStatCard from '@/components/cards/ImpactStatCard';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Impact | FRAD Foundation',
  description: 'Verified impact reporting structure for FRAD Foundation humanitarian programmes in Nigeria.',
};

export default function ImpactPage() {
  return (
    <div className="bg-paper-100">
      <Hero
        headline="Impact reporting with source discipline."
        subtext="Every figure FRAD publishes is tied to a period, a place, and a source document. Impact you can examine, not just admire."
        size="small"
        backgroundImage="/images/frad-field-hero.jpg"
        wordpressKey="impact.hero"
      />
      <Breadcrumbs items={[{ label: 'Impact' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Impact data</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Numbers matter most when people can trust them.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-700">
              FRAD avoids decorative counters and publishes impact figures with period, sector, location context, and
              source documentation.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[8px] border border-ink-950/12 bg-white sm:grid-cols-2 lg:grid-cols-4">
            <ImpactStatCard
              number="2019"
              label="Founded and registered in Nigeria"
              period="CAC/IT/NO/139393"
              source={{ index: 1, href: '/about', label: 'CAC registration, About FRAD' }}
            />
            <ImpactStatCard
              number="8"
              label="Integrated programme areas"
              period="Nutrition to digital systems"
              countUp
              source={{ index: 2, href: '/what-we-do', label: 'Programme overview' }}
            />
            <ImpactStatCard
              number="3"
              label="Operating regions"
              period="Northeast, Northwest, Abuja"
              countUp
              source={{ index: 3, href: '/where-we-work', label: 'Where we work' }}
            />
            <ImpactStatCard
              number="100%"
              label="Nigerian-led"
              period="Founded and staffed locally"
              countUp
              source={{ index: 4, href: '/about/governance', label: 'Governance' }}
            />
          </div>

          <div className="mt-8 evidence-card max-w-3xl p-6">
            <h3 className="text-xl font-extrabold">How we publish numbers</h3>
            <p className="mt-3 text-sm leading-7 text-ink-600">
              Every figure FRAD publishes carries its period, sector, location context, and source document, so
              donors, partners, and communities can trace each claim back to the evidence behind it. Programme-level
              results are released alongside the reports that substantiate them.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Support work that can be reported responsibly."
        description="FRAD's impact reporting becomes stronger as programme evidence, reports, and stories are released."
        primaryCta={{ label: 'Donate', href: '/donate' }}
        secondaryCta={{ label: 'Reports', href: '/reports' }}
        variant="green"
      />
    </div>
  );
}
