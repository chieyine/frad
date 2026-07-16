import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Feedback',
  description:
    'Contact FRAD Foundation for partnership enquiries, media requests, community feedback, or confidential safeguarding concerns.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
