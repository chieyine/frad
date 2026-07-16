'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ReportsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Reports section Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="section-shell section-padding min-h-[50vh] flex items-center justify-center bg-paper-100">
      <div className="section-container max-w-xl text-center">
        <p className="editorial-kicker text-amber-800">Reports</p>
        <h2 className="mt-4 text-2xl font-black sm:text-3xl">The reports library is temporarily unavailable.</h2>
        <p className="mt-3 text-sm leading-6 text-ink-600">
          Please try again or browse the main publications library.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="cta-button cta-primary safe-focus !py-2.5 !text-xs"
          >
            Try again
          </button>
          <Link href="/publications" className="cta-button cta-secondary safe-focus !py-2.5 !text-xs">
            View Publications
          </Link>
        </div>
      </div>
    </div>
  );
}
