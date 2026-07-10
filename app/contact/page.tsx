'use client';

import { useState } from 'react';
import Hero from '@/components/sections/Hero';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: 'general',
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
      setStatusMessage('Thank you for contacting FRAD Foundation. Our team will review your inquiry shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: 'general',
        message: '',
        consent: false,
        website: '',
      });
    } catch {
      setStatus('error');
      setStatusMessage('We could not send your message because the connection failed. Please try again or use FRAD official contact channels.');
    }
  };

  return (
    <>
      <Hero
        headline="Contact & Feedback"
        subtext="Get in touch with FRAD Foundation for partnership inquiries, media requests, or confidential feedback."
        size="small"
      />
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <section className="section-padding">
        <div className="section-container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Reach Our Teams</h2>
              <p className="text-ink-600 leading-relaxed mb-8">
                Whether you are a community member, international donor, media representative, or partner organization,
                we welcome open communication and accountability.
              </p>

              <div className="space-y-6">
                <div className="card-base">
                  <h3 className="font-extrabold text-lg text-ink-950 mb-1">National Coordination Office</h3>
                  <p className="text-sm text-ink-600">Abuja, Federal Capital Territory, Nigeria</p>
                </div>
                <div className="card-base border-l-4 border-l-frad-red-600">
                  <h3 className="font-extrabold text-lg text-ink-950 mb-1">Confidential Safeguarding & Complaints</h3>
                  <p className="text-sm text-ink-600 mb-2">
                    To report safeguarding concerns, PSEA infractions, or operational complaints securely:
                  </p>
                  <p className="text-xs font-semibold text-frad-red-600">All submissions are handled with strict confidentiality.</p>
                </div>
              </div>
            </div>

            <div className="card-base !p-8">
              <h3 className="font-extrabold text-xl text-ink-950 mb-6">Send a Message</h3>
              {status === 'success' ? (
                <div className="bg-frad-green-800 text-white p-6 rounded-xl text-center">
                  <h4 className="font-extrabold text-lg mb-2">Message Received</h4>
                  <p className="text-sm">{statusMessage}</p>
                  <button onClick={() => setStatus('idle')} className="mt-4 text-xs font-semibold underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="rounded-lg border border-frad-red-600 bg-red-50 p-4 text-sm font-semibold text-frad-red-600">
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
                    <label htmlFor="name" className="block text-sm font-medium text-ink-800 mb-1">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-ink-950/15 focus:outline-none focus:ring-2 focus:ring-frad-green-500 text-sm"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ink-800 mb-1">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-ink-950/15 focus:outline-none focus:ring-2 focus:ring-frad-green-500 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-ink-800 mb-1">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-ink-950/15 focus:outline-none focus:ring-2 focus:ring-frad-green-500 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-ink-800 mb-1">Inquiry Type</label>
                    <select
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-ink-950/15 focus:outline-none focus:ring-2 focus:ring-frad-green-500 text-sm bg-white"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="partnership">Partnership Proposal</option>
                      <option value="media">Media & Press</option>
                      <option value="complaint">Confidential Complaint / Safeguarding</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-ink-800 mb-1">Message *</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-ink-950/15 focus:outline-none focus:ring-2 focus:ring-frad-green-500 text-sm"
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
                      I consent to FRAD Foundation processing my personal information to respond to this inquiry in accordance with our Privacy & Data Policy.
                    </label>
                  </div>
                  <Button type="submit" variant="primary" disabled={status === 'submitting'} className="w-full">
                    {status === 'submitting' ? 'Sending Message...' : 'Submit Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
