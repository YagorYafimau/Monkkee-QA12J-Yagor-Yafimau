import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://monkkee.com/app/#/');
  await page.getByPlaceholder('Email address or alias').click();
  await page.getByPlaceholder('Email address or alias').fill('innkoma');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Yakukun17!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('Hello search TMS 1!!!');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'Hello search TMS 1!!!' }).click();
});
