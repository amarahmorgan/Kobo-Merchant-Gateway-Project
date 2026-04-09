import { test, expect } from '@playwright/test';

test('Negative: Transaction should reject zero and negative amounts', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/transactions.html', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  const invalidAmounts = ['0', '-1', '-50', '-1000', '-0.01'];

  for (const amount of invalidAmounts) {
    console.log(`Testing amount: ${amount}`);

    // Fill description
    await page.getByPlaceholder('Transaction description...').fill(`Test Invalid Amount ${amount}`);

    // Enter invalid amount
    await page.getByPlaceholder('Amount (R)').fill(amount);

    // Select Sale and Airtime
    await page.locator('select').nth(0).selectOption('Sale');
    await page.locator('select').nth(1).selectOption('Airtime');

    // Click the submit button inside the form
    await page.getByRole('button', { name: '+ Add' }).click();

    // Expect error message
    await expect(page.getByText(/valid amount|greater than zero|positive amount|Please enter a valid amount/i))
      .toBeVisible({ timeout: 10000 });

    // Ensure no success message
    await expect(page.getByText('Added!')).not.toBeVisible({ timeout: 3000 });

    // Close the form
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1200);
  }

  console.log('All invalid amount tests completed');
});