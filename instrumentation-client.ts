function reportClientError(kind: string, message: string) {
  const payload = JSON.stringify({ category: 'client_error', action: kind, label: message.slice(0, 180), path: window.location.pathname });
  if (navigator.sendBeacon) navigator.sendBeacon('/api/analytics', new Blob([payload], { type: 'application/json' }));
}

window.addEventListener('error', (event) => reportClientError('window_error', event.message || 'Unknown client error'));
window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason instanceof Error ? event.reason.message : String(event.reason || 'Unhandled promise rejection');
  reportClientError('unhandled_rejection', message);
});
