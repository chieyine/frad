import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectorExplorerDashboard from '@/components/interactive/SectorExplorerDashboard';
import ProgrammeCard from '@/components/cards/ProgrammeCard';
import CTASection from '@/components/sections/CTASection';
import { SECTORS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'What We Do | FRAD Foundation',
  description:
    'FRAD Foundation integrated humanitarian and development programme areas across nutrition, health, WASH, protection, education, livelihoods, peacebuilding, emergency response, and digital systems.',
};

export default function WhatWeDoPage() {
  return (
    <div className="bg-paper-100">
      <Hero
        headline="Integrated programmes for urgent needs and long-term resilience."
        subtext="FRAD supports communities through practical, evidence-informed humanitarian and development programming."
        size="small"
        backgroundImage="/images/frad-programme-outreach.jpg"
        wordpressKey="what_we_do.hero"
      />
      <Breadcrumbs items={[{ label: 'What We Do' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Programme overview</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Eight programme areas, one coherent response model.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-700">
              Each programme area connects technical delivery with community engagement, coordination, and accountability.
            </p>
          </div>

          <SectorExplorerDashboard />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.map((sector) => (
              <ProgrammeCard
                key={sector.slug}
                title={sector.title}
                description={sector.description}
                slug={sector.slug}
                icon={sector.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Partner with FRAD on programme design and delivery."
        description="Collaborate on practical programme design, delivery systems, learning, and responsible public evidence."
        primaryCta={{ label: 'Partner With Us', href: '/partners' }}
        secondaryCta={{ label: 'View Projects', href: '/projects' }}
        variant="green"
      />
    </div>
  );
}
