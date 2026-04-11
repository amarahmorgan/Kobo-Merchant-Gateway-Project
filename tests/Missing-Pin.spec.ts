import { test, expect } from '@playwright/test';

test('BUG: Sale processes without merchant PIN', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/payment.html');

  await page.getByPlaceholder('e.g. 072 123 4567').fill('0721234567');
  await page.getByRole('combobox').selectOption({ index: 1 });
  await page.locator('button[data-amount="50"]').click();

  // NO PIN entered

  await page.getByRole('checkbox').check();

  await page.getByRole('button', { name: 'Process Sale' }).click();

  // proves the defect
  await expect(page.getByText('Sale Processed Successfully')).toBeVisible();
});