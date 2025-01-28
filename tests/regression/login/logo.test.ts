import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();

  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  const logo = await page.locator('img[alt="Logo"]');
  await expect(logo).toBeVisible();
});
