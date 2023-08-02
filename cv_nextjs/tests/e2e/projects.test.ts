import { test, expect } from '@playwright/test';

test.describe('projects navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/projects');
  });

  test('projects rendered', async ({ page }) => {
    await expect(page.getByTestId('jobs-container')).toBeAttached();
  });
});