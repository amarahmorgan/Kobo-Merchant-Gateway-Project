import { test, expect } from '@playwright/test';

test('User is redirected to dashboard after login', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/login.html');
  await page.getByTestId('login-username').click();
  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').click();
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();
  await expect (page.getByTestId('dashboard-title')).toBeVisible();
});