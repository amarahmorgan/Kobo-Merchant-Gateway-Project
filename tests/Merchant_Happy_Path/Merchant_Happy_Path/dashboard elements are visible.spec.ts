import { test, expect, Page } from '@playwright/test';
async function openDashboard(page:Page) {
  test('Dashboard elements are visible', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');

  await page.getByPlaceholder(/username/i).fill('admin');
  await page.getByPlaceholder(/password/i).fill('password123');

  await page.getByRole('button', { name: /sign in/i }).click();
  
  await expect(page).toHaveURL(/dashboard/i);

  await expect(page.locator('[data-testid="balance"]')).toBeVisible();
  }  
)}