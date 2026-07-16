import AlertLink from '@/components/layout/AlertLink';
import Icon from '@/components/ui/Icon';
import { fetchEmergencyAlerts } from '@/lib/wordpress';
import type { EmergencyAlert } from '@/types/content';

interface EmergencyBannerProps {
  title?: string;
  message?: string;
  ctaText?: string;
  ctaLink?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  alert?: EmergencyAlert;
}

export default async function EmergencyBanner({
  title,
  message,
  ctaText,
  ctaLink,
  priority = 'medium',
  alert,
}: EmergencyBannerProps = {}) {
  let activeAlert: { title: string; message?: string; ctaText?: string; ctaLink?: string; priority?: 'low' | 'medium' | 'high' | 'critical' } | null = null;

  if (title) {
    activeAlert = { title, message, ctaText, ctaLink, priority };
  } else if (alert) {
    activeAlert = alert;
  } else {
    const alerts = await fetchEmergencyAlerts().catch(() => []);
    const active = alerts.find((candidate) => candidate.active);
    if (active) {
      activeAlert = active;
    }
  }

  if (!activeAlert) {
    return null;
  }

  const bgColor =
    activeAlert.priority === 'critical' || activeAlert.priority === 'high'
      ? 'bg-frad-red-600'
      : 'bg-frad-blue-700';

  return (
    <div className={`${bgColor} text-white relative z-[60]`} role="alert" data-wp-slot="emergencyAlert">
      <div className="section-container py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Icon name="alert-triangle" className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="font-semibold text-sm">{activeAlert.title}</span>
        </div>
        {activeAlert.message && <span className="text-sm font-bold text-white">{activeAlert.message}</span>}
        {activeAlert.ctaText && activeAlert.ctaLink && (
          <AlertLink
            href={activeAlert.ctaLink}
            title={activeAlert.title}
            ctaText={activeAlert.ctaText}
          />
        )}
      </div>
    </div>
  );
}
