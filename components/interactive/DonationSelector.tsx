'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { trackDonationStep } from '@/lib/analytics';

const AMOUNTS_NGN = [
  { label: 'NGN 10,000', value: 10000, note: 'Support essential programme supplies' },
  { label: 'NGN 25,000', value: 25000, note: 'Support nutrition and health activities' },
  { label: 'NGN 50,000', value: 50000, note: 'Support protection and safeguarding services' },
  { label: 'NGN 100,000', value: 100000, note: 'Support livelihoods and household resilience' },
  { label: 'NGN 250,000', value: 250000, note: 'Support integrated emergency response' },
  { label: 'Custom', value: 0, note: 'Choose another amount' },
];

const AMOUNTS_USD = [
  { label: 'USD $25', value: 25, note: 'Support essential programme supplies' },
  { label: 'USD $50', value: 50, note: 'Support nutrition and health activities' },
  { label: 'USD $100', value: 100, note: 'Support protection and safeguarding services' },
  { label: 'USD $250', value: 250, note: 'Support livelihoods and household resilience' },
  { label: 'USD $500', value: 500, note: 'Support integrated emergency response' },
  { label: 'Custom', value: 0, note: 'Choose another amount' },
];

function DonationSelectorContent() {
  const searchParams = useSearchParams();
  const designatedProject = searchParams.get('project');
  const designatedSector = searchParams.get('sector');
  const paymentResult = searchParams.get('payment');
  const designation = designatedProject || designatedSector;
  const designationLabel = designation
    ? designation.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
    : null;

  const [gateway, setGateway] = useState<'paystack' | 'stripe'>('paystack');
  const [selectedLabel, setSelectedLabel] = useState(gateway === 'paystack' ? 'NGN 50,000' : 'USD $100');
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const amounts = gateway === 'paystack' ? AMOUNTS_NGN : AMOUNTS_USD;

  const handleGatewayChange = (newGateway: 'paystack' | 'stripe') => {
    setGateway(newGateway);
    setCustomAmount('');
    setStatusMsg(null);
    if (newGateway === 'paystack') {
      setSelectedLabel('NGN 50,000');
    } else {
      setSelectedLabel('USD $100');
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    setStatusMsg(null);

    const selectedTier = amounts.find((a) => a.label === selectedLabel);
    const numericAmount = selectedTier?.value === 0 ? Number(customAmount) : selectedTier?.value;
    const currency = gateway === 'paystack' ? 'NGN' : 'USD';

    if (!email.trim() || !email.includes('@')) {
      setStatusMsg('Enter a valid email address so the payment provider can issue your receipt.');
      setLoading(false);
      return;
    }

    const minimum = gateway === 'paystack' ? 1000 : 5;
    if (!numericAmount || !Number.isInteger(numericAmount) || numericAmount < minimum) {
      setStatusMsg(`Enter a whole-number amount of at least ${gateway === 'paystack' ? 'NGN 1,000' : 'USD $5'}.`);
      setLoading(false);
      return;
    }

    try {
      trackDonationStep('checkout_started', numericAmount, gateway);
      const endpoint = gateway === 'paystack' ? '/api/checkout/paystack' : '/api/checkout/stripe';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numericAmount,
          currency,
          email: email.trim(),
          project: designatedProject || 'general-fund',
          sector: designatedSector || 'multi-sector',
        }),
      });

      const data = (await res.json()) as { success?: boolean; authorization_url?: string; url?: string; message?: string };
      const checkoutUrl = data.authorization_url || data.url;
      if (res.ok && data.success && checkoutUrl) {
        trackDonationStep('checkout_initialized', numericAmount, gateway);
        setStatusMsg(`Taking you to ${gateway === 'paystack' ? 'Paystack' : 'Stripe'} to complete your donation...`);
        window.location.assign(checkoutUrl);
      } else {
        trackDonationStep('checkout_failed', numericAmount, gateway);
        setStatusMsg(data.message || 'We could not start the checkout. Please try again.');
      }
    } catch {
      setStatusMsg('We could not connect to the payment provider. Please try again or contact FRAD for bank transfer details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-7">
      {paymentResult === 'complete' && (
        <div className="rounded-lg border border-frad-green-800/30 bg-frad-green-50 p-5" role="status">
          <p className="font-black text-frad-green-950">You have returned from the payment provider.</p>
          <p className="mt-1 text-sm leading-6 text-ink-700">Check your email for the provider&apos;s transaction receipt. Contact FRAD if you need support matching the contribution to a programme.</p>
        </div>
      )}
      {paymentResult === 'cancelled' && (
        <div className="rounded-lg border border-ink-950/15 bg-paper-100 p-5" role="status">
          <p className="font-black text-ink-950">Checkout was cancelled.</p>
          <p className="mt-1 text-sm leading-6 text-ink-700">No contribution was submitted through this checkout. You can choose another amount or giving channel below.</p>
        </div>
      )}

      {/* Gateway & Currency Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-950/10 pb-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.1em] text-frad-green-800">Donate securely</p>
          <h3 className="mt-1 text-lg font-black text-ink-950">Choose currency and payment provider</h3>
        </div>
        <div className="grid w-full grid-cols-2 rounded-lg border border-ink-950/15 bg-paper-200/60 p-1 sm:w-auto">
          <button
            type="button"
            onClick={() => handleGatewayChange('paystack')}
            aria-pressed={gateway === 'paystack'}
            className={`safe-focus rounded-[6px] px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
              gateway === 'paystack'
                ? 'bg-frad-green-950 text-white shadow-md'
                : 'text-ink-700 hover:text-ink-950'
            }`}
          >
            Paystack (NGN)
          </button>
          <button
            type="button"
            onClick={() => handleGatewayChange('stripe')}
            aria-pressed={gateway === 'stripe'}
            className={`safe-focus rounded-[6px] px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
              gateway === 'stripe'
                ? 'bg-frad-green-950 text-white shadow-md'
                : 'text-ink-700 hover:text-ink-950'
            }`}
          >
            Stripe (USD)
          </button>
        </div>
      </div>

      {/* Attribution Banner if Project/Sector selected */}
      {(designatedProject || designatedSector) && (
        <div className="rounded-[8px] border border-frad-green-800/30 bg-frad-green-50 p-4 text-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-block rounded bg-frad-green-800 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                Donation preference
              </span>
              <p className="mt-2 font-black text-frad-green-950">
                Your contribution is designated to: <span className="underline">{designationLabel}</span>
              </p>
              <p className="mt-1 text-xs text-ink-700">FRAD will record this preference and apply the contribution in line with programme controls and current operational needs.</p>
            </div>
          </div>
        </div>
      )}

      {/* Amount Grid */}
      <div>
        <p className="text-xs font-black uppercase tracking-[0.08em] text-frad-green-800">
          Choose an amount ({gateway === 'paystack' ? 'NGN' : 'USD'})
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {amounts.map((item) => {
            const isActive = selectedLabel === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelectedLabel(item.label)}
                aria-pressed={isActive}
                className={`safe-focus min-h-32 rounded-[8px] border p-4 text-left transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? 'border-frad-green-950 bg-frad-green-950 text-white shadow-[0_20px_45px_-30px_rgba(0,38,17,0.8)]'
                    : 'border-ink-950/12 bg-white/90 text-ink-950 hover:border-frad-green-800/45 hover:bg-frad-green-50'
                }`}
              >
                <span className="block text-base font-black">{item.label}</span>
                <span className={`mt-3 block text-xs font-medium leading-5 ${isActive ? 'text-white/82' : 'text-ink-600'}`}>
                  {item.note}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedLabel === 'Custom' && (
        <div className="rounded-[8px] border border-ink-950/12 bg-white p-5 shadow-[0_14px_34px_-28px_rgba(8,17,13,0.28)]">
          <label htmlFor="custom-amount" className="block text-xs font-black uppercase tracking-[0.08em] text-ink-950">
            Enter another amount ({gateway === 'paystack' ? 'NGN' : 'USD'})
          </label>
          <input
            id="custom-amount"
            type="number"
            min={gateway === 'paystack' ? 1000 : 5}
            step="1"
            placeholder={gateway === 'paystack' ? 'e.g. 150000' : 'e.g. 500'}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="mt-2 w-full rounded-[8px] border border-ink-950/20 px-4 py-3 text-sm font-bold text-ink-950 focus:border-frad-green-800 focus:outline-none focus:ring-2 focus:ring-frad-green-800"
          />
        </div>
      )}

      <div className="rounded-[8px] border border-ink-950/12 bg-white p-5 shadow-[0_14px_34px_-28px_rgba(8,17,13,0.28)]">
        <label htmlFor="donor-email" className="block text-xs font-black uppercase tracking-[0.08em] text-ink-950">
          Receipt email
        </label>
        <input
          id="donor-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.org"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-[8px] border border-ink-950/20 px-4 py-3 text-sm font-bold text-ink-950 focus:border-frad-green-800 focus:outline-none focus:ring-2 focus:ring-frad-green-800"
        />
        <p className="mt-2 text-xs text-ink-600">Used by the payment provider to send your transaction receipt.</p>
      </div>

      {statusMsg && (
        <div className="rounded-lg border border-frad-green-800/40 bg-frad-green-50 p-4 text-xs font-bold text-frad-green-900" role="status" aria-live="polite">
          {statusMsg}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="safe-focus cta-button cta-primary active:scale-[0.98] disabled:opacity-60"
        >
          {loading
            ? 'Connecting...'
            : `Continue with ${gateway === 'paystack' ? 'Paystack' : 'Stripe'}`}
        </button>
        <Link
          href="/contact"
          className="safe-focus cta-button cta-secondary active:scale-[0.98]"
        >
          Bank transfer details
        </Link>
      </div>

      <div className="rounded-[8px] border border-frad-navy-900/15 bg-frad-navy-50 p-5 text-ink-950">
        <p className="text-xs font-black uppercase tracking-[0.1em] text-frad-navy-900">Bank transfers and institutional grants</p>
        <p className="mt-2 text-sm font-bold leading-6 text-ink-800">
          To arrange a bank transfer or institutional grant, contact our finance team at{' '}
          <span className="font-black text-frad-navy-900">finance@fradfoundation.org</span> or use the contact form.
        </p>
      </div>
    </div>
  );
}

export default function DonationSelector() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[38rem] animate-pulse rounded-xl bg-paper-200/80 p-8 flex items-center justify-center">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-ink-600">Preparing donation options...</span>
        </div>
      }
    >
      <DonationSelectorContent />
    </Suspense>
  );
}
