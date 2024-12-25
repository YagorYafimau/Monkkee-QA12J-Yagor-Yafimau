import { test, expect } from '@playwright/test';

test('Login success test', async ({ page }) => {
  await page.goto('https://my.monkkee.com/');

  const emailInput = await page.locator('input[name="login"]');
  await emailInput.waitFor({ timeout: 60000 });
  console.log('Email input found');

  await emailInput.fill('test@example.com');

  const passwordInput = await page.locator('input[name="password"]');
  await passwordInput.waitFor({ timeout: 60000 });
  console.log('Password input found');
  await passwordInput.fill('yourPassword');

  const submitButton = await page.locator('button[type="submit"]');
  await submitButton.click();

  const settingsButton = await page.locator('a.user-menu__btn');
  await expect(settingsButton).toBeEnabled({ timeout: 60000 });

  console.log('Login successful');
});
