import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FeaturedStory from '@/components/sections/FeaturedStory';
import StoryCard from '@/components/cards/StoryCard';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import { fetchStories } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Stories | FRAD Foundation',
  description: 'Dignity-centered stories of community agency and resilience from FRAD programmes across Nigeria.',
};

const storyCommitments = [
  'Every story is shared with informed consent',
  'Names are changed whenever protection requires it',
  'Survivors are never made identifiable',
  'No graphic detail used for effect',
  'Community agency leads. People are never props',
  'Protection review before anything is published',
];

export default async function StoriesPage() {
  const stories = await fetchStories(18);
  const featuredStory = stories.find((story) => story.featuredOnHomepage) ?? stories[0];

  return (
    <div className="bg-paper-100">
      <Hero
        headline="Stories told with dignity, consent, and care."
        subtext="Stories from the communities FRAD works alongside, centred on agency and resilience, never on pity."
        size="small"
        backgroundImage="/images/frad-field-hero.jpg"
        wordpressKey="stories.hero"
      />
      <Breadcrumbs items={[{ label: 'Stories' }]} />

      <section className="section-padding">
        <div className="section-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Ethical storytelling</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">People come before the story.</h2>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              FRAD shares stories only when dignity, informed consent, sensitivity, and community safety can be protected.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {storyCommitments.map((rule) => (
                <div key={rule} className="border-l-2 border-frad-green-700 bg-white px-4 py-3">
                  <p className="text-sm font-extrabold text-ink-850">{rule}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 evidence-card p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-frad-green-800">
                Story library
              </p>
              <p className="mt-4 text-base leading-7 text-ink-700">
                Public stories are shared here when they meet FRAD&apos;s consent, protection, and dignity standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white hairline-t">
        <div className="section-container">
          <FeaturedStory story={featuredStory} />

          <div className="mt-14">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Story library</h2>
              <p className="max-w-xl text-sm font-semibold leading-7 text-ink-600">
                Public stories are shared only when consent, protection, and dignity standards are met.
              </p>
            </div>
            {stories.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stories.map((story) => (
                  <StoryCard
                    key={story.id}
                    title={story.title}
                    slug={story.slug}
                    location={story.location}
                    sector={story.sector}
                    summary={story.summary}
                    featuredImage={story.featuredImage}
                    date={story.date}
                  />
                ))}
              </div>
            ) : (
              <ContentEmptyState
                eyebrow="Story library"
                title="Stories are published with dignity and care."
                description="FRAD's storytelling approach protects consent, identity, safety, and community agency before anything is shared publicly."
              />
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
