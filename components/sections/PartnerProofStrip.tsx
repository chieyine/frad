import Link from 'next/link';
import PartnerLogoGrid from '@/components/cards/PartnerLogoGrid';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import type { Partner } from '@/types/content';
import { fetchContentSlot } from '@/lib/wordpress';

export default async function PartnerProofStrip({
  partners,
  wordpressKey,
}: {
  partners: Partner[];
  wordpressKey?: string;
}) {
  const slot = wordpressKey ? await fetchContentSlot(wordpressKey).catch(() => null) : null;
  const eyebrow = slot?.eyebrow ?? 'Our partners';
  const title = slot?.headline ?? 'Working together for stronger communities.';
  const description =
    slot?.subtext ??
    'FRAD works with public institutions, humanitarian organisations, civil society networks, donors, and technical partners to serve communities affected by crisis.';

  const approved = partners.filter((partner) => partner.approvedToDisplay);

  return (
    <section className="section-shell section-padding bg-white hairline-t hairline-b" data-wp-slot={wordpressKey}>
      <div className="section-container">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="editorial-kicker">{eyebrow}</p>
            <h2 className="section-title mt-6">{title}</h2>
          </div>
          <p className="body-lead">{description}</p>
        </div>

        {approved.length > 0 ? (
          <>
            <PartnerLogoGrid partners={approved.map((partner) => ({ name: partner.name, logo: partner.logo, website: partner.website }))} />
            <div className="mt-8 border-t border-ink-950/10 pt-5">
              <Link href="/partners" className="safe-focus text-sm font-black uppercase tracking-[0.1em] text-frad-green-800">
                View partnership pathways
              </Link>
            </div>
          </>
        ) : (
          <ContentEmptyState
            eyebrow="Partnerships"
            title="Partner with FRAD Foundation."
            description="FRAD welcomes collaboration with donors, government actors, UN agencies, INGOs, technical partners, and civil society networks."
            href="/partners"
            actionLabel="View partnership pathways"
          />
        )}
      </div>
    </section>
  );
}
