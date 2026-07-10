import Image from 'next/image';
import Link from 'next/link';
import NigeriaOperationalMap from '@/components/interactive/NigeriaOperationalMap';
import SectorExplorerDashboard from '@/components/interactive/SectorExplorerDashboard';
import AccountabilityTransparencyMeter from '@/components/interactive/AccountabilityTransparencyMeter';
import VisualFeature from '@/components/sections/VisualFeature';
import HeroTransition from '@/components/sections/HeroTransition';
import CountUp from '@/components/interactive/CountUp';
import Icon from '@/components/ui/Icon';
import SourceMark from '@/components/ui/SourceMark';
import FeaturedProject from '@/components/sections/FeaturedProject';
import FeaturedStory from '@/components/sections/FeaturedStory';
import { IDENTITY_CARDS } from '@/lib/constants';
import { getHeroVideoForImage } from '@/lib/heroMedia';
import { fetchProjects, fetchStories } from '@/lib/wordpress';

export default async function HomePage() {
  const [projects, stories] = await Promise.all([fetchProjects(6), fetchStories(6)]);
  const featuredProject = projects.find((project) => project.featuredOnHomepage) ?? projects[0];
  const featuredStory = stories.find((story) => story.featuredOnHomepage) ?? stories[0];
  const heroPoster = '/images/frad-field-hero.jpg';
  const heroVideo = getHeroVideoForImage(heroPoster);

  return (
    <div className="bg-paper-50">
      {/* Hero */}
      <section className="hero-sculpt relative min-h-[72svh] overflow-hidden bg-ink-950 text-white">
        <Image
          src={heroPoster}
          alt="Editorial representation of Nigerian humanitarian field staff coordinating with community members"
          fill
          priority
          sizes="100vw"
          className="hero-media object-cover"
        />
        {heroVideo && (
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover"
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(8,17,13,0.88),rgba(8,17,13,0.64)_46%,rgba(8,17,13,0.2)),linear-gradient(180deg,rgba(8,17,13,0.08),rgba(8,17,13,0.72))]" />
        <div className="section-container relative z-10 flex min-h-[72svh] flex-col justify-end pt-20 pb-12 sm:pb-16 lg:pt-28 lg:pb-20">
          <p className="editorial-kicker text-frad-green-200">Nigerian-led humanitarian action</p>
          <h1 className="display-title mt-8 max-w-5xl text-white">
            Humanitarian work with evidence behind it.
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-semibold leading-8 text-white/78 sm:text-xl">
            FRAD Foundation supports crisis-affected communities across Northeast and Northwest Nigeria through
            field-rooted programmes, accountable systems, and partnership-grade evidence.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/impact" className="safe-focus cta-button border border-white bg-white text-ink-950 hover:bg-frad-green-100">
              See Our Impact
            </Link>
            <Link href="/partners" className="safe-focus cta-button border border-white/35 bg-white/8 text-white hover:border-white hover:bg-white hover:text-ink-950">
              Partner With Us
            </Link>
          </div>

          <div className="mt-12 grid max-w-4xl gap-px overflow-hidden rounded-[8px] border border-white/18 bg-white/18 text-xs font-black uppercase tracking-[0.14em] text-white/82 sm:grid-cols-3">
            <p className="bg-ink-950/38 px-4 py-3">Northeast Nigeria</p>
            <p className="bg-ink-950/38 px-4 py-3">Northwest Nigeria</p>
            <p className="bg-ink-950/38 px-4 py-3">Abuja Coordination</p>
          </div>
        </div>
        <HeroTransition />
      </section>

      {/* 01 Who We Are */}
      <section className="section-shell section-padding">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="editorial-kicker">01 / Who We Are</p>
              <h2 className="section-title mt-6">A serious Nigerian organization for serious humanitarian work.</h2>
            </div>
            <p className="body-lead">
              FRAD works through frontline teams, community structures, government systems, and partners to deliver
              practical support where needs are urgent, while protecting dignity and accountability.
            </p>
          </div>

          <div className="reveal-up mt-14 grid gap-5 lg:grid-cols-4">
            {IDENTITY_CARDS.map((card) => (
              <div key={card.title} className="premium-card p-6">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[8px] border border-frad-green-800/20 bg-frad-green-50 text-frad-green-900">
                  <Icon name={card.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-extrabold">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-ink-600">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Institutional facts with source links */}
          <div className="reveal-up mt-14 grid gap-px overflow-hidden rounded-[8px] border border-ink-950/12 bg-ink-950/12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '2019', label: 'Founded and registered in Nigeria', countUp: false, source: { index: 1, href: '/about', label: 'CAC registration, About FRAD' } },
              { value: '8', label: 'Integrated programme areas', countUp: true, source: { index: 2, href: '/what-we-do', label: 'Programme overview' } },
              { value: '3', label: 'Operating regions across Nigeria', countUp: true, source: { index: 3, href: '/where-we-work', label: 'Where we work' } },
              { value: '100%', label: 'Nigerian-led and community-rooted', countUp: true, source: { index: 4, href: '/about/governance', label: 'Governance' } },
            ].map((fact) => (
              <div key={fact.label} className="bg-white px-6 py-7">
                <p className="fact-numeral text-frad-green-900">
                  {fact.countUp ? <CountUp value={fact.value} /> : fact.value}
                  <SourceMark index={fact.source.index} href={fact.source.href} label={fact.source.label} />
                </p>
                <p className="mt-3 text-sm font-extrabold text-ink-950">{fact.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
            <span className="source-mark !ml-0 !align-baseline">1-4</span> Registered with the Corporate Affairs
            Commission / CAC/IT/NO/139393 / Sources open the page that substantiates each figure
          </p>
        </div>
      </section>

      {/* 02 Where We Work */}
      <section className="section-shell section-padding bg-paper-100">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="editorial-kicker">02 / Where We Work</p>
              <h2 className="section-title mt-6">A public footprint that protects communities.</h2>
              <p className="body-lead mt-7">
                The map is regional by design: enough for donors and partners to understand scope, careful enough not to
                expose sensitive field locations.
              </p>
            </div>
            <VisualFeature
              image="/images/frad-water-access.jpg"
              alt="Editorial representation of humanitarian staff and community members checking a rural water access point"
              eyebrow="From the field"
              title="Water access, shown with context and care."
              caption="Water points, sanitation, and hygiene work documented alongside the communities who keep them running."
              href="/media"
              actionLabel="Open media"
              wordpressKey="home.where_we_work.visual"
              exhibit={{
                location: 'Northern Nigeria (regional)',
                subject: 'Water point check with community members',
                handling: 'Site-level detail withheld for protection',
                stamps: [{ label: 'Consent filed' }, { label: 'Public' }],
              }}
            />
          </div>
          <div className="reveal-up mt-14">
            <NigeriaOperationalMap />
          </div>
        </div>
      </section>

      {/* 03 What We Do */}
      <section className="section-shell section-padding">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <VisualFeature
                image="/images/frad-programme-outreach.jpg"
                alt="Editorial representation of Nigerian humanitarian staff and community representatives reviewing outreach materials"
                eyebrow="Programme reel"
                title="Outreach work that feels active, not abstract."
                caption="Screening, referral, and community engagement captured from the field, not staged for the camera."
                href="/what-we-do"
                actionLabel="Explore programmes"
                isVideo
                duration="01:46"
                wordpressKey="home.what_we_do.visual"
                exhibit={{
                  location: 'Northeast Nigeria (regional)',
                  subject: 'Outreach and referral review with community representatives',
                  stamps: [{ label: 'Consent filed' }, { label: 'Public' }],
                }}
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="editorial-kicker">03 / What We Do</p>
              <h2 className="section-title mt-6">Integrated programmes for complex community needs.</h2>
              <p className="body-lead mt-7">
                FRAD brings technical programme areas together so communities can receive practical support without
                fragmented service pathways.
              </p>
            </div>
          </div>

          <div className="reveal-up mt-14">
            <SectorExplorerDashboard />
          </div>
        </div>
      </section>

      {/* 04 Evidence and Updates */}
      <section className="section-shell section-padding">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="editorial-kicker">04 / Evidence &amp; Updates</p>
              <h2 className="section-title mt-6">Judge the work by its record.</h2>
            </div>
            <p className="body-lead">
              Projects, publications, and field stories are published so partners can examine what FRAD delivers,
              with sources, timeframes, and the people behind the work.
            </p>
          </div>

          <div className="reveal-up mt-14 grid gap-8">
            <FeaturedProject project={featuredProject} />
            <FeaturedStory story={featuredStory} />
          </div>
        </div>
      </section>

      {/* 05 Accountability */}
      <section className="section-shell section-padding bg-paper-100">
        <div className="section-container reveal-up">
          <AccountabilityTransparencyMeter />
        </div>
      </section>

      {/* Closing statement */}
      <section className="relative bg-gradient-to-b from-frad-green-950 via-frad-green-950 to-ink-950 text-white">
        <div className="section-container section-padding">
          <p className="editorial-kicker text-frad-green-300">Support locally led action</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_auto] lg:items-end">
            <h2 className="max-w-4xl font-heading text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Fund work that can stand up to scrutiny.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/donate"
                className="safe-focus group inline-flex items-center gap-2.5 rounded-[8px] bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.1em] text-frad-green-950 transition-colors hover:bg-frad-green-100"
              >
                Donate
              </Link>
              <Link
                href="/partners"
                className="safe-focus rounded-[8px] border border-white/35 px-7 py-4 text-sm font-black uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-frad-green-950"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
