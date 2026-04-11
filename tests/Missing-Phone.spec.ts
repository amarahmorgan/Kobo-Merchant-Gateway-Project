import { test, expect } from '@playwright/test';

test('Negative: Sale fails without phone number', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/payment.html');
  
  await expect(page.getByText('Sell Product')).toBeVisible({ timeout: 15000 });

  // Fill all fields EXCEPT phone number
  await page.getByRole('combobox').selectOption({ index: 1 });
  await page.locator('button[data-amount="50"]').click();        // Reliable quick amount
  await page.getByPlaceholder('Enter your merchant PIN').fill('1234');
  await page.getByRole('checkbox').check();

  // Try to process the sale
  await page.getByRole('button', { name: 'Process Sale' }).click();

  // Best way: Use the specific error message or test ID
  await expect(page.getByTestId('error-phone')).toBeVisible();

  // Alternative (if you prefer text):
  // await expect(page.getByText('Valid SA phone number required')).toBeVisible();
});