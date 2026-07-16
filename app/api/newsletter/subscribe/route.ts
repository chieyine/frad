import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rateLimit';

const NEWSLETTER_API_URL = process.env.NEWSLETTER_API_URL;
const NEWSLETTER_API_KEY = process.env.NEWSLETTER_API_KEY;
const allowedInterests = new Set([
  'general_dispatch',
  'wash',
  'nutrition',
  'protection',
  'emergency_alerts',
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const limit = rateLimit(`newsletter:${clientIp(request)}`, 5, 10 * 60 * 1000);
    if (!limit.ok) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body.email !== 'string') {
      return NextResponse.json({ message: 'Invalid or missing email address.' }, { status: 400 });
    }

    const email = body.email.trim().toLowerCase().slice(0, 254);
    const interest = typeof body.interest === 'string' && allowedInterests.has(body.interest)
      ? body.interest
      : 'general_dispatch';

    if (!emailPattern.test(email)) {
      return NextResponse.json({ message: 'Invalid or missing email address.' }, { status: 400 });
    }

    if (!NEWSLETTER_API_URL || !NEWSLETTER_API_KEY) {
      return NextResponse.json(
        { message: 'Newsletter signup is temporarily unavailable.' },
        { status: 503 }
      );
    }

    const extRes = await fetch(NEWSLETTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NEWSLETTER_API_KEY}`,
      },
      body: JSON.stringify({ email, interest }),
      cache: 'no-store',
    });
    if (!extRes.ok) {
      return NextResponse.json(
        { message: 'Newsletter signup could not be completed.' },
        { status: 502 }
      );
    }

    // Audit trail — avoid writing the subscriber's email address to logs; the
    // domain is enough to spot abuse patterns without retaining PII.
    console.log(`[AUDIT LOG] Newsletter subscription registered (domain: ${email.split('@')[1] || 'unknown'}, interest: ${interest}) at ${new Date().toISOString()}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to FRAD Humanitarian Dispatch.',
        interest,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscribe API error:', error);
    return NextResponse.json({ message: 'Internal server error processing subscription.' }, { status: 500 });
  }
}
