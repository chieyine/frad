import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectorExplorerDashboard from '@/components/interactive/SectorExplorerDashboard';
import ProgrammeCard from '@/components/cards/ProgrammeCard';
import CTASection from '@/components/sections/CTASection';
import ImageCarousel from '@/components/interactive/ImageCarousel';
import { SECTORS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'FRAD Foundation integrated humanitarian and development programme areas across nutrition, health, WASH, protection, education, livelihoods, peacebuilding, emergency response, and digital systems.',
};

export default function WhatWeDoPage() {
  return (
    <div className="bg-paper-100">
      <Hero
        headline="Meeting urgent needs. Strengthening community resilience."
        subtext="FRAD brings humanitarian assistance, recovery, and local capacity together across eight programme areas."
        size="small"
        backgroundImage="/images/frad-programme-outreach.jpg"
        wordpressKey="what_we_do.hero"
      />
      <Breadcrumbs items={[{ label: 'What We Do' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Programme overview</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Eight programme areas working together.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-700">
              We coordinate services across sectors because the challenges facing families and communities rarely occur in isolation.
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

          <div className="mt-16 pt-10 border-t border-ink-950/10">
            <ImageCarousel
              eyebrow="Our programmes in action"
              title="Working alongside communities across Northern Nigeria"
              wordpressKey="what-we-do.carousel"
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Partner with FRAD to reach more communities."
        description="Work with our teams on programme design, implementation, monitoring, learning, and local capacity strengthening."
        primaryCta={{ label: 'Partner With Us', href: '/partners' }}
        secondaryCta={{ label: 'View Projects', href: '/projects' }}
        variant="green"
      />
    </div>
  );
}
