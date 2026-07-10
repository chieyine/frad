import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Our Approach | About FRAD Foundation',
  description: 'How FRAD Foundation delivers integrated, community-rooted humanitarian and development assistance.',
};

export default function OurApproachPage() {
  return (
    <>
      <Hero
        headline="Our Operational Approach"
        subtext="Integrated humanitarian programming rooted in community partnership and local resilience."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Our Approach' }]} />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-12">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">From Emergency Relief to Community Resilience</h2>
            <p className="text-ink-600 leading-relaxed">
              Humanitarian crisis across Northeast and Northwest Nigeria is complex, multi-layered, and prolonged.
              FRAD Foundation employs an integrated model where lifesaving emergency interventions (such as nutrition
              screening, cholera prevention, and safe water delivery) immediately link to community resilience and
              protection structures.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Community-Rooted Assessment', desc: 'Frontline staff and community volunteers conduct participatory screenings and risk assessments with affected populations.' },
              { step: '02', title: 'Integrated Multisector Response', desc: 'Combining Nutrition, Health, WASH, and Protection interventions to address interconnected vulnerabilities simultaneously.' },
              { step: '03', title: 'Local Capacity Building', desc: 'Working through primary health centers, water committees, and local peace structures rather than building parallel systems.' },
              { step: '04', title: 'Accountability & Safeguarding', desc: 'Maintaining active feedback loops and dignity-centered reporting channels throughout implementation.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 p-6 rounded-xl bg-white border border-ink-950/10">
                <div className="font-heading font-bold text-3xl text-frad-green-500 shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-extrabold text-lg text-ink-950 mb-1">{item.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
