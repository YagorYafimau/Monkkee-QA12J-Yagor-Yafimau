import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { DashboardPage } from '../../../page-objects/dashboard-page';
import dotenv from 'dotenv';

dotenv.config();

test('Dashboard page after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goToLoginPage();

  const login = process.env.LOGIN;
  const password = process.env.PASSWORD;

  await loginPage.login(login!, password!);

  await dashboardPage.waitForSettingsButton();
  const isEnabled = await dashboardPage.isSettingsButtonEnabled();

  expect(isEnabled).toBe(true);

  const currentUrl = page.url();
  expect(currentUrl).toContain('/entries');
});
