#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MOCK_MEDIA, MOCK_PROJECTS, MOCK_REPORTS, MOCK_STORIES } from '../lib/mockData.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
let errors = 0;

function report(message) {
  console.error(`[asset-check] ${message}`);
  errors += 1;
}

function verifyLocalAsset(label, assetPath) {
  if (!assetPath) return;
  if (!assetPath.startsWith('/') || assetPath.startsWith('//')) {
    report(`${label} has an unsafe local path: ${assetPath}`);
    return;
  }
  if (!existsSync(join(root, 'public', assetPath))) {
    report(`${label} references a missing file: ${assetPath}`);
  }
}

for (const reportItem of MOCK_REPORTS) {
  if (reportItem.pdfUrl?.startsWith('/')) verifyLocalAsset(`Report "${reportItem.title}"`, reportItem.pdfUrl);
}

for (const media of MOCK_MEDIA) verifyLocalAsset(`Media "${media.title}"`, media.image);
for (const project of MOCK_PROJECTS) verifyLocalAsset(`Project "${project.title}"`, project.featuredImage);
for (const story of MOCK_STORIES) verifyLocalAsset(`Story "${story.title}"`, story.featuredImage);

if (errors > 0) {
  console.error(`Asset verification failed with ${errors} issue(s).`);
  process.exit(1);
}

console.log('Asset verification passed.');
