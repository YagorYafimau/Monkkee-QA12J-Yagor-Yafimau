import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { LogoutPage } from '../../../page-objects/logout-page';

test('User can log in and log out successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const logoutPage = new LogoutPage(page);

  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

  await logoutPage.logout();

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
