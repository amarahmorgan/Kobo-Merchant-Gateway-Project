import { test, expect } from '@playwright/test';

test('Boundary: Sale with minimum amount R5', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/payment.html');
  await expect(page.getByText('Sell Product')).toBeVisible();

  await page.getByPlaceholder('e.g. 072 123 4567').fill('0721234567');
  await page.getByRole('combobox').selectOption({ index: 1 });
  
  // Set minimum amount using slider
  await page.locator('input[type="range"]').evaluate((slider: HTMLInputElement) => {
    slider.value = '5';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  });

  await page.getByPlaceholder('Enter your merchant PIN').fill('1234');
  await page.getByRole('checkbox').check();

  await page.getByRole('button', { name: 'Process Sale' }).click();

  await expect(page.getByRole('heading', { name: 'Sale Processed Successfully!' })).toBeVisible({ timeout: 10000 });
});