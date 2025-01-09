import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('file upload test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await page.getByRole('link', { name: 'Create an entry' }).click();
  await page.getByLabel('Image').click();
  await page.getByLabel('URL').fill('https://picsum.photos/200/300.jpg');
  await page.getByLabel('OK').click();

  const src = 'https://picsum.photos/200/300.jpg';
  await expect(page.locator(`img[src="${src}"]`)).toBeAttached();
});
