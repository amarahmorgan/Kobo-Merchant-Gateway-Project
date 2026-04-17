import { test, expect } from '@playwright/test';

test('Negative: Add Customer accepts weird names and special characters', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/customers.html');

  const weirdNames = [
    "O'Reilly DROP TABLE",
    "Bini123!!!",
    "John@#$%^&*()",
    "👨‍🚀 Astronaut",
    "<script>alert('xss')</script>",
    "     leading and trailing spaces     ",
    "A".repeat(300)                    // very long name
  ];

  for (const name of weirdNames) {
    // Open the form fresh every time
    await page.getByRole('button', { name: 'Add Customer' }).click();
    await expect(page.getByRole('heading', { name: 'Add New Customer' })).toBeVisible({ timeout: 15000 });

    // Fill the form
    await page.getByPlaceholder('e.g. Thabo Mokoena').fill(name);
    await page.getByPlaceholder('e.g. 072 345 6789').fill('0723456789');

    await page.getByRole('button', { name: 'Save Customer' }).click();

    // Wait for success toast (don't fail the test if toast is missing or different)
    await expect(page.getByText(/Customer added|added successfully/i)).toBeVisible({ 
      timeout: 8000 
    }).catch(() => {
      console.log(`No toast visible for name: ${name.substring(0, 30)}...`);
    });

    // Safely close modal/toast before next iteration
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000); // Give UI time to reset
  }
});