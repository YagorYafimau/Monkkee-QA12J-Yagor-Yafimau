import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('calendar navigation', async ({ page }) => {
  await page.goto('https://monkkee.com/app/#/');
  await page
    .getByPlaceholder('Email address or alias')
    .fill(process.env.LOGIN!);
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Select date').click();
  await page.getByRole('cell', { name: '‹' }).click();
  await page.getByRole('cell', { name: '30' }).nth(1).click();
  const selectedDate = await page.getByPlaceholder('Select date').inputValue();
  expect(selectedDate).toContain('30');
});
