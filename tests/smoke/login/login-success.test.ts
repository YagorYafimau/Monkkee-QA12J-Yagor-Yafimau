import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import dotenv from 'dotenv';

dotenv.config();
test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();

  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);
});
