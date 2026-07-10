import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Stamp from '@/components/ui/Stamp';
import EvidenceDossier from '@/components/sections/EvidenceDossier';

export const metadata: Metadata = {
  title: 'Northwest Nigeria | Where We Work | FRAD Foundation',
  description: 'FRAD Foundation response to acute humanitarian needs across Northwest Nigeria.',
};

export default function NorthwestPage() {
  return (
    <>
      <Hero
        headline="Northwest Nigeria Operations"
        subtext="Addressing rising food insecurity, malnutrition, and displacement in Northwest Nigeria."
        size="small"
        backgroundImage="/images/frad-field-hero.jpg"
        wordpressKey="where_we_work.northwest.hero"
      />
      <Breadcrumbs items={[{ label: 'Where We Work', href: '/where-we-work' }, { label: 'Northwest Nigeria' }]} />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-8">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Responding to Growing Humanitarian Needs</h2>
              <Stamp>Active</Stamp>
            </div>
            <p className="text-ink-600 leading-relaxed">
              Northwest Nigeria faces escalating challenges driven by insecurity, displacement, and severe pressure
              on essential health and food systems. FRAD Foundation expands practical, community-rooted nutrition
              and WASH support to protect vulnerable children and families.
            </p>
          </div>

          <EvidenceDossier
            title="Expanding response corridor"
            summary="FRAD's Northwest response focuses on practical support for communities facing insecurity, displacement, food pressure, and service gaps."
            rows={[
              { label: 'Public geography', value: 'Northwest Nigeria' },
              { label: 'Programme focus', value: 'Nutrition, WASH, emergency response, resilience' },
              { label: 'Location handling', value: 'Public communication avoids sensitive site-level detail' },
              { label: 'Coordination', value: 'Response information is aligned with programme and partner reporting' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
