'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts a numeral up once when it first scrolls into view.
 * Non-numeric affixes ("%", "+") are preserved; renders the final value
 * immediately for users who prefer reduced motion.
 */
export interface CountUpProps {
  value?: string;
  target?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ value, target: targetProp, prefix: prefixProp = '', suffix: suffixProp = '', duration = 900 }: CountUpProps) {
  const finalValueStr = value ?? `${prefixProp}${targetProp ? targetProp.toLocaleString('en-NG') : '0'}${suffixProp}`;
  const match = finalValueStr.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/);
  const prefix = match?.[1] ?? prefixProp;
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : (targetProp ?? NaN);
  const suffix = match?.[3] ?? suffixProp;

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(finalValueStr);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
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
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }} aria-live="polite">
      {display}
    </span>
  );
}
