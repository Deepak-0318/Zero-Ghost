const { test, expect } = require('@playwright/test');

test('hello world test', async ({ page }) => {
  // Navigate to your local development server
  await page.goto('http://localhost:3000');
  
  // Basic test to check if the page loads
  await expect(page).toHaveTitle(/React App/);
  
  // Check if navbar exists
  await expect(page.locator('.navbar')).toBeVisible();
});