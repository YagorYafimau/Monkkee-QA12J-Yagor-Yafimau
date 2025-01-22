import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { ManageTagsPage } from '../../../page-objects/managetagspage';
import { DashboardPage } from '../../../page-objects/dashboard-page';
import { EntryPage } from '../../../page-objects/entry-page';

test('Create and verify a tag', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const manageTagsPage = new ManageTagsPage(page);
  const dashboardPage = new DashboardPage(page);
  const entryPage = new EntryPage(page);

  await loginPage.goToLoginPage();
  const email = process.env.LOGIN!;
  const password = process.env.PASSWORD!;
  await loginPage.login(email, password);

  await entryPage.clickCreateNewEntryButton();
  await entryPage.fillEntryText('Тэг');
  await entryPage.saveEntry();

  await manageTagsPage.createNewTag('123');
  await manageTagsPage.goBackToOverview();

  await dashboardPage.goToManageTagsPage();
  const tag = page.locator('td.tag.ng-binding', { hasText: '123' });
  await tag.waitFor({ state: 'visible', timeout: 15000 });

  const tagText = await tag.textContent();
  expect(tagText?.trim()).toBe('123');
});
