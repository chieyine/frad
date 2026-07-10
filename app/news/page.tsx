import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Badge from '@/components/ui/Badge';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import { fetchNews } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'News | FRAD Foundation',
  description: 'Official FRAD Foundation news, press releases, and public updates.',
};

export default async function NewsPage() {
  const newsItems = await fetchNews(18);

  return (
    <div className="bg-paper-100">
      <Hero
        headline="Official updates from FRAD Foundation."
        subtext="News, public statements, press releases, and field updates are published with date, category, and context."
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
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Official updates, prepared for public trust.</h2>
            </div>
            <p className="body-lead">
              Every update carries category, date, context, and a clear distinction between news, press releases,
              and field updates.
            </p>
          </div>

          {newsItems.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-3">
              {newsItems.map((item) => (
                <Link key={item.id} href={`/news/${item.slug}`} className="premium-card group flex h-full flex-col p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant={item.pressRelease ? 'blue' : 'green'} size="sm">
                      {item.pressRelease ? 'Press release' : item.category}
                    </Badge>
                    {item.date && <Badge variant="default" size="sm">{item.date}</Badge>}
                  </div>
                  <h3 className="text-2xl font-black leading-tight group-hover:text-frad-green-800">{item.title}</h3>
                  <p className="mt-4 flex-1 text-sm font-semibold leading-7 text-ink-600">{item.summary}</p>
                  <span className="mt-7 border-t border-ink-950/10 pt-4 text-sm font-black uppercase tracking-[0.1em] text-frad-green-800">
                    Read update
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <ContentEmptyState
              eyebrow="Newsroom"
              title="Official FRAD updates and statements."
              description="FRAD shares public statements, field updates, and press information through official channels with date, context, and clear source attribution."
            />
          )}
        </div>
      </section>

    </div>
  );
}
