'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts a numeral up once when it first scrolls into view.
 * Non-numeric affixes ("%", "+") are preserved; renders the final value
 * immediately for users who prefer reduced motion (and before hydration,
 * since the target value is the server-rendered content).
 */
export default function CountUp({ value, duration = 900 }: { value: string; duration?: number }) {
  const match = value.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/);
  const prefix = match?.[1] ?? '';
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : NaN;
  const suffix = match?.[3] ?? '';

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${prefix}${Math.round(target * eased).toLocaleString('en-NG')}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display}
    </span>
  );
}
