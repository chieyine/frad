import Link from 'next/link';
import Image from 'next/image';
import NewsletterSubscribe from '@/components/interactive/NewsletterSubscribe';
import { FOOTER_LINKS, SECTORS } from '@/lib/constants';
import { fetchSiteSettings } from '@/lib/wordpress';

export default async function Footer() {
  const siteSettings = await fetchSiteSettings().catch(() => null);
  const cacRegNo = siteSettings?.cacRegistrationNumber ?? 'CAC/IT/NO/139393';

  return (
    <footer className="bg-ink-950 text-white">
      {/* Pre-Footer Dispatch Signup Band */}
      <div className="border-b border-white/10 bg-gradient-to-b from-frad-green-950 to-ink-950 px-6 py-10 text-white sm:px-10 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <NewsletterSubscribe compact tone="dark" wordpressKey="footer.newsletter" defaultInterest="general_dispatch" />
        </div>
      </div>

      <div className="grid border-b border-white/12 lg:grid-cols-[1fr_2fr]">
        <div className="border-b border-white/12 p-7 lg:border-b-0 lg:border-r lg:p-10">
          <Link href="/" className="safe-focus inline-flex items-center rounded-[8px] bg-white p-2.5">
            <Image
              src="/images/frad-logo.jpg"
              alt="FRAD Foundation Logo"
              width={200}
              height={72}
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </Link>
          <p className="mt-8 max-w-md text-base font-medium leading-8 text-white/72">
            A Nigerian-led humanitarian and development organisation working across Northeast and Northwest Nigeria, with national coordination in Abuja.
          </p>
          <div className="mt-8 grid max-w-sm grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-white/12 bg-white/12 text-xs font-black uppercase tracking-[0.1em]">
            <Link href="/impact" className="safe-focus bg-white/5 p-4 text-white/82 transition-colors hover:bg-white hover:text-ink-950">Impact</Link>
            <Link href="/donate" className="safe-focus bg-white/5 p-4 text-white/82 transition-colors hover:bg-white hover:text-ink-950">Donate</Link>
          </div>
        </div>

        <div className="grid gap-px bg-white/12 sm:grid-cols-2 xl:grid-cols-4">
          <FooterColumn title="Organization" links={FOOTER_LINKS.about} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />
          <div className="bg-ink-950 p-7">
            <h2 className="font-body text-xs font-extrabold uppercase tracking-[0.16em] text-white/60">Programmes</h2>
            <ul className="mt-6 space-y-3">
              {SECTORS.slice(0, 6).map((item) => (
                <li key={item.slug}>
                  <Link href={`/what-we-do/${item.slug}`} className="safe-focus link-underline text-sm font-bold text-white/85 transition-colors hover:text-frad-green-200">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink-950 p-7">
            <h2 className="font-body text-xs font-extrabold uppercase tracking-[0.16em] text-white/60">Accountability</h2>
            <p className="mt-6 text-sm font-medium leading-7 text-white/72">
              Community feedback, complaints, and safeguarding concerns can be raised through dedicated channels at no cost and are handled confidentially.
            </p>
            <Link href="/about/accountability" className="safe-focus mt-6 inline-flex text-sm font-extrabold text-frad-green-300 transition-colors hover:text-white">
              Safeguarding &amp; feedback
            </Link>
            <Link href="/contact" className="safe-focus mt-3 flex text-sm font-extrabold text-frad-green-300 transition-colors hover:text-white">
              Contact FRAD
            </Link>
          </div>
        </div>
      </div>

      <div className="section-container overflow-hidden pt-8" aria-hidden="true">
        <p className="footer-wordmark">FRAD Foundation</p>
      </div>

      <div className="section-container flex flex-col gap-4 py-6 text-xs font-bold uppercase tracking-[0.12em] text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright {new Date().getFullYear()} FRAD Foundation / Registered in Nigeria / {cacRegNo}</p>
        <div className="flex flex-wrap gap-5">
          <Link href="/privacy" className="safe-focus transition-colors hover:text-white">Privacy</Link>
          <Link href="/about/accountability" className="safe-focus transition-colors hover:text-white">Safeguarding</Link>
          <Link href="/contact" className="safe-focus transition-colors hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="bg-ink-950 p-7">
      <h2 className="font-body text-xs font-extrabold uppercase tracking-[0.16em] text-white/60">{title}</h2>
      <ul className="mt-6 space-y-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="safe-focus link-underline text-sm font-bold text-white/85 transition-colors hover:text-frad-green-200">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
