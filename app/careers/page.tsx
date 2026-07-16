import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';
import JobCard from '@/components/cards/JobCard';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import { fetchJobs } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Careers & Opportunities',
  description: 'Join FRAD Foundation frontline humanitarian and development teams across Nigeria.',
};

export default async function CareersPage() {
  const jobs = (await fetchJobs(12)).filter((job) => job.status === 'open');

  return (
    <>
      <Hero
        headline="Build a career that makes a difference."
        subtext="Join Nigerian professionals working with communities to deliver principled humanitarian and development programmes. FRAD recruitment is free and merit-based."
        size="small"
        backgroundImage="/images/frad-field-hero.jpg"
      />
      <Breadcrumbs items={[{ label: 'Careers' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Why work with FRAD</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Purposeful work in a professional team.</h2>
              <p className="mt-5 text-lg leading-8 text-ink-700">
                FRAD invests in Nigerian talent, professional development, safeguarding, staff wellbeing, and the practical expertise required to serve communities well.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Meaningful work', 'Contribute to programmes that respond to priorities identified with communities.'],
                  ['Local leadership', 'A Nigerian-led team where field experience shapes decisions.'],
                  ['Safeguarding culture', 'Strict PSEA standards protecting the people we serve and our staff.'],
                  ['Growth and learning', 'Training, mentorship, and responsibility that grow with you.'],
                ].map(([title, copy]) => (
                  <div key={title} className="evidence-card p-6">
                    <h3 className="text-xl font-extrabold">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-600">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">Current Openings</h2>
            {jobs.length > 0 ? (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    title={job.title}
                    slug={job.slug}
                    department={job.department}
                    location={job.location}
                    employmentType={job.employmentType}
                    deadline={job.deadline}
                    status={job.status}
                  />
                ))}
              </div>
            ) : (
              <ContentEmptyState
                eyebrow="Recruitment desk"
                title="No openings are published right now."
                description="FRAD publishes vacancies through official channels only. Recruitment remains free, merit-based, and protected from agents or fee requests."
              />
            )}
          </div>

          {/* Fraud warning. This protects applicants. */}
          <div className="mt-10 max-w-3xl rounded-[8px] border border-frad-red-600/25 bg-frad-red-50 p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-frad-red-700">Recruitment fraud warning</p>
            <p className="mt-3 text-base font-bold leading-7 text-ink-900">
              FRAD Foundation never charges application, processing, or recruitment fees at any stage and never
              recruits through unofficial agents. If anyone asks you for money in FRAD&apos;s name, it is fraud:
              do not pay, and report it to us directly.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="FRAD is an equal-opportunity employer."
        description="FRAD recruits on merit and welcomes applications from women, persons with disabilities, and candidates from the communities where we work."
        primaryCta={{ label: 'Contact the Recruitment Desk', href: '/contact' }}
        variant="neutral"
      />
    </>
  );
}
