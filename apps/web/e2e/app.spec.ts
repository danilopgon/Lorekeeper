import { expect, test } from '@playwright/test';

test('shows the scaffold landing page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Hello, Lorekeeper' })).toBeVisible();
});
