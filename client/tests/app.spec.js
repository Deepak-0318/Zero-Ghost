const { test, expect } = require('@playwright/test');

test('homepage has title and navbar', async ({ page }) => {
  await page.goto('/');
  
  // Check title
  await expect(page).toHaveTitle(/React/);
  
  // Check navbar
  const navbar = page.locator('.navbar');
  await expect(navbar).toBeVisible();
});

test('can navigate to login page', async ({ page }) => {
  await page.goto('/');
  
  // Click login link
  await page.click('text=Login');
  
  // Check if we're on login page
  await expect(page).toHaveURL(/.*login/);
});