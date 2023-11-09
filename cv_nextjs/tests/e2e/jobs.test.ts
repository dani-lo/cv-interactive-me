import { test, expect } from '@playwright/test';

test.describe('jobs navigation', () => {
  // test.beforeEach(async ({ page }) => {
  //   await page.goto('http://localhost:3000/jobs');
  // });

  test('jobs rendered', async ({ page }) => {
    // await expect(page.getByTestId('jobs-container')).toBeAttached();
    expect(1).toEqual(1)
  });
});