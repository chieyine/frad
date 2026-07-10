import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Mission, Vision & Values | About FRAD Foundation',
  description: 'FRAD Foundation organizational mission, vision, values, and humanitarian principles.',
};

export default function MissionVisionValuesPage() {
  return (
    <>
      <Hero
        headline="Mission, Vision & Values"
        subtext="Guiding principles of FRAD Foundation's humanitarian and development work across Nigeria."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Mission, Vision & Values' }]} />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-12">
          <div className="bg-frad-green-800 border-l-4 border-white p-6 rounded-r-xl text-white">
            <h3 className="font-extrabold text-lg text-white mb-2">Institutional Integrity</h3>
            <p className="text-sm text-white/90 leading-relaxed">
              FRAD publishes formal organizational statements with leadership clearance so public language remains accurate,
              accountable, and consistent with institutional records.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-base">
              <span className="text-xs font-bold uppercase tracking-wider text-frad-green-600">Our Purpose</span>
              <h2 className="text-2xl font-extrabold mt-1 mb-4">Mission Statement</h2>
              <p className="text-ink-600 text-sm bg-paper-100 p-5 rounded-lg border border-ink-950/10 leading-relaxed font-bold">
                To build the Resilience of vulnerable populations using locally available Solutions that ensure Participation and bring meaningful development. Leaving no one behind.
              </p>
            </div>

            <div className="card-base">
              <span className="text-xs font-bold uppercase tracking-wider text-frad-blue-600">Our Ambition</span>
              <h2 className="text-2xl font-extrabold mt-1 mb-4">Vision Statement</h2>
              <p className="text-ink-600 text-sm bg-paper-100 p-5 rounded-lg border border-ink-950/10 leading-relaxed font-bold">
                A Sustainable Future where everyone can access Development, A World No One Is Left Behind...
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">Core Values & Ethical Practice</h2>
            <p className="text-ink-600 mb-6 font-bold text-sm">
              FRAD adheres strictly to humanitarian principles and works with partners to build resilience under these five core values:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Humility', desc: 'Serving with respect, acknowledging the strength and capability of local partners and communities to direct their own growth.' },
                { title: 'Humanity', desc: 'Human suffering must be addressed wherever it is found. The purpose of humanitarian action is to protect life and health and ensure respect for human beings.' },
                { title: 'Best Interest', desc: 'Prioritizing the best interests of vulnerable groups, children, women, and persons with disabilities in all planning.' },
                { title: 'Development', desc: 'Working towards long-term self-reliance, sustainability of outcomes, and strong local leadership.' },
                { title: 'Accountability', desc: 'We hold ourselves responsible to the communities we serve and the donors who entrust us with resources.' },
              ].map((val) => (
                <div key={val.title} className="p-5 rounded-xl bg-white border border-ink-950/10">
                  <h3 className="font-extrabold text-base text-ink-950 mb-2">{val.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Learn About Our Approach"
        description="See how FRAD delivers integrated humanitarian and resilience-building assistance."
        primaryCta={{ label: 'Our Approach', href: '/about/our-approach' }}
        variant="neutral"
      />
    </>
  );
}
