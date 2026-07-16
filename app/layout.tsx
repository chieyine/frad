import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/layout/EmergencyBanner';
import JsonLd, { generateOrganizationSchema } from '@/components/seo/JsonLd';
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import './globals.css';

const fraunces = localFont({
  src: '../assets/fonts/fraunces-600.ttf',
  weight: '600',
  style: 'normal',
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = localFont({
  src: '../assets/fonts/inter-500.ttf',
  weight: '500',
  style: 'normal',
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Nigerian-Led Humanitarian Action`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Nigerian-Led Humanitarian Action`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#002611',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper-50 text-ink-950 antialiased">
        <AnalyticsProvider />
        <JsonLd data={generateOrganizationSchema()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:border-2 focus:border-frad-green-600 focus:bg-ink-950 focus:p-4 focus:font-black focus:text-white"
        >
          Skip to main content
        </a>
        <EmergencyBanner />
        <Header />
        <main id="main-content" className="motion-page flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
