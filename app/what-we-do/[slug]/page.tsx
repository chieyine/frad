import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTASection from '@/components/sections/CTASection';
import Icon from '@/components/ui/Icon';
import ImageCarousel from '@/components/interactive/ImageCarousel';
import { SECTORS, SECTOR_DETAILS } from '@/lib/constants';
import { fetchMediaAssets } from '@/lib/wordpress';
import { FEATURED_MEDIA } from '@/lib/media';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);
  if (!sector) return { title: 'Programme Not Found' };
  return {
    title: sector.title,
    description: sector.description,
  };
}

export default async function SectorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);

  if (!sector) {
    notFound();
  }

  const details = SECTOR_DETAILS[sector.slug] ?? { focus: [], note: '' };

  // Fetch or filter media specific to this sector or general field documentation
  const fetchedMedia = await fetchMediaAssets(6).catch(() => null);
  const rawMedia = fetchedMedia && fetchedMedia.length > 0 ? fetchedMedia : FEATURED_MEDIA;

  // Filter by sector keyword match or show all
  const sectorMedia = rawMedia.filter((m) => {
    const raw = m as Record<string, unknown>;
    const sName = ((raw.sector as string) || (raw.category as string) || (raw.type as string) || '').toLowerCase();
    const target = sector.title.toLowerCase();
    return sName.includes(target.split(' ')[0]) || target.includes(sName.split(' ')[0]);
  });

  const displayMedia = (sectorMedia.length > 0 ? sectorMedia : rawMedia).map((m, idx) => {
    const raw = m as Record<string, unknown>;
    return {
      id: `sector-slide-${idx}`,
      title: m.title,
      image: m.image || '/images/frad-field-hero.jpg',
      caption: m.caption || m.title,
      category: (raw.sector as string) || (raw.category as string) || (raw.type as string) || sector.title,
      location: m.location || 'Borno / Yobe State',
      alt: m.alt || m.title,
    };
  });

  return (
    <>
      <Hero
        headline={sector.title}
        subtext={sector.description}
        size="small"
      />
      <Breadcrumbs
        items={[
          { label: 'What We Do', href: '/what-we-do' },
          { label: sector.title },
        ]}
      />

      <section className="section-padding">
        <div className="section-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[8px] border border-frad-green-800/20 bg-frad-green-50 text-frad-green-900">
              <Icon name={sector.icon} className="h-7 w-7" />
            </div>
            <p className="eyebrow">Programme overview</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{sector.title}</h2>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              FRAD works with community groups, public institutions, and local partners to deliver practical support
              under this programme area, with particular attention to people facing the greatest barriers to essential services.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {details.focus.map((item) => (
                <div key={item} className="border-l-2 border-frad-green-700 bg-white px-4 py-3">
                  <p className="text-sm font-extrabold text-ink-850">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 evidence-card p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-frad-green-800">How we deliver</p>
              <p className="mt-3 text-base leading-7 text-ink-700">{details.note}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-ink-950/10 pt-6 text-sm font-extrabold">
              <Link href="/projects" className="safe-focus link-underline text-frad-green-800">Related projects</Link>
              <Link href="/publications" className="safe-focus link-underline text-frad-green-800">Related publications</Link>
              <Link href="/stories" className="safe-focus link-underline text-frad-green-800">Field stories</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Evidence Carousel */}
      <section className="section-padding bg-paper-100 border-y border-ink-950/10">
        <div className="section-container">
          <ImageCarousel
            slides={displayMedia}
            eyebrow={`${sector.title} in action`}
            title="Programme activities with communities"
            wordpressKey={`sector-carousel-${sector.slug}`}
          />
        </div>
      </section>

      <CTASection
        title={`Support FRAD's ${sector.title} work`}
        description="Partner with us to strengthen services and expand support for crisis-affected communities."
        primaryCta={{ label: 'Partner With Us', href: '/partners' }}
        variant="neutral"
      />
    </>
  );
}
