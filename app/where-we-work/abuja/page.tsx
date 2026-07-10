import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Stamp from '@/components/ui/Stamp';
import EvidenceDossier from '@/components/sections/EvidenceDossier';

export const metadata: Metadata = {
  title: 'Abuja Coordination | Where We Work | FRAD Foundation',
  description: 'FRAD Foundation national coordination, institutional partnerships, and advocacy in Abuja.',
};

export default function AbujaPage() {
  return (
    <>
      <Hero
        headline="Abuja Coordination Office"
        subtext="National coordination, institutional compliance, and donor relations in the Federal Capital Territory."
        size="small"
        backgroundImage="/images/frad-programme-outreach.jpg"
        wordpressKey="where_we_work.abuja.hero"
      />
      <Breadcrumbs items={[{ label: 'Where We Work', href: '/where-we-work' }, { label: 'Abuja Coordination' }]} />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-8">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <h2 className="text-3xl font-extrabold sm:text-4xl">National Representation &amp; Engagement</h2>
              <Stamp>Coordination hub</Stamp>
            </div>
            <p className="text-ink-600 leading-relaxed">
              Our Abuja coordination hub keeps FRAD aligned with national humanitarian clusters, federal ministries,
              donor working groups, and civil society networks.
            </p>
          </div>

          <EvidenceDossier
            title="Coordination and representation record"
            summary="Abuja communicates the institutional side of FRAD: partnerships, compliance, representation, and national coordination."
            rows={[
              { label: 'Public geography', value: 'Federal Capital Territory' },
              { label: 'Function', value: 'Coordination, compliance, partnerships, representation' },
              { label: 'Institutional role', value: 'Supports donor engagement, compliance, and national coordination' },
              { label: 'Public access', value: 'Contact routes are handled through FRAD official channels' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
