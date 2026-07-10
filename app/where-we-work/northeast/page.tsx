import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Stamp from '@/components/ui/Stamp';
import EvidenceDossier from '@/components/sections/EvidenceDossier';

export const metadata: Metadata = {
  title: 'Northeast Nigeria | Where We Work | FRAD Foundation',
  description: 'FRAD Foundation humanitarian response across Borno, Adamawa, and Yobe (BAY states).',
};

export default function NortheastPage() {
  return (
    <>
      <Hero
        headline="Northeast Nigeria Operations"
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
              <h2 className="text-3xl font-extrabold sm:text-4xl">Operational Context: BAY States</h2>
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
            title="Public-safe regional record"
            summary="FRAD shares regional operational context while withholding sensitive site-level detail where community or staff safety requires it."
            rows={[
              { label: 'Public geography', value: 'Borno, Adamawa, Yobe' },
              { label: 'Programme focus', value: 'Nutrition, WASH, protection, emergency response' },
              { label: 'Location handling', value: 'Regional by design; exact field sites withheld where sensitive' },
              { label: 'Public note', value: 'Regional information is shared without exposing sensitive field sites' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
