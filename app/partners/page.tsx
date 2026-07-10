import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Button from '@/components/ui/Button';
import PartnerProofStrip from '@/components/sections/PartnerProofStrip';
import { fetchPartners } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Partner With Us | FRAD Foundation',
  description: 'Collaborate with FRAD Foundation on humanitarian relief, development programming, and community resilience in Nigeria.',
};

const partnerPaths = [
  'Institutional donors and UN agencies',
  'Government and coordination actors',
  'Technical and academic partners',
  'Private sector and philanthropy',
];

export default async function PartnersPage() {
  const partners = await fetchPartners(30);

  return (
    <div className="bg-paper-100">
      <Hero
        headline="Partner with a Nigerian-led humanitarian organization."
        subtext="FRAD works with donors, government actors, INGOs, researchers, and technical partners through accountable, evidence-led collaboration."
        size="small"
        backgroundImage="/images/frad-programme-outreach.jpg"
        wordpressKey="partners.hero"
      />
      <Breadcrumbs items={[{ label: 'Partner With Us' }]} />

      <section className="section-padding">
        <div className="section-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Partnership readiness</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Partnership built on clarity and accountable delivery.</h2>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              FRAD keeps public partnership information specific, current, and tied to verifiable collaboration.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {partnerPaths.map((path) => (
                <div key={path} className="evidence-card p-6">
                  <h3 className="text-xl font-extrabold">{path}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-600">
                    Each pathway is designed around shared evidence, clear contact routes, and responsible public
                    communication.
                  </p>
                </div>
              ))}
            </div>
            <Button href="/contact" variant="primary" size="lg" className="mt-8">
              Start a Partnership Conversation
            </Button>
          </div>
        </div>
      </section>

      <PartnerProofStrip partners={partners} />
    </div>
  );
}
