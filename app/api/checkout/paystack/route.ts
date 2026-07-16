import { NextResponse, type NextRequest } from 'next/server';
import { SITE_URL } from '@/lib/constants';
import { clientIp, rateLimit } from '@/lib/rateLimit';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const limit = rateLimit(`checkout:paystack:${clientIp(request)}`, 8, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { message: 'Too many checkout attempts. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { message: 'Paystack checkout is not configured. Please use the institutional giving channel.' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    const amount = Number(body?.amount);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!Number.isInteger(amount) || amount < 1_000 || amount > 100_000_000 || !emailPattern.test(email)) {
      return NextResponse.json({ message: 'Enter a valid email address and donation amount.' }, { status: 400 });
    }

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100,
        email,
        currency: 'NGN',
        callback_url: `${SITE_URL}/donate/thank-you?gateway=paystack`,
        metadata: {
          project: typeof body?.project === 'string' ? body.project.slice(0, 100) : 'general-fund',
          sector: typeof body?.sector === 'string' ? body.sector.slice(0, 100) : 'multi-sector',
        },
      }),
      cache: 'no-store',
    });
    const result = (await response.json().catch(() => null)) as {
      status?: boolean;
      data?: { authorization_url?: string; reference?: string };
    } | null;

    if (!response.ok || !result?.status || !result.data?.authorization_url) {
      return NextResponse.json({ message: 'Paystack could not initialize checkout.' }, { status: 502 });
    }

    if (!URL.canParse(result.data.authorization_url)) {
      return NextResponse.json({ message: 'Paystack returned an invalid checkout destination.' }, { status: 502 });
    }
    const checkoutUrl = new URL(result.data.authorization_url);
    if (checkoutUrl.protocol !== 'https:' || checkoutUrl.hostname !== 'checkout.paystack.com') {
      return NextResponse.json({ message: 'Paystack returned an invalid checkout destination.' }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      authorization_url: checkoutUrl.toString(),
      reference: result.data.reference,
    });
  } catch {
    return NextResponse.json({ message: 'Failed to initialize Paystack checkout.' }, { status: 500 });
  }
}
