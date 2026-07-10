'use client';

import { useState } from 'react';
import Link from 'next/link';

const AMOUNTS = [
  { label: 'NGN 10,000', note: 'Emergency WASH kit for 1 family' },
  { label: 'NGN 25,000', note: 'Ready-to-Use Therapeutic Food supply' },
  { label: 'NGN 50,000', note: 'Safeguarding & protection support' },
  { label: 'NGN 100,000', note: 'Community livelihood grant' },
  { label: 'NGN 250,000', note: 'Multi-sector emergency response' },
  { label: 'Custom', note: 'Designate your custom amount' },
];

export default function DonationSelector() {
  const [selected, setSelected] = useState('NGN 50,000');
  const [customAmount, setCustomAmount] = useState('');

  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.08em] text-frad-green-800">
          Select contribution amount
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AMOUNTS.map((item) => {
            const isActive = selected === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelected(item.label)}
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

      {selected === 'Custom' && (
        <div className="rounded-[8px] border border-ink-950/12 bg-white p-5 shadow-[0_14px_34px_-28px_rgba(8,17,13,0.28)]">
          <label htmlFor="custom-amount" className="block text-xs font-black uppercase tracking-[0.08em] text-ink-950">
            Enter Custom Amount (NGN or USD)
          </label>
          <input
            id="custom-amount"
            type="text"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="mt-2 w-full rounded-[8px] border border-ink-950/20 px-4 py-3 text-sm font-bold text-ink-950 focus:border-frad-green-800 focus:outline-none focus:ring-2 focus:ring-frad-green-800"
          />
        </div>
      )}

      <div className="rounded-[8px] border border-frad-navy-900/15 bg-frad-navy-50 p-5 text-ink-950">
        <p className="text-xs font-black uppercase tracking-[0.1em] text-frad-navy-900">Verified Institutional Channels</p>
        <p className="mt-2 text-sm font-bold leading-6 text-ink-800">
          To make a wire transfer or coordinate an institutional grant allocation, please contact our financial controller desk directly at{' '}
          <span className="font-black text-frad-navy-900">finance@fradfoundation.org</span> or submit via our verified inquiry route.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Link
          href="/contact"
          className="safe-focus cta-button cta-primary active:scale-[0.98]"
        >
          Request Institutional Banking Details
        </Link>
      </div>
    </div>
  );
}
