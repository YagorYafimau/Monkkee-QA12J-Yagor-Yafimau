import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('Login and verify FAQ/Support page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  // Ожидаем открытие страницы FAQ / Support
  const faqSupportPage = await loginPage.openFaqSupportPopup();

  // Проверяем, что на странице появился элемент с классом header__logo
  const logoLocator = faqSupportPage.locator('a.header__logo');
  await expect(logoLocator).toBeVisible();
});
