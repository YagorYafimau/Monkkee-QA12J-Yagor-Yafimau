import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('Welcome message test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  const welcomeLink = await page.locator('a', {
    hasText: 'Welcome to monkkee! We wish',
  });
  await welcomeLink.click();

  const heading = await page.locator('h1', { hasText: 'Welcome to monkkee!' });
  await expect(heading).toBeVisible();
});
