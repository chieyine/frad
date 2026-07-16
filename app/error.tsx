'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Sitewide Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="section-shell section-padding min-h-[60vh] flex items-center justify-center bg-paper-100">
      <div className="section-container max-w-xl text-center">
        <p className="editorial-kicker text-red-700">Temporary issue</p>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">We could not load this page.</h1>
        <p className="mt-4 text-base leading-7 text-ink-600">
          Please try again. If the problem continues, return to the homepage or contact FRAD.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="cta-button cta-primary safe-focus"
          >
            Try again
          </button>
          <Link href="/" className="cta-button cta-secondary safe-focus">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
