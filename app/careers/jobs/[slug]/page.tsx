import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';
import { fetchJobs } from '@/lib/wordpress';

async function getJob(slug: string) {
  const jobs = await fetchJobs(100);
  return jobs.find((job) => job.slug === slug);
}

function safeApplicationUrl(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: 'Vacancy Not Found' };
  return { title: `${job.title} | Careers`, description: job.summary };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();
  const applicationUrl = safeApplicationUrl(job.applicationLink);

  return (
    <div className="bg-paper-100">
      <div className="section-container py-12 sm:py-16">
        <div className="flex flex-wrap gap-2">
          <Badge variant={job.status === 'open' ? 'green' : 'muted'}>{job.status}</Badge>
          <Badge>{job.employmentType}</Badge>
        </div>
        <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{job.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-700">{job.summary}</p>
      </div>
      <Breadcrumbs items={[{ label: 'Careers', href: '/careers' }, { label: 'Jobs', href: '/careers/jobs' }, { label: job.title }]} />

      <section className="section-padding">
        <div className="section-container grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="evidence-card h-fit p-6">
            <dl className="space-y-5 text-sm">
              <div><dt className="font-black text-ink-950">Department</dt><dd className="mt-1 text-ink-600">{job.department}</dd></div>
              <div><dt className="font-black text-ink-950">Location</dt><dd className="mt-1 text-ink-600">{job.location}</dd></div>
              <div><dt className="font-black text-ink-950">Deadline</dt><dd className="mt-1 text-ink-600">{job.deadline}</dd></div>
              {job.duration && <div><dt className="font-black text-ink-950">Duration</dt><dd className="mt-1 text-ink-600">{job.duration}</dd></div>}
              {job.datePosted && <div><dt className="font-black text-ink-950">Posted</dt><dd className="mt-1 text-ink-600">{job.datePosted}</dd></div>}
            </dl>
          </aside>
          <article className="space-y-8">
            {job.responsibilities.length > 0 && <section className="card-base"><h2 className="text-3xl font-black">Responsibilities</h2><ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-ink-700">{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section>}
            {job.requirements.length > 0 && <section className="card-base"><h2 className="text-3xl font-black">Requirements</h2><ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-ink-700">{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul></section>}
            <section className="card-base"><h2 className="text-3xl font-black">How to apply</h2><p className="mt-5 whitespace-pre-line leading-8 text-ink-700">{job.howToApply}</p>{applicationUrl && job.status === 'open' && <a href={applicationUrl} target="_blank" rel="noopener noreferrer" className="cta-button cta-primary safe-focus mt-6 inline-flex">Open official application</a>}</section>
          </article>
        </div>
      </section>
      <CTASection
        title="Recruitment is always free."
        description="FRAD Foundation never requests application, processing, or recruitment fees. Report suspicious requests through the official contact channel."
        primaryCta={{ label: 'Contact recruitment', href: '/contact' }}
        variant="neutral"
      />
    </div>
  );
}
