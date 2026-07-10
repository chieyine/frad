import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import DonationSelector from '@/components/interactive/DonationSelector';

export const metadata: Metadata = {
  title: 'Donate | FRAD Foundation',
  description: 'Support locally led humanitarian action through FRAD Foundation.',
};

export default function DonatePage() {
  return (
    <div className="bg-paper-100">
      <Hero
        headline="Support locally led humanitarian action."
        subtext="Your support helps FRAD respond faster, reach vulnerable communities, and strengthen essential services for crisis-affected households."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'Donate' }]} />

      <section className="section-padding">
        <div className="section-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Give with confidence</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Support FRAD through verified giving channels.</h2>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              Every contribution is received through secure, verified channels with donor privacy, receipts, and
              full financial controls. Funds are directed to where field needs are most urgent.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="evidence-card p-6 sm:p-8">
              <DonationSelector />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
