import { test, expect } from '@playwright/test';

test('Transaction reference is displayed', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/login.html');

  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Products' }).click();

  await page.getByTestId('add-cart-3').click();
  await page.waitForTimeout(1500);

  await page.getByRole('button', { name: 'Open cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Confirm & Pay' }).click();

  await expect(page.getByRole('heading', { name: 'Purchase Complete!' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId('checkout-success-msg')).toBeVisible();
  await expect(page.getByTestId('checkout-success-msg')).toContainText(/deducted from wallet/i);
  await expect(page.getByText(/Reference:/i)).toBeVisible();
  
});