import { fetchStories, fetchReports } from '@/lib/wordpress';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

function cdata(value: unknown) {
  return String(value ?? '').replaceAll(']]>', ']]]]><![CDATA[>');
}

function rssDate(value?: string) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString();
}

export async function GET() {
  const [stories, reports] = await Promise.all([
    fetchStories().catch(() => []),
    fetchReports().catch(() => []),
  ]);

  const now = new Date().toUTCString();

  const storyItems = stories.map((story) => `
    <item>
      <title><![CDATA[${cdata(story.title)}]]></title>
      <link>${SITE_URL}/stories/${encodeURIComponent(story.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/stories/${encodeURIComponent(story.slug)}</guid>
      <pubDate>${rssDate(story.date)}</pubDate>
      <description><![CDATA[${cdata(story.summary)}]]></description>
      ${story.storyType ? `<category><![CDATA[${cdata(story.storyType)}]]></category>` : ''}
    </item>
  `).join('');

  const reportItems = reports.map((report) => `
    <item>
      <title><![CDATA[Report: ${cdata(report.title)}]]></title>
      <link>${SITE_URL}/reports</link>
      <guid isPermaLink="false">${SITE_URL}/reports#${encodeURIComponent(report.slug || report.id)}</guid>
      <pubDate>${rssDate(report.datePublished)}</pubDate>
      <description><![CDATA[${cdata(report.summary || 'Official FRAD humanitarian evaluation report.')}]]></description>
      <category><![CDATA[Report - ${cdata(report.sector || 'Multi-Sector')}]]></category>
    </item>
  `).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${cdata(SITE_NAME)} | Humanitarian Feed]]></title>
    <link>${SITE_URL}</link>
    <description><![CDATA[${cdata(SITE_DESCRIPTION)}]]></description>
    <language>en-NG</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${storyItems}
    ${reportItems}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
