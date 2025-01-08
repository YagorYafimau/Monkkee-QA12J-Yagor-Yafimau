import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('language change test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();

  await page.getByRole('link', { name: ' English' }).click();
  await page.getByRole('link', { name: 'Portuguese' }).click();

  const languageChangeMessage = await page.locator('text=Idioma alterado');
  await expect(languageChangeMessage).toBeVisible();
});
