import Link from 'next/link';
import PartnerLogoGrid from '@/components/cards/PartnerLogoGrid';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import type { Partner } from '@/types/content';

export default function PartnerProofStrip({ partners }: { partners: Partner[] }) {
  const approved = partners.filter((partner) => partner.approvedToDisplay);

  return (
    <section className="section-shell section-padding bg-white hairline-t hairline-b">
      <div className="section-container">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="editorial-kicker">Partner proof</p>
            <h2 className="section-title mt-6">Partnerships built on trust, accountability, and shared purpose.</h2>
          </div>
          <p className="body-lead">
            FRAD works with institutions, agencies, networks, and technical partners to deliver accountable support
            in communities affected by crisis.
          </p>
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
            title="Institutional partnership pathways."
            description="FRAD welcomes collaboration with donors, government actors, UN agencies, INGOs, technical partners, and civil society networks."
            href="/partners"
            actionLabel="View partnership pathways"
          />
        )}
      </div>
    </section>
  );
}
