import { test, expect } from '@playwright/test';

test('Balance is displayed on dashboard', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/login.html');
  
  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();

  await expect(page.getByTestId('wallet-balance')).toBeVisible();
});