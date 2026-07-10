import Link from 'next/link';

/**
 * Evidence footnote: a superscript marker that links a published figure to
 * the page or document that substantiates it. Part of the "evidence behind
 * it" signature. Every number on the platform can carry its source.
 */
export default function SourceMark({
  index,
  href,
  label,
}: {
  index: number;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="source-mark safe-focus"
      title={`Source: ${label}`}
      aria-label={`Source ${index}: ${label}`}
    >
      {index}
    </Link>
  );
}
