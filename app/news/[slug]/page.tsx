import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { fetchNews } from '@/lib/wordpress';

async function getNewsItem(slug: string) {
  const items = await fetchNews(100);
  return items.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return { title: 'Update Not Found' };
  return { title: item.title, description: item.summary };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) notFound();

  return (
    <div className="bg-paper-100">
      <div className="section-container py-12 sm:py-16">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2"><Badge variant={item.pressRelease ? 'blue' : 'green'}>{item.pressRelease ? 'Press release' : item.category}</Badge>{item.date && <Badge>{item.date}</Badge>}</div>
          <h1 className="mt-7 text-4xl font-black leading-tight sm:text-6xl">{item.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-700">{item.summary}</p>
        </div>
      </div>
      <Breadcrumbs items={[{ label: 'News', href: '/news' }, { label: item.title }]} />
      {item.featuredImage && <div className="section-container"><div className="relative aspect-[16/8] overflow-hidden rounded-xl"><Image src={item.featuredImage} alt={item.title} fill priority sizes="(min-width: 1344px) 1344px, 100vw" className="object-cover" /></div></div>}
      <section className="section-padding">
        <article className="section-container max-w-3xl">
          <div className="mb-8 flex flex-wrap gap-4 border-b border-ink-950/10 pb-5 text-sm font-bold text-ink-600">{item.date && <time dateTime={item.date}>{item.date}</time>}{item.location && <span>{item.location}</span>}</div>
          <div className="space-y-6 text-lg leading-9 text-ink-800">{item.body.split(/\n{2,}/).filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </article>
      </section>
    </div>
  );
}
