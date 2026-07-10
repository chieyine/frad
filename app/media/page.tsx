import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import MediaExhibit from '@/components/sections/MediaExhibit';
import { fetchMediaAssets } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Media Library | FRAD Foundation',
  description:
    'FRAD Foundation photography and film from the field, published with informed consent, captions, and location safety.',
};

export default async function MediaPage() {
  const assets = await fetchMediaAssets(30);

  return (
    <div className="bg-paper-100">
      <Hero
        headline="A media library built for evidence, dignity, and public trust."
        subtext="FRAD uses photography and video spaces to communicate field presence, programme quality, and community agency while protecting consent, safety, and sensitive locations."
        size="small"
        backgroundImage="/images/frad-programme-outreach.jpg"
      />
      <Breadcrumbs items={[{ label: 'Media Library' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="eyebrow">Media exhibit</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Photography and film treated like a serious humanitarian archive.</h2>
            </div>
            <p className="body-lead">
              The media library gives partners, journalists, and supporters a visual understanding of FRAD&apos;s work
              without exposing communities to unnecessary risk.
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
              Journalists and partners can request field photography, press materials, and interviews through the
              media desk. We respond quickly and share what can be published safely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
