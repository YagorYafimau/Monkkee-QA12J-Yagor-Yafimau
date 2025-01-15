import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { SearchPage } from '../../../page-objects/search-page';

test('Search and verify entry by text and date', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);

  await loginPage.goToLoginPage();
  const email = process.env.LOGIN!;
  const password = process.env.PASSWORD!;
  await loginPage.login(email, password);

  await searchPage.searchByText('Hey TMS');

  const foundEntryByText = page.locator('text=Hey TMS');
  await expect(foundEntryByText).toBeVisible();
  const entryText = await foundEntryByText.textContent();
  expect(entryText?.trim()).toBe('Hey TMS');

  await searchPage.selectDate('12');

  const foundEntryByDate = page.locator('div.full-date.ng-binding');
  const entryDate = '12';
  await expect(foundEntryByDate).toContainText(entryDate);

  await page.getByRole('link', { name: 'Hey TMS' }).click();
  const editableField = page.locator('div[contenteditable="true"]');
  await editableField.click();

  const entryPageText = page.locator('div[contenteditable="true"]');
  await entryPageText.waitFor({ state: 'visible', timeout: 5000 });
  const textContent = await entryPageText.textContent();
  expect(textContent?.trim()).toBe('Hey TMS');
});
