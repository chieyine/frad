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
  const route = read('app/api/contact/route.ts');

  assert.equal(page.includes("fetch('/api/contact'"), true);
  assert.equal(page.includes('setTimeout'), false);
  assert.equal(route.includes('CONTACT_WEBHOOK_URL'), true);
  assert.equal(route.includes("payload.consent !== true"), true);
});

test('seo infrastructure is present', () => {
  assert.equal(read('app/sitemap.ts').includes('MetadataRoute.Sitemap'), true);
  assert.equal(read('app/robots.ts').includes('MetadataRoute.Robots'), true);
  assert.equal(read('app/layout.tsx').includes('application/ld+json'), true);
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
