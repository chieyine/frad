'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function DonationVerificationEvent({ gateway, amount }: { gateway: string; amount?: number }) {
  useEffect(() => {
    trackEvent({ action: 'donation_verified', category: 'donation_verified', label: gateway, value: amount });
  }, [gateway, amount]);
  return null;
}
