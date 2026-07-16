import type { Metadata } from 'next';
import Link from 'next/link';
import { verifyPaystackDonation, verifyStripeDonation } from '@/lib/payments';
import DonationVerificationEvent from '@/components/analytics/DonationVerificationEvent';

export const metadata: Metadata = {
  title: 'Donation Confirmation',
  robots: { index: false, follow: false },
};

export default async function DonationThankYouPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const gateway = query.gateway === 'stripe' ? 'stripe' : 'paystack';
  const reference = gateway === 'stripe'
    ? String(query.session_id || '')
    : String(query.reference || query.trxref || '');
  const donation = gateway === 'stripe'
    ? await verifyStripeDonation(reference)
    : await verifyPaystackDonation(reference);
  const amount = donation.amount && donation.currency
    ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: donation.currency }).format(donation.amount)
    : null;

  return (
    <div className="bg-paper-100 py-16 sm:py-24">
      {donation.verified && <DonationVerificationEvent gateway={donation.gateway} amount={donation.amount} />}
      <div className="section-container max-w-3xl">
        <div className={`rounded-xl border p-7 shadow-xl sm:p-10 ${donation.verified ? 'border-frad-green-800/25 bg-white' : 'border-ink-950/15 bg-paper-50'}`}>
          <p className="eyebrow">Secure donation status</p>
          <h1 className="mt-5 text-4xl font-black sm:text-5xl">{donation.verified ? 'Thank you. Your donation is verified.' : 'Your payment is still being verified.'}</h1>
          <p className="mt-6 text-lg leading-8 text-ink-700">
            {donation.verified
              ? 'Your payment provider confirmed the contribution. Keep the provider receipt for your records; FRAD can use the reference below to support any follow-up.'
              : 'We could not confirm the transaction yet. Do not submit a second payment immediately. Check your provider receipt or contact FRAD with the reference below.'}
          </p>
          <dl className="mt-8 grid gap-4 rounded-lg bg-paper-100 p-5 sm:grid-cols-2">
            <div><dt className="text-xs font-black uppercase tracking-wider text-ink-500">Provider</dt><dd className="mt-1 font-black capitalize text-ink-950">{donation.gateway}</dd></div>
            <div><dt className="text-xs font-black uppercase tracking-wider text-ink-500">Status</dt><dd className="mt-1 font-black capitalize text-ink-950">{donation.status}</dd></div>
            {amount && <div><dt className="text-xs font-black uppercase tracking-wider text-ink-500">Amount</dt><dd className="mt-1 font-black text-ink-950">{amount}</dd></div>}
            <div><dt className="text-xs font-black uppercase tracking-wider text-ink-500">Reference</dt><dd className="mt-1 break-all font-mono text-sm font-bold text-ink-950">{donation.reference || 'Not supplied'}</dd></div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/impact" className="cta-button cta-primary safe-focus">See FRAD&apos;s impact</Link>
            <Link href="/contact" className="cta-button cta-secondary safe-focus">Donation support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
