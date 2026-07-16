import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Stamp from '@/components/ui/Stamp';
import EvidenceDossier from '@/components/sections/EvidenceDossier';

export const metadata: Metadata = {
  title: 'Northwest Nigeria | Where We Work',
  description: 'FRAD Foundation response to acute humanitarian needs across Northwest Nigeria.',
};

export default function NorthwestPage() {
  return (
    <>
      <Hero
        headline="Our Work in Northwest Nigeria"
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
            title="Northwest programme overview"
            summary="Our work supports communities facing insecurity, displacement, food insecurity, malnutrition, and pressure on essential services."
            rows={[
              { label: 'Public geography', value: 'Northwest Nigeria' },
              { label: 'Programme focus', value: 'Nutrition, WASH, emergency response, resilience' },
              { label: 'Community safety', value: 'Sensitive field locations and personal details are not published' },
              { label: 'Coordination', value: 'Activities are coordinated with communities, authorities, and humanitarian partners' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
