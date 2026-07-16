import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Our Approach',
  description: 'How FRAD Foundation delivers integrated, community-rooted humanitarian and development assistance.',
};

export default function OurApproachPage() {
  return (
    <>
      <Hero
        headline="How We Work"
        subtext="Community participation, coordinated services, local capacity, and accountable delivery."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Our Approach' }]} />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-12">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">From immediate assistance to lasting resilience</h2>
            <p className="text-ink-600 leading-relaxed">
              Communities in Northeast and Northwest Nigeria face overlapping challenges, including conflict, displacement,
              food insecurity, disease outbreaks, and pressure on essential services. FRAD connects immediate assistance—such
              as nutrition screening, cholera prevention, and safe water—with protection, recovery, and stronger local systems.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Listen and assess', desc: 'Our teams work with community members and local institutions to understand needs, risks, existing capacity, and priorities.' },
              { step: '02', title: 'Coordinate services', desc: 'Nutrition, health, WASH, protection, and recovery activities are planned together so people receive more coherent support.' },
              { step: '03', title: 'Strengthen local capacity', desc: 'We work through health facilities, water committees, community groups, and local authorities to reinforce systems that remain after a project ends.' },
              { step: '04', title: 'Remain accountable', desc: 'Communities can ask questions, provide feedback, or raise concerns throughout programme design and delivery.' },
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
