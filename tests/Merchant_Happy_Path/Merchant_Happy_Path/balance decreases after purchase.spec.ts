import { test, expect } from '@playwright/test';

test('Wallet balance decreases after successful purchase', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/login.html');

  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();

  await page.getByLabel('Main navigation').getByRole('link', { name: 'Products' }).click();
  await page.getByTestId('add-cart-1').click();
  await expect(page.getByText(/Cart:\s*1\s*items?/i)).toBeVisible();

  await page.getByRole('button', { name: 'Open cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Confirm & Pay' }).click();

  await expect(page.getByRole('heading', { name: 'Purchase Complete!' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/Purchase complete! .* deducted from wallet/i)).toBeVisible();

  await page.getByTestId('checkout-modal').getByRole('button', { name: /close|ok|done|continue/i }).click({ timeout: 5000 }).catch(() => {});

  await page.getByLabel('Main navigation').getByRole('link', { name: 'Wallet' }).click();

  await expect(page.getByText('Available Balance')).toBeVisible();
  await expect(page.getByTestId('wallet-balance')).toBeVisible();

});