import type { Report } from '@/types/content';
import ReportCard from '@/components/cards/ReportCard';
import ContentEmptyState from '@/components/sections/ContentEmptyState';
import { fetchContentSlot } from '@/lib/wordpress';

export default async function ReportShelf({
  reports,
  title = 'Latest reports and accountability documents',
  wordpressKey,
}: {
  reports: Report[];
  title?: string;
  wordpressKey?: string;
}) {
  const slot = wordpressKey ? await fetchContentSlot(wordpressKey).catch(() => null) : null;
  const eyebrow = slot?.eyebrow ?? 'Reports library';
  const displayTitle = slot?.headline ?? title;
  const description =
    slot?.subtext ?? 'Browse reports by type, year, location, programme area, and publication date.';

  return (
    <div data-wp-slot={wordpressKey}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="editorial-kicker">{eyebrow}</p>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">{displayTitle}</h2>
        </div>
        <p className="max-w-md text-sm font-semibold leading-7 text-ink-600">
          {description}
        </p>
      </div>
      {reports.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              title={report.title}
              type={report.reportType}
              year={report.year}
              sector={report.sector}
              summary={report.summary}
              pdfUrl={report.pdfUrl}
              coverImage={report.coverImage}
            />
          ))}
        </div>
      ) : (
        <ContentEmptyState
          eyebrow="Reports"
          title="FRAD reports and accountability documents."
          description="Contact our team to request an annual report, assessment, audit, or project document."
          href="/reports"
          actionLabel="View reports"
        />
      )}
    </div>
  );
}
