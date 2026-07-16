'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root Global Error Boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-paper-100 text-ink-950 font-sans antialiased">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-lg border border-ink-950/10">
            <h1 className="text-2xl font-black text-ink-950">This page is temporarily unavailable</h1>
            <p className="mt-4 text-sm leading-6 text-ink-600">
              We could not load the page. Please try again in a moment.
            </p>
            <button
              onClick={reset}
              className="mt-6 w-full rounded-lg bg-frad-green-800 py-3 text-sm font-bold text-white transition hover:bg-frad-green-900"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
