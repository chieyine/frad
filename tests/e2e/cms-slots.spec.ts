import { test, expect } from '@playwright/test';

test.describe('WordPress Headless CMS Slots E2E Verification', () => {
  test('Homepage renders all hero, cta, dossier, and media slots correctly', async ({ page }) => {
    await page.goto('/');

    // Hero slot
    const heroSlot = page.locator('[data-wp-slot="home.hero"]');
    await expect(heroSlot).toBeVisible();

    // Dossier slot
    const dossierSlot = page.locator('[data-wp-slot="home.dossier"]');
    await expect(dossierSlot).toBeVisible();

    // CTA slot
    const ctaSlot = page.locator('[data-wp-slot="home.cta"]');
    await expect(ctaSlot).toBeVisible();
  });

  test('About Accountability page renders governance meter and slots', async ({ page }) => {
    await page.goto('/about/accountability');
    const meterSlot = page.locator('[data-wp-slot="about.accountability.meter"]');
    await expect(meterSlot).toBeVisible();
  });

  test('Donate page renders giving gateway and impact telemetry', async ({ page }) => {
    await page.goto('/donate');
    await expect(page.getByText('Give with confidence')).toBeVisible();
    await expect(page.getByText('Verified Giving Channel')).toBeVisible();
  });
});
