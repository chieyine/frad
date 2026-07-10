import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Accountability & Safeguarding | FRAD Foundation',
  description: 'FRAD Foundation safeguarding, PSEA, complaints, and accountability commitments.',
};

export default function AccountabilityPage() {
  return (
    <div className="bg-paper-100">
      <Hero
        headline="Accountability to Affected Populations (AAP)"
        subtext="FRAD treats PSEA charter compliance, confidential complaints, and community feedback as core pillars of responsible humanitarian action."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Accountability & Safeguarding' }]} />

      <section className="section-padding">
        <div className="section-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Zero Tolerance Policy</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Protection from Sexual Exploitation and Abuse (PSEA)</h2>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              FRAD Foundation enforces strict zero-tolerance for sexual exploitation, abuse, and harassment. All complaints are treated with absolute confidentiality, priority, and victim-centered care.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="evidence-card p-6 border-l-4 border-frad-red-600">
                <span className="text-xs font-black uppercase tracking-wider text-frad-red-600">Confidential Desk</span>
                <h3 className="text-xl font-extrabold mt-2">PSEA & Ethics Reporting</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Submit any reports of misconduct, exploitation, or ethical breaches directly to our dedicated internal compliance officer.
                </p>
                <div className="mt-4 pt-4 border-t border-ink-950/10 space-y-1 text-xs">
                  <p className="font-bold">Direct Email:</p>
                  <p className="text-frad-red-600 font-extrabold select-all">ethics@fradfoundation.org</p>
                </div>
              </div>
              <div className="evidence-card p-6 border-l-4 border-frad-green-800">
                <span className="text-xs font-black uppercase tracking-wider text-frad-green-800">Toll-Free Line</span>
                <h3 className="text-xl font-extrabold mt-2">Community Feedback</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Affected community members can call our toll-free phone line to log complaints or provide feedback confidentially.
                </p>
                <div className="mt-4 pt-4 border-t border-ink-950/10 space-y-1 text-xs">
                  <p className="font-bold">Nigeria Toll-Free Hotline:</p>
                  <p className="text-frad-green-800 font-extrabold select-all">08000011166</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
