import { createHmac, timingSafeEqual } from 'node:crypto';
import { forwardDonationEvent } from '@/lib/payments';

function validSignature(payload: string, header: string, secret: string) {
  const parts = Object.fromEntries(header.split(',').map((part) => part.split('=', 2)));
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get('stripe-signature');
  const payload = await request.text();
  if (!secret || !signature || !validSignature(payload, signature, secret)) return new Response('Invalid signature', { status: 401 });
  const event = JSON.parse(payload) as { id?: string; type?: string; data?: { object?: Record<string, unknown> } };
  const forwarded = await forwardDonationEvent({ gateway: 'stripe', eventId: event.id, eventType: event.type, payload: event.data?.object, receivedAt: new Date().toISOString() });
  return Response.json({ received: true, forwarded }, { status: forwarded ? 200 : 503 });
}
