import type { Report } from '@/types/content';
import ReportCard from '@/components/cards/ReportCard';
import ContentEmptyState from '@/components/sections/ContentEmptyState';

export default function ReportShelf({
  reports,
  title = 'Latest reports and accountability documents',
}: {
  reports: Report[];
  title?: string;
}) {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="editorial-kicker">Report shelf</p>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">{title}</h2>
        </div>
        <p className="max-w-md text-sm font-semibold leading-7 text-ink-600">
          Reports are organized by type, year, location, sector, summary, and download route.
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
          description="Annual reports, assessments, audits, and project documents are shared through FRAD's evidence library and official reporting channels."
          href="/reports"
          actionLabel="View reports"
        />
      )}
    </div>
  );
}
