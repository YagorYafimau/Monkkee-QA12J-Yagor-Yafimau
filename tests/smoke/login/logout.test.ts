import { test, expect } from '@playwright/test';

test('User can log in and log out successfully', async ({ page }) => {
  await page.goto('https://monkkee.com/app#/');

  await page
    .getByPlaceholder('Email address or alias')
    .fill(process.env.LOGIN!);
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();

  const logoutButton = await page.getByRole('button', { name: 'Logout' });
  await expect(logoutButton).toBeVisible();

  await logoutButton.click();

  const loginButton = await page.getByRole('button', { name: 'Login' });
  await expect(loginButton).toBeVisible();
});
