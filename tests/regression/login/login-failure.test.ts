import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('Unsuccessful login with invalid credentials', async ({ page }) => {
    await page.goto('https://monkkee.com/app#/');

    const emailInput = page.getByPlaceholder('Email address or alias');
    const passwordInput = page.getByPlaceholder('Password');
    const loginButton = page.getByRole('button', { name: 'Login' });

    await emailInput.fill('hellotms');
    await passwordInput.fill('1234789tms');
    await loginButton.click();

    const errorMessage = page.locator('.alert.alert-danger');
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  });
});
