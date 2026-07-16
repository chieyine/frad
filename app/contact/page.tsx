import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactForm from '@/components/interactive/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact FRAD teams in Abuja, Maiduguri, and Northwest Nigeria, or submit a confidential enquiry or safeguarding complaint.',
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ reason?: string }> }) {
  const { reason } = await searchParams;
  const defaultReason = reason === 'partnership' || reason === 'media' || reason === 'complaint' ? reason : 'general';
  return (
    <>
      <Hero
        headline="Contact FRAD Foundation"
        subtext="Reach our team about programmes, partnerships, media enquiries, feedback, or safeguarding concerns."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <section className="section-padding">
        <div className="section-container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Reach Our Teams</h2>
              <p className="text-ink-600 leading-relaxed mb-8">
                We welcome enquiries from community members, donors, partner organisations, public institutions, researchers, and journalists.
              </p>

              <div className="space-y-6">
                <div className="card-base">
                  <h3 className="font-extrabold text-lg text-ink-950 mb-1">National Coordination Office</h3>
                  <p className="text-sm text-ink-600">Abuja, Federal Capital Territory, Nigeria</p>
                </div>
                <div id="safeguarding" className="card-base scroll-mt-32 border-l-4 border-l-frad-red-600">
                  <h3 className="font-extrabold text-lg text-ink-950 mb-1">Confidential Safeguarding & Complaints</h3>
                  <p className="text-sm text-ink-600 mb-2">
                    To report safeguarding concerns, PSEA infractions, or operational complaints securely:
                  </p>
                  <p className="text-xs font-semibold text-frad-red-600">All submissions are handled with strict confidentiality.</p>
                </div>
              </div>
            </div>

            <div className="card-base !p-8">
              <h3 className="font-extrabold text-xl text-ink-950 mb-6">Send a message</h3>
              <ContactForm defaultReason={defaultReason} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
