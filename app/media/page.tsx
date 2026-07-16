import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import MediaExhibit from '@/components/sections/MediaExhibit';
import { fetchMediaAssets } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Media Library',
  description:
    'FRAD Foundation photography and film from the field, published with informed consent, captions, and location safety.',
};

export default async function MediaPage() {
  const assets = await fetchMediaAssets(30);

  return (
    <div className="bg-paper-100">
      <Hero
        headline="Photography and video from across our work."
        subtext="Our media library documents programme activities and community leadership while respecting consent, dignity, and safety."
        size="small"
        backgroundImage="/images/frad-programme-outreach.jpg"
      />
      <Breadcrumbs items={[{ label: 'Media Library' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="eyebrow">Media exhibit</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">A responsible visual record of our programmes.</h2>
            </div>
            <p className="body-lead">
              These images and films help partners, journalists, and supporters understand our work while protecting
              the privacy and safety of the people involved.
            </p>
          </div>
          <MediaExhibit assets={assets} />
        </div>
      </section>

      <section className="section-padding bg-white hairline-t">
        <div className="section-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Media desk</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              What every published asset carries.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Caption, date, and programme context',
                'Informed consent and safeguarding review',
                'Credit line and usage terms',
                'Transcripts for published video',
              ].map((item) => (
                <div key={item} className="evidence-card p-5">
                  <p className="text-base font-extrabold text-ink-950">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg leading-8 text-ink-700">
              Journalists and partners can request approved photography, press materials, and interviews through our media desk.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
