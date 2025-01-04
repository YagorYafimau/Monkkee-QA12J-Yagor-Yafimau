import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login-page';

test('Dashboard page after login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();

  const login = process.env.LOGIN;
  const password = process.env.PASSWORD;

  if (!login || !password) {
    console.error('Login or password not set');
    return;
  }

  console.log('Login:', login);
  console.log('Password:', password);

  await loginPage.login(login, password);

  const settingsButton = await page.locator('a.user-menu__btn');
  await expect(settingsButton).toBeEnabled({ timeout: 60000 });

  console.log('Login successful');
});
