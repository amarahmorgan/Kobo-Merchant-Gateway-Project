import { test, expect } from '@playwright/test';

test('User can select different voucher types', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/login.html');

  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();

  await page.getByLabel('Main navigation').getByRole('link', { name: 'Products' }).click();

  await page.getByTestId('add-cart-1').click();
  await page.getByTestId('add-cart-5').click();
  await page.getByTestId('add-cart-8').click();
  await page.getByTestId('add-cart-6').click();

  
  await page.waitForTimeout(1500);

  
  await expect(page.getByText(/Cart:\s*4\s*items/i)).toBeVisible();

});