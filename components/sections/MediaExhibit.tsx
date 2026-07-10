import Image from 'next/image';
import Link from 'next/link';
import type { MediaAsset } from '@/types/content';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import Stamp from '@/components/ui/Stamp';

export default function MediaExhibit({ assets }: { assets: MediaAsset[] }) {
  const publicAssets = assets.filter((asset) => asset.publicSafe && asset.image);

  if (publicAssets.length === 0) {
    return (
      <ContentEmptyState
        eyebrow="Media exhibit"
        title="Field media is handled with consent and context."
        description="FRAD publishes photos and videos with captions, consent safeguards, and location safety in mind, so public communication protects dignity."
        href="/media"
        actionLabel="Visit media library"
      />
    );
  }

  const lead = publicAssets[0];
  const supporting = publicAssets.slice(1, 4);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
      <Link href="/media" className="cinematic-frame group block min-h-[34rem]">
        <Image
          src={lead.image!}
          alt={lead.alt ?? lead.title}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(8,17,13,0.04),rgba(8,17,13,0.86)),linear-gradient(90deg,rgba(8,17,13,0.7),rgba(8,17,13,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 z-[4] p-7 text-white sm:p-8">
          <div className="mb-5 flex flex-wrap gap-2">
            <Stamp tone="white">{lead.mediaType}</Stamp>
            <Stamp tone="white">
              {lead.consentStatus === 'approved' ? 'Consent filed' : 'Consent protected'}
            </Stamp>
          </div>
          <h3 className="max-w-2xl text-4xl font-black leading-[1.03] text-white">{lead.title}</h3>
          {lead.caption && <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-white/78">{lead.caption}</p>}
        </div>
      </Link>
      <div className="grid gap-4">
        {supporting.map((asset) => (
          <Link key={asset.id} href="/media" className="premium-card group grid min-h-40 grid-cols-[0.88fr_1.12fr] overflow-hidden">
            <div className="relative overflow-hidden">
              <Image
                src={asset.image!}
                alt={asset.alt ?? asset.title}
                fill
                sizes="(min-width: 1024px) 18vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-frad-green-800">{asset.mediaType}</p>
              <h4 className="mt-3 text-lg font-black leading-tight">{asset.title}</h4>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-500">{asset.location ?? 'Public-safe location'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
