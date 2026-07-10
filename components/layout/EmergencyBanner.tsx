import Link from 'next/link';
import Icon from '@/components/ui/Icon';

interface EmergencyBannerProps {
  title: string;
  message?: string;
  ctaText?: string;
  ctaLink?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

export default function EmergencyBanner({
  title,
  message,
  ctaText,
  ctaLink,
  priority = 'medium',
}: EmergencyBannerProps) {
  const bgColor = priority === 'critical'
    ? 'bg-frad-red-600'
    : priority === 'high'
    ? 'bg-frad-red-600'
    : 'bg-frad-blue-700';

  return (
    <div className={`${bgColor} text-white relative z-[60]`} role="alert">
      <div className="section-container py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Icon name="alert-triangle" className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="font-semibold text-sm">{title}</span>
        </div>
        {message && <span className="text-sm font-bold text-white">{message}</span>}
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="inline-flex items-center border border-white bg-white px-3 py-1 text-sm font-black text-ink-950 transition-colors hover:bg-ink-950 hover:text-white whitespace-nowrap"
          >
            {ctaText}
            <Icon name="chevron-right" className="ml-1 h-3 w-3" strokeWidth={2} />
          </Link>
        )}
      </div>
    </div>
  );
}
