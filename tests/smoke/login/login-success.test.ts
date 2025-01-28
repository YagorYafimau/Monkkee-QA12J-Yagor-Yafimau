import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { DashboardPage } from '../../../page-objects/dashboard-page';

test('Login success test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goToLoginPage();

  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await expect(dashboardPage.settingsButtonLocator).toBeVisible();
});
