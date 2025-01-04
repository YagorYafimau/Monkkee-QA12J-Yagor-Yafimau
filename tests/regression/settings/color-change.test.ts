import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('Color scheme change test', async ({ page }) => {
  await page.goto('https://monkkee.com/app#/');

  const emailInput = page.locator(
    'input[placeholder="Email address or alias"]'
  );
  await emailInput.click();
  await emailInput.fill(process.env.LOGIN!);

  const passwordInput = page.locator('input[placeholder="Password"]');
  await passwordInput.click();
  await passwordInput.fill(process.env.PASSWORD!);

  const loginButton = page.locator('button', { hasText: 'Login' });
  await loginButton.click();

  const settingsLink = page.locator('a', { hasText: 'Settings' });
  await settingsLink.click();

  const colourSchemeLink = page.locator('a', { hasText: 'Colour scheme' });
  await colourSchemeLink.click();

  const combobox = page.locator('select');
  await combobox.selectOption('dark');

  const okButton = page.locator('button', { hasText: 'OK' });
  await okButton.click();

  const confirmationMessage = page.locator('div.alert.alert-success');
  await confirmationMessage.waitFor({ state: 'visible', timeout: 15000 });

  await confirmationMessage.click();
});
