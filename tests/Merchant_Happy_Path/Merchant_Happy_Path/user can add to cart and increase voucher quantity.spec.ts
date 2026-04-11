import { test, expect } from '@playwright/test';

test('User can add to cart and increase voucher quantity', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/login.html');
  await page.getByTestId('login-username').click();
  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').click();
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Products' }).click();
  await page.getByTestId('add-cart-0').click();
  await page.getByTestId('qty-plus-0').click();
  await page.getByTestId('qty-plus-0').click();
  await page.getByTestId('qty-plus-0').click();
  
});