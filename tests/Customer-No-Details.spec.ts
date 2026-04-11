import { test, expect } from '@playwright/test';

test('Negative: Add Customer fails when both Name and Phone are missing', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/customers.html');
  
  await page.getByRole('button', { name: 'Add Customer' }).click();
  await expect(page.getByRole('heading', { name: 'Add New Customer' })).toBeVisible({ timeout: 15000 });

  await page.getByRole('button', { name: 'Save Customer' }).click();

  await expect(page.getByText('Name is required')).toBeVisible();
});