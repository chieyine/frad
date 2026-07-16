import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Badge from '@/components/ui/Badge';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import NewsletterSubscribe from '@/components/interactive/NewsletterSubscribe';
import { fetchNews } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'News',
  description: 'Official FRAD Foundation news, press releases, and public updates.',
};

export default async function NewsPage() {
  const newsItems = await fetchNews(18);

  return (
    <div className="bg-paper-100">
      <Hero
        headline="Official updates from FRAD Foundation."
        subtext="Read programme updates, public statements, press releases, and news from across FRAD's work."
        size="small"
        backgroundImage="/images/frad-programme-outreach.jpg"
        wordpressKey="news.hero"
      />
      <Breadcrumbs items={[{ label: 'News' }]} />

      <section className="section-padding">
        <div className="section-container">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="eyebrow">Newsroom</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Latest news and programme updates.</h2>
            </div>
            <p className="body-lead">
              Follow programme milestones, organisational announcements, field activities, and official statements from FRAD Foundation.
            </p>
          </div>

          {newsItems.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-3">
              {newsItems.map((item) => (
                <Link key={item.id} href={`/news/${item.slug}`} className="premium-card group flex h-full flex-col !p-0">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-frad-green-950 to-frad-navy-900">
                    {item.featuredImage && (
                      <Image src={item.featuredImage} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/72 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-5">
                      <Badge variant={item.pressRelease ? 'blue' : 'green'} size="sm">
                        {item.pressRelease ? 'Press release' : item.category}
                      </Badge>
                      {item.date && <Badge variant="default" size="sm">{item.date}</Badge>}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-black leading-tight group-hover:text-frad-green-800">{item.title}</h3>
                    <p className="mt-4 flex-1 text-sm font-semibold leading-7 text-ink-600">{item.summary}</p>
                    <span className="mt-7 border-t border-ink-950/10 pt-4 text-sm font-black uppercase tracking-[0.1em] text-frad-green-800">Read update →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <ContentEmptyState
              eyebrow="Newsroom"
              title="News and updates from FRAD Foundation."
              description="For recent announcements or media enquiries, contact the FRAD communications team."
            />
          )}

          <div className="mt-16 pt-10 border-t border-ink-950/10 max-w-3xl mx-auto">
            <NewsletterSubscribe wordpressKey="news.newsletter" defaultInterest="emergency_alerts" />
          </div>
        </div>
      </section>

    </div>
  );
}
