import { test, expect } from '@playwright/test';

test('BUG: Sale processes without selecting network/provider', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/payment.html');

  await page.getByPlaceholder('e.g. 072 123 4567').fill('0721234567');

  // Select Airtime (first product)
  await page.getByRole('combobox').selectOption({ index: 1 });

  // DO NOT select network/provider

  await page.locator('button[data-amount="50"]').click();
  await page.getByPlaceholder('Enter your merchant PIN').fill('1234');

  await page.getByRole('checkbox').check(); // confirmation checked

  await page.getByRole('button', { name: 'Process Sale' }).click();

  // proves defect
  await expect(page.getByText('Sale Processed Successfully')).toBeVisible();
});