import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('calendar navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await loginPage.openCalendar();
  await loginPage.navigateToPreviousMonth();
  await loginPage.selectDate('30');

  const selectedDate = await loginPage.getSelectedDate();
  const currentDate = await loginPage.getCurrentDate();

  expect(selectedDate).toContain(currentDate);
});
