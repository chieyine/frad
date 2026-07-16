import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import CTASection from '@/components/sections/CTASection';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Icon from '@/components/ui/Icon';
import { IDENTITY_CARDS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'FRAD Foundation is a Nigerian humanitarian and development organisation supporting crisis-affected communities across Northeast and Northwest Nigeria.',
};

export default function AboutPage() {
  return (
    <div className="bg-paper-100">
      <Hero
        headline="Rooted in Nigeria. Committed to principled humanitarian action."
        subtext="Since 2019, FRAD has worked with communities and partners to respond to urgent needs and strengthen local resilience."
        size="small"
        backgroundImage="/images/frad-programme-outreach.jpg"
        wordpressKey="about.hero"
      />
      <Breadcrumbs items={[{ label: 'About FRAD' }]} />

      <section className="section-padding">
        <div className="section-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Working with communities to build safer, healthier futures.</h2>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-5 text-lg leading-8 text-ink-700">
              <p>
                Future Resilience and Development Foundation (FRAD Foundation) is a Nigerian-founded and youth-led nonprofit
                organisation registered with the Corporate Affairs Commission (CAC/IT/NO/139393) in 2019.
              </p>
              <p>
                We support people affected by conflict, displacement, poverty, and limited access to essential services, with
                particular attention to women, children, and persons with disabilities. Our work spans Water, Sanitation and
                Hygiene (WASH), nutrition, primary health care, protection, education, livelihoods, peacebuilding, and emergency response.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white hairline-t hairline-b">
        <div className="section-container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Identity</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">The principles that define how we work.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {IDENTITY_CARDS.map((card) => (
              <div key={card.title} className="evidence-card p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-frad-green-800/20 bg-frad-green-50 text-frad-green-900">
                  <Icon name={card.icon} className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-xl font-extrabold">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Learn more about the principles that guide our work."
        description="Read about FRAD's mission, governance, community-centred approach, and accountability commitments."
        primaryCta={{ label: 'Mission and Vision', href: '/about/mission-vision-values' }}
        secondaryCta={{ label: 'Accountability', href: '/about/accountability' }}
        variant="green"
      />
    </div>
  );
}
