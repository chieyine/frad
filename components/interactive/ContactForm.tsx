'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

export default function ContactForm({ defaultReason = 'general' }: { defaultReason?: 'general' | 'partnership' | 'media' | 'complaint' }) {
  const fieldClassName = 'safe-focus min-h-12 w-full rounded-lg border border-ink-950/15 bg-white px-4 py-3 text-sm text-ink-950 shadow-[0_10px_24px_-22px_rgba(8,17,13,0.45)] transition-colors hover:border-ink-950/25 focus:border-frad-green-700 focus:outline-none';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: defaultReason,
    message: '',
    consent: false,
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus('error');
        setStatusMessage(
          result.message === 'Please use FRAD Foundation official contact channels for urgent messages.'
            ? 'Please use FRAD Foundation official contact channels for urgent messages.'
            : result.message || 'We could not send your message. Please check the form and try again.'
        );
        return;
      }

      setStatus('success');
      trackEvent({ action: 'inquiry_submitted', category: 'inquiry', label: formData.reason });
      setStatusMessage('Thank you for contacting FRAD Foundation. Your message has been received and will be directed to the appropriate team.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: defaultReason,
        message: '',
        consent: false,
        website: '',
      });
    } catch {
      setStatus('error');
      setStatusMessage('We could not send your message because the connection failed. Please try again or use FRAD official contact channels.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-frad-green-800 text-white p-6 rounded-xl text-center">
        <h4 className="font-extrabold text-lg mb-2">Message received</h4>
        <p className="text-sm">{statusMessage}</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-xs font-semibold underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-busy={status === 'submitting'}>
      {status === 'error' && (
        <div className="rounded-lg border border-frad-red-600 bg-red-50 p-4 text-sm font-semibold text-frad-red-600" role="alert">
          {statusMessage}
        </div>
      )}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-ink-800">Full name *</label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          maxLength={120}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={fieldClassName}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink-800">Email address *</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            maxLength={180}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={fieldClassName}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-ink-800">Phone number</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            maxLength={80}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={fieldClassName}
          />
        </div>
      </div>
      <div>
        <label htmlFor="reason" className="mb-1.5 block text-sm font-bold text-ink-800">Reason for contacting us</label>
        <select
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value as typeof formData.reason })}
          className={fieldClassName}
        >
          <option value="general">General enquiry</option>
          <option value="partnership">Partnership enquiry</option>
          <option value="media">Media and press</option>
          <option value="complaint">Confidential complaint or safeguarding concern</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-ink-800">Message *</label>
        <textarea
          id="message"
          rows={4}
          required
          maxLength={3000}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${fieldClassName} min-h-36 resize-y`}
        />
      </div>
      <div className="flex items-start gap-2">
        <input
          id="consent"
          type="checkbox"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 rounded text-frad-green-600 focus:ring-frad-green-500"
        />
        <label htmlFor="consent" className="text-xs text-ink-600">
          I consent to FRAD Foundation processing my personal information to respond to this enquiry in accordance with our Privacy and Data Policy.
        </label>
      </div>
      <Button type="submit" variant="primary" disabled={status === 'submitting'} className="w-full">
        {status === 'submitting' ? 'Sending message…' : 'Send message'}
      </Button>
    </form>
  );
}
