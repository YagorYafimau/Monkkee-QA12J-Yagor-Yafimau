import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('Create and delete an entry by timestamp', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();
  const email = process.env.LOGIN!;
  const password = process.env.PASSWORD!;
  await loginPage.login(email, password);

  await loginPage.clickCreateNewEntryButton();
  await loginPage.fillEntryText('Мой родны кут, як ты мне милы');
  await loginPage.saveEntry();
  await loginPage.navigateBackToOverview();

  const timestamp = await loginPage.getEntryTimestamp();
  console.log(`Созданная запись: ${timestamp}`);

  await loginPage.deleteEntryByTimestamp(timestamp);

  const isEntryDeleted = await page
    .locator(`div.full-date.ng-binding:has-text("${timestamp}")`)
    .isVisible();
  expect(isEntryDeleted).toBeFalsy();
});
