import { test, expect } from '@playwright/test';

test('Balance format is correct', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/login.html');

  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();

  await expect(page.getByTestId('wallet-balance')).toBeVisible({ timeout: 15000 });

  const balanceText = await page.getByTestId('wallet-balance').textContent();
  console.log('Balance text found:', balanceText);

  await expect(page.getByTestId('wallet-balance')).toHaveText(
    /R?\s*[\d,]+\.?\d{0,2}/
  );
});