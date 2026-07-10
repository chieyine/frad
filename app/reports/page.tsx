import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ReportShelf from '@/components/sections/ReportShelf';
import { fetchReports } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Reports & Assessments | FRAD Foundation',
  description: 'Annual reports, situational assessments, and donor accountability reporting.',
};

export default async function ReportsPage() {
  const reports = await fetchReports(18);

  return (
    <>
      <Hero
        headline="Reports & Accountability Documents"
        subtext="Official annual reports, situation assessments, and verified project reporting."
        size="small"
        backgroundImage="/images/frad-programme-outreach.jpg"
        wordpressKey="reports.hero"
      />
      <Breadcrumbs items={[{ label: 'Reports' }]} />

      <section className="section-padding">
        <div className="section-container">
          <ReportShelf reports={reports} title="Reports, assessments, audits, and accountability documents" />
        </div>
      </section>

    </>
  );
}
