import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Stamp from '@/components/ui/Stamp';
import EvidenceDossier from '@/components/sections/EvidenceDossier';

export const metadata: Metadata = {
  title: 'Northeast Nigeria | Where We Work',
  description: 'FRAD Foundation humanitarian response across Borno, Adamawa, and Yobe (BAY states).',
};

export default function NortheastPage() {
  return (
    <>
      <Hero
        headline="Our Work in Northeast Nigeria"
        subtext="Lifesaving nutrition, WASH, protection, and emergency assistance across Borno, Adamawa, and Yobe states."
        size="small"
        backgroundImage="/images/frad-water-access.jpg"
        wordpressKey="where_we_work.northeast.hero"
      />
      <Breadcrumbs items={[{ label: 'Where We Work', href: '/where-we-work' }, { label: 'Northeast Nigeria' }]} />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-8">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-4">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Borno, Adamawa, and Yobe states</h2>
              <Stamp>Active</Stamp>
            </div>
            <p className="text-ink-600 leading-relaxed">
              Over a decade of conflict in Northeast Nigeria has left millions displaced and highly vulnerable to
              acute malnutrition, waterborne diseases, and protection risks. FRAD works alongside local communities
              and health facilities across Borno, Adamawa, and Yobe states to deliver frontline humanitarian support.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { state: 'Borno State', focus: 'Emergency response, acute nutrition screening, safe water provision, GBV risk mitigation.' },
              { state: 'Adamawa State', focus: 'Community health linkages, WASH promotion, livelihoods and household resilience.' },
              { state: 'Yobe State', focus: 'Maternal and child nutrition screening, water point rehabilitation, hygiene promotion.' },
            ].map((st) => (
              <div key={st.state} className="card-base border-t-4 border-t-frad-green-600">
                <h3 className="font-extrabold text-lg text-ink-950 mb-2">{st.state}</h3>
                <p className="text-sm text-ink-600">{st.focus}</p>
              </div>
            ))}
          </div>

          <EvidenceDossier
            title="Regional programme overview"
            summary="Our Northeast programmes respond to urgent needs while supporting recovery and strengthening local services."
            rows={[
              { label: 'Public geography', value: 'Borno, Adamawa, Yobe' },
              { label: 'Programme focus', value: 'Nutrition, WASH, protection, emergency response' },
              { label: 'Community safety', value: 'Sensitive field locations and personal details are not published' },
              { label: 'Coordination', value: 'Activities are coordinated with communities, authorities, and humanitarian partners' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
