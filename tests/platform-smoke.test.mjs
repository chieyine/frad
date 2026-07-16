import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

const root = new URL('..', import.meta.url).pathname;

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

test('public pages do not expose prototype language', () => {
  const banned = [
    'Awaiting approved',
    'Image placeholder',
    'Emergency alert slot',
    'CMS-connected',
    'CMS-controlled',
    'pending approval',
    'Phase 3',
  ];
  const files = [
    'app/page.tsx',
    'app/about/page.tsx',
    'app/about/mission-vision-values/page.tsx',
    'app/impact/page.tsx',
    'app/projects/page.tsx',
    'app/publications/page.tsx',
    'app/news/page.tsx',
    'app/stories/page.tsx',
    'app/donate/page.tsx',
  ];

  for (const file of files) {
    const source = read(file);
    for (const phrase of banned) {
      assert.equal(source.includes(phrase), false, `${file} still contains "${phrase}"`);
    }
  }
});

test('contact form uses the API route instead of fake local success', () => {
  const page = read('app/contact/page.tsx');
  const form = read('components/interactive/ContactForm.tsx');
  const route = read('app/api/contact/route.ts');

  assert.equal(form.includes("fetch('/api/contact'") || page.includes("fetch('/api/contact'"), true);
  assert.equal(form.includes('setTimeout') && !form.includes("fetch('/api/contact'"), false);
  assert.equal(route.includes('CONTACT_WEBHOOK_URL'), true);
  assert.equal(route.includes("payload.consent !== true"), true);
});

test('seo infrastructure is present', () => {
  assert.equal(read('app/sitemap.ts').includes('MetadataRoute.Sitemap'), true);
  assert.equal(read('app/robots.ts').includes('MetadataRoute.Robots'), true);
  const layout = read('app/layout.tsx');
  const jsonLd = read('components/seo/JsonLd.tsx');
  assert.equal(layout.includes('application/ld+json') || (layout.includes('JsonLd') && jsonLd.includes('application/ld+json')), true);
});

test('homepage references optimized image assets', () => {
  const page = read('app/page.tsx');
  assert.equal(page.includes('.png'), false);
  assert.equal(page.includes('.jpg'), true);

  for (const file of readdirSync(join(root, 'public/images'))) {
    if (!file.endsWith('.jpg')) continue;
    const size = statSync(join(root, 'public/images', file)).size;
    assert.equal(size < 600_000, true, `${file} is larger than the expected optimized budget`);
  }
});

test('payment routes never return demonstration checkout URLs', () => {
  const stripe = read('app/api/checkout/stripe/route.ts');
  const paystack = read('app/api/checkout/paystack/route.ts');

  assert.equal(stripe.includes('frad-demo-redirect'), false);
  assert.equal(paystack.includes('frad-demo-redirect'), false);
  assert.equal(stripe.includes('STRIPE_SECRET_KEY'), true);
  assert.equal(paystack.includes('PAYSTACK_SECRET_KEY'), true);
});

test('linked content types have detail routes', () => {
  for (const route of [
    'app/projects/[slug]/page.tsx',
    'app/stories/[slug]/page.tsx',
    'app/news/[slug]/page.tsx',
    'app/careers/jobs/[slug]/page.tsx',
  ]) {
    assert.equal(statSync(join(root, route)).isFile(), true, `${route} is missing`);
  }
});

test('unapproved stories and media are filtered before publication', () => {
  const wordpress = read('lib/wordpress.ts');
  const media = read('components/sections/MediaExhibit.tsx');

  assert.equal(wordpress.includes("story.consentStatus === 'consented'"), true);
  assert.equal(wordpress.includes("asset.consentStatus === 'approved'"), true);
  assert.equal(media.includes("asset.consentStatus === 'approved'"), true);
});

test('donor production infrastructure is present', () => {
  for (const route of [
    'app/donors/page.tsx',
    'app/donors/due-diligence/page.tsx',
    'app/financial-accountability/page.tsx',
    'app/donate/thank-you/page.tsx',
    'app/api/webhooks/stripe/route.ts',
    'app/api/webhooks/paystack/route.ts',
  ]) assert.equal(statSync(join(root, route)).isFile(), true, `${route} is missing`);

  assert.equal(read('app/api/webhooks/stripe/route.ts').includes('STRIPE_WEBHOOK_SECRET'), true);
  assert.equal(read('app/api/webhooks/paystack/route.ts').includes('x-paystack-signature'), true);
});

test('privacy-safe analytics and health monitoring are wired globally', () => {
  assert.equal(read('app/layout.tsx').includes('AnalyticsProvider'), true);
  assert.equal(read('app/api/analytics/route.ts').includes('ANALYTICS_ENDPOINT'), true);
  assert.equal(read('app/api/health/route.ts').includes('wordpressReachable'), true);
  assert.equal(read('docs/MEASUREMENT_PLAN.md').includes('Verified donation completion rate'), true);
});
