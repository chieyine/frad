export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const configured = {
    wordpress: Boolean(process.env.WORDPRESS_API_URL),
    contact: Boolean(process.env.CONTACT_WEBHOOK_URL),
    newsletter: Boolean(process.env.NEWSLETTER_API_URL && process.env.NEWSLETTER_API_KEY),
    stripe: Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET),
    paystack: Boolean(process.env.PAYSTACK_SECRET_KEY),
    donationHandoff: Boolean(process.env.DONATION_WEBHOOK_URL && process.env.DONATION_WEBHOOK_SECRET),
    analytics: Boolean(process.env.ANALYTICS_ENDPOINT),
  };
  let wordpressReachable = false;
  if (process.env.WORDPRESS_API_URL) {
    try {
      const response = await fetch(process.env.WORDPRESS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ generalSettings { url } }' }),
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      });
      wordpressReachable = response.ok;
    } catch { wordpressReachable = false; }
  }
  const ready = Object.values(configured).every(Boolean) && wordpressReachable;
  const healthToken = process.env.HEALTHCHECK_TOKEN;
  const includeDetails = Boolean(healthToken && request.headers.get('x-healthcheck-token') === healthToken);
  return Response.json({ status: ready ? 'ready' : 'degraded', ...(includeDetails ? { configured, wordpressReachable } : {}), checkedAt: new Date().toISOString() }, {
    status: ready ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  });
}
