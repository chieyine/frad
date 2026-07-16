import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import Stamp from '@/components/ui/Stamp';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';
import { fetchStories } from '@/lib/wordpress';

async function getStory(slug: string) {
  const stories = await fetchStories(100);
  return stories.find((story) => story.slug === slug && story.consentStatus === 'consented');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return { title: 'Story Not Found' };
  return { title: story.title, description: story.summary };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  return (
    <div className="bg-paper-100">
      <div className="section-container py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-wrap justify-center gap-2">{story.sector && <Badge variant="green">{story.sector}</Badge>}{story.location && <Badge>{story.location}</Badge>}<Stamp tone="green">Consent filed</Stamp></div>
          <h1 className="mt-7 text-4xl font-black leading-tight sm:text-6xl">{story.title}</h1>
          <p className="mt-6 text-lg leading-8 text-ink-700">{story.summary}</p>
        </div>
      </div>
      <Breadcrumbs items={[{ label: 'Stories', href: '/stories' }, { label: story.title }]} />
      {story.featuredImage && <div className="section-container"><div className="relative aspect-[16/8] overflow-hidden rounded-xl"><Image src={story.featuredImage} alt={story.title} fill priority sizes="(min-width: 1344px) 1344px, 100vw" className="object-cover" /></div></div>}
      <section className="section-padding">
        <article className="section-container max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-ink-950/10 pb-5 text-sm font-bold text-ink-600">
            {story.date && <time dateTime={story.date}>{story.date}</time>}
            <span>{story.storyType.replace('-', ' ')}</span>
            {story.namePseudonym && <span>Name shared as: {story.namePseudonym}</span>}
          </div>
          <div className="space-y-6 text-lg leading-9 text-ink-800">
            {story.fullStory.split(/\n{2,}/).filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-10 rounded-xl border border-frad-green-800/20 bg-frad-green-50 p-6 text-sm leading-7 text-ink-700">
            This story was reviewed for informed consent, dignity, and protection before publication. Sensitive identifying detail is withheld where needed.
          </div>
        </article>
      </section>
      <CTASection
        title="Back locally led action"
        description="Support programmes developed with communities and grounded in local priorities."
        primaryCta={{ label: 'Donate', href: '/donate' }}
      />
    </div>
  );
}
