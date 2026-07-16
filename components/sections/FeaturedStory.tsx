import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/types/content';
import Badge from '@/components/ui/Badge';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import Stamp from '@/components/ui/Stamp';

export default function FeaturedStory({ story }: { story?: Story | null }) {
  if (!story) {
    return (
      <ContentEmptyState
        eyebrow="Featured story"
        title="Stories from the communities we work alongside."
        description="Read experiences of change and resilience shared with informed consent and respect for safety and dignity."
        href="/stories"
        actionLabel="Visit story library"
      />
    );
  }

  const href = story.slug ? `/stories/${story.slug}` : '/stories';

  return (
    <Link href={href} className="safe-focus group block">
      <article className="premium-card overflow-hidden">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="cinematic-frame min-h-[28rem] rounded-none">
            {story.featuredImage ? (
              <Image
                src={story.featuredImage}
                alt={story.title}
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <Image
                src="/images/frad-field-hero.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="flex flex-col justify-between bg-white p-7 sm:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {story.sector && <Badge variant="green" size="sm">{story.sector}</Badge>}
                {story.location && <Badge variant="default" size="sm">{story.location}</Badge>}
                <Stamp tone="green">
                  {story.consentStatus === 'consented' ? 'Consent filed' : 'Protection checked'}
                </Stamp>
              </div>
              <h3 className="mt-7 text-4xl font-black leading-[1.04] text-ink-950">{story.title}</h3>
              <p className="mt-5 text-lg font-semibold leading-8 text-ink-700">{story.summary}</p>
            </div>
            <div className="mt-8 border-t border-ink-950/10 pt-5 text-sm font-black uppercase tracking-[0.1em] text-frad-green-800">
              Read story
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
