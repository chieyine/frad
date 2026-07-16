'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useReportWebVitals } from 'next/web-vitals';

function send(payload: Record<string, unknown>) {
  const body = JSON.stringify({ ...payload, path: window.location.pathname, sentAt: new Date().toISOString() });
  if (navigator.sendBeacon) navigator.sendBeacon('/api/analytics', new Blob([body], { type: 'application/json' }));
  else void fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
}

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    send({ category: 'page_view', action: 'page_view', label: pathname });
  }, [pathname]);

  useEffect(() => {
    const handler = (event: Event) => send((event as CustomEvent<Record<string, unknown>>).detail);
    window.addEventListener('frad:telemetry', handler);
    return () => window.removeEventListener('frad:telemetry', handler);
  }, []);

  useReportWebVitals((metric) => {
    send({ category: 'web_vital', action: metric.name, value: metric.value, label: metric.rating, metricId: metric.id });
  });

  return null;
}
