import { createHmac, timingSafeEqual } from 'node:crypto';
import { forwardDonationEvent } from '@/lib/payments';

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const signature = request.headers.get('x-paystack-signature');
  const payload = await request.text();
  if (!secret || !signature) return new Response('Invalid signature', { status: 401 });
  const expected = createHmac('sha512', secret).update(payload).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return new Response('Invalid signature', { status: 401 });
  const event = JSON.parse(payload) as { event?: string; data?: Record<string, unknown> };
  const forwarded = await forwardDonationEvent({ gateway: 'paystack', eventType: event.event, payload: event.data, receivedAt: new Date().toISOString() });
  return Response.json({ received: true, forwarded }, { status: forwarded ? 200 : 503 });
}
