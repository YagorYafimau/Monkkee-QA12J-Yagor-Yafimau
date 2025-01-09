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

  const today = new Date();
  const currentDate = `${today.getDate().toString().padStart(2, '0')}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${today.getFullYear()}`;

  expect(selectedDate).toContain(currentDate);
});
