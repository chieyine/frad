import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';
import { fetchProjects } from '@/lib/wordpress';

async function getProject(slug: string) {
  const projects = await fetchProjects(100);
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Project Not Found' };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <div className="bg-paper-100">
      <div className="relative min-h-[30rem] overflow-hidden bg-ink-950 text-white">
        {project.featuredImage && (
          <Image src={project.featuredImage} alt={project.title} fill priority sizes="100vw" className="object-cover opacity-45" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/78 to-ink-950/25" />
        <div className="section-container relative flex min-h-[30rem] items-end py-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <Badge variant={project.status === 'active' ? 'green' : 'default'}>{project.status}</Badge>
              <Badge variant="default">{project.location}</Badge>
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82">{project.summary}</p>
          </div>
        </div>
      </div>
      <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }, { label: project.title }]} />

      <section className="section-padding">
        <div className="section-container grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="evidence-card h-fit p-6">
            <p className="eyebrow">Project information</p>
            <dl className="mt-6 space-y-5 text-sm">
              <div><dt className="font-black text-ink-950">Sectors</dt><dd className="mt-1 text-ink-600">{project.sectors.join(', ') || 'Multi-sector'}</dd></div>
              <div><dt className="font-black text-ink-950">Timeframe</dt><dd className="mt-1 text-ink-600">{[project.startDate, project.endDate].filter(Boolean).join(' to ')}</dd></div>
              {project.donor && <div><dt className="font-black text-ink-950">Donor / partner</dt><dd className="mt-1 text-ink-600">{project.donor}</dd></div>}
              {project.targetPopulation && <div><dt className="font-black text-ink-950">Target population</dt><dd className="mt-1 text-ink-600">{project.targetPopulation}</dd></div>}
            </dl>
          </aside>

          <article className="space-y-8">
            {project.problemStatement && <section className="card-base"><p className="eyebrow">Context</p><h2 className="mt-4 text-3xl font-black">The need</h2><p className="mt-4 leading-8 text-ink-700">{project.problemStatement}</p></section>}
            {project.fradResponse && <section className="card-base"><p className="eyebrow">Response</p><h2 className="mt-4 text-3xl font-black">What FRAD delivered</h2><p className="mt-4 leading-8 text-ink-700">{project.fradResponse}</p></section>}
            {project.keyActivities && project.keyActivities.length > 0 && (
              <section className="card-base"><p className="eyebrow">Implementation</p><h2 className="mt-4 text-3xl font-black">Key activities</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{project.keyActivities.map((item) => <li key={item} className="border-l-2 border-frad-green-700 bg-white px-4 py-3 text-sm font-bold text-ink-700">{item}</li>)}</ul></section>
            )}
            {project.results && project.results.length > 0 && (
              <section className="card-base"><p className="eyebrow">Results</p><h2 className="mt-4 text-3xl font-black">Reported results</h2><ol className="mt-5 space-y-3">{project.results.map((item, index) => <li key={item} className="flex gap-4 rounded-lg bg-frad-green-50 p-4 text-sm font-bold leading-7 text-ink-800"><span className="text-frad-green-800">{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol></section>
            )}
          </article>
        </div>
      </section>
      <CTASection
        title="Support this intervention"
        description="Help FRAD continue locally led humanitarian and development work with crisis-affected communities."
        primaryCta={{ label: 'Fund this project', href: `/donate?project=${project.slug}` }}
      />
    </div>
  );
}
