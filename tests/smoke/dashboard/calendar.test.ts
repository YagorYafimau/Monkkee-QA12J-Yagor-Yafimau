import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { DashboardPage } from '../../../page-objects/dashboard-page';
import { format } from 'date-fns';

test('calendar navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  await dashboardPage.openCalendar();
  await dashboardPage.navigateToPreviousMonth();
  await dashboardPage.selectDate('30');

  const selectedDate = await dashboardPage.getSelectedDate();
  const currentDate = format(new Date(), 'dd/MM/yyyy');

  expect(selectedDate).toContain(currentDate);
});
