import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Ethics | FRAD Foundation',
  description: 'FRAD Foundation policies on data protection, ethical photography, and beneficiary consent.',
};

export default function PrivacyPage() {
  return (
    <>
      <Hero
        headline="Privacy Policy & Data Ethics"
        subtext="Our strict commitments to data privacy, informed consent, and ethical storytelling."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Data Protection Principles</h2>
            <p className="text-ink-600 leading-relaxed">
              FRAD Foundation complies with the Nigeria Data Protection Act (NDPA) and international humanitarian data standards.
              Personal data collected from crisis-affected communities, donors, partners, and website visitors is handled securely
              and never sold or exploited.
            </p>
          </div>

          <div className="card-base">
            <h3 className="font-extrabold text-lg text-ink-950 mb-2">Ethical Communications & Photography</h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              Every photo and story published on the FRAD Foundation website requires documented, verifiable informed consent.
              We never publish images that undermine human dignity, expose survivors of violence to retaliation, or depict
              vulnerable people in exploitative situations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
