import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import NigeriaOperationalMap from '@/components/interactive/NigeriaOperationalMap';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Where We Work | FRAD Foundation',
  description:
    'FRAD Foundation public operational footprint across Northeast Nigeria, Northwest Nigeria, and Abuja coordination.',
};

const locations = [
  {
    title: 'Northeast Nigeria',
    meta: 'Borno, Adamawa, Yobe',
    desc: 'Multi-sector operations across crisis-affected communities, with field detail deliberately limited to protect the people we serve.',
    href: '/where-we-work/northeast',
  },
  {
    title: 'Northwest Nigeria',
    meta: 'Expanding response corridor',
    desc: 'Community support and response activities where programme details can be safely communicated.',
    href: '/where-we-work/northwest',
  },
  {
    title: 'Abuja Coordination',
    meta: 'Federal Capital Territory',
    desc: 'Coordination, partnership engagement, compliance, and national representation.',
    href: '/where-we-work/abuja',
  },
];

export default function WhereWeWorkPage() {
  return (
    <div className="bg-paper-100">
      <Hero
        headline="Present where needs are most urgent, across Northern Nigeria."
        subtext="FRAD communicates regional presence clearly while protecting sensitive field locations, community safety, and protection-sensitive programme details."
        size="small"
        backgroundImage="/images/frad-water-access.jpg"
        wordpressKey="where_we_work.hero"
      />
      <Breadcrumbs items={[{ label: 'Where We Work' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Geographic footprint</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Northeast, Northwest, and Abuja coordination.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-700">
              FRAD communicates regional presence clearly while limiting sensitive operational details that could expose
              communities, staff, or partners.
            </p>
          </div>
          <NigeriaOperationalMap />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {locations.map((location) => (
              <Link key={location.title} href={location.href} className="evidence-card group p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-frad-green-700">
                  {location.meta}
                </p>
                <h3 className="mt-4 text-2xl font-extrabold group-hover:text-frad-green-800">{location.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink-600">{location.desc}</p>
                <p className="mt-7 text-sm font-extrabold text-frad-green-800">Open location</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
