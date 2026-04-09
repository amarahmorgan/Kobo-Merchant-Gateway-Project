import { test, expect } from '@playwright/test';

test('Sale works with maximum amount', async ({ page }) => {
  
  await page.goto('https://quality-engineering-labs.vercel.app/payment.html');

  // Wait for the Sell Product form
  await expect(page.getByText('Sell Product')).toBeVisible({ timeout: 15000 });

  // Fill Customer Phone
  await page.getByPlaceholder('e.g. 072 123 4567').fill('0721234567');

  // Select a Product
  await page.getByRole('combobox').selectOption({ index: 1 });

  // Set Amount to R1000 using the slider
  await page.locator('input[type="range"]').evaluate((slider: HTMLInputElement) => {
    slider.value = '1000';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
    slider.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // Enter Merchant PIN (change '1234' if your test PIN is different)
  await page.getByPlaceholder('Enter your merchant PIN').fill('1234');

  // Check confirmation
  await page.getByRole('checkbox').check();

  // Process the sale
  await page.getByRole('button', { name: 'Process Sale' }).click();

  // === Better success assertions (more precise) ===
  
  // Option 1: Check for the clear success heading (recommended)
  await expect(page.getByRole('heading', { name: 'Sale Processed Successfully!' })).toBeVisible({ timeout: 10000 });

  // Option 2: Check for the commission message
  await expect(page.getByText('Sale processed! Commission earned:')).toBeVisible();

  // Option 3: Check that Recent Sales is no longer empty (optional)
  // await expect(page.getByText('No sales recorded yet.')).not.toBeVisible();
});