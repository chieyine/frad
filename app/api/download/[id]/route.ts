import { NextResponse, type NextRequest } from 'next/server';
import { MOCK_REPORTS } from '@/lib/mockData';
import { fetchReports } from '@/lib/wordpress';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.nextUrl.searchParams.get('token');
    const expectedToken = process.env.DOWNLOAD_TOKEN;

    // Fail closed: if no token is configured, the gated endpoint is disabled
    // rather than falling back to a value published in the repository.
    if (!expectedToken) {
      return NextResponse.json(
        { message: 'Authorized download channel is not configured.' },
        { status: 503 }
      );
    }

    // Verify token for restricted downloads. There is deliberately no bypass
    // parameter — a query flag must never override the authorization check.
    if (token !== expectedToken) {
      return NextResponse.json(
        { message: 'Unauthorized. Valid partner/donor authorization token required to download confidential field audits.' },
        { status: 401 }
      );
    }

    let reports = await fetchReports().catch(() => null);
    if (!reports || reports.length === 0) {
      reports = MOCK_REPORTS;
    }

    const targetReport = reports.find((r) => r.slug === id || r.id === id);

    if (!targetReport || !targetReport.pdfUrl) {
      return NextResponse.json({ message: 'The requested report could not be found or is unavailable.' }, { status: 404 });
    }

    const targetUrl = new URL(targetReport.pdfUrl, request.url);
    if (!['http:', 'https:'].includes(targetUrl.protocol) || targetUrl.pathname === request.nextUrl.pathname) {
      return NextResponse.json({ message: 'Requested report file is unavailable.' }, { status: 404 });
    }

    // Log download event for audit trail
    console.log(`[AUDIT LOG] Report download initiated for ID/slug: "${id}" at ${new Date().toISOString()}`);

    return NextResponse.redirect(targetUrl);
  } catch (error) {
    console.error('Download route error:', error);
    return NextResponse.json({ message: 'Internal server error processing download request' }, { status: 500 });
  }
}
