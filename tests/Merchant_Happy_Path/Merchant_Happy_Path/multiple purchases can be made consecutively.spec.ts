import { test, expect } from '@playwright/test';

test('Multiple purchases can be made consecutively', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/login.html');


  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();

  //FIRST PURCHASE
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Products' }).click();

  await page.getByTestId('add-cart-1').click();
  await page.getByTestId('add-cart-5').click();
  await page.getByTestId('add-cart-8').click();
  await page.getByTestId('add-cart-6').click();

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Open cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.waitForTimeout(1500);

  await page.getByRole('button', { name: 'Confirm & Pay' }).click();

  await expect(page.getByRole('heading', { name: 'Purchase Complete!' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/Purchase complete! .* deducted from wallet/i)).toBeVisible();

  //CLICK CONTINUE SHOPPING TO EXIT AFTER FIRST PURCHASE
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  //SECOND PURCHASE
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Products' }).click();

  await page.getByTestId('add-cart-2').click();
  await page.getByTestId('add-cart-7').click();
  await page.getByTestId('add-cart-10').click();

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Open cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.waitForTimeout(1500);

  await page.getByRole('button', { name: 'Confirm & Pay' }).click();

  await expect(page.getByRole('heading', { name: 'Purchase Complete!' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/Purchase complete! .* deducted from wallet/i)).toBeVisible();
});