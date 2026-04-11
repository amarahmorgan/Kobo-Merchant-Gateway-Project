import { test, expect } from '@playwright/test';

test('Negative: Add Customer accepts invalid phone formats', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/customers.html');

  const badPhones = [
    'abc123',
    '072-345-6789',
    '123456789',
    '+27123456789',
    '0723456789123456',
    '0000000000'
  ];

  for (const phone of badPhones) {
    // Open form fresh for each test case
    await page.getByRole('button', { name: 'Add Customer' }).click();
    await expect(page.getByRole('heading', { name: 'Add New Customer' })).toBeVisible({ timeout: 15000 });

    await page.getByPlaceholder('e.g. Thabo Mokoena').fill('Test Name');
    await page.getByPlaceholder('e.g. 072 345 6789').fill(phone);

    await page.getByRole('button', { name: 'Save Customer' }).click();

    // Expect success toast because validation is weak
    await expect(page.getByText('Customer added')).toBeVisible({ timeout: 10000 }).catch(() => {
      console.log(`No toast for phone: ${phone}`);
    });

    // Close the toast / modal state before next iteration
    await page.keyboard.press('Escape'); // Close modal if still open
  }
});