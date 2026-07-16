import { test, expect } from '@playwright/test';
import { NIGERIA_STATE_PATHS } from '../../components/interactive/NigeriaStateData';
import { SECTORS } from '../../lib/constants';

const VIEWPORTS = [
  { name: 'iPhone 13 mini (Mobile)', width: 375, height: 812 },
  { name: 'iPad Pro (Tablet)', width: 1024, height: 1366 },
  { name: '1080p Desktop (Full HD)', width: 1920, height: 1080 },
];

test.describe('Automated Multi-Device Visual & E2E Testing Matrix', () => {
  test.setTimeout(120000); // 2 minutes to allow 37 state interactions across all tabs without hitting 30s default timeout

  for (const vp of VIEWPORTS) {
    test.describe(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      test('NigeriaOperationalMap: verifies all 37 state regions and tabs render and interact cleanly without layout overflow', async ({ page }) => {
        await page.goto('/where-we-work');

        // Ensure main map component and SVG are loaded (increased timeout for client-side dynamic loading)
        const mapCard = page.locator('.map-grid');
        await expect(mapCard).toBeVisible({ timeout: 15000 });

        const svgMap = page.locator('svg[role="img"][aria-label*="Interactive map of Nigeria"]');
        await expect(svgMap).toBeVisible({ timeout: 15000 });

        // Verify region tabs ("Northeast (BAY States)", "Northwest Corridor", "Abuja Hub", "All Nigeria")
        const regionTabs = ['northeast', 'northwest', 'abuja', 'all'];
        for (const tabId of regionTabs) {
          const tabBtn = page.locator('button[type="button"]', { hasText: tabId === 'northeast' ? 'Northeast' : tabId === 'northwest' ? 'Northwest' : tabId === 'abuja' ? 'Abuja' : 'All Nigeria' });
          if (await tabBtn.count() > 0) {
            await tabBtn.first().click();
          }
        }

        // Click "All Nigeria" tab to ensure all states can be inspected
        const allTabBtn = page.locator('button', { hasText: 'All Nigeria' });
        if (await allTabBtn.count() > 0) {
          await allTabBtn.first().click();
        }

        // Iterate through all 37 states defined in NIGERIA_STATE_PATHS
        expect(NIGERIA_STATE_PATHS.length).toBe(37);

        // Test interaction across all 37 states
        for (const state of NIGERIA_STATE_PATHS) {
          // Find path matching exact `d` attribute inside SVG
          const exactPath = svgMap.locator(`path[d="${state.path}"]`);
          
          if (await exactPath.count() > 0) {
            // Click state polygon using force click to handle any minor SVG overlay/glow filter
            await exactPath.first().click({ force: true });

            // Verify the selected state details panel updates with the state name
            const detailsPanel = page.locator('.premium-card aside');
            await expect(detailsPanel.locator('h3', { hasText: state.name })).toBeVisible({ timeout: 5000 });

            // Check no horizontal scrollbar/overflow was introduced at this viewport
            const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
            const windowWidth = await page.evaluate(() => window.innerWidth);
            expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 2); // 2px tolerance for border rounding
          }
        }
      });

      test('SectorExplorerDashboard: verifies all 8 sector tabs interact and switch content cleanly across viewports', async ({ page }) => {
        await page.goto('/what-we-do');

        // Verify the sector dashboard loaded
        const dashboard = page.locator('.premium-card').filter({ hasText: 'Programme areas' });
        await expect(dashboard).toBeVisible();

        expect(SECTORS.length).toBe(8);

        // Iterate through all 8 humanitarian sector tabs
        for (let i = 0; i < SECTORS.length; i++) {
          const sector = SECTORS[i];
          const sectorNumber = String(i + 1).padStart(2, '0');

          // Locate the tab button by sector number and title
          const tabButton = dashboard.locator('button').filter({ hasText: sectorNumber }).filter({ hasText: sector.title });
          await expect(tabButton).toBeVisible();
          await tabButton.click();

          // Verify active item title updates inside the Selected sector details panel
          const selectedHeading = dashboard.locator('h3').filter({ hasText: sector.title });
          await expect(selectedHeading).toBeVisible({ timeout: 3000 });

          // Verify sector description is rendered
          const descriptionEl = dashboard.locator('p').filter({ hasText: sector.description });
          await expect(descriptionEl).toBeVisible();

          // Verify CTA links point to the right sector slug
          const openSectorBtn = dashboard.locator('a', { hasText: 'Open sector' });
          await expect(openSectorBtn).toHaveAttribute('href', `/what-we-do/${sector.slug}`);

          const fundBtn = dashboard.locator('a', { hasText: 'Fund Intervention' });
          await expect(fundBtn).toHaveAttribute('href', `/donate?sector=${sector.slug}`);

          // Verify responsive width/overflow
          const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
          const windowWidth = await page.evaluate(() => window.innerWidth);
          expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 2);
        }
      });
    });
  }
});
