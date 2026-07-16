import Image from 'next/image';
import Link from 'next/link';
import Icon, { type IconName } from '@/components/ui/Icon';
import { getHeroVideoForImage } from '@/lib/heroMedia';
import { fetchProjects, fetchStories, fetchSectors } from '@/lib/wordpress';

const PROGRAMME_ICONS: Record<string, IconName> = {
  'nutrition-health': 'heart-pulse',
  wash: 'droplet',
  'protection-gbv': 'shield',
  'emergency-response': 'zap',
  education: 'book-open',
  'livelihoods-resilience': 'sprout',
  'peacebuilding-social-cohesion': 'rings',
  'innovation-digital-systems': 'cpu',
};

export default async function HomePage() {
  const [projects, stories, sectors] = await Promise.all([fetchProjects(6), fetchStories(6), fetchSectors()]);
  const featuredProject = projects.find((project) => project.featuredOnHomepage) ?? projects[0];
  const featuredStory = stories.find((story) => story.featuredOnHomepage) ?? stories[0];
  const heroPoster = '/images/frad-field-hero.jpg';
  const heroVideo = getHeroVideoForImage(heroPoster);

  return (
    <div className="bg-paper-50">
      <section className="relative min-h-[72svh] overflow-hidden bg-ink-950 text-white">
        <Image
          src={heroPoster}
          alt="FRAD humanitarian staff working with community members in Northern Nigeria"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hero-media object-cover"
        />
        {heroVideo && (
          <video className="hero-video absolute inset-0 h-full w-full object-cover" poster={heroPoster} autoPlay muted loop playsInline preload="none" aria-hidden="true">
            <source src={heroVideo} type="video/mp4" media="(min-width: 768px)" />
          </video>
        )}
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(8,17,13,0.9),rgba(8,17,13,0.62)_50%,rgba(8,17,13,0.18)),linear-gradient(180deg,rgba(8,17,13,0.05),rgba(8,17,13,0.74))]" />
        <div className="section-container relative z-10 flex min-h-[72svh] flex-col justify-end pb-14 pt-24 lg:pb-20 lg:pt-28">
          <p className="editorial-kicker text-frad-green-200">Nigerian-led humanitarian action</p>
          <h1 className="display-title mt-7 max-w-5xl text-white">Local leadership. Practical action. Stronger communities.</h1>
          <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-white/80 sm:text-xl">
            FRAD Foundation works with crisis-affected communities across Northern Nigeria to improve health, safety, access to essential services, and long-term resilience.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/donors" className="safe-focus cta-button border border-white bg-white text-ink-950 hover:bg-frad-green-100">Donor &amp; Partner Hub</Link>
            <Link href="/impact" className="safe-focus cta-button border border-white/35 bg-white/8 text-white hover:bg-white hover:text-ink-950">Examine Our Impact</Link>
          </div>
          <div className="mt-11 flex flex-wrap gap-x-7 gap-y-2 border-t border-white/20 pt-5 text-xs font-black uppercase tracking-[0.12em] text-white/72">
            <span>Northeast Nigeria</span><span>Northwest Nigeria</span><span>Abuja Coordination</span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-[7] h-1 bg-gradient-to-r from-frad-green-500 via-white/80 to-frad-red-600" aria-hidden="true" />
      </section>

      <section className="border-b border-ink-950/10 bg-white">
        <div className="section-container grid lg:grid-cols-[0.72fr_3.28fr]">
          <div className="flex flex-col justify-center border-b border-ink-950/10 py-7 lg:border-b-0 lg:border-r lg:pr-8">
            <p className="editorial-kicker">Start here</p>
            <h2 className="mt-2 text-xl font-black text-ink-950">Choose a direct path.</h2>
          </div>
          <div className="grid sm:grid-cols-3">
            {[
              { title: 'Partner with FRAD', copy: 'Explore funding, programme, and due-diligence information.', href: '/donors', icon: 'briefcase' as const },
              { title: 'See our results', copy: 'Read about our projects, reports, and programme learning.', href: '/impact', icon: 'file-text' as const },
              { title: 'Support our work', copy: 'Help communities access timely, locally led assistance.', href: '/donate', icon: 'heart-pulse' as const },
            ].map((pathway) => (
              <Link key={pathway.title} href={pathway.href} className="safe-focus group border-b border-ink-950/10 py-7 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 hover:bg-paper-100">
                <Icon name={pathway.icon} className="h-5 w-5 text-frad-green-800" />
                <h3 className="mt-5 text-lg font-black text-ink-950">{pathway.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink-600">{pathway.copy}</p>
                <span className="mt-4 inline-flex text-xs font-black uppercase tracking-[0.1em] text-frad-green-800">Open →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <p className="editorial-kicker">Who we are</p>
            <h2 className="section-title mt-6">Nigerian-led and accountable to the communities we serve.</h2>
            <p className="body-lead mt-7">We work with community leaders, public institutions, and humanitarian partners to deliver assistance that responds to local priorities and strengthens existing systems.</p>
            <Link href="/about" className="safe-focus mt-7 inline-flex text-sm font-black uppercase tracking-[0.1em] text-frad-green-900">About FRAD →</Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-ink-950/12 bg-ink-950/12 sm:grid-cols-3">
            {[
              ['2019', 'Founded and registered in Nigeria'],
              ['8', 'Connected programme areas'],
              ['3', 'Operational regions'],
            ].map(([value, label]) => (
              <div key={label} className="bg-white p-6 lg:min-h-44">
                <p className="fact-numeral text-frad-green-900">{value}</p>
                <p className="mt-5 text-sm font-extrabold leading-6 text-ink-950">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink-950/10 bg-paper-100 section-padding">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="editorial-kicker">Our work</p>
              <h2 className="section-title mt-6">Response shaped around real community needs.</h2>
              <p className="body-lead mt-7">Our programmes connect immediate humanitarian assistance with recovery, local capacity, and long-term resilience.</p>
              <div className="mt-8 grid gap-2">
                {[
                  ['Northeast Nigeria', '/where-we-work/northeast'],
                  ['Northwest Nigeria', '/where-we-work/northwest'],
                  ['Abuja Coordination', '/where-we-work/abuja'],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="safe-focus flex items-center justify-between rounded-lg border border-ink-950/12 bg-white px-4 py-3 text-sm font-black text-ink-950 hover:border-frad-green-800/40">{label}<span>→</span></Link>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {sectors.slice(0, 4).map((sector) => (
                <Link key={sector.slug} href={`/what-we-do/${sector.slug}`} className="safe-focus group rounded-xl border border-ink-950/12 bg-white p-6 hover:border-frad-green-800/35 hover:shadow-[0_20px_50px_-38px_rgba(8,17,13,0.5)]">
                  <Icon name={PROGRAMME_ICONS[sector.slug] ?? 'cpu'} className="h-6 w-6 text-frad-green-800" />
                  <h3 className="mt-5 text-xl font-black text-ink-950">{sector.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-ink-600">{sector.shortDescription}</p>
                  <span className="mt-5 inline-flex text-xs font-black uppercase tracking-[0.1em] text-frad-green-800">Explore →</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-end"><Link href="/what-we-do" className="safe-focus text-sm font-black uppercase tracking-[0.1em] text-frad-green-900">View all eight programme areas →</Link></div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="editorial-kicker">Evidence</p>
              <h2 className="section-title mt-6">Results, learning, and stories from our work.</h2>
            </div>
            <p className="body-lead">Explore current projects, programme results, reports, and stories shared by the communities we work alongside.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <EvidenceCard eyebrow="Featured project" title={featuredProject?.title ?? 'Explore FRAD project records'} summary={featuredProject?.summary ?? 'Review scope, sectors, locations, timeframes, partners, and available results.'} href={featuredProject ? `/projects/${featuredProject.slug}` : '/projects'} action="Open project record" />
            <EvidenceCard eyebrow="Field story" title={featuredStory?.title ?? 'Stories shared with dignity and care'} summary={featuredStory?.summary ?? 'Read community stories published with consent, protection, and context.'} href={featuredStory ? `/stories/${featuredStory.slug}` : '/stories'} action="Read the story" />
          </div>
        </div>
      </section>

      <section className="bg-frad-green-950 text-white">
        <div className="section-container section-padding">
          <p className="editorial-kicker text-frad-green-300">Accountable partnership</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h2 className="max-w-4xl font-heading text-4xl font-extrabold leading-[1.04] text-white sm:text-5xl lg:text-6xl">Partner with an organisation rooted in the communities it serves.</h2>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/72">FRAD provides partners with clear information on governance, safeguarding, financial management, programme delivery, and results.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Link href="/donors/due-diligence" className="safe-focus flex items-center justify-between rounded-lg border border-white/20 px-5 py-4 text-sm font-black text-white hover:bg-white hover:text-ink-950">Due-diligence room <span>→</span></Link>
              <Link href="/financial-accountability" className="safe-focus flex items-center justify-between rounded-lg border border-white/20 px-5 py-4 text-sm font-black text-white hover:bg-white hover:text-ink-950">Financial accountability <span>→</span></Link>
              <Link href="/donate" className="safe-focus flex items-center justify-between rounded-lg bg-white px-5 py-4 text-sm font-black text-frad-green-950 hover:bg-frad-green-100">Donate securely <span>→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EvidenceCard({ eyebrow, title, summary, href, action }: { eyebrow: string; title: string; summary: string; href: string; action: string }) {
  return (
    <Link href={href} className="safe-focus group flex min-h-72 flex-col justify-between rounded-xl border border-ink-950/12 bg-white p-7 transition-all hover:border-frad-green-800/35 hover:shadow-[0_24px_60px_-42px_rgba(8,17,13,0.55)] sm:p-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.14em] text-frad-green-800">{eyebrow}</p>
        <h3 className="mt-5 text-3xl font-black leading-tight text-ink-950">{title}</h3>
        <p className="mt-5 line-clamp-3 text-base font-semibold leading-7 text-ink-600">{summary}</p>
      </div>
      <span className="mt-8 border-t border-ink-950/10 pt-5 text-xs font-black uppercase tracking-[0.1em] text-frad-green-800">{action} →</span>
    </Link>
  );
}
