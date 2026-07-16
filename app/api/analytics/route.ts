import { clientIp, rateLimit } from '@/lib/rateLimit';

const categories = new Set(['page_view', 'web_vital', 'report_download', 'donation_flow', 'donation_verified', 'inquiry', 'emergency_alert', 'map_interaction', 'newsletter_subscribe', 'carousel_interaction', 'client_error']);

export async function POST(request: Request) {
  const limit = rateLimit(`analytics:${clientIp(request)}`, 120, 60_000);
  if (!limit.ok) return new Response(null, { status: 429 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.category !== 'string' || !categories.has(body.category) || typeof body.action !== 'string') return new Response(null, { status: 400 });
  const event = {
    category: body.category.slice(0, 60), action: body.action.slice(0, 100),
    label: typeof body.label === 'string' ? body.label.slice(0, 180) : undefined,
    value: typeof body.value === 'number' && Number.isFinite(body.value) ? body.value : undefined,
    path: typeof body.path === 'string' ? body.path.slice(0, 240) : undefined,
    sentAt: typeof body.sentAt === 'string' ? body.sentAt : new Date().toISOString(),
  };
  const endpoint = process.env.ANALYTICS_ENDPOINT;
  if (!endpoint) return new Response(null, { status: 204 });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(process.env.ANALYTICS_API_KEY ? { Authorization: `Bearer ${process.env.ANALYTICS_API_KEY}` } : {}) },
    body: JSON.stringify(event),
    cache: 'no-store',
  });
  return new Response(null, { status: response.ok ? 204 : 502 });
}
