'use client';

import React, { useState } from 'react';
import { trackSubscribe } from '@/lib/analytics';

interface NewsletterSubscribeProps {
  compact?: boolean;
  wordpressKey?: string;
  defaultInterest?: string;
  tone?: 'light' | 'dark';
}

export default function NewsletterSubscribe({
  compact = false,
  wordpressKey,
  defaultInterest = 'general_dispatch',
  tone = 'light',
}: NewsletterSubscribeProps) {
  const dark = tone === 'dark';
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(defaultInterest);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interest }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Subscription failed.');
      }

      setStatus('success');
      trackSubscribe(email, interest);
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'Unable to subscribe right now. Please try again later.';
      setErrorMessage(msg);
    }
  };

  if (status === 'success') {
    return (
      <div
        className={`rounded-xl border p-6 text-center ${dark ? 'border-white/15 bg-white/8' : 'border-frad-green-800/30 bg-frad-green-900/10'} ${
          compact ? 'p-4' : 'p-6 sm:p-8'
        }`}
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-frad-green-800 text-white mb-3">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h4 className={`text-lg font-extrabold ${dark ? 'text-white' : 'text-ink-950'}`}>Thank you for subscribing.</h4>
        <p className={`mx-auto mt-1 max-w-md text-sm ${dark ? 'text-white/70' : 'text-ink-600'}`}>
          FRAD Dispatch will bring programme updates, reports, and community stories directly to your inbox.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${dark ? 'rounded-xl border border-white/15 bg-white/7 shadow-[0_26px_70px_-46px_rgba(0,0,0,0.8)]' : 'card-base'} ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'}`}
      data-wp-slot={wordpressKey}
    >
      <div className="mb-5">
        <p className={`text-xs font-black uppercase tracking-[0.12em] ${dark ? 'text-frad-green-300' : 'text-frad-green-800'}`}>
          News and programme updates
        </p>
        <h3 className={`mt-1 text-xl font-extrabold sm:text-2xl ${dark ? 'text-white' : 'text-ink-950'}`}>
          Join the FRAD Humanitarian Dispatch
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-ink-600'}`}>
          Receive programme news, reports, and community stories from Northeast and Northwest Nigeria.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" aria-busy={status === 'loading'}>
        {!compact && (
          <div>
            <label htmlFor="interest-select" className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1">
              Primary Interest Area
            </label>
            <select
              id="interest-select"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="safe-focus w-full rounded-lg border border-ink-950/16 bg-white px-3 py-2.5 text-sm font-semibold text-ink-950 focus:border-frad-green-800 focus:outline-none"
            >
              <option value="general_dispatch">All Field Dispatches & Reports</option>
              <option value="wash">WASH & Water Security</option>
              <option value="nutrition">Nutrition & Primary Healthcare</option>
              <option value="protection">Protection & GBV Prevention</option>
              <option value="emergency_alerts">Urgent Emergency Alerts Only</option>
            </select>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="safe-focus flex-1 rounded-lg border border-ink-950/16 bg-white px-4 py-3 text-sm font-semibold text-ink-950 placeholder:text-ink-400 focus:border-frad-green-800 focus:outline-none"
            aria-label="Email address for subscription"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="safe-focus cta-button cta-primary whitespace-nowrap !py-3 !px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </div>

        {status === 'error' && (
          <p className="text-xs font-bold text-frad-red-600 mt-2" role="alert" aria-live="polite">
            {errorMessage}
          </p>
        )}

        <p className={`mt-2 text-[0.7rem] font-medium ${dark ? 'text-white/55' : 'text-ink-500'}`}>
          By subscribing, you agree to receive email communications from FRAD Foundation in accordance with our{' '}
          <a href="/privacy" className={`underline ${dark ? 'hover:text-white' : 'hover:text-ink-950'}`}>
            Privacy & Safeguarding Policy
          </a>.
        </p>
      </form>
    </div>
  );
}
