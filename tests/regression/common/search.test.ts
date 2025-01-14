import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('Search and verify entry by text and date', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();
  const email = process.env.LOGIN!;
  const password = process.env.PASSWORD!;
  await loginPage.login(email, password);

  const searchInput = await page.locator('input[placeholder="Search"]');
  await searchInput.fill('Hey TMS');
  await page.getByRole('button', { name: 'Search' }).click();

  const foundEntryByText = page.locator('text=Hey TMS');
  await expect(foundEntryByText).toBeVisible();

  const entryText = await foundEntryByText.textContent();
  expect(entryText?.trim()).toBe('Hey TMS');

  const datePicker = page.locator('input[placeholder="Select date"]');
  await datePicker.click();

  await page.getByRole('cell', { name: '12' }).click();

  const selectedDate = await page
    .locator('input[placeholder="Select date"]')
    .inputValue();
  expect(selectedDate).toContain('12');

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
