import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('Login and navigate to tags page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await page.getByRole('link', { name: 'Manage tags' }).click();

  await expect(page).toHaveURL(/\/tags$/);
});
