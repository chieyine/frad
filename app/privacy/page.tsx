import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Ethics',
  description: 'FRAD Foundation policies on data protection, ethical photography, and informed consent.',
};

export default function PrivacyPage() {
  return (
    <>
      <Hero
        headline="Privacy Policy & Data Ethics"
        subtext="How FRAD collects, uses, protects, and retains information shared through this website."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Data Protection Principles</h2>
            <p className="text-ink-600 leading-relaxed">
              FRAD Foundation manages website and programme information in line with the Nigeria Data Protection Act and
              responsible humanitarian-data principles. Personal information should be collected for a clear purpose, limited to
              what is necessary, protected appropriately, retained only as required, and never sold.
            </p>
          </div>

          <div className="card-base">
            <h3 className="font-extrabold text-lg text-ink-950 mb-2">Ethical Communications & Photography</h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              Photos and stories published on the FRAD Foundation website require informed consent and safeguarding review.
              We never publish images that undermine human dignity, expose survivors of violence to retaliation, or depict
              vulnerable people in exploitative situations.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="card-base"><h3 className="text-xl font-black">Forms and inquiries</h3><p className="mt-3 text-sm leading-7 text-ink-600">Contact and newsletter details are used to respond to the request or provide the communication selected. Safeguarding submissions require more restrictive access and handling.</p></div>
            <div className="card-base"><h3 className="text-xl font-black">Donations</h3><p className="mt-3 text-sm leading-7 text-ink-600">Payment details are handled by the selected payment provider. FRAD receives transaction references, status, amount, currency, donor contact details supplied to the provider, and programme designation needed for receipts and reconciliation.</p></div>
            <div className="card-base"><h3 className="text-xl font-black">Measurement</h3><p className="mt-3 text-sm leading-7 text-ink-600">The site measures page journeys, form outcomes, checkout stages, errors, and performance. Analytics must not include contact messages, safeguarding details, full email addresses, payment credentials, or programme participant data.</p></div>
            <div className="card-base"><h3 className="text-xl font-black">Your choices</h3><p className="mt-3 text-sm leading-7 text-ink-600">Use the official contact route to ask about access, correction, deletion, objection, consent withdrawal, or how information connected to a website interaction is handled.</p></div>
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-ink-500">Last reviewed: July 2026</p>
        </div>
      </section>
    </>
  );
}
