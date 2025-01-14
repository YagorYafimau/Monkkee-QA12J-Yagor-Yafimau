import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { ManageTagsPage } from '../../../page-objects/managetagspage';

test('Create and verify a tag', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const manageTagsPage = new ManageTagsPage(page);

  await loginPage.goToLoginPage();
  const email = process.env.LOGIN!;
  const password = process.env.PASSWORD!;
  await loginPage.login(email, password);

  await loginPage.clickCreateNewEntryButton();
  await loginPage.fillEntryText('Тэг');
  await loginPage.saveEntry();

  const tagInput = page.locator('#new-tag');
  await tagInput.fill('123');
  const okButton = page.locator('#assign-new-tag');
  await okButton.click();

  const backButton = page.locator('#back-to-overview');
  await backButton.click();

  await loginPage.navigateToEntriesPage();

  await manageTagsPage.goToTagsPage();

  const tag = page.locator('td.tag.ng-binding', { hasText: '123' });
  await tag.waitFor({ state: 'visible', timeout: 15000 });

  const tagText = await tag.textContent();
  expect(tagText?.trim()).toBe('123');
});
