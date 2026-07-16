import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = { title: 'Donor & Partner Hub', description: 'Partnership, due diligence, programme information, and funding pathways for organisations working with FRAD Foundation.' };

const pathways = [
  ['Fund a programme', 'Discuss restricted or flexible funding aligned with community priorities and agreed programme outcomes.', '/contact?reason=partnership'],
  ['Review due diligence', 'Access FRAD governance, safeguarding, registration, reporting, and compliance pathways.', '/donors/due-diligence'],
  ['Review our results', 'Explore project information, reports, programme reach, and lessons from implementation.', '/impact'],
  ['Understand accountability', 'See feedback, PSEA, safeguarding, privacy, and responsible-data commitments.', '/about/accountability'],
];

export default function DonorHubPage() {
  return <div className="bg-paper-100">
    <Hero headline="Partner with a Nigerian organisation rooted in local communities." subtext="FRAD works with donors and technical partners to design and deliver programmes that respond to local priorities and meet agreed standards for quality and accountability." size="small" backgroundImage="/images/frad-programme-outreach.jpg" primaryCta={{ label: 'Start a conversation', href: '/contact?reason=partnership' }} secondaryCta={{ label: 'Due-diligence information', href: '/donors/due-diligence' }} />
    <Breadcrumbs items={[{ label: 'Donor & Partner Hub' }]} />
    <section className="section-padding"><div className="section-container">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">Institutional partnership</p><h2 className="mt-5 text-4xl font-black">Clear information for informed partnership decisions.</h2><p className="mt-5 text-lg leading-8 text-ink-700">Learn about FRAD&apos;s leadership, programme experience, financial controls, safeguarding commitments, and approach to working with communities before beginning a formal assessment.</p></div>
      <div className="grid gap-4 sm:grid-cols-2">{pathways.map(([title, copy, href], index) => <Link key={title} href={href} className="evidence-card group p-6"><p className="index-numeral text-3xl">{String(index + 1).padStart(2, '0')}</p><h3 className="mt-4 text-2xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-ink-600">{copy}</p><span className="mt-5 inline-flex text-xs font-black uppercase tracking-wider text-frad-green-800 group-hover:translate-x-1">Open pathway →</span></Link>)}</div></div>
      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink-950/10 bg-ink-950/10 md:grid-cols-4">{['Nigerian-led governance', 'Integrated programmes', 'Safeguarding & PSEA', 'Evidence-led reporting'].map((item) => <div key={item} className="bg-white p-6 font-black text-ink-950">{item}</div>)}</div>
    </div></section>
    <CTASection title="Start a partnership conversation with FRAD." description="Contact our team to discuss programme priorities, geographic scope, funding requirements, and due-diligence needs." primaryCta={{ label: 'Contact the partnership team', href: '/contact?reason=partnership' }} secondaryCta={{ label: 'View projects', href: '/projects' }} />
  </div>;
}
