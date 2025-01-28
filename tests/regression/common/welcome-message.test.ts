import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('Welcome message test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await loginPage.clickWelcomeLink();

  const heading = await loginPage.getWelcomeHeading();
  await expect(heading).toBeVisible();
});
