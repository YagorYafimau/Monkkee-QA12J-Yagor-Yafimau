import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('Verify "Send password reminder" functionality', async ({ page }) => {
  const email = process.env.EMAIL;

  if (!email) {
    throw new Error('EMAIL environment variable is not defined in .env file');
  }

  await page.goto('https://monkkee.com/app/#/');
  await page.getByRole('link', { name: 'Send password reminder' }).click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByRole('button', { name: 'OK' }).click();
  const successMessage = await page.getByRole('heading', {
    name: 'Password hint sent',
  });
  await expect(successMessage).toBeVisible();
});
