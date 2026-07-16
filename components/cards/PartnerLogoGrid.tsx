import Image from 'next/image';

interface PartnerLogoGridProps {
  partners: Array<{
    name: string;
    logo?: string;
    website?: string;
  }>;
}

export default function PartnerLogoGrid({ partners }: PartnerLogoGridProps) {
  return (
    <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {partners.map((partner) => {
        const content = partner.logo ? (
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={160}
              height={64}
              className="max-h-11 max-w-full object-contain opacity-65 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
        ) : (
            <span className="text-center text-xs font-bold uppercase tracking-[0.08em] text-ink-500 transition-colors group-hover:text-frad-green-800">
              {partner.name}
            </span>
        );
        const classes = "safe-focus group flex h-24 items-center justify-center rounded-[8px] border border-ink-950/10 bg-white/90 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-frad-green-800/30 hover:shadow-[0_18px_42px_-28px_rgba(8,17,13,0.32)]";

        return partner.website ? (
          <a key={partner.name} href={partner.website} target="_blank" rel="noopener noreferrer" className={classes} title={`Visit ${partner.name} website`}>
            {content}
          </a>
        ) : (
          <div key={partner.name} className={classes} title={partner.name}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
