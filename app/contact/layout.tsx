import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Feedback',
  description:
    'Contact FRAD Foundation for partnership inquiries, media requests, or confidential safeguarding feedback.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
