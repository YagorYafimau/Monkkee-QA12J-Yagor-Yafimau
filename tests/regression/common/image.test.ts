import { test, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../../page-objects/login-page';

test('file upload test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await page.locator('.entry').first().click();
  await page.waitForTimeout(1000);

  await page.getByText('Hello TMS').click();

  await page.getByLabel('Image').first().click();

  const src =
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fteachmeskills.by%2Fkak-voiti-v-it&psig=AOvVaw278GHPK6yk7BKW2LlMp4PZ&ust=1736444612537000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCp7rPW5ooDFQAAAAAdAAAAABAE';
  await page.getByLabel('URL').fill(src);
  await page.getByLabel('OK').click();

  await expect(page.locator(`img[src="${src}"]`)).toBeAttached();
});
