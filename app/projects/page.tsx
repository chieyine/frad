import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FeaturedProject from '@/components/sections/FeaturedProject';
import ProjectCard from '@/components/cards/ProjectCard';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import { fetchProjects } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'FRAD Foundation humanitarian and development project portfolio across Northeast and Northwest Nigeria.',
};

const projectFields = [
  'Project title',
  'Status',
  'Location',
  'Sectors',
  'Donor and partners',
  'Duration',
  'Summary',
  'Results and source',
];

export default async function ProjectsPage() {
  const projects = await fetchProjects(18);
  const featuredProject = projects.find((project) => project.featuredOnHomepage) ?? projects[0];

  return (
    <div className="bg-paper-100">
      <Hero
        headline="Projects responding to community priorities."
        subtext="Explore FRAD programmes by location, sector, implementation period, partners, and reported results."
        size="small"
        backgroundImage="/images/frad-water-access.jpg"
        wordpressKey="projects.hero"
      />
      <Breadcrumbs items={[{ label: 'Projects' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Project records</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                A clear view of our programme portfolio.
              </h2>
              <p className="mt-5 text-lg leading-8 text-ink-700">
                Each project page brings together the programme focus, location, implementation period, partners, key activities,
                and results that can be shared publicly.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {projectFields.map((field) => (
                  <div key={field} className="border-l-2 border-frad-green-700 bg-white px-4 py-3">
                    <p className="text-sm font-extrabold text-ink-850">{field}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 evidence-card p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-frad-green-800">
                  Project portfolio
                </p>
                <p className="mt-4 text-base leading-7 text-ink-700">
                  Project information is reviewed before publication. Sensitive locations and personal information are withheld
                  whenever disclosure could put community members, staff, or partners at risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white hairline-t">
        <div className="section-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Featured project</h2>
            </div>
            <p className="rounded-[6px] border border-ink-950/10 bg-paper-50 px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-ink-700">
              Showing all published projects
            </p>
          </div>
          <FeaturedProject project={featuredProject} />

          <div className="mt-14">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Project index</h2>
              <p className="max-w-xl text-sm font-semibold leading-7 text-ink-600">
                Browse FRAD projects by sector, status, location, implementation period, and partner.
              </p>
            </div>
            {projects.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    slug={project.slug}
                    location={project.location}
                    status={project.status}
                    sectors={project.sectors}
                    donor={project.donor}
                    summary={project.summary}
                    featuredImage={project.featuredImage}
                  />
                ))}
              </div>
            ) : (
              <ContentEmptyState
                eyebrow="Project index"
                title="Explore FRAD's programme portfolio."
                description="Contact our programme team for information about current and completed projects."
              />
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
