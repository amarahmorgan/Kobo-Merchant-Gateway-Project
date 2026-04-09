import { test, expect } from '@playwright/test';

test('Negative: Sale fails with invalid phone format', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/payment.html');
  await expect(page.getByText('Sell Product')).toBeVisible({ timeout: 15000 });

  await page.getByPlaceholder('e.g. 072 123 4567').fill('abc123xyz'); // invalid
  await page.getByRole('combobox').selectOption({ index: 1 });
  await page.locator('button[data-amount="50"]').click();
  await page.getByPlaceholder('Enter your merchant PIN').fill('1234');
  await page.getByRole('checkbox').check();

  await page.getByRole('button', { name: 'Process Sale' }).click();

  await expect(page.getByText('Valid SA phone number required')).toBeVisible();
});