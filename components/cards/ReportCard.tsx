import Image from 'next/image';
import Icon from '@/components/ui/Icon';

interface ReportCardProps {
  title: string;
  type?: string;
  year?: string;
  sector?: string;
  summary?: string;
  pdfUrl?: string;
  coverImage?: string;
}

export default function ReportCard({ title, type, year, sector, summary, pdfUrl, coverImage }: ReportCardProps) {
  return (
    <div
      className="card-base group flex h-full flex-col overflow-hidden !p-0"
      data-wp-content-type="report"
      data-wp-fields="title,type,year,sector,summary,pdfUrl,coverImage"
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-frad-navy-50 via-white to-frad-green-50">
        {coverImage ? (
          <Image src={coverImage} alt={title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <Icon name="file-text" className="h-12 w-12 text-frad-blue-300" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.1em]">
          {type && <span className="font-extrabold text-frad-navy-900">{type}</span>}
          {year && <><span className="text-ink-400/60">/</span><span className="text-ink-500">{year}</span></>}
          {sector && <><span className="text-ink-400/60">/</span><span className="text-ink-500">{sector}</span></>}
        </div>
        <h3 className="mb-3 line-clamp-2 text-xl font-extrabold leading-snug text-ink-950">{title}</h3>
        {summary && <p className="mb-4 line-clamp-3 flex-1 text-sm leading-7 text-ink-600">{summary}</p>}
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 border-t border-ink-950/10 pt-4 text-sm font-extrabold text-frad-green-800 transition-colors hover:text-frad-navy-900">
            <Icon name="download" className="h-4 w-4" />
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
}
