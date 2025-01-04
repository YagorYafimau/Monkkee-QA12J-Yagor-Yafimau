import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('Logout Functionality Test', async ({ page }) => {
  const email = process.env.LOGIN!;
  const password = process.env.PASSWORD!;

  await page.goto('https://monkkee.com/app/#/');
  await page.getByPlaceholder('Email address or alias').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();

  const loginButton = await page.getByRole('button', { name: 'Login' });
  expect(await loginButton.isVisible()).toBe(true);
});
