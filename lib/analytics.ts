/**
 * Privacy-safe, lightweight telemetry tracking for high-value user journeys.
 * Compatible with GA4, Plausible, PostHog, or custom endpoint logging.
 */

export interface TelemetryEvent {
  action: string;
  category: 'page_view' | 'web_vital' | 'report_download' | 'donation_flow' | 'donation_verified' | 'inquiry' | 'emergency_alert' | 'map_interaction' | 'newsletter_subscribe' | 'carousel_interaction' | 'client_error';
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

export function trackEvent({ action, category, label, value, metadata }: TelemetryEvent): void {
  if (typeof window === 'undefined') return;

  const eventData = {
    event_time: new Date().toISOString(),
    action,
    category,
    label,
    value,
    ...metadata,
  };

  // Dispatch to custom browser telemetry event or console audit in development
  try {
    window.dispatchEvent(new CustomEvent('frad:telemetry', { detail: eventData }));
    if (process.env.NODE_ENV === 'development') {
      console.log(`[TELEMETRY EVENT] [${category}] ${action} (${label || 'N/A'})`, eventData);
    }
  } catch {
    // Silent fail if custom events blocked
  }
}

export function trackDownload(reportTitle: string, downloadPath: string): void {
  trackEvent({
    action: 'download_pdf',
    category: 'report_download',
    label: reportTitle,
    metadata: { path: downloadPath },
  });
}

export function trackDonationStep(step: string, amount?: number, gateway?: string): void {
  trackEvent({
    action: `donation_step_${step}`,
    category: 'donation_flow',
    label: gateway || 'general',
    value: amount,
    metadata: { gateway, step },
  });
}

export function trackAlertClick(alertTitle: string): void {
  trackEvent({
    action: 'click_emergency_banner',
    category: 'emergency_alert',
    label: alertTitle,
  });
}

export function trackSubscribe(email: string, interest?: string): void {
  trackEvent({
    action: 'submit_newsletter',
    category: 'newsletter_subscribe',
    label: interest || 'general_dispatch',
    metadata: { domain: email.split('@')[1] || 'unknown', interest },
  });
}

export function trackCarouselSlide(slideIndex: number, slideTitle: string): void {
  trackEvent({
    action: 'swipe_carousel',
    category: 'carousel_interaction',
    label: slideTitle,
    value: slideIndex,
  });
}
