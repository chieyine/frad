import 'server-only';

export interface VerifiedDonation {
  verified: boolean;
  gateway: 'stripe' | 'paystack';
  reference: string;
  status: string;
  amount?: number;
  currency?: string;
  project?: string;
  sector?: string;
}

export async function verifyStripeDonation(sessionId: string): Promise<VerifiedDonation> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret || !sessionId.startsWith('cs_')) return { verified: false, gateway: 'stripe', reference: sessionId, status: 'unavailable' };
  const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: 'no-store',
  });
  const data = (await response.json().catch(() => null)) as {
    id?: string; payment_status?: string; status?: string; amount_total?: number; currency?: string;
    metadata?: { project?: string; sector?: string };
  } | null;
  const paid = response.ok && data?.payment_status === 'paid';
  return {
    verified: paid,
    gateway: 'stripe',
    reference: data?.id || sessionId,
    status: data?.payment_status || data?.status || 'unknown',
    amount: typeof data?.amount_total === 'number' ? data.amount_total / 100 : undefined,
    currency: data?.currency?.toUpperCase(),
    project: data?.metadata?.project,
    sector: data?.metadata?.sector,
  };
}

export async function verifyPaystackDonation(reference: string): Promise<VerifiedDonation> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !reference) return { verified: false, gateway: 'paystack', reference, status: 'unavailable' };
  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: 'no-store',
  });
  const result = (await response.json().catch(() => null)) as {
    status?: boolean;
    data?: { reference?: string; status?: string; amount?: number; currency?: string; metadata?: { project?: string; sector?: string } };
  } | null;
  const paid = response.ok && result?.status === true && result.data?.status === 'success';
  return {
    verified: paid,
    gateway: 'paystack',
    reference: result?.data?.reference || reference,
    status: result?.data?.status || 'unknown',
    amount: typeof result?.data?.amount === 'number' ? result.data.amount / 100 : undefined,
    currency: result?.data?.currency,
    project: result?.data?.metadata?.project,
    sector: result?.data?.metadata?.sector,
  };
}

export async function forwardDonationEvent(event: Record<string, unknown>) {
  const endpoint = process.env.DONATION_WEBHOOK_URL;
  const secret = process.env.DONATION_WEBHOOK_SECRET;
  if (!endpoint || !secret) return false;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
    body: JSON.stringify(event),
    cache: 'no-store',
  });
  return response.ok;
}
