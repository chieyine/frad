import { NextResponse, type NextRequest } from 'next/server';
import { SITE_URL } from '@/lib/constants';
import { clientIp, rateLimit } from '@/lib/rateLimit';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const limit = rateLimit(`checkout:stripe:${clientIp(request)}`, 8, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { message: 'Too many checkout attempts. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { message: 'Stripe checkout is not configured. Please use the institutional giving channel.' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    const amount = Number(body?.amount);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!Number.isInteger(amount) || amount < 5 || amount > 1_000_000 || !emailPattern.test(email)) {
      return NextResponse.json({ message: 'Enter a valid email address and donation amount.' }, { status: 400 });
    }

    const form = new URLSearchParams({
      mode: 'payment',
      success_url: `${SITE_URL}/donate/thank-you?gateway=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/donate?payment=cancelled`,
      customer_email: email,
      'line_items[0][quantity]': '1',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': String(amount * 100),
      'line_items[0][price_data][product_data][name]': 'FRAD Foundation donation',
      'metadata[project]': typeof body?.project === 'string' ? body.project.slice(0, 100) : 'general-fund',
      'metadata[sector]': typeof body?.sector === 'string' ? body.sector.slice(0, 100) : 'multi-sector',
    });

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
      cache: 'no-store',
    });
    const result = (await response.json().catch(() => null)) as { id?: string; url?: string } | null;

    if (!response.ok || !result?.url) {
      return NextResponse.json({ message: 'Stripe could not initialize checkout.' }, { status: 502 });
    }

    if (!URL.canParse(result.url)) {
      return NextResponse.json({ message: 'Stripe returned an invalid checkout destination.' }, { status: 502 });
    }
    const checkoutUrl = new URL(result.url);
    if (checkoutUrl.protocol !== 'https:' || checkoutUrl.hostname !== 'checkout.stripe.com') {
      return NextResponse.json({ message: 'Stripe returned an invalid checkout destination.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, url: checkoutUrl.toString(), sessionId: result.id });
  } catch {
    return NextResponse.json({ message: 'Failed to initialize Stripe checkout.' }, { status: 500 });
  }
}
