import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FeaturedStory from '@/components/sections/FeaturedStory';
import StoryCard from '@/components/cards/StoryCard';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import ImageCarousel from '@/components/interactive/ImageCarousel';
import NewsletterSubscribe from '@/components/interactive/NewsletterSubscribe';
import { fetchStories } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Dignity-centred stories of community leadership and resilience from FRAD programmes across Nigeria.',
};

const storyCommitments = [
  'Every story is shared with informed consent',
  'Names are changed whenever protection requires it',
  'Survivors are never made identifiable',
  'No graphic detail used for effect',
  'Community members are represented with dignity and context',
  'Protection review before anything is published',
];

export default async function StoriesPage() {
  const stories = await fetchStories(18);
  const featuredStory = stories.find((story) => story.featuredOnHomepage) ?? stories[0];

  return (
    <div className="bg-paper-100">
      <Hero
        headline="Stories from the communities we work alongside."
        subtext="Community members share experiences of change, recovery, leadership, and resilience in their own words."
        size="small"
        backgroundImage="/images/frad-field-hero.jpg"
        wordpressKey="stories.hero"
      />
      <Breadcrumbs items={[{ label: 'Stories' }]} />

      <section className="section-padding">
        <div className="section-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Ethical storytelling</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Respect comes before publication.</h2>
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
                Every published story is reviewed for informed consent, safeguarding, accuracy, and respectful representation.
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

          <div className="mt-16 pt-10 border-t border-ink-950/10">
            <ImageCarousel
              eyebrow="Community stories"
              title="People, progress, and resilience across Northern Nigeria"
              wordpressKey="stories.carousel"
            />
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <NewsletterSubscribe
              wordpressKey="stories.newsletter"
              defaultInterest="general_dispatch"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
