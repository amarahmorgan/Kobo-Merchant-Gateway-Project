import { test, expect } from '@playwright/test';

test('Login fails with invalid credentials', async ({ page }) => {
    await page.goto('https://quality-engineering-labs.vercel.app/login.html');

    await page.getByPlaceholder('Enter merchant username').fill('wronguser');
    await page.getByPlaceholder('Enter password').fill('wrongpass');

    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Invalid username or password'))
        .toBeVisible();
});