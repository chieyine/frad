import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Governance & Leadership | About FRAD Foundation',
  description: 'FRAD Foundation organizational governance, leadership structure, and institutional compliance.',
};

export default function GovernancePage() {
  return (
    <>
      <Hero
        headline="Governance & Leadership Structure"
        subtext="Institutional transparency, compliance, and oversight guiding FRAD Foundation."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Governance' }]} />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-10">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Institutional Governance</h2>
            <p className="text-ink-600 leading-relaxed">
              FRAD Foundation is duly registered under the laws of the Federal Republic of Nigeria. Our governance
              framework ensures rigorous financial stewardship, legal compliance, risk management, and oversight across
              all our humanitarian and development interventions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Board of Trustees', desc: 'Provides strategic institutional direction, policy approval, and fiduciary oversight.' },
              { title: 'Executive Management', desc: 'Leads daily operations, programme implementation, donor compliance, and staff security.' },
              { title: 'Field Coordination', desc: 'Ensures community-level execution, local authority liaison, and frontline safeguarding.' },
            ].map((level) => (
              <div key={level.title} className="card-base">
                <h3 className="font-extrabold text-lg text-ink-950 mb-2">{level.title}</h3>
                <p className="text-sm text-ink-600">{level.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-paper-100 p-6 rounded-xl border border-ink-950/10">
            <h3 className="font-extrabold text-base text-ink-950 mb-2">Leadership Profiles</h3>
            <p className="text-sm text-ink-600">
              Executive leadership and trustee information is shared through verified institutional channels.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
