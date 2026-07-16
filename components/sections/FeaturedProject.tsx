import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types/content';
import Badge from '@/components/ui/Badge';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import EvidenceDossier from '@/components/sections/EvidenceDossier';

export default function FeaturedProject({ project }: { project?: Project | null }) {
  if (!project) {
    return (
      <ContentEmptyState
        eyebrow="Featured project"
        title="Explore FRAD's programme portfolio."
        description="Learn about our programme areas, locations, partners, activities, and reported results."
        href="/projects"
        actionLabel="View project portfolio"
      />
    );
  }

  const href = project.slug ? `/projects/${project.slug}` : '/projects';

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
      <Link href={href} className="cinematic-frame group block min-h-[32rem] overflow-hidden">
        {project.featuredImage ? (
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Image
            src="/images/frad-water-access.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(8,17,13,0.02),rgba(8,17,13,0.84)),linear-gradient(90deg,rgba(8,17,13,0.7),rgba(8,17,13,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 z-[4] p-7 text-white sm:p-8">
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge variant="green" size="sm">{project.status}</Badge>
            {project.location && <Badge variant="default" size="sm">{project.location}</Badge>}
          </div>
          <h3 className="max-w-2xl text-4xl font-black leading-[1.03] text-white sm:text-5xl">{project.title}</h3>
          <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-white/78">{project.summary}</p>
        </div>
      </Link>

      <EvidenceDossier
        title="Project overview"
        summary="Key information about the programme focus, implementation period, partners, location, and results."
        href={href}
        actionLabel="Open project"
        rows={[
          { label: 'Sectors', value: project.sectors.length ? project.sectors.join(', ') : 'Multi-sector response' },
          { label: 'Timeframe', value: [project.startDate, project.endDate].filter(Boolean).join(' to ') || 'Operational period recorded by programme team' },
          { label: 'Donor / partner', value: project.donor || 'Implemented with institutional and community coordination' },
          { label: 'Results', value: project.results?.[0] || 'Contact the programme team for current results' },
        ]}
      />
    </div>
  );
}
