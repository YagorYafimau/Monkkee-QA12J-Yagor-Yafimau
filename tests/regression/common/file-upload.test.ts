import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

test('file upload test', async ({ page }) => {
  await page.goto('https://monkkee.com/app#/');

  await page.getByPlaceholder('Email address or alias').click();
  await page
    .getByPlaceholder('Email address or alias')
    .fill(process.env.EMAIL || '');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD || '');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForSelector('.entry');

  await page.locator('.entry').first().click();

  await page.getByText('Hello TMS!!!').click();

  const fileInput = await page.getByLabel('Image', { exact: true });

  const filePath = path.resolve(__dirname, '../Logo_RGB.png');
  await fileInput.setInputFiles(filePath);

  await page.getByLabel('OK').click();
});
