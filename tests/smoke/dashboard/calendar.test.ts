import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('calendar navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await page.getByPlaceholder('Select date').click();
  await page.getByRole('cell', { name: '‹' }).click();
  await page.getByRole('cell', { name: '30' }).nth(1).click();
  const selectedDate = await page.getByPlaceholder('Select date').inputValue();
  expect(selectedDate).toContain('08/01/2025');
});
