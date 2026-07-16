import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = { title: 'Donor Due Diligence', description: 'FRAD Foundation institutional due-diligence, governance, safeguarding, compliance, and document request pathway.' };
const areas = [
  ['Legal identity', 'Registration, governing documents, authorized signatories, and institutional identity records.'],
  ['Governance', 'Board oversight, management accountability, conflicts of interest, and delegated authority.'],
  ['Financial controls', 'Budget approval, segregation of duties, procurement controls, reconciliation, audit, and document retention.'],
  ['Safeguarding', 'PSEA, complaints, survivor-centred referrals, staff conduct, and confidential escalation.'],
  ['Programme quality', 'Needs assessment, technical design, MEAL, community feedback, adaptation, and closeout.'],
  ['Risk & compliance', 'Partner vetting, fraud prevention, data protection, security, incident reporting, and donor requirements.'],
];
export default function DueDiligencePage() { return <div className="bg-paper-100"><Hero headline="Due-diligence information for institutional partners." subtext="Review the principal governance, financial management, safeguarding, programme quality, and risk areas covered during a partnership assessment." size="small" /><Breadcrumbs items={[{ label: 'Donor Hub', href: '/donors' }, { label: 'Due Diligence' }]} /><section className="section-padding"><div className="section-container"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{areas.map(([title, copy], index) => <article key={title} className="evidence-card p-6"><p className="index-numeral text-3xl">{String(index + 1).padStart(2, '0')}</p><h2 className="mt-4 text-2xl font-black">{title}</h2><p className="mt-3 text-sm leading-7 text-ink-600">{copy}</p></article>)}</div><div className="mt-12 rounded-xl border border-frad-green-800/20 bg-frad-green-50 p-7"><h2 className="text-3xl font-black">Request supporting documents</h2><p className="mt-4 max-w-3xl leading-8 text-ink-700">Policies, registration records, references, banking confirmations, and detailed control documents are shared with verified institutional contacts according to the purpose and confidentiality requirements of the review.</p></div></div></section><CTASection title="Request FRAD's due-diligence documents." description="Tell us which documents, donor templates, jurisdictions, and review deadlines apply to your assessment." primaryCta={{ label: 'Submit a document request', href: '/contact?reason=partnership' }} secondaryCta={{ label: 'Financial accountability', href: '/financial-accountability' }} /></div>; }
