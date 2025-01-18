import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { DashboardPage } from '../../../page-objects/dashboard-page';

test('calendar navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await dashboardPage.openCalendar();
  await dashboardPage.navigateToPreviousMonth();
  await dashboardPage.selectDate('30');

  const selectedDate = await dashboardPage.getSelectedDate();
  const currentDate = await dashboardPage.getCurrentDate();

  expect(selectedDate).toContain(currentDate);
});
